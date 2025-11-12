export interface PredictionResult {
  disease: string;
  confidence: number;
  healthScore: number;
  allPredictions: Record<string, number>;
  modelAccuracy: number;
  trainingAccuracy: number;
  isDemoMode: boolean;
}

// Demo predictions for when ML service is unavailable
const DEMO_PREDICTIONS = [
  {
    disease: "Cavity",
    confidence: 0.85,
    allPredictions: {
      Cavity: 85,
      "Tooth Decay": 8,
      Gingivitis: 4,
      Healthy: 3,
    },
  },
  {
    disease: "Gingivitis",
    confidence: 0.79,
    allPredictions: {
      Gingivitis: 79,
      "Gum Disease": 12,
      Cavity: 6,
      Healthy: 3,
    },
  },
  {
    disease: "Healthy Teeth",
    confidence: 0.92,
    allPredictions: {
      Healthy: 92,
      "Minor Plaque": 5,
      Cavity: 2,
      Gingivitis: 1,
    },
  },
  {
    disease: "Tooth Sensitivity",
    confidence: 0.73,
    allPredictions: {
      "Tooth Sensitivity": 73,
      "Enamel Erosion": 15,
      Cavity: 8,
      Healthy: 4,
    },
  },
];

export async function predictTeethDisease(
  imageBase64: string,
  painLevel: number,
  symptoms: string[],
): Promise<PredictionResult> {
  try {
    // Try to fetch from the actual ML service
    const response = await fetch("/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: imageBase64,
      }),
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "success" && data.prediction) {
      const prediction = data.prediction;
      return {
        disease: prediction.disease || prediction.predicted_class || "Unknown",
        confidence: prediction.confidence || prediction.model_accuracy || 0,
        healthScore: prediction.healthScore !== undefined
          ? prediction.healthScore
          : 100 - (prediction.confidence || 0),
        allPredictions: prediction.allPredictions || {},
        modelAccuracy: prediction.modelAccuracy || prediction.model_accuracy || 80,
        trainingAccuracy: prediction.trainingAccuracy || prediction.training_accuracy || 81,
        isDemoMode: false,
      };
    } else {
      throw new Error(data.message || "Prediction failed");
    }
  } catch (error) {
    console.warn("ML service unavailable, using demo mode:", error);

    // Fallback to demo mode
    return generateDemoPrediction(painLevel, symptoms);
  }
}

function generateDemoPrediction(
  painLevel: number,
  symptoms: string[],
): PredictionResult {
  // Select demo prediction based on pain level
  let selectedDemoIndex = 2; // Default to healthy

  if (painLevel >= 4) {
    selectedDemoIndex = 0; // Cavity (most common severe issue)
  } else if (painLevel >= 3) {
    selectedDemoIndex = Math.random() > 0.5 ? 0 : 1;
  } else if (painLevel >= 2) {
    selectedDemoIndex = 1; // Gingivitis
  }

  if (symptoms.includes("Bleeding gums") || symptoms.includes("Bad breath")) {
    selectedDemoIndex = 1; // Gingivitis
  }

  const demoPrediction = DEMO_PREDICTIONS[selectedDemoIndex];

  return {
    disease: demoPrediction.disease,
    confidence: demoPrediction.confidence,
    healthScore: Math.max(0, 100 - painLevel * 15 - symptoms.length * 5),
    allPredictions: demoPrediction.allPredictions,
    modelAccuracy: 80,
    trainingAccuracy: 81,
    isDemoMode: true,
  };
}

export async function getModelInfo(): Promise<{
  modelLoaded: boolean;
  trainingAccuracy: number;
  validationAccuracy: number;
  isDemoMode: boolean;
}> {
  try {
    const response = await fetch("/api/model/info", {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch model info");
    }

    const data = await response.json();

    return {
      modelLoaded: data.modelLoaded || false,
      trainingAccuracy: data.trainingAccuracy || 81,
      validationAccuracy: data.validationAccuracy || 80,
      isDemoMode: false,
    };
  } catch (error) {
    console.warn("Could not fetch model info, using defaults:", error);

    // Return demo/default metrics
    return {
      modelLoaded: false,
      trainingAccuracy: 81,
      validationAccuracy: 80,
      isDemoMode: true,
    };
  }
}
