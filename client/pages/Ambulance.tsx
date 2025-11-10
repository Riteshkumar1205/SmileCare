import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Ambulance as AmbulanceIcon,
  MapPin,
  Phone,
  Clock,
  DollarSign,
  Star,
  AlertCircle,
  CheckCircle,
  Navigation,
  Users,
  ArrowRight,
} from "lucide-react";

interface AmbulanceService {
  id: number;
  name: string;
  distance: number;
  eta: number;
  price: number;
  rating: number;
  reviews: number;
  type: "Basic" | "Advanced" | "ICU";
  drivers: number;
  successRate: number;
  image: string;
}

const ambulances: AmbulanceService[] = [
  {
    id: 1,
    name: "Emergency Plus Ambulance",
    distance: 1.5,
    eta: 6,
    price: 800,
    rating: 4.9,
    reviews: 342,
    type: "Advanced",
    drivers: 2,
    successRate: 99,
    image: "🚑",
  },
  {
    id: 2,
    name: "CareFirst Ambulance Service",
    distance: 2.8,
    eta: 11,
    price: 650,
    rating: 4.7,
    reviews: 256,
    type: "Advanced",
    drivers: 2,
    successRate: 98,
    image: "🚑",
  },
  {
    id: 3,
    name: "City Emergency Response",
    distance: 3.2,
    eta: 13,
    price: 500,
    rating: 4.5,
    reviews: 198,
    type: "Basic",
    drivers: 1,
    successRate: 95,
    image: "🚑",
  },
  {
    id: 4,
    name: "MedMax ICU Ambulance",
    distance: 4.1,
    eta: 16,
    price: 1200,
    rating: 4.8,
    reviews: 89,
    type: "ICU",
    drivers: 3,
    successRate: 100,
    image: "🚑",
  },
];

