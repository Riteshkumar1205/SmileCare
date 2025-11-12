import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  MessageSquare,
  Video,
  Phone,
  Clock,
  Globe,
  Star,
  Send,
  ArrowRight,
} from "lucide-react";

interface Consultant {
  id: number;
  name: string;
  language: string;
  availability: string;
  rating: number;
  responseTime: number;
  image: string;
}

const consultants: Consultant[] = [
  {
    id: 1,
    name: "Dr. Emily Johnson",
    language: "English",
    availability: "Available now",
    rating: 4.9,
    responseTime: 2,
    image: "👨‍⚕️",
  },
  {
    id: 2,
    name: "Dr. Hans Mueller",
    language: "English, German",
    availability: "Available in 5 min",
    rating: 4.8,
    responseTime: 3,
    image: "👨‍⚕️",
  },
  {
    id: 3,
    name: "Dr. Maria Garcia",
    language: "English, Spanish",
    availability: "Available now",
    rating: 4.9,
    responseTime: 1,
    image: "👩‍⚕️",
  },
];

export default function Consult() {
  const [selectedConsultant, setSelectedConsultant] = useState<number | null>(
    null,
  );
  const [chatMode, setChatMode] = useState<"chat" | "video" | "call">("chat");
  const [messages, setMessages] = useState<
    Array<{ id: number; text: string; sender: "user" | "doctor" }>
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const [consultationStarted, setConsultationStarted] = useState(false);

  const handleSelectConsultant = (id: number) => {
    setSelectedConsultant(id);
    setConsultationStarted(true);
    setMessages([
      {
        id: 1,
        text: "Hello! How can I help you today with your dental concerns?",
        sender: "doctor",
      },
    ]);
  };

  const generateAIResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    // AI responses based on keywords
    if (
      lowerMessage.includes("pain") ||
      lowerMessage.includes("hurt") ||
      lowerMessage.includes("ache")
    ) {
      return "I understand you're experiencing pain. Can you describe the location and intensity? This will help me provide better guidance. Meanwhile, try rinsing with warm salt water.";
    }
    if (
      lowerMessage.includes("sensitivity") ||
      lowerMessage.includes("sensitive")
    ) {
      return "Tooth sensitivity is common. Avoid acidic foods and beverages. Use a soft-bristled toothbrush and sensitivity toothpaste. If it persists, we should schedule an in-person examination.";
    }
    if (
      lowerMessage.includes("bleed") ||
      lowerMessage.includes("bleeding") ||
      lowerMessage.includes("gum")
    ) {
      return "Bleeding gums may indicate gum disease or gingivitis. Improve your oral hygiene - brush twice daily and floss. If bleeding continues for more than a week, an in-person visit is recommended.";
    }
    if (
      lowerMessage.includes("cavity") ||
      lowerMessage.includes("decay") ||
      lowerMessage.includes("black spot")
    ) {
      return "Cavities require professional treatment. I recommend scheduling an appointment for a proper examination and filling. Avoid very hot/cold foods in the meantime.";
    }
    if (
      lowerMessage.includes("bad breath") ||
      lowerMessage.includes("halitosis")
    ) {
      return "Bad breath can stem from poor oral hygiene, diet, or underlying conditions. Brush your tongue, floss daily, and use mouthwash. Increase water intake. If the problem persists, we should investigate further.";
    }
    if (lowerMessage.includes("whitening") || lowerMessage.includes("white")) {
      return "Professional whitening treatments are available. For best results, we recommend in-office whitening which provides faster and longer-lasting results than over-the-counter options.";
    }
    if (lowerMessage.includes("cost") || lowerMessage.includes("price")) {
      return "The cost depends on the treatment required. Let's first understand your condition through this consultation, then I can provide you with an accurate estimate.";
    }

    // Default response
    return "Thank you for sharing that information. Based on what you've described, I recommend we schedule an in-person visit for a thorough examination. In the meantime, maintain good oral hygiene and avoid trigger foods.";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage.trim();
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        text: userMsg,
        sender: "user",
      },
    ]);

    setInputMessage("");

    // Simulate AI doctor response with slight delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMsg);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: aiResponse,
          sender: "doctor",
        },
      ]);
    }, 800);
  };

  const consultant = consultants.find((c) => c.id === selectedConsultant);

  if (consultationStarted && consultant) {
    return (
      <Layout>
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Chat Area */}
              <div className="lg:col-span-2 bg-white rounded-2xl border-2 border-gray-100 flex flex-col h-96">
                {/* Header */}
                <div className="border-b border-gray-200 p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{consultant.image}</div>
                    <div>
                      <h2 className="font-bold text-gray-900">
                        {consultant.name}
                      </h2>
                      <div className="text-sm text-green-600 flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-600 rounded-full" />
                        <span>Connected</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setChatMode("chat")}
                      className={`p-2 rounded-lg transition ${
                        chatMode === "chat"
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <MessageSquare className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setChatMode("call")}
                      className={`p-2 rounded-lg transition ${
                        chatMode === "call"
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Phone className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setChatMode("video")}
                      className={`p-2 rounded-lg transition ${
                        chatMode === "video"
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Video className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.sender === "user"
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="border-t border-gray-200 p-6 flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your question..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Session Info */}
                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Session Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>Duration: 12:34</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>Rating: {consultant.rating}★</span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-blue-50 rounded-2xl border-2 border-blue-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-3">
                    Dentist's Recommendations
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ Regular brushing twice daily</li>
                    <li>✓ Use fluoride mouthwash</li>
                    <li>✓ Avoid sugary foods</li>
                    <li>✓ Schedule check-up in 3 months</li>
                  </ul>
                </div>

                {/* End Session */}
                <button className="w-full px-4 py-3 border-2 border-red-500 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition">
                  End Session
                </button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Consult with Dentists Worldwide
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Connect with licensed dentists globally via text, video, or call.
            Available 24/7 in your language.
          </p>
        </div>
      </section>

      {/* Consultants */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {consultants.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl border-2 border-gray-100 p-6 text-center hover:border-primary hover:shadow-lg transition"
              >
                <div className="text-6xl mb-4">{c.image}</div>
                <h3 className="font-bold text-gray-900 mb-2">{c.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{c.language}</p>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-gray-700">{c.availability}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-gray-700">{c.rating}★</span>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectConsultant(c.id)}
                  className="w-full px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition"
                >
                  Start Consultation
                </button>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🌍",
                title: "Global Network",
                desc: "Dentists from all around the world",
              },
              {
                icon: "⏰",
                title: "24/7 Available",
                desc: "Get help whenever you need it",
              },
              {
                icon: "💬",
                title: "Multiple Languages",
                desc: "Speak in your preferred language",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center border-2 border-gray-100"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
