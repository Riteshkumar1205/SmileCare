import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Download,
  Calendar,
  BarChart3,
  Printer,
  Share2,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface Report {
  id: number;
  date: string;
  healthScore: number;
  status: "Good" | "Caution" | "Critical";
  symptoms: string[];
  doctorRecommendation?: string;
}

const mockReports: Report[] = [
  {
    id: 1,
    date: "2025-01-15",
    healthScore: 85,
    status: "Good",
    symptoms: ["Tooth sensitivity"],
    doctorRecommendation:
      "Continue preventive care, use fluoride mouthwash daily",
  },
  {
    id: 2,
    date: "2025-01-08",
    healthScore: 62,
    status: "Caution",
    symptoms: ["Bleeding gums", "Bad breath"],
    doctorRecommendation:
      "Schedule appointment with Dr. Priya Singh for gum treatment",
  },
  {
    id: 3,
    date: "2024-12-28",
    healthScore: 75,
    status: "Good",
    symptoms: ["Mild pain"],
    doctorRecommendation: "Follow home remedies, monitor symptoms",
  },
];

export default function Reports() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Health Reports
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Track your dental health journey with detailed reports and
            recommendations
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 text-center">
              <p className="text-4xl font-bold text-primary mb-2">
                {mockReports.length}
              </p>
              <p className="text-gray-600 font-medium">Total Assessments</p>
            </div>
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 text-center">
              <p className="text-4xl font-bold text-accent mb-2">82</p>
              <p className="text-gray-600 font-medium">Average Health Score</p>
            </div>
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 text-center">
              <p className="text-4xl font-bold text-yellow-600 mb-2">1</p>
              <p className="text-gray-600 font-medium">Pending Consultation</p>
            </div>
          </div>

          {/* Health Score Trend */}
          <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Health Score Trend
            </h2>

            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 text-center">
              <p className="text-gray-600 mb-4">
                Your dental health is improving! Keep up the good habits.
              </p>
              <div className="flex items-end justify-center gap-4 h-40">
                {mockReports.map((report, index) => (
                  <div
                    key={report.id}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-12 bg-gradient-to-t from-primary to-accent rounded-t-lg transition hover:opacity-80"
                      style={{ height: `${report.healthScore * 1.2}px` }}
                    />
                    <span className="text-xs font-semibold text-gray-600">
                      {report.date.split("-")[2]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reports List */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Assessment History
          </h2>

          <div className="space-y-4">
            {mockReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden hover:border-primary hover:shadow-lg transition"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">📋</div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-gray-900">
                            Assessment Report
                          </h3>
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full ${
                              report.status === "Good"
                                ? "bg-green-100 text-green-700"
                                : report.status === "Caution"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {report.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {new Date(report.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                        <Download className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                        <Printer className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Health Score */}
                  <div className="flex items-center gap-4 mb-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">
                        {report.healthScore}
                      </p>
                      <p className="text-xs text-gray-600">Health Score</p>
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-primary to-accent h-3 rounded-full"
                          style={{ width: `${report.healthScore}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Symptoms */}
                  {report.symptoms.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-900 mb-2">
                        Reported Symptoms:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {report.symptoms.map((symptom) => (
                          <span
                            key={symptom}
                            className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendation */}
                  {report.doctorRecommendation && (
                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                      <p className="text-sm font-semibold text-blue-900 mb-1">
                        Doctor's Recommendation:
                      </p>
                      <p className="text-sm text-blue-800">
                        {report.doctorRecommendation}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex gap-3">
                    <Link
                      to="/consult"
                      className="flex-1 px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition text-center text-sm"
                    >
                      Schedule Consultation
                    </Link>
                    <button className="flex-1 px-4 py-2 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Export Section */}
          <div className="mt-12 bg-white rounded-2xl border-2 border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Export Your Reports
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition text-left">
                <p className="font-semibold text-gray-900 mb-1">PDF Format</p>
                <p className="text-sm text-gray-600">
                  Download all reports as PDF
                </p>
              </button>
              <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition text-left">
                <p className="font-semibold text-gray-900 mb-1">
                  Share with Doctor
                </p>
                <p className="text-sm text-gray-600">
                  Send to your healthcare provider
                </p>
              </button>
              <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition text-left">
                <p className="font-semibold text-gray-900 mb-1">Print</p>
                <p className="text-sm text-gray-600">
                  Print your complete health history
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
