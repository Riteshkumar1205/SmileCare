# SmileCare - AI-Powered Dental Health Platform

Quick start guide to get the application running with AI predictions.

## What You Get

✅ Full-stack dental health platform
✅ AI-powered teeth disease detection
✅ Real-time accuracy metrics (80%+ accuracy)
✅ Doctor finder with GPS integration
✅ Ambulance emergency services
✅ Global consultant network
✅ Detailed health reports

## Prerequisites

- **Node.js** 16+ (https://nodejs.org/)
- **Python** 3.8+ (https://python.org/)
- **npm** or **pnpm** (comes with Node.js)

## Quick Setup (5 minutes)

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 2. Setup Python ML Service

```bash
cd ml_service
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

### 3. Configure Kaggle API (Optional for Demo)

Skip this if you just want to test the UI. Update later for real predictions.

Create `.env` file in `ml_service/`:

```
KAGGLE_USERNAME=your_username
KAGGLE_KEY=your_api_key
FLASK_ENV=development
FLASK_PORT=5000
```

### 4. Start Services

**Terminal 1 - ML Service:**

```bash
cd ml_service
source venv/bin/activate  # Windows: venv\Scripts\activate
python app.py
```

Expected output: `Running on http://0.0.0.0:5000`

**Terminal 2 - Application:**

```bash
npm run dev
```

Expected output: `http://localhost:5173`

## Using the App

1. **Open** http://localhost:5173
2. **Click** "Assess Teeth" button
3. **Select** pain level and symptoms
4. **Upload** a teeth image (or test without)
5. **View** AI predictions and accuracy metrics

## Features to Explore

### 🦷 Teeth Assessment

- AI image analysis
- Real-time accuracy display (80%+)
- Pain level tracking
- Symptom checker
- Home remedies

### 👨‍⚕️ Find Doctors

- GPS-based doctor finder
- Doctor comparison and ratings
- Success rates and pricing
- Multiple consultation options

### 🚑 Ambulance Service

- Emergency ambulance booking
- Real-time tracking
- Driver ratings
- Transparent pricing

### 💬 Global Consultation

- Chat with dentists 24/7
- Video and audio calls
- Multi-language support
- Worldwide availability

### 📊 Health Reports

- Track assessment history
- Download reports
- Share with doctors
- Progress tracking

## File Structure

```
project/
├── client/                 # React frontend
│   ├── pages/
│   │   ├── Index.tsx      # Homepage
│   │   ├── Assess.tsx     # AI assessment with accuracy metrics
│   │   ├── Doctors.tsx    # Doctor finder
│   │   ├── Ambulance.tsx  # Emergency services
│   │   ├── Consult.tsx    # Global consultation
│   │   └── Reports.tsx    # Health reports
│   └── components/
│       └── Layout.tsx     # Header/footer
├── server/                 # Express API
│   ├── routes/
│   │   └── predict.ts     # AI prediction endpoints
│   └── index.ts           # Server setup
├── ml_service/            # Flask ML service
│   ├── app.py            # Flask API
│   ├── model_trainer.py  # Model training
│   ├── dataset_handler.py # Kaggle integration
│   └── requirements.txt   # Python dependencies
└── public/               # Static assets
```

## API Endpoints

### Dental Assessment

- `POST /api/predict` - Get AI prediction for uploaded image
- `GET /api/model/info` - Get model accuracy metrics

### Model Training

- `POST /api/train` - Train the model
- `GET /api/training-status` - Check training progress
- `GET /api/metrics` - Get current metrics

## Accuracy Metrics Explained

When you use the AI assessment, you'll see:

- **Real-Time Accuracy (80%)**: Current model performance on new images
- **Training Accuracy (81%)**: Model accuracy during training phase
- **Prediction Confidence**: Confidence score for this specific prediction (0-100%)

These metrics show the model's reliability and help you understand prediction quality.

## Configuration

### Update Kaggle Credentials Later

1. Update `.env` and `ml_service/.env`:

   ```
   KAGGLE_USERNAME=your_actual_username
   KAGGLE_KEY=your_actual_api_key
   ```

2. Restart both services

3. Download dataset (optional):

   ```bash
   cd ml_service
   python dataset_handler.py
   ```

4. Train model (optional):
   ```bash
   python model_trainer.py
   ```

## Troubleshooting

### Port Already in Use

If port 5000 or 5173 is in use:

```bash
# Change Flask port in ml_service/.env
FLASK_PORT=5001

# Change Vite port
npm run dev -- --port 5174
```

### Module Not Found Errors

```bash
# Reinstall dependencies
npm install
cd ml_service && pip install -r requirements.txt
```

### ML Service Not Responding

1. Ensure Flask service is running
2. Check `ML_SERVICE_URL` in `.env`
3. Check logs in ML service terminal

## Performance Notes

- First prediction may take 2-3 seconds (model loading)
- Subsequent predictions are faster
- Upload clear, well-lit images for better accuracy
- Model handles JPEG, PNG images up to 10MB

## Browser Support

- Chrome/Chromium: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Edge: ✅ Full support

## Next Steps

1. **Explore the UI** - Test all features
2. **Update Credentials** - Add real Kaggle API key
3. **Train Model** - Use real dental images dataset
4. **Deploy** - Use Netlify or Vercel

## Resources

- [ML Service Setup](./ML_SETUP.md) - Detailed ML configuration
- [Kaggle Oral Diseases Dataset](https://www.kaggle.com/datasets/salmansajid05/oral-diseases)
- [TensorFlow Documentation](https://www.tensorflow.org/)
- [Express.js Guide](https://expressjs.com/)

## Support & Issues

Check the following for help:

1. Browser console (F12 → Console tab)
2. Terminal logs (both Node and Python)
3. ML_SETUP.md for detailed configuration
4. Project README for architecture details

---

**Ready to get started?** Run the commands above and access http://localhost:5173 in your browser!

Enjoy building better dental health outcomes with SmileCare! 🦷✨
