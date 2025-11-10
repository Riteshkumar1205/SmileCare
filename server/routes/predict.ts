import { RequestHandler } from "express";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:5000";

interface PredictionResponse {
  status: string;
  prediction?: {
    predicted_class: string;
    confidence: number;
    all_predictions: Record<string, number>;
    model_accuracy: number;
    training_accuracy: number;
  };
  model_metrics?: {
    real_time_accuracy: number;
    training_accuracy: number;
    confidence: number;
  };
  message?: string;
}

export const handlePredict: RequestHandler = async (req, res) => {
  try {
    const imageBase64 = req.body.image;

    if (!imageBase64) {
      res.status(400).json({
        status: "error",
        message: "No image provided",
      });
      return;
    }

    const form = new FormData();
    form.append("image_base64", imageBase64);

    const response = await fetch(`${ML_SERVICE_URL}/api/predict`, {
      method: "POST",
      body: form,
      headers: form.getHeaders(),
    });

    const data = (await response.json()) as PredictionResponse;

    if (data.status === "success" && data.prediction) {
      res.json({
        status: "success",
        prediction: {
          disease: data.prediction.predicted_class,
          confidence: data.prediction.confidence,
          healthScore: 100 - data.prediction.confidence,
          allPredictions: data.prediction.all_predictions,
          modelAccuracy: data.prediction.model_accuracy,
          trainingAccuracy: data.prediction.training_accuracy,
        },
      });
    } else {
      res.status(500).json({
        status: "error",
        message: data.message || "Prediction failed",
      });
    }
  } catch (error) {
    console.error("Prediction error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to process prediction",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const handleModelInfo: RequestHandler = async (req, res) => {
  try {
    const response = await fetch(`${ML_SERVICE_URL}/api/model/info`, {
      method: "GET",
    });

    const data = await response.json();

    res.json({
      status: "success",
      modelLoaded: data.model_loaded,
      metrics: data.metrics,
      trainingAccuracy: data.training_accuracy,
      validationAccuracy: data.validation_accuracy,
    });
  } catch (error) {
    console.error("Model info error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch model info",
    });
  }
};

export const handleTrainModel: RequestHandler = async (req, res) => {
  try {
    const { epochs = 50, batchSize = 32 } = req.body;

    const response = await fetch(`${ML_SERVICE_URL}/api/train`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        epochs,
        batch_size: batchSize,
        data_dir: "./data",
      }),
    });

    const data = await response.json();

    res.json({
      status: data.status,
      message: data.message,
      metrics: data.metrics,
    });
  } catch (error) {
    console.error("Train model error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to train model",
    });
  }
};

export const handleTrainingStatus: RequestHandler = async (req, res) => {
  try {
    const response = await fetch(`${ML_SERVICE_URL}/api/training-status`, {
      method: "GET",
    });

    const data = await response.json();

    res.json({
      status: "success",
      ...data,
    });
  } catch (error) {
    console.error("Training status error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch training status",
    });
  }
};

export const handleMetrics: RequestHandler = async (req, res) => {
  try {
    const response = await fetch(`${ML_SERVICE_URL}/api/metrics`, {
      method: "GET",
    });

    const data = await response.json();

    res.json({
      status: "success",
      metrics: data.metrics,
      trainingState: data.training_state,
    });
  } catch (error) {
    console.error("Metrics error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch metrics",
    });
  }
};
