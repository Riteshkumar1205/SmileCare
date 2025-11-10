import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handlePredict,
  handleModelInfo,
  handleTrainModel,
  handleTrainingStatus,
  handleMetrics,
} from "./routes/predict";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // AI/ML Prediction routes
  app.post("/api/predict", handlePredict);
  app.get("/api/model/info", handleModelInfo);
  app.post("/api/train", handleTrainModel);
  app.get("/api/training-status", handleTrainingStatus);
  app.get("/api/metrics", handleMetrics);

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      mlServiceUrl: process.env.ML_SERVICE_URL || "http://localhost:5000",
    });
  });

  return app;
}