export default function Ambulance() {
  const [selectedAmbulance, setSelectedAmbulance] = useState<number | null>(null);
  const [bookingStep, setBookingStep] = useState<"select" | "confirm" | "success">(
    "select"
  );
  const [emergencyLevel, setEmergencyLevel] = useState<"normal" | "urgent" | "critical">(
    "urgent"
  );

  const selectedData = ambulances.find((a) => a.id === selectedAmbulance);

  const handleBook = () => {
    setBookingStep("confirm");
  };

  const handleConfirm = () => {
    setBookingStep("success");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-orange-50 py-12 md:py-16 border-b-4 border-red-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
            Emergency Ambulance Service
          </h1>
          <p className="text-lg text-red-700 max-w-2xl">
            Fast, reliable ambulance services for dental emergencies. Real-time
            tracking and transparent pricing.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {bookingStep === "select" && (
            <>
              {/* Emergency Level */}
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 md:p-10 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Emergency Level
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: "normal",
                      label: "Planned Visit",
                      desc: "Scheduled appointment",
                    },
                    {
                      id: "urgent",
                      label: "Urgent",
                      desc: "Need help soon",
                    },
                    {
                      id: "critical",
                      label: "Critical",
                      desc: "Life-threatening",
                    },
                  ].map((level) => (
                    <button
                      key={level.id}
                      onClick={() =>
                        setEmergencyLevel(level.id as "normal" | "urgent" | "critical")
                      }
                      className={`p-4 rounded-lg border-2 transition text-left font-semibold ${
                        emergencyLevel === level.id
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-red-500"
                      }`}
                    >
                      <p className="text-gray-900 mb-1">{level.label}</p>
                      <p className="text-sm text-gray-600">{level.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ambulance Options */}
              <div className="space-y-4 mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Available Ambulances Nearby
                </h2>

                {ambulances.map((ambulance) => (
                  <div
                    key={ambulance.id}
                    onClick={() => setSelectedAmbulance(ambulance.id)}
                    className={`bg-white rounded-xl border-2 p-6 cursor-pointer transition ${
                      selectedAmbulance === ambulance.id
                        ? "border-red-500 bg-red-50"
                        : "border-gray-100 hover:border-red-500"
                    }`}
                  >
                    <div className="flex gap-4 items-start">
                      <div className="text-5xl">{ambulance.image}</div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              {ambulance.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-semibold px-2 py-1 bg-red-100 text-red-700 rounded">
                                {ambulance.type}
                              </span>
                              {ambulance.successRate === 100 && (
                                <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded">
                                  Perfect Record
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 text-sm">
                          <div>
                            <p className="text-gray-600 text-xs">Distance</p>
                            <p className="font-bold text-gray-900">
                              {ambulance.distance}km
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-xs">ETA</p>
                            <p className="font-bold text-gray-900">
                              {ambulance.eta}min
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-xs">Price</p>
                            <p className="font-bold text-gray-900">
                              ₹{ambulance.price}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-xs">Rating</p>
                            <p className="font-bold text-yellow-600">
                              ★ {ambulance.rating}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-xs">Staff</p>
                            <p className="font-bold text-gray-900">
                              {ambulance.drivers} driver{ambulance.drivers > 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-gray-600">
                          {ambulance.reviews} customer reviews • {ambulance.successRate}%
                          success rate
                        </p>
                      </div>

                      <div className="hidden md:block">
                        <Navigation className="w-6 h-6 text-red-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Book Button */}
              <button
                onClick={handleBook}
                disabled={!selectedAmbulance}
                className="w-full px-6 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                Book Ambulance Now
              </button>
            </>
          )}

          {bookingStep === "confirm" && selectedData && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 md:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Confirm Your Booking
                </h2>

                <div className="space-y-6">
                  {/* Service Details */}
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Service Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ambulance Service</span>
                        <span className="font-semibold text-gray-900">
                          {selectedData.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type</span>
                        <span className="font-semibold text-gray-900">
                          {selectedData.type}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated Time</span>
                        <span className="font-semibold text-gray-900">
                          {selectedData.eta} minutes
                        </span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-red-200">
                        <span className="text-gray-600">Total Price</span>
                        <span className="font-bold text-red-600 text-lg">
                          ₹{selectedData.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">What You Get</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Real-time Tracking
                          </p>
                          <p className="text-xs text-gray-600">
                            Track ambulance location
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Trained Staff
                          </p>
                          <p className="text-xs text-gray-600">
                            {selectedData.drivers} professional paramedics
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Highly Rated
                          </p>
                          <p className="text-xs text-gray-600">
                            {selectedData.rating}★ ({selectedData.reviews} reviews)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Safe Transport
                          </p>
                          <p className="text-xs text-gray-600">
                            {selectedData.successRate}% safety record
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Confirmation Alert */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-sm text-blue-800">
                      An ambulance will be dispatched to your location immediately.
                      Please ensure your location access is enabled.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setBookingStep("select");
                    setSelectedAmbulance(null);
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                >
                  Confirm Booking
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {bookingStep === "success" && selectedData && (
            <div className="text-center space-y-8">
              <div className="bg-white rounded-2xl border-2 border-green-200 p-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Ambulance Booked!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your ambulance is on the way. The driver will arrive in approximately{" "}
                  <strong>{selectedData.eta} minutes</strong>.
                </p>

                <div className="bg-green-50 rounded-xl p-6 mb-8 text-left">
                  <h3 className="font-bold text-gray-900 mb-4">Booking Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking ID</span>
                      <span className="font-semibold font-mono">AMB-2025-1849</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service</span>
                      <span className="font-semibold">{selectedData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount Paid</span>
                      <span className="font-semibold">₹{selectedData.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Driver Rating</span>
                      <span className="font-semibold">★ {selectedData.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <button className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    Call Driver
                  </button>
                  <button className="flex-1 px-6 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition flex items-center justify-center gap-2">
                    <Navigation className="w-5 h-5" />
                    Track Live
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-8">
                  You'll receive updates via SMS and in-app notifications
                </p>

                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition"
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
