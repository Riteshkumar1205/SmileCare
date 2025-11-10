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
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI Teeth Assessment",
      description: "Upload your teeth scan and get instant health analysis",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Find Nearby Doctors",
      description: "Locate best dentists in your region using GPS",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Doctor Comparison",
      description: "Compare doctors by ratings, experience, and fees",
    },
    {
      icon: <Ambulance className="w-8 h-8" />,
      title: "Emergency Ambulance",
      description: "Book ambulance with real-time tracking and pricing",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Health Reports",
      description: "Detailed dental health reports and history",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Global Consultants",
      description: "Chat with licensed dentists worldwide 24/7",
    },
  ];

  const benefits = [
    "Accessible in rural and remote areas",
    "Support for regional languages with voice input",
    "Affordable alternative to emergency visits",
    "Home remedies and preventive care tips",
    "Real-time health tracking and recommendations",
    "Transparent pricing for all services",
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-accent/5 pt-20 pb-20 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Your Dental Health Companion
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Smile Bright, Live
                <span className="text-primary"> Healthy</span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                SmileCare brings comprehensive dental healthcare to your
                fingertips. From pain assessment to finding the best dentists in
                your area, we've got your smile covered.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/assess"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition transform hover:scale-105"
                >
                  Assess Your Teeth <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/doctors"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary/5 transition"
                >
                  Find a Doctor
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-2xl font-bold text-gray-900">50K+</p>
                  <p className="text-sm text-gray-600">Users Helped</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">4.9★</p>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">24/7</p>
                  <p className="text-sm text-gray-600">Support</p>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative h-96 md:h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 border border-primary/20 flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-4">
                    <Smile className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-gray-600 font-medium">
                    Smart Dental Healthcare
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Dental Care Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              All the tools you need for better oral health and timely medical
              intervention
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white border-2 border-gray-100 rounded-xl hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Assess",
                description: "Upload or scan your teeth images",
              },
              {
                step: "02",
                title: "Analyze",
                description: "Get AI-powered health analysis",
              },
              {
                step: "03",
                title: "Connect",
                description: "Find and consult best doctors",
              },
              {
                step: "04",
                title: "Recover",
                description: "Follow recommendations and track progress",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-8 text-center border-2 border-primary/20 h-full">
                  <div className="text-4xl font-bold text-primary/20 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Why Choose SmileCare?
              </h2>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                <Globe className="w-12 h-12 text-primary mb-4" />
                <p className="font-semibold text-gray-900">Global Network</p>
                <p className="text-sm text-gray-600 mt-1">Doctors worldwide</p>
              </div>

              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                <Heart className="w-12 h-12 text-accent mb-4" />
                <p className="font-semibold text-gray-900">Health First</p>
                <p className="text-sm text-gray-600 mt-1">
                  Your wellness focus
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                <Zap className="w-12 h-12 text-primary mb-4" />
                <p className="font-semibold text-gray-900">Lightning Fast</p>
                <p className="text-sm text-gray-600 mt-1">Instant results</p>
              </div>

              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                <Users className="w-12 h-12 text-accent mb-4" />
                <p className="font-semibold text-gray-900">Trusted Care</p>
                <p className="text-sm text-gray-600 mt-1">50K+ patients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Start Your Dental Health Journey Today
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join thousands of users who have improved their oral health with
            SmileCare
          </p>
          <Link
            to="/assess"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition transform hover:scale-105"
          >
            Get Started Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
