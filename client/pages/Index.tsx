import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Smile,
  Heart,
  Zap,
  MapPin,
  Users,
  Ambulance,
  BarChart3,
  MessageSquare,
  Globe,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Wifi,
  Mic,
  Lightbulb,
  Lock,
  Database,
  Radio,
  Smartphone,
  TrendingUp,
  Cloud,
  Shield,
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
        "Images and medical data never leave device unless you allow. HIPAA/ABDM privacy compliant.",
      badge: "🔒 Privacy",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Govt Dentist Referral Pathway",
      description:
        "Offline list of nearest government hospitals. Alerts sent to local PHC when network returns.",
      badge: "🏥 Healthcare",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
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
        "Instant health analysis with explainable AI and visual heatmaps",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Find Nearby Doctors",
      description:
        "Locate best dentists in your region with offline database support",
    },
    {
      icon: <Ambulance className="w-8 h-8" />,
      title: "Emergency Ambulance",
      description: "Quick emergency access when you need immediate dental care",
    },
  ];

  const useCases = [
    {
      title: "Rural Healthcare",
      description:
        "Deploy in villages and remote areas with zero electricity requirements. Health workers screen entire communities.",
      icon: "🏘️",
    },
    {
      title: "School Health Programs",
      description:
        "Solar-powered kiosks for mass screening in schools. Records saved for each student securely.",
      icon: "🎓",
    },
    {
      title: "Health Camps & Events",
      description:
        "Portable offline screening. Multiple health workers document patient records simultaneously.",
      icon: "📋",
    },
    {
      title: "PHC & Clinics",
      description:
        "Integrated into government health centers. Real-time patient data with privacy-first approach.",
      icon: "🏥",
    },
  ];

  return (
    <Layout>
      {/* Hero Section - Innovation Focused */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-white to-accent/10 pt-24 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
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
                Revolutionary AI detection that works without internet.
                Empowering healthcare workers, villages, and clinics with
                privacy-first technology.
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

              {/* Trust Indicators */}
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
                    No Internet Needed
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">100%</p>
                  <p className="text-sm text-gray-600 font-medium">
                    Private & Secure
                  </p>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
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
                    Works anywhere, offline-first
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Innovative Features - Grid Section */}
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
              Advanced AI detection, offline-first architecture, and
              privacy-by-design. Deploy anywhere — no cloud dependency required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {innovativeFeatures.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 rounded-2xl p-8 hover:border-primary hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Badge */}
                <div className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                  {feature.badge}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition">
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Accent Line */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent w-0 group-hover:w-full transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Built for Innovation & Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enterprise-grade AI meets grassroots healthcare accessibility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "🚀 Offline-First",
                description:
                  "AI model runs entirely on-device. Zero cloud dependency.",
              },
              {
                title: "🗣️ Regional Languages",
                description:
                  "Hindi, Marathi, Bengali, Tamil, Telugu voice support—offline.",
              },
              {
                title: "🔒 Privacy-By-Design",
                description:
                  "HIPAA/ABDM compliant. Data never leaves device without consent.",
              },
              {
                title: "☀️ Zero Electricity",
                description:
                  "Solar-powered portable kiosk for remote deployments.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-primary hover:shadow-lg transition"
              >
                <p className="text-3xl mb-3">{item.title.split(" ")[0]}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title.split(" ").slice(1).join(" ")}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Real-World Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Deployed in rural healthcare, schools, government clinics, and
              health camps
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

      {/* Core Features Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Essential Healthcare Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-10 border-2 border-gray-100 hover:border-primary hover:shadow-lg transition text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose SmileCare */}
      <section className="py-24 md:py-32 bg-white">
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
                  "Works completely offline—no internet required",
                  "HIPAA/ABDM compliant privacy protection",
                  "Deploy anywhere with solar-powered kiosk",
                  "Empowers health workers with multi-screening",
                  "Explainable AI with visual heatmaps",
                  "Automatic data sync when network returns",
                  "Open referral pathway to government healthcare",
                  "Community-first design for grassroots impact",
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
                      Enterprise Security
                    </p>
                    <p className="text-sm text-gray-600">
                      Military-grade encryption, HIPAA-compliant
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg">
                    <Globe className="w-8 h-8 text-accent mb-3" />
                    <p className="font-bold text-gray-900 mb-2">Global Reach</p>
                    <p className="text-sm text-gray-600">
                      Available in 8+ languages across regions
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg">
                    <TrendingUp className="w-8 h-8 text-primary mb-3" />
                    <p className="font-bold text-gray-900 mb-2">
                      Proven Results
                    </p>
                    <p className="text-sm text-gray-600">
                      4.9★ Rating | 50K+ Users | 95%+ Accuracy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section className="py-24 md:py-32 bg-gradient-to-r from-primary via-primary/90 to-accent text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Making Healthcare Accessible
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Reaching underserved communities with advanced technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Users Helped" },
              { number: "15+", label: "Languages Supported" },
              { number: "200+", label: "Villages Reached" },
              { number: "99%", label: "Data Privacy" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-5xl font-bold mb-2">{stat.number}</p>
                <p className="text-lg text-white/80 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Transform Dental Healthcare Today
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join the revolution. AI-powered dental detection that works offline,
            anywhere, anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/assess"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-primary to-primary/90 text-white font-bold text-lg rounded-xl hover:shadow-lg transition transform hover:scale-105"
            >
              Start Your Assessment <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              to="/doctors"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-primary text-primary font-bold text-lg rounded-xl hover:bg-primary/5 transition"
            >
              Find a Doctor
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
