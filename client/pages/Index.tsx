// client/src/pages/Index.tsx

import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Smile,
  Zap,
  MapPin,
  Users,
  Ambulance,
  BarChart3,
  Globe,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Shield,
  TrendingUp,
  Wifi,
  Mic,
  Lightbulb,
  Lock,
  Database,
  Radio,
  Cloud,
} from "lucide-react";

export default function Index() {
  const innovativeFeatures = [
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Fully Offline AI Detection",
      description:
        "AI detection runs entirely on-device without internet. Zero dependency on cloud services.",
      badge: "🚀 Core Tech",
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Multi-Language Voice Interaction",
      description:
        "Speak symptoms in Hindi, Marathi, Bengali, Tamil, or Telugu. Works completely offline without API dependency.",
      badge: "🗣️ Regional",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Explainable AI with Heatmaps",
      description:
        "Visual highlights show exactly which teeth are affected. Builds patient trust with transparent AI decisions.",
      badge: "👁️ Trust",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Health Worker Multi-Screening",
      description:
        "ASHA and Anganwadi workers can scan multiple people. Records saved offline for village health programs.",
      badge: "👥 Community",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Offline Database + Auto Sync",
      description:
        "All data saved locally. Automatically syncs to cloud when internet returns. Works seamlessly offline.",
      badge: "💾 Smart Sync",
    },
    {
      icon: <Radio className="w-8 h-8" />,
      title: "Solar-Powered Portable Kiosk",
      description:
        "Raspberry Pi + Camera setup runs on solar power. Deploy anywhere—schools, PHCs, villages, camps.",
      badge: "☀️ Portable",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "On-Device Privacy & Security",
      description:
        "Images and medical data never leave device unless you allow. Privacy-first architecture.",
      badge: "🔒 Privacy",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Govt Dentist Referral Pathway",
      description:
        "Offline list of nearest government hospitals. Can be aligned with PHC and district programs.",
      badge: "🏥 Healthcare",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Structured Triage Guidance",
      description:
        "For each detection: Home remedies, 'See dentist soon', or 'Emergency warning'. Prevents misdiagnosis.",
      badge: "⚠️ Smart Care",
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "On-Device Model Updates",
      description:
        "Download improved AI models when connected. Continuous accuracy improvement without reinstalling.",
      badge: "🧠 Learning",
    },
  ];

  const coreFeatures = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI Teeth Assessment",
      description:
        "Instant health analysis with explainable AI and visual heatmaps.",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Find Nearby Doctors",
      description:
        "Locate dentists in your region, integrate with PHC / govt facilities.",
    },
    {
      icon: <Ambulance className="w-8 h-8" />,
      title: "Emergency Ambulance",
      description: "Quick emergency access when you need immediate dental care.",
    },
  ];

  const useCases = [
    {
      title: "Rural Healthcare",
      description:
        "Deploy in villages and remote areas with limited connectivity. Health workers screen entire communities.",
      icon: "🏘️",
    },
    {
      title: "School Health Programs",
      description:
        "Portable kiosks for mass screening in schools. Records saved for each student securely.",
      icon: "🎓",
    },
    {
      title: "Health Camps & Events",
      description:
        "Offline-ready screening during camps. Multiple health workers can document patient records.",
      icon: "📋",
    },
    {
      title: "PHC & Clinics",
      description:
        "Integrate into government health centers or private clinics with a privacy-first approach.",
      icon: "🏥",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-white to-accent/10 pt-24 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full mb-8 border border-primary/30">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-primary">
                  AI-Powered Dental Healthcare
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Smart Dental Care,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {" "}
                  Works Offline
                </span>
              </h1>

              <p className="text-xl text-gray-700 mb-10 leading-relaxed max-w-xl">
                AI-based dental detection and triage that works without
                internet. Designed for rural health, PHCs, schools, and camps.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/assess"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary/90 text-white font-bold rounded-xl hover:shadow-lg transition transform hover:scale-105"
                >
                  Start Free Assessment <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition"
                >
                  Explore Features
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-300">
                <div>
                  <p className="text-3xl font-bold text-primary">50K+</p>
                  <p className="text-sm text-gray-600 font-medium">
                    Users Helped
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">24/7</p>
                  <p className="text-sm text-gray-600 font-medium">
                    Works Offline
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">100%</p>
                  <p className="text-sm text-gray-600 font-medium">
                    Privacy-First
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-96 md:h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-12 border border-primary/30 flex items-center justify-center h-96 overflow-hidden">
                <div className="text-center relative z-10">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mb-6 border-2 border-primary/30">
                    <Smile className="w-16 h-16 text-primary" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    Intelligent Dental AI
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Real-time triage, explainable results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovative Features */}
      <section id="features" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              10 Features That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Transform Dental Care
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Offline-first AI, privacy-by-design, and field-ready deployment
              for real healthcare impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {innovativeFeatures.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 rounded-2xl p-8 hover:border-primary hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                  {feature.badge}
                </div>

                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent w-0 group-hover:w-full transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SmileCare */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Why{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  SmileCare
                </span>{" "}
                is Different
              </h2>

              <div className="space-y-6">
                {[
                  "Works completely offline—no internet dependency.",
                  "Privacy-first design; data stays on-device by default.",
                  "Deployable in PHC, schools, camps, and rural settings.",
                  "Empowers health workers with mass-screening tools.",
                  "Explainable AI with visual heatmaps and triage.",
                  "Auto-sync data when connectivity is available.",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-700 font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-12 border-2 border-primary/30">
                <div className="space-y-8">
                  <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg">
                    <Shield className="w-8 h-8 text-primary mb-3" />
                    <p className="font-bold text-gray-900 mb-2">
                      Security & Privacy
                    </p>
                    <p className="text-sm text-gray-600">
                      Data encryption and privacy-first workflow for healthcare
                      environments.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg">
                    <Globe className="w-8 h-8 text-accent mb-3" />
                    <p className="font-bold text-gray-900 mb-2">
                      Multi-language Ready
                    </p>
                    <p className="text-sm text-gray-600">
                      Designed for Indian languages and regional deployment.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg">
                    <TrendingUp className="w-8 h-8 text-primary mb-3" />
                    <p className="font-bold text-gray-900 mb-2">
                      Real-World Outcomes
                    </p>
                    <p className="text-sm text-gray-600">
                      Focused on early detection, awareness, and timely
                      referrals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Real-World Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for rural health, school screening, PHCs, and outreach
              programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-10 border-2 border-gray-100 hover:border-primary hover:shadow-lg transition"
              >
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-gradient-to-r from-primary via-primary/90 to-accent text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Transform Dental Screening?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Start using AI-powered, offline-ready dental triage in your clinic,
            school, or community program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/assess"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-primary font-bold text-lg rounded-xl hover:bg-gray-100 transition"
            >
              Start Assessment <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              to="/consult"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white/10 transition"
            >
              Talk to a Dentist
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
