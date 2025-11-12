import os
import json
import logging
import base64
from io import BytesIO
from pathlib import Path
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np

from model_trainer import TeethDiseaseModel
from dataset_handler import DatasetHandler

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Initialize model with priority to use ResNet50 model if available
model_path = os.getenv("MODEL_PATH", "./models/teeth_disease_model_resnet50.h5")
if not os.path.exists(model_path):
    # Fallback to default model path
    model_path = "./models/teeth_disease_model.h5"

logger.info(f"Using model path: {model_path}")
model = TeethDiseaseModel(model_path=model_path)

# Global variables for training state
training_state = {
    "is_training": False,
    "progress": 0,
    "current_epoch": 0,
    "total_epochs": 0,
    "metrics": {}
}

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    model_loaded = model.model is not None or model.load_model()
    return jsonify({
        "status": "healthy",
        "model_loaded": model_loaded,
        "timestamp": str(np.datetime64('now'))
    })

@app.route('/api/model/info', methods=['GET'])
def get_model_info():
    """Get model information and metrics"""
    try:
        if model.model is None:
            model.load_model()
        
        return jsonify({
            "status": "success",
            "model_loaded": model.model is not None,
            "metrics": model.metrics,
            "classes": model.class_names,
            "training_accuracy": model.metrics.get("train_accuracy", 0),
            "validation_accuracy": model.metrics.get("val_accuracy", 0)
        })
    except Exception as e:
        logger.error(f"Error getting model info: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/predict', methods=['POST'])
def predict():
    """Make prediction on uploaded image"""
    try:
        # Get image from request
        if 'image' not in request.files and 'image_base64' not in request.form:
            return jsonify({
                "status": "error",
                "message": "No image provided"
            }), 400
        
        # Load image
        image = None
        if 'image' in request.files:
            file = request.files['image']
            image = Image.open(file).convert('RGB')
        elif 'image_base64' in request.form:
            image_data = request.form['image_base64']
            image = Image.open(BytesIO(base64.b64decode(image_data))).convert('RGB')
        
        if image is None:
            return jsonify({
                "status": "error",
                "message": "Failed to load image"
            }), 400
        
        # Resize to model input size
        image = image.resize((224, 224))
        image_array = np.array(image) / 255.0
        
        # Load model if not already loaded
        if model.model is None:
            model.load_model()
        
        # Make prediction
        prediction = model.predict(image_array)
        
        if prediction is None:
            return jsonify({
                "status": "error",
                "message": "Model prediction failed"
            }), 500
        
        return jsonify({
            "status": "success",
            "prediction": prediction,
            "model_metrics": {
                "real_time_accuracy": prediction.get("model_accuracy", 0),
                "training_accuracy": prediction.get("training_accuracy", 0),
                "confidence": prediction.get("confidence", 0)
            }
        })
    
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/api/train', methods=['POST'])
def train_model():
    """Train model endpoint"""
    try:
        global training_state
        
        if training_state["is_training"]:
            return jsonify({
                "status": "error",
                "message": "Model training already in progress"
            }), 409
        
        data = request.get_json() or {}
        data_dir = data.get("data_dir", "./data")
        epochs = int(data.get("epochs", 50))
        batch_size = int(data.get("batch_size", 32))
        
        training_state["is_training"] = True
        training_state["total_epochs"] = epochs
        
        logger.info(f"Starting training with {epochs} epochs...")
        
        # Load images
        images, labels = model.load_images_from_directory(data_dir)
        
        if images is None:
            training_state["is_training"] = False
            return jsonify({
                "status": "error",
                "message": "Failed to load training data"
            }), 400
        
        # Build model
        num_classes = len(np.unique(labels))
        model.build_model(num_classes)
        
        # Train
        history = model.train(images, labels, epochs=epochs, batch_size=batch_size)
        
        # Save model
        model.save_model()
        
        training_state["is_training"] = False
        training_state["metrics"] = model.metrics
        
        return jsonify({
            "status": "success",
            "message": "Training completed successfully",
            "metrics": model.metrics
        })
    
    except Exception as e:
        logger.error(f"Training error: {e}")
        training_state["is_training"] = False
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/api/training-status', methods=['GET'])
def get_training_status():
    """Get training status"""
    return jsonify(training_state)

@app.route('/api/download-dataset', methods=['POST'])
def download_dataset():
    """Download dataset from Kaggle"""
    try:
        data = request.get_json() or {}
        kaggle_username = data.get("username", os.getenv("KAGGLE_USERNAME", ""))
        kaggle_key = data.get("api_key", os.getenv("KAGGLE_KEY", ""))
        
        if not kaggle_username or not kaggle_key:
            return jsonify({
                "status": "error",
                "message": "Kaggle credentials required"
            }), 400
        
        handler = DatasetHandler()
        
        if handler.authenticate(kaggle_username, kaggle_key):
            if handler.download_dataset():
                info = handler.get_dataset_info()
                return jsonify({
                    "status": "success",
                    "message": "Dataset downloaded successfully",
                    "dataset_info": info
                })
        
        return jsonify({
            "status": "error",
            "message": "Failed to download dataset"
        }), 500
    
    except Exception as e:
        logger.error(f"Dataset download error: {e}")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    """Get current model metrics"""
    return jsonify({
        "status": "success",
        "metrics": model.metrics,
        "training_state": training_state
    })

if __name__ == '__main__':
    # Try to load existing model
    if not model.load_model():
        logger.warning("No pre-trained model found. Train model first using /api/train endpoint")
    
    port = int(os.getenv("FLASK_PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
