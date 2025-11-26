// client/pages/Consult.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  MessageSquare,
  Video,
  Phone,
  Clock,
  Star,
  Send,
  ArrowRight,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
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
    language: "English, Hindi",
    availability: "Available now",
    rating: 4.9,
    responseTime: 2,
    image: "👩‍⚕️",
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    language: "Hindi, Marathi",
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
  const [callDuration, setCallDuration] = useState(0);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (consultationStarted && (chatMode === "call" || chatMode === "video")) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [consultationStarted, chatMode]);

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSelectConsultant = (id: number) => {
    setSelectedConsultant(id);
    setConsultationStarted(true);
    setCallDuration(0);
    setMessages([
      {
        id: 1,
        text: "Hello! How can I help you today with your dental concerns?",
        sender: "doctor",
      },
    ]);
  };

  const generateAIResponse = (message: string) => {
    const lower = message.toLowerCase();
    if (lower.includes("pain") || lower.includes("ache")) {
      return "I understand you're experiencing pain. Please describe the location and intensity. Meanwhile, try warm salt-water rinses and avoid very hot or cold foods.";
    }
    if (lower.includes("sensitivity")) {
      return "Tooth sensitivity is common. Use a soft toothbrush and sensitivity toothpaste, and avoid acidic foods. If it continues for more than a week, a check-up is recommended.";
    }
    if (lower.includes("bleeding") || lower.includes("gum")) {
      return "Bleeding gums may indicate gum disease. Brush gently along the gumline and floss daily. If bleeding continues for more than 7 days, visit a dentist or PHC.";
    }
    if (lower.includes("cavity") || lower.includes("decay")) {
      return "Cavities require professional treatment. Avoid sweets and very cold items, and book an appointment for filling or further care.";
    }
    return "Thank you for sharing. Based on your description, I would still recommend a dental check-up for a detailed examination.";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const msg = inputMessage.trim();
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, text: msg, sender: "user" },
    ]);
    setInputMessage("");

    setTimeout(() => {
      const reply = generateAIResponse(msg);
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: reply, sender: "doctor" },
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
              {/* Chat area */}
              <div className="lg:col-span-2 bg-white rounded-2xl border-2 border-gray-100 flex flex-col h-96">
                <div className="border-b border-gray-200 p-6 flex items-center justify-between bg-gradient-to-r from-primary/5 to-accent/5">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-4xl">{consultant.image}</div>
                    <div>
                      <h2 className="font-bold text-gray-900">
                        {consultant.name}
                      </h2>
                      <p className="text-xs text-gray-600">
                        {consultant.language}
                      </p>
                    </div>
                  </div>

                  {(chatMode === "call" || chatMode === "video") && (
                    <div className="text-lg font-bold text-primary px-4 py-2 bg-white rounded-lg">
                      {formatCallDuration(callDuration)}
                    </div>
                  )}

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
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${
                        m.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          m.sender === "user"
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="border-t border-gray-200 p-4 flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSendMessage()
                    }
                    placeholder="Type your question..."
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
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
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Session Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>Approx. duration: 10–15 min</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>Rating: {consultant.rating}★</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl border-2 border-blue-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-3">
                    Dentist&apos;s Recommendations
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ Brush twice a day with fluoride toothpaste</li>
                    <li>✓ Avoid very sugary snacks and drinks</li>
                    <li>✓ Rinse after meals and before sleep</li>
                    <li>✓ Schedule an in-person check-up if pain persists</li>
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setConsultationStarted(false);
                    setSelectedConsultant(null);
                  }}
                  className="w-full px-4 py-3 border-2 border-red-500 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition"
                >
                  End Session
                </button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Consultant list view
  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Consult with Dentists
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Connect with licensed dentists via secure chat, audio, or video.
          </p>
        </div>
      </section>

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
                <p className="text-sm text-gray-600 mb-2">{c.language}</p>
                <div className="flex items-center justify-center gap-2 text-sm mb-4">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{c.availability}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm mb-6">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{c.rating}★</span>
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
        </div>
      </section>
    </Layout>
  );
}
