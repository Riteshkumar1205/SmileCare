import os
import logging
import base64
from io import BytesIO

from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np

# Keras 3.x (NOT tensorflow.keras!)
from keras.models import load_model
from keras.applications.resnet50 import preprocess_input

# Optional internal modules (you can remove if unused)
# from model_trainer import TeethDiseaseModel
# from dataset_handler import DatasetHandler


# -------------------------------------------------
# INIT APP + LOGGING
# -------------------------------------------------
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# -------------------------------------------------
# MODEL PATH
# -------------------------------------------------
BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "models", "teeth_disease_model.h5")

logger.info(f"🔍 Loading trained model from: {MODEL_PATH}")

model = None
try:
    model = load_model(MODEL_PATH, compile=False)
    logger.info("✅ Model loaded successfully (Keras 3.x)")
except Exception as e:
    logger.error(f"❌ Model loading failed: {e}")
    model = None


# -------------------------------------------------
# CONSTANTS
# -------------------------------------------------
CLASS_LABELS = [
    "Calculus",
    "Caries",
    "Gingivitis",
    "Hypodontia",
    "Mouth_Ulcer",
    "Tooth_Discoloration",
]

IMG_SIZE = (224, 224)


# -------------------------------------------------
# HEALTH SCORE LOGIC (FIXED)
# -------------------------------------------------
def build_report(pred):
    """Builds a structured AI diagnostic report."""

    pred = pred.tolist()
    pred = [float(p) for p in pred]

    sorted_indices = sorted(range(len(CLASS_LABELS)), key=lambda i: pred[i], reverse=True)

    conditions = []

    # Build condition info list
    for idx in sorted_indices:
        name = CLASS_LABELS[idx].replace("_", " ").title()
        prob = pred[idx]

        # Severity thresholds
        if prob >= 0.75:
            severity = "CRITICAL"
        elif prob >= 0.5:
            severity = "HIGH"
        else:
            severity = "MEDIUM"

        conditions.append({
            "name": name,
            "severity": severity,
            "confidence": round(prob, 4),
            "description": f"Detected sign of {name}.",
            "recommendations": [
                "Maintain proper oral hygiene.",
                "Schedule a professional dentist visit."
            ]
        })

    # ⭐ Correct health score formula: ONLY highest disease probability
    max_prob = max(pred)
    health_score = max(0, int((1 - max_prob) * 100))

    # Triage system
    if health_score >= 80:
        triage_level = "GREEN"
        triage_message = "Your dental health looks good."
    elif health_score >= 60:
        triage_level = "YELLOW"
        triage_message = "Some issues detected. Dentist visit recommended."
    else:
        triage_level = "RED"
        triage_message = "Critical dental issues detected. Seek dentist immediately."

    # Summary
    summary_text = f"{len(conditions)} condition(s) detected: " + \
        ", ".join([c["name"] for c in conditions])

    return {
        "overall_health_score": health_score,
        "ai_confidence": round(max_prob, 4),
        "summaryText": summary_text,
        "triage": {
            "level": triage_level,
            "message": triage_message,
        },
        "conditions": conditions,
    }


# -------------------------------------------------
# HEALTH CHECK ENDPOINT
# -------------------------------------------------
@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "running",
        "model_loaded": model is not None
    })


# -------------------------------------------------
# PREDICT ENDPOINT
# -------------------------------------------------
@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image provided"}), 400

        img = Image.open(request.files["image"]).convert("RGB")
        img = img.resize(IMG_SIZE)

        arr = np.array(img, dtype=np.float32)
        arr = preprocess_input(arr)  # ResNet preprocess
        arr = np.expand_dims(arr, axis=0)

        preds = model.predict(arr)[0]

        report = build_report(preds)

        report["predicted_class"] = CLASS_LABELS[int(np.argmax(preds))]
        report["confidence"] = float(max(preds) * 100)

        # raw probabilities
        report["probabilities"] = {
            CLASS_LABELS[i]: float(preds[i]) for i in range(len(CLASS_LABELS))
        }

        return jsonify(report)

    except Exception as e:
        logger.error(f"Prediction Error: {e}")
        return jsonify({"error": str(e)}), 500


# -------------------------------------------------
# RUN SERVER
# -------------------------------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
