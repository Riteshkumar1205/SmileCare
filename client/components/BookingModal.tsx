import React, { useState } from "react";
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorName: string;
  doctorSpecialty: string;
  doctorFee: number;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  reason: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  doctorName,
  doctorSpecialty,
  doctorFee,
}: BookingModalProps) {
  const [step, setStep] = useState<"booking" | "confirmation">("booking");
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    reason: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.date &&
      formData.time
    ) {
      setStep("confirmation");
    }
  };

  const handleClose = () => {
    setStep("booking");
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      reason: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];
  
  // Available time slots
  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary to-accent text-white p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {step === "booking" ? "Book Appointment" : "Booking Confirmed"}
          </h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-white/20 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === "booking" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Doctor Info */}
              <div className="bg-primary/5 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">Booking with</p>
                <p className="font-bold text-gray-900">{doctorName}</p>
                <p className="text-sm text-gray-600">{doctorSpecialty}</p>
                <p className="text-sm font-semibold text-primary mt-2">
                  Fee: ₹{doctorFee}
                </p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={today}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
                  required
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Preferred Time
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
                  required
                >
                  <option value="">Select time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Reason for Visit (Optional)
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Brief description of your dental concern..."
                  rows={2}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-lg hover:shadow-lg transition"
              >
                Confirm Booking
              </button>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Booking Confirmed!
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 my-4 text-left space-y-3">
                <div>
                  <p className="text-xs text-gray-600">Doctor</p>
                  <p className="font-semibold text-gray-900">{doctorName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Date & Time</p>
                  <p className="font-semibold text-gray-900">
                    {formData.date} at {formData.time}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Confirmation sent to</p>
                  <p className="font-semibold text-gray-900">{formData.email}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                You'll receive a confirmation email and SMS with all details.
              </p>
              <button
                onClick={handleClose}
                className="w-full px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
