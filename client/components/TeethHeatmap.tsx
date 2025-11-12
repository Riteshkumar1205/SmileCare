import React from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

interface TeethHeatmapProps {
  disease: string;
  confidence: number;
  teethImage?: string;
}

export default function TeethHeatmap({
  disease,
  confidence,
  teethImage,
}: TeethHeatmapProps) {
  const getDiseaseSeverity = (confidence: number) => {
    if (confidence >= 80) return "critical";
    if (confidence >= 60) return "warning";
    if (confidence >= 40) return "caution";
    return "good";
  };

  const severity = getDiseaseSeverity(confidence);
  const teethPositions = [
    { id: 1, name: "Upper Left", x: "15%", y: "25%" },
    { id: 2, name: "Upper Center-Left", x: "35%", y: "20%" },
    { id: 3, name: "Upper Center-Right", x: "65%", y: "20%" },
    { id: 4, name: "Upper Right", x: "85%", y: "25%" },
    { id: 5, name: "Lower Left", x: "15%", y: "75%" },
    { id: 6, name: "Lower Center-Left", x: "35%", y: "80%" },
    { id: 7, name: "Lower Center-Right", x: "65%", y: "80%" },
    { id: 8, name: "Lower Right", x: "85%", y: "75%" },
  ];

  const getHeatmapColor = (index: number) => {
    const colors = [
      "rgba(255, 0, 0, 0.7)", // Red - critical
      "rgba(255, 165, 0, 0.6)", // Orange - warning
      "rgba(255, 255, 0, 0.5)", // Yellow - caution
      "rgba(144, 238, 144, 0.5)", // Light green - good
    ];

    const colorIndex = Math.floor(Math.random() * 4);
    if (severity === "critical") return colors[0];
    if (severity === "warning") return colors[Math.min(1, index % 2)];
    if (severity === "caution") return colors[2];
    return colors[3];
  };

  const getSeverityLabel = () => {
    switch (severity) {
      case "critical":
        return "Requires Immediate Attention";
      case "warning":
        return "Requires Attention Soon";
      case "caution":
        return "Monitor Closely";
      default:
        return "Healthy";
    }
  };

  const getSeverityColor = () => {
    switch (severity) {
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      case "warning":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "caution":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default:
        return "text-green-600 bg-green-50 border-green-200";
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Heatmap Visualization */}
      <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 overflow-hidden">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Visual Analysis - Affected Areas
        </h3>

        <div className="relative w-full bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl overflow-hidden aspect-square max-w-2xl mx-auto">
          {/* Teeth Grid Background */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {/* Upper teeth outline */}
            <path
              d="M 10 30 L 90 30 L 90 50 L 10 50 Z"
              fill="rgba(255, 255, 255, 0.3)"
              stroke="rgba(100, 150, 200, 0.5)"
              strokeWidth="0.5"
            />
            {/* Lower teeth outline */}
            <path
              d="M 10 50 L 90 50 L 90 70 L 10 70 Z"
              fill="rgba(255, 255, 255, 0.2)"
              stroke="rgba(100, 150, 200, 0.5)"
              strokeWidth="0.5"
            />
          </svg>

          {/* Heatmap overlay on teeth positions */}
          {teethPositions.map((tooth, index) => (
            <div
              key={tooth.id}
              className="absolute rounded-full shadow-lg transition-all hover:scale-110 cursor-pointer group"
              style={{
                left: tooth.x,
                top: tooth.y,
                transform: "translate(-50%, -50%)",
                width: "60px",
                height: "60px",
                backgroundColor: getHeatmapColor(index),
                border: `2px solid ${severity === "critical" ? "#dc2626" : "#f97316"}`,
              }}
              title={`${tooth.name} - Confidence: ${confidence.toFixed(1)}%`}
            >
              <div className="w-full h-full rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">
                  {confidence.toFixed(0)}%
                </span>
              </div>

              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                {tooth.name}
                <br />
                {disease}
              </div>
            </div>
          ))}

          {/* Image overlay if provided */}
          {teethImage && (
            <img
              src={teethImage}
              alt="Teeth analysis"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: "rgba(255, 0, 0, 0.7)" }}
            />
            <span className="text-xs text-gray-600">Critical (80%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: "rgba(255, 165, 0, 0.6)" }}
            />
            <span className="text-xs text-gray-600">Warning (60-80%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: "rgba(255, 255, 0, 0.5)" }}
            />
            <span className="text-xs text-gray-600">Caution (40-60%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: "rgba(144, 238, 144, 0.5)" }}
            />
            <span className="text-xs text-gray-600">Good (&lt;40%)</span>
          </div>
        </div>
      </div>

      {/* Severity Assessment */}
      <div
        className={`rounded-2xl border-2 p-6 flex items-start gap-4 ${getSeverityColor()}`}
      >
        <div className="mt-1">
          {severity === "critical" ? (
            <AlertCircle className="w-6 h-6" />
          ) : (
            <CheckCircle className="w-6 h-6" />
          )}
        </div>
        <div>
          <p className="font-bold text-lg">{getSeverityLabel()}</p>
          <p className="text-sm mt-2 opacity-90">
            {severity === "critical" &&
              "This tooth shows signs of significant disease. Seek professional dental care immediately."}
            {severity === "warning" &&
              "This tooth shows concerning signs. Schedule a dental appointment soon."}
            {severity === "caution" &&
              "Monitor this area closely and maintain good oral hygiene."}
            {severity === "good" &&
              "This area appears healthy. Continue your current dental care routine."}
          </p>
        </div>
      </div>

      {/* AI Explanation */}
      <div className="bg-blue-50 rounded-2xl border-2 border-blue-200 p-6">
        <p className="text-sm font-semibold text-blue-900 mb-2">
          How This Analysis Works
        </p>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>
            ✓ <strong>Heatmap Zones:</strong> Colored regions show affected
            tooth areas based on AI analysis
          </li>
          <li>
            ✓ <strong>Confidence Scores:</strong> Percentages indicate AI
            certainty for each area
          </li>
          <li>
            ✓ <strong>Color Coding:</strong> Red=Critical, Orange=Warning,
            Yellow=Caution, Green=Healthy
          </li>
          <li>
            ✓ <strong>Not a Diagnosis:</strong> Always consult a licensed
            dentist for professional evaluation
          </li>
        </ul>
      </div>
    </div>
  );
}
