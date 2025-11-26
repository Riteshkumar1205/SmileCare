import os
import json
import logging
from pathlib import Path
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from PIL import Image

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class TeethDiseaseModel:
    def __init__(self, model_path="./models/teeth_disease_model.h5"):
        self.model_path = Path(model_path)
        self.model_path.parent.mkdir(exist_ok=True)
        self.model = None
        self.label_encoder = LabelEncoder()
        self.class_names = []
        self.metrics = {
            "train_accuracy": 0,
            "val_accuracy": 0,
            "test_accuracy": 0,
            "train_loss": 0,
            "val_loss": 0,
            "classes": []
        }

    def load_images_from_directory(self, data_dir, img_size=(224, 224)):
        """Load images from directory structure"""
        images = []
        labels = []

        data_path = Path(data_dir)
        if not data_path.exists():
            logger.error(f"Data directory not found: {data_dir}")
            return None, None

        # Get class directories
        class_dirs = [d for d in data_path.iterdir() if d.is_dir()]
        self.class_names = sorted([d.name for d in class_dirs])
        logger.info(f"Found {len(self.class_names)} classes: {self.class_names}")

        for class_idx, class_dir in enumerate(sorted(class_dirs)):
            image_files = list(class_dir.glob("*.jpg")) + list(class_dir.glob("*.png"))
            logger.info(f"Loading {len(image_files)} images from {class_dir.name}")

            # Load ALL images (removed 100 limit)
            for img_path in image_files:
                try:
                    img = Image.open(img_path).convert("RGB")
                    img = img.resize(img_size)
                    img_array = np.array(img) / 255.0
                    images.append(img_array)
                    labels.append(class_idx)
                except Exception as e:
                    logger.warning(f"Failed to load {img_path}: {e}")

        if len(images) == 0:
            logger.error("No images loaded")
            return None, None

        return np.array(images), np.array(labels)

    # -------------------------------------------------------------------------
    # 🔥 UPDATED: ResNet50 FAST TRAINING MODEL
    # -------------------------------------------------------------------------
    def build_model(self, num_classes, input_shape=(224, 224, 3)):
        """Build a fast ResNet50-based classifier"""
        logger.info("Building ResNet50 model...")

        # Load pretrained ResNet50 backbone
        base_model = tf.keras.applications.ResNet50(
            include_top=False,
            weights="imagenet",
            input_shape=input_shape
        )

        # Freeze base layers for fast training
        base_model.trainable = False

        inputs = keras.Input(shape=input_shape)

        # Preprocessing layer for ResNet
        x = tf.keras.applications.resnet.preprocess_input(inputs)

        # Forward pass through ResNet50
        x = base_model(x, training=False)

        # Global average pooling
        x = layers.GlobalAveragePooling2D()(x)

        # Dropout for generalization
        x = layers.Dropout(0.3)(x)

        # Final softmax classification layer
        outputs = layers.Dense(num_classes, activation="softmax")(x)

        # Build model
        self.model = keras.Model(inputs, outputs)

        # Compile with lower LR (transfer learning best practice)
        self.model.compile(
            optimizer=keras.optimizers.Adam(learning_rate=1e-4),
            loss="sparse_categorical_crossentropy",
            metrics=["accuracy"]
        )

        logger.info(self.model.summary())
        return self.model

    # -------------------------------------------------------------------------
    def train(self, images, labels, epochs=30, batch_size=32, validation_split=0.2):
        """Train the model"""
        if self.model is None:
            self.build_model(len(np.unique(labels)))

        logger.info("Starting model training...")

        # Enable mixed precision (FASTER GPU training)
        tf.keras.mixed_precision.set_global_policy("mixed_float16")

        # Data augmentation
        train_datagen = ImageDataGenerator(
            rotation_range=20,
            width_shift_range=0.2,
            height_shift_range=0.2,
            horizontal_flip=True,
            zoom_range=0.2,
            shear_range=0.2,
            fill_mode='nearest'
        )

        # Split data
        X_train, X_val, y_train, y_val = train_test_split(
            images, labels, test_size=validation_split, random_state=42
        )

        # Callbacks
        callbacks = [
            keras.callbacks.EarlyStopping(
                monitor='val_loss',
                patience=8,
                restore_best_weights=True
            ),
            keras.callbacks.ReduceLROnPlateau(
                monitor='val_loss',
                factor=0.3,
                patience=4,
                min_lr=1e-7
            )
        ]

        # Train
        history = self.model.fit(
            train_datagen.flow(X_train, y_train, batch_size=batch_size),
            epochs=epochs,
            validation_data=(X_val, y_val),
            callbacks=callbacks,
            verbose=1
        )

        # Evaluate
        train_loss, train_acc = self.model.evaluate(X_train, y_train, verbose=0)
        val_loss, val_acc = self.model.evaluate(X_val, y_val, verbose=0)

        self.metrics = {
            "train_accuracy": float(train_acc * 100),
            "val_accuracy": float(val_acc * 100),
            "train_loss": float(train_loss),
            "val_loss": float(val_loss),
            "classes": self.class_names,
            "epochs_trained": epochs
        }

        logger.info(f"Training Accuracy: {train_acc*100:.2f}%")
        logger.info(f"Validation Accuracy: {val_acc*100:.2f}%")

        return history

    # -------------------------------------------------------------------------
    def save_model(self):
        """Save model to disk"""
        if self.model is not None:
            self.model.save(self.model_path)
            logger.info(f"Model saved to {self.model_path}")

            # Save metrics
            metrics_path = self.model_path.parent / "metrics.json"
            with open(metrics_path, 'w') as f:
                json.dump(self.metrics, f, indent=2)
            logger.info(f"Metrics saved to {metrics_path}")

    # -------------------------------------------------------------------------
    def load_model(self):
        """Load model from disk"""
        try:
            if self.model_path.exists():
                self.model = keras.models.load_model(self.model_path)
                logger.info(f"Model loaded from {self.model_path}")

                # Load metrics
                metrics_path = self.model_path.parent / "metrics.json"
                if metrics_path.exists():
                    with open(metrics_path, 'r') as f:
                        self.metrics = json.load(f)

                # Extract class names
                if "classes" in self.metrics:
                    self.class_names = self.metrics["classes"]

                return True
        except Exception as e:
            logger.error(f"Error loading model: {e}")

        return False

    # -------------------------------------------------------------------------
    def predict(self, image_array, confidence_threshold=0.5):
        """Make prediction on image"""
        if self.model is None:
            logger.error("Model not loaded")
            return None

        # Ensure correct shape
        if len(image_array.shape) == 3:
            image_array = np.expand_dims(image_array, axis=0)

        # Normalize if needed
        if image_array.max() > 1.0:
            image_array = image_array / 255.0

        # Predict
        predictions = self.model.predict(image_array, verbose=0)
        predicted_class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class_idx] * 100)

        result = {
            "predicted_class": self.class_names[predicted_class_idx],
            "confidence": confidence,
            "all_predictions": {
                self.class_names[i]: float(predictions[0][i] * 100)
                for i in range(len(self.class_names))
            },
            "model_accuracy": self.metrics.get("val_accuracy", 0),
            "training_accuracy": self.metrics.get("train_accuracy", 0)
        }

        return result

# -------------------------------------------------------------------------
if __name__ == "__main__":
    model = TeethDiseaseModel()

    # Load images
    data_dir = "./data"
    images, labels = model.load_images_from_directory(data_dir)

    if images is not None:
        # Build and train
        model.build_model(len(np.unique(labels)))
        model.train(images, labels, epochs=30)
        model.save_model()
        print("Training complete!")
        print(f"Metrics: {json.dumps(model.metrics, indent=2)}")
