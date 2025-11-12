# ML Model Setup Guide

## Prerequisites

- Python 3.8+
- TensorFlow 2.x
- pip or conda

## Setup Instructions

### 1. Install Python Dependencies

```bash
cd ml_service
pip install -r requirements.txt
```

### 2. Prepare Model File

Place your ResNet50 teeth disease model at:

```
ml_service/models/teeth_disease_model_resnet50.h5
```

**To set up the model file:**

1. Copy your model file from `C:\Users\rites\Downloads\teeth_disease_model_resnet50 (1).h5` to `ml_service/models/`
2. Rename it to `teeth_disease_model_resnet50.h5` (remove spaces and numbers)

Folder structure should look like:

```
ml_service/
├── models/
│   └── teeth_disease_model_resnet50.h5  ← Your model file here
├── app.py
├── model_trainer.py
├── dataset_handler.py
├── requirements.txt
└── .env
```

### 3. Create .env File

Create `ml_service/.env`:

```
FLASK_PORT=5000
MODEL_PATH=./models/teeth_disease_model_resnet50.h5
LOG_LEVEL=INFO
```

### 4. Run the ML Service (Manual)

```bash
cd ml_service
python app.py
```

The service will start at `http://localhost:5000`

### 5. Auto-start with Development Server

The ML service should start automatically when you run:

```bash
npm run dev
```

This will:

- Start the Node.js backend at `http://localhost:3000`
- Start the ML service at `http://localhost:5000`
- Start the Vite frontend dev server

### Troubleshooting

**Model not loading?**

- Ensure the model file path is correct
- Check file permissions
- Verify TensorFlow is installed: `pip list | grep tensorflow`

**Port already in use?**

- Change FLASK_PORT in `.env` to a different port
- Update `ML_SERVICE_URL` in the main `.env` accordingly

**CORS errors?**

- Flask CORS is enabled in app.py
- Ensure both servers are running

## API Endpoints

### GET `/api/model/info`

Get model information and accuracy metrics

```json
{
  "status": "success",
  "model_loaded": true,
  "metrics": {...},
  "classes": ["Cavity", "Gingivitis", "Healthy", ...],
  "training_accuracy": 92.5,
  "validation_accuracy": 89.3
}
```

### POST `/api/predict`

Make a prediction on an image

```json
{
  "status": "success",
  "prediction": {
    "predicted_class": "Cavity",
    "confidence": 85,
    "all_predictions": {
      "Cavity": 85,
      "Healthy": 10,
      ...
    },
    "model_accuracy": 92.5,
    "training_accuracy": 89.3
  }
}
```

## Model Details

- **Architecture:** ResNet50 with custom head
- **Input Size:** 224x224 RGB images
- **Output Classes:** Cavity, Gingivitis, Healthy, Tooth_Decay, Plaque
- **Training Accuracy:** ~92.5%
- **Validation Accuracy:** ~89.3%

## Next Steps

1. ✅ Place model file in `ml_service/models/`
2. ✅ Install Python dependencies
3. ✅ Create `.env` file
4. ✅ Run `npm run dev` to start all services
5. ✅ Visit http://localhost:5173 for the app
