# AI Model Service for Dental Health Platform

Flask-based ML service for teeth disease detection using deep learning.

## Overview

This service provides:

- **Image Classification**: Classify dental diseases from uploaded images
- **Real-time Predictions**: Fast inference with 80%+ accuracy
- **Model Training**: Fine-tune on your own dataset
- **Accuracy Metrics**: Track model performance in real-time

## Architecture

### Model Details

**Type**: Convolutional Neural Network (CNN)
**Input**: 224×224 RGB images
**Output**: Multi-class disease classification

### Model Layers

```
Input (224x224x3)
    ↓
Conv2D(32) → BatchNorm → Conv2D(32) → MaxPool(2x2) → Dropout(0.25)
    ↓
Conv2D(64) → BatchNorm → Conv2D(64) → MaxPool(2x2) → Dropout(0.25)
    ↓
Conv2D(128) → BatchNorm → Conv2D(128) → MaxPool(2x2) → Dropout(0.25)
    ↓
Conv2D(256) → BatchNorm → Conv2D(256) → MaxPool(2x2) → Dropout(0.25)
    ↓
GlobalAveragePooling2D()
    ↓
Dense(512) → BatchNorm → Dropout(0.5)
    ↓
Dense(256) → BatchNorm → Dropout(0.5)
    ↓
Dense(num_classes) → Softmax
```

### Training Configuration

- **Optimizer**: Adam (lr=0.001)
- **Loss**: Sparse Categorical Crossentropy
- **Metrics**: Accuracy
- **Epochs**: 50 (with early stopping)
- **Batch Size**: 32
- **Data Augmentation**: Rotation, flip, zoom, shear

## Getting Started

### Installation

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Configuration

Create `.env` file:

```bash
cp .env.example .env
```

Update with your Kaggle credentials:

```
KAGGLE_USERNAME=your_username
KAGGLE_KEY=your_api_key
FLASK_PORT=5000
FLASK_ENV=development
```

### Dataset Setup

Download from Kaggle:

```bash
python dataset_handler.py
```

This will create `data/` directory with organized images.

### Train Model

```bash
python model_trainer.py
```

Output files:
- `models/teeth_disease_model.h5` - Trained model
- `models/metrics.json` - Training metrics

### Run Service

```bash
python app.py
```

Service available at: `http://localhost:5000`

## API Reference

### Health Check

**GET** `/health`

```bash
curl http://localhost:5000/health
```

Response:

```json
{
  "status": "healthy",
  "model_loaded": true,
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### Get Model Info

**GET** `/api/model/info`

Returns model metrics and classes.

### Make Prediction

**POST** `/api/predict`

```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "image_base64": "..."
  }'
```

Response:

```json
{
  "status": "success",
  "prediction": {
    "predicted_class": "Cavity",
    "confidence": 0.87,
    "all_predictions": {
      "Cavity": 0.87,
      "Gingivitis": 0.08,
      "Healthy": 0.05
    },
    "model_accuracy": 80.5,
    "training_accuracy": 81.2
  }
}
```

### Train Model

**POST** `/api/train`

```json
{
  "data_dir": "./data",
  "epochs": 50,
  "batch_size": 32
}
```

### Get Metrics

**GET** `/api/metrics`

Returns current model metrics and training state.

## Performance Metrics

### Expected Accuracy

- **Training Accuracy**: ~81%
- **Validation Accuracy**: ~80%
- **Inference Time**: 200-500ms per image

### Hardware Requirements

**Minimum**:
- CPU: 4 cores
- RAM: 4GB
- Storage: 2GB

**Recommended**:
- CPU: 8+ cores
- RAM: 8GB+
- GPU: NVIDIA with CUDA support
- Storage: 10GB

## Improving Accuracy

### Data Collection

1. Collect more diverse dental images
2. Include various lighting conditions
3. Capture different angles
4. Ensure balanced class distribution

### Model Enhancement

1. **Transfer Learning**: Use pre-trained ResNet or VGG
2. **Hyperparameter Tuning**: Adjust learning rate, batch size
3. **Data Augmentation**: Apply more transformations
4. **Ensemble Methods**: Combine multiple models

### Validation Strategy

1. Cross-validation with k-folds
2. Stratified sampling for class balance
3. Regular performance monitoring
4. A/B testing for model updates

## Deployment

### Using Gunicorn (Production)

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

Build and run:

```bash
docker build -t dental-ml .
docker run -p 5000:5000 dental-ml
```

### Cloud Deployment

- **AWS**: Deploy on EC2 with ECS
- **Google Cloud**: Use Cloud Run or App Engine
- **Azure**: Deploy on App Service
- **Heroku**: Use buildpacks for Flask

## Monitoring

### Performance Tracking

Monitor key metrics:

- Request latency
- Prediction accuracy
- Error rates
- Model drift

### Logging

All requests logged to console with:

- Timestamp
- Endpoint
- Status code
- Processing time

### Alerts

Set up alerts for:

- Service downtime
- High error rates
- Accuracy degradation
- Resource exhaustion

## Troubleshooting

### Model Not Loading

```python
# Check model file exists
import os
if not os.path.exists('./models/teeth_disease_model.h5'):
    print("Train model first: python model_trainer.py")
```

### Out of Memory

Reduce dataset or batch size:

```python
# In model_trainer.py
images, labels = model.load_images_from_directory(data_dir)
# Modify load limit
```

### Slow Predictions

1. Upgrade to GPU
2. Use model quantization
3. Implement caching
4. Use batch processing

### CORS Issues

Ensure CORS is enabled in `app.py`:

```python
from flask_cors import CORS
CORS(app)
```

## File Structure

```
ml_service/
├── app.py                 # Flask server
├── model_trainer.py       # Model training script
├── dataset_handler.py     # Kaggle integration
├── requirements.txt       # Python dependencies
├── .env.example          # Environment template
├── models/               # Trained models
│   ├── teeth_disease_model.h5
│   └── metrics.json
├── data/                 # Dataset (downloaded)
│   ├── class_1/
│   ├── class_2/
│   └── ...
└── README.md            # This file
```

## Contributing

To improve the model:

1. Collect more data
2. Experiment with architecture
3. Test different hyperparameters
4. Document improvements
5. Submit results

## License

This project uses the Kaggle oral diseases dataset.

## References

- [TensorFlow Documentation](https://www.tensorflow.org/)
- [Keras API](https://keras.io/)
- [Flask Framework](https://flask.palletsprojects.com/)
- [Kaggle Dataset](https://www.kaggle.com/datasets/salmansajid05/oral-diseases)

## Support

For issues:

1. Check logs: `FLASK_ENV=development python app.py`
2. Verify dependencies: `pip list`
3. Test endpoints with curl
4. Check ML_SETUP.md for detailed guidance

---

Built with ❤️ for better dental health outcomes.
