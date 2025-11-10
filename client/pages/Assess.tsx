import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Upload,
  Mic,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Home,
  Phone,
  MessageSquare,
} from "lucide-react";

const painLevels = [
  { value: 1, label: "No pain", description: "Perfectly fine" },
  { value: 2, label: "Mild", description: "Slight discomfort" },
  { value: 3, label: "Moderate", description: "Noticeable pain" },
  { value: 4, label: "Severe", description: "Hard to manage" },
  { value: 5, label: "Extreme", description: "Unbearable" },
];

const symptoms = [
  "Tooth sensitivity",
  "Persistent pain",
  "Swelling/abscess",
  "Bleeding gums",
  "Loose teeth",
  "Bad breath",
  "Difficulty chewing",
  "Jaw pain",
];

export default function Assess() {
  const [step, setStep] = useState<"initial" | "symptoms" | "upload" | "results">(
    "initial"
  );
  const [painLevel, setPainLevel] = useState(0);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [healthScore, setHealthScore] = useState(0);
  const [usingMicrophone, setUsingMicrophone] = useState(false);

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateHealthScore = () => {
    let score = 100;
    score -= (painLevel - 1) * 10;
    score -= selectedSymptoms.length * 5;
    return Math.max(0, Math.min(100, score));
  };

  const handleAnalyze = () => {
    const score = calculateHealthScore();
    setHealthScore(score);
    setStep("results");
  };

  const needsEmergency = healthScore < 40;
  const needsConsultant = healthScore < 80;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Assess Your Dental Health
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Take just 2 minutes to evaluate your teeth health and get instant
            insights
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          {step === "initial" && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 md:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Current Pain Level
                </h2>
                <div className="space-y-4">
                  {painLevels.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => {
                        setPainLevel(level.value);
                        setStep("symptoms");
                      }}
                      className={`w-full p-4 rounded-lg border-2 transition text-left ${
                        painLevel === level.value
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-primary"
                      }`}
                    >
                      <p className="font-semibold text-gray-900">
                        {level.value}. {level.label}
                      </p>
                      <p className="text-sm text-gray-600">
                        {level.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === "symptoms" && (
            <div className="space-y-8">
              <button
                onClick={() => setStep("initial")}
                className="text-primary font-medium hover:opacity-80 transition"
              >
                ← Back
              </button>

              <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 md:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Additional Symptoms?
                </h2>
                <p className="text-gray-600 mb-6">Select any you're experiencing</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {symptoms.map((symptom) => (
                    <button
                      key={symptom}
                      onClick={() => handleSymptomToggle(symptom)}
                      className={`p-4 rounded-lg border-2 transition text-left font-medium ${
                        selectedSymptoms.includes(symptom)
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-200 text-gray-700 hover:border-primary"
                      }`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setStep("upload")}
                  className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition"
                >
                  Continue to Image Upload
                </button>
              </div>
            </div>
          )}

          {step === "upload" && (
            <div className="space-y-8">
              <button
                onClick={() => setStep("symptoms")}
                className="text-primary font-medium hover:opacity-80 transition"
              >
                ← Back
              </button>

              <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 md:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Upload Teeth Images
                </h2>

                <div className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block">
                      <div
                        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
                          uploadedImage
                            ? "border-accent bg-accent/5"
                            : "border-primary/20 hover:border-primary/40"
                        }`}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        {uploadedImage ? (
                          <div>
                            <CheckCircle className="w-12 h-12 text-accent mx-auto mb-3" />
                            <p className="font-semibold text-gray-900">
                              Image uploaded
                            </p>
                          </div>
                        ) : (
                          <div>
                            <Upload className="w-12 h-12 text-primary/40 mx-auto mb-3" />
                            <p className="font-semibold text-gray-900 mb-1">
                              Click to upload or drag
                            </p>
                            <p className="text-sm text-gray-600">
                              PNG, JPG up to 10MB
                            </p>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>

                  {/* Voice Input */}
                  <div>
                    <label className="block mb-3 font-semibold text-gray-900">
                      Or use voice notes
                    </label>
                    <button
                      onClick={() => setUsingMicrophone(!usingMicrophone)}
                      className={`w-full px-6 py-3 rounded-lg border-2 font-semibold transition flex items-center justify-center gap-2 ${
                        usingMicrophone
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-200 text-gray-700 hover:border-primary"
                      }`}
                    >
                      <Mic className="w-5 h-5" />
                      {usingMicrophone ? "Microphone Active" : "Use Microphone"}
                    </button>
                    {usingMicrophone && (
                      <p className="text-sm text-gray-600 mt-3 text-center">
                        Describe your symptoms in your language
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleAnalyze}
                    disabled={!uploadedImage && !usingMicrophone}
                    className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Analyze Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === "results" && (
            <div className="space-y-8">
              {/* Health Score Card */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border-2 border-primary/20 p-8 md:p-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-lg mb-6">
                    <div className="text-center">
                      <p className="text-5xl font-bold text-primary">
                        {healthScore}
                      </p>
                      <p className="text-sm text-gray-600">Health Score</p>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {healthScore >= 80
                      ? "Great News! 🎉"
                      : healthScore >= 50
                        ? "Attention Needed 💡"
                        : "Immediate Care Required 🚨"}
                  </h2>

                  <p className="text-gray-700 text-lg">
                    {healthScore >= 80
                      ? "Your dental health looks good. Continue with preventive care."
                      : healthScore >= 50
                        ? "Some issues detected. We recommend consulting a dentist soon."
                        : "Urgent attention required. Please consult a dentist immediately."}
                  </p>
                </div>
              </div>

              {/* Detailed Analysis */}
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 md:p-10">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Your Analysis
                </h3>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">
                      Pain Level: {painLevel}/5
                    </p>
                    <p className="text-sm text-gray-600">
                      {painLevels[painLevel - 1]?.label}
                    </p>
                  </div>

                  {selectedSymptoms.length > 0 && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-semibold text-gray-900 mb-2">
                        Reported Symptoms ({selectedSymptoms.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedSymptoms.map((symptom) => (
                          <span
                            key={symptom}
                            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Recommendations */}
              <div className="space-y-4">
                {healthScore < 50 && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-red-900 mb-2">
                          Emergency Recommendation
                        </p>
                        <p className="text-red-800 mb-4">
                          Please seek immediate dental care. Use our emergency
                          ambulance service if needed.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link
                            to="/ambulance"
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                          >
                            Book Ambulance
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                          <Link
                            to="/doctors"
                            className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition"
                          >
                            Emergency Dentist
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {needsConsultant && healthScore < 80 && (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-blue-900 mb-2">
                          Consult with a Dentist
                        </p>
                        <p className="text-blue-800 mb-4">
                          Get professional advice from licensed dentists. Available
                          globally 24/7.
                        </p>
                        <Link
                          to="/consult"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                        >
                          Start Consultation
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {healthScore >= 80 && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-green-900 mb-2">
                          Preventive Care Tips
                        </p>
                        <p className="text-green-800">
                          Keep maintaining your dental health! Brush twice daily,
                          floss regularly, and visit a dentist every 6 months.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Home Remedies */}
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 md:p-10">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Home className="w-6 h-6 text-primary" />
                  Home Remedies & Care
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {painLevel >= 3 && (
                    <div className="p-4 border-l-4 border-primary bg-primary/5 rounded">
                      <p className="font-semibold text-gray-900 mb-2">
                        For Pain Relief
                      </p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Warm salt water rinses (3-4 times daily)</li>
                        <li>• Turmeric paste mixed with milk</li>
                        <li>• Cold compress on cheeks</li>
                      </ul>
                    </div>
                  )}

                  {selectedSymptoms.includes("Bleeding gums") && (
                    <div className="p-4 border-l-4 border-accent bg-accent/5 rounded">
                      <p className="font-semibold text-gray-900 mb-2">
                        For Gum Health
                      </p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Coconut oil pulling</li>
                        <li>• Green tea mouthwash</li>
                        <li>• Gentle gum massage</li>
                      </ul>
                    </div>
                  )}

                  <div className="p-4 border-l-4 border-primary bg-primary/5 rounded">
                    <p className="font-semibold text-gray-900 mb-2">
                      Daily Prevention
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Brush twice daily (2 minutes)</li>
                      <li>• Floss before bed</li>
                      <li>• Limit sugary foods/drinks</li>
                    </ul>
                  </div>

                  <div className="p-4 border-l-4 border-accent bg-accent/5 rounded">
                    <p className="font-semibold text-gray-900 mb-2">
                      Professional Help
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Schedule check-up every 6 months</li>
                      <li>• Professional cleaning yearly</li>
                      <li>• Follow dentist's recommendations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setStep("initial");
                    setPainLevel(0);
                    setSelectedSymptoms([]);
                    setUploadedImage(null);
                  }}
                  className="flex-1 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition"
                >
                  Re-assess
                </button>
                <Link
                  to="/"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition"
                >
                  Back to Home
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
