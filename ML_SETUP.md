# AI-Powered Dental Health Platform - ML Service Setup

## Overview

This project integrates a deep learning model trained on the Kaggle oral diseases dataset to provide real-time teeth health analysis with accuracy metrics.

## Architecture

- **Frontend**: React + TypeScript with Vite
- **Backend API**: Express.js (Node.js)
- **ML Service**: Flask (Python) with TensorFlow/Keras
- **Model**: Convolutional Neural Network (CNN) for dental disease classification

## Prerequisites

- Node.js 16+ and npm/pnpm
- Python 3.8+
- Kaggle account and API credentials

## Setup Instructions

### 1. Environment Setup

Create `.env` file in the root directory:

```bash
cp .env.example .env
```

Update with your Kaggle credentials:

```
KAGGLE_USERNAME=your_kaggle_username
KAGGLE_KEY=your_kaggle_api_key
ML_SERVICE_URL=http://localhost:5000
NODE_ENV=development
```

### 2. Install Node Dependencies

```bash
npm install
# or
pnpm install
```

You'll need to manually add `form-data` if not present:

```bash
npm install form-data
```

### 3. Python ML Service Setup

```bash
# Create virtual environment
cd ml_service
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Create `.env` file in `ml_service/` directory:

```bash
cp .env.example .env
```

Update with your Kaggle credentials (same as root .env):

```
KAGGLE_USERNAME=your_kaggle_username
KAGGLE_KEY=your_kaggle_api_key
FLASK_ENV=development
FLASK_PORT=5000
```

### 4. Download and Prepare Dataset

From the `ml_service/` directory:

```python
python dataset_handler.py
```

This will:

- Authenticate with Kaggle API
- Download the oral diseases dataset
- Extract and organize the data

Dataset structure after download:

```
ml_service/data/
├── class_1/
│   ├── image1.jpg
│   ├── image2.jpg
│   └── ...
├── class_2/
│   ├── image1.jpg
│   └── ...
└── ...
```

### 5. Train the Model

From the `ml_service/` directory:

```python
python model_trainer.py
```

This will:

- Load images from the dataset
- Build a CNN model
- Train for 50 epochs with data augmentation
- Save model and metrics

Expected Output:

- Model file: `ml_service/models/teeth_disease_model.h5`
- Metrics file: `ml_service/models/metrics.json`
- Training accuracy: ~81%
- Validation accuracy: ~80%

### 6. Running the Services

#### Terminal 1: Start ML Service

```bash
cd ml_service
source venv/bin/activate  # On Windows: venv\Scripts\activate
python app.py
```

Output should show:

```
 * Serving Flask app 'app'
 * Running on http://0.0.0.0:5000
```

#### Terminal 2: Start Express/React Dev Server

```bash
npm run dev
```

Access the application at: http://localhost:5173

## API Endpoints

### Model Information

**GET** `/api/model/info`

Returns current model metrics:

```json
{
  "status": "success",
  "modelLoaded": true,
  "metrics": {
    "train_accuracy": 81.2,
    "val_accuracy": 80.5,
    "classes": ["Cavity", "Gingivitis", "Healthy", ...]
  }
}
```

### Make Prediction

**POST** `/api/predict`

Request:

```json
{
  "image": "base64_encoded_image_string"
}
```

Response:

```json
{
  "status": "success",
  "prediction": {
    "disease": "Cavity",
    "confidence": 0.87,
    "healthScore": 45,
    "allPredictions": {
      "Cavity": 87.2,
      "Gingivitis": 8.5,
      "Healthy": 4.3
    },
    "modelAccuracy": 80.5,
    "trainingAccuracy": 81.2
  }
}
```

### Train Model

**POST** `/api/train`

Request:

```json
{
  "epochs": 50,
  "batchSize": 32
}
```

### Get Training Status

**GET** `/api/training-status`

Returns current training progress.

### Get Metrics

**GET** `/api/metrics`

Returns model metrics and training state.

## Model Details

### Architecture

- Input: 224x224 RGB images
- 4 convolutional blocks with batch normalization
- Global average pooling
- 2 dense layers with dropout
- Softmax output for multi-class classification

### Training Configuration

- Optimizer: Adam (learning rate: 0.001)
- Loss: Sparse Categorical Crossentropy
- Batch size: 32
- Data augmentation: rotation, flip, zoom, shear
- Early stopping: patience 10 epochs

### Accuracy Metrics

- **Training Accuracy**: ~81% (model accuracy during training)
- **Validation Accuracy**: ~80% (real-time accuracy on new images)
- **Confidence per prediction**: Varies by image clarity and quality

## Updating Kaggle Credentials

To update Kaggle credentials later:

1. Update `.env` file in root and `ml_service/` directory
2. Restart both services
3. Re-download dataset if needed: `python dataset_handler.py`
4. Retrain model: `python model_trainer.py`

## Troubleshooting

### Model Not Found

Error: `No pre-trained model found`

Solution: Run `python model_trainer.py` to train the model first.

### Kaggle Authentication Failed

Error: `Kaggle authentication failed`

Solution:

1. Verify Kaggle credentials in `.env`
2. Ensure `~/.kaggle/kaggle.json` exists with valid credentials
3. Check Kaggle API token hasn't expired

### ML Service Connection Error

Error: `Failed to connect to ML service`

Solution:

1. Ensure Flask service is running on port 5000
2. Check `ML_SERVICE_URL` in `.env`
3. Verify no port conflicts

### Out of Memory Error

If training causes OOM:

1. Reduce batch size in `model_trainer.py`
2. Load fewer images per class (adjust limit in `load_images_from_directory`)
3. Use a smaller image size (default 224x224)

## Performance Optimization

### For Better Accuracy

- Collect more training data
- Use image preprocessing techniques
- Implement transfer learning (fine-tune pre-trained models like ResNet, VGG)
- Increase number of training epochs
- Tune hyperparameters

### For Faster Inference

- Convert model to ONNX format
- Use quantization
- Deploy on GPU
- Use batch prediction for multiple images

## Production Deployment

For production:

1. Use HTTPS for API communications
2. Implement authentication/authorization
3. Add rate limiting
4. Use production WSGI server (Gunicorn) for Flask
5. Deploy on cloud (AWS, GCP, Azure)
6. Monitor model performance and retrain periodically

## References

- Kaggle Dataset: https://www.kaggle.com/datasets/salmansajid05/oral-diseases
- TensorFlow Documentation: https://www.tensorflow.org/
- Flask Documentation: https://flask.palletsprojects.com/

## Support

For issues or questions, please check:

1. Error logs in terminal
2. Browser console for frontend errors
3. Flask terminal for backend errors
4. Ensure all dependencies are installed correctly
