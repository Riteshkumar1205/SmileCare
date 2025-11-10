import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  MapPin,
  Star,
  Clock,
  DollarSign,
  MessageSquare,
  Heart,
  Filter,
  Search,
  Phone,
  Users,
} from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  distance: number;
  rating: number;
  reviews: number;
  fee: number;
  experience: number;
  successRate: number;
  availability: "Available now" | "Today" | "Tomorrow";
  image: string;
  hospital: string;
  languages: string[];
  verified: boolean;
}

const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Priya Singh",
    specialty: "Cosmetic & General Dentistry",
    distance: 2.3,
    rating: 4.9,
    reviews: 287,
    fee: 500,
    experience: 12,
    successRate: 98,
    availability: "Available now",
    image: "👩‍⚕️",
    hospital: "Smile Dental Clinic",
    languages: ["English", "Hindi"],
    verified: true,
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    specialty: "Orthodontics",
    distance: 4.1,
    rating: 4.8,
    reviews: 215,
    fee: 800,
    experience: 15,
    successRate: 96,
    availability: "Today",
    image: "👨‍⚕️",
    hospital: "Advanced Dental Care",
    languages: ["English", "Hindi", "Punjabi"],
    verified: true,
  },
  {
    id: 3,
    name: "Dr. Meera Patel",
    specialty: "Root Canal & Endodontics",
    distance: 5.2,
    rating: 4.7,
    reviews: 178,
    fee: 600,
    experience: 10,
    successRate: 97,
    availability: "Today",
    image: "👩‍⚕️",
    hospital: "Root Care Specialists",
    languages: ["English", "Gujarati"],
    verified: true,
  },
  {
    id: 4,
    name: "Dr. Vikram Sharma",
    specialty: "Pediatric Dentistry",
    distance: 3.8,
    rating: 4.6,
    reviews: 342,
    fee: 400,
    experience: 8,
    successRate: 95,
    availability: "Tomorrow",
    image: "👨‍⚕️",
    hospital: "Kids Dental World",
    languages: ["English", "Hindi"],
    verified: true,
  },
];

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [sortBy, setSortBy] = useState<"distance" | "rating" | "fee">(
    "distance",
  );
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);

  const specialties = [
    "All",
    "General Dentistry",
    "Cosmetic & General Dentistry",
    "Orthodontics",
    "Pediatric Dentistry",
    "Root Canal & Endodontics",
  ];

  const filteredAndSortedDoctors = doctors
    .filter((doc) => {
      const matchesSearch = doc.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesSpecialty =
        selectedSpecialty === "All" ||
        doc.specialty.includes(selectedSpecialty);
      return matchesSearch && matchesSpecialty;
    })
    .sort((a, b) => {
      if (sortBy === "distance") return a.distance - b.distance;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "fee") return a.fee - b.fee;
      return 0;
    });

  const selectedDoctorData = doctors.find((d) => d.id === selectedDoctor);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find & Compare Dentists
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Find the best dentist near you with ratings, pricing, and real
            patient reviews
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Filters & Search */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 sticky top-20">
                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Search by Name
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Doctor name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* Specialty Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Specialty
                  </label>
                  <div className="space-y-2">
                    {specialties.map((specialty) => (
                      <button
                        key={specialty}
                        onClick={() => setSelectedSpecialty(specialty)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition font-medium text-sm ${
                          selectedSpecialty === specialty
                            ? "bg-primary text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div className="pb-6 border-b border-gray-200 mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
                  >
                    <option value="distance">Nearest First</option>
                    <option value="rating">Highest Rated</option>
                    <option value="fee">Lowest Fee</option>
                  </select>
                </div>

                {/* Location Sharing */}
                <button className="w-full px-4 py-2 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Use My Location
                </button>
              </div>
            </div>

            {/* Doctors List */}
            <div className="lg:col-span-2">
              {filteredAndSortedDoctors.length === 0 ? (
                <div className="bg-white rounded-2xl border-2 border-gray-100 p-12 text-center">
                  <p className="text-gray-600">
                    No doctors found matching your criteria
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAndSortedDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => setSelectedDoctor(doctor.id)}
                      className={`bg-white rounded-xl border-2 p-6 cursor-pointer transition ${
                        selectedDoctor === doctor.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-100 hover:border-primary"
                      }`}
                    >
                      <div className="flex gap-4">
                        {/* Doctor Image */}
                        <div className="text-5xl">{doctor.image}</div>

                        {/* Doctor Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">
                                {doctor.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {doctor.specialty}
                              </p>
                            </div>
                            {doctor.verified && (
                              <div className="flex items-center gap-1 px-2 py-1 bg-accent/10 rounded-full">
                                <Star className="w-4 h-4 text-accent fill-accent" />
                                <span className="text-xs font-semibold text-accent">
                                  Verified
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span>
                                <strong>{doctor.rating}</strong> (
                                {doctor.reviews})
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span>{doctor.distance} km</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <DollarSign className="w-4 h-4 text-accent" />
                              <span>₹{doctor.fee}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <Clock className="w-4 h-4 text-primary" />
                              <span>{doctor.experience}y exp</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">
                              {doctor.availability}
                            </span>
                            {doctor.languages.map((lang) => (
                              <span
                                key={lang}
                                className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded"
                              >
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="hidden md:flex items-center">
                          <MessageSquare className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Selected Doctor Details */}
          {selectedDoctorData && (
            <div className="mt-12 bg-white rounded-2xl border-2 border-gray-100 p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Doctor Profile */}
                <div className="md:col-span-1 text-center">
                  <div className="text-9xl mb-4">
                    {selectedDoctorData.image}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedDoctorData.name}
                  </h2>
                  <p className="text-gray-600 mb-4 font-semibold">
                    {selectedDoctorData.specialty}
                  </p>
                  <p className="text-gray-600 mb-6">
                    {selectedDoctorData.hospital}
                  </p>

                  <div className="flex flex-col gap-3">
                    <Link
                      to="/consult"
                      className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-5 h-5" />
                      Consult Now
                    </Link>
                    <button className="w-full px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5" />
                      Call Doctor
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="md:col-span-2">
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 text-center">
                      <p className="text-4xl font-bold text-yellow-700 mb-2">
                        {selectedDoctorData.rating}
                      </p>
                      <p className="text-sm text-yellow-600">
                        Rating ({selectedDoctorData.reviews} reviews)
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                      <p className="text-4xl font-bold text-green-700 mb-2">
                        {selectedDoctorData.successRate}%
                      </p>
                      <p className="text-sm text-green-600">Success Rate</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                      <p className="text-4xl font-bold text-blue-700 mb-2">
                        {selectedDoctorData.experience}
                      </p>
                      <p className="text-sm text-blue-600">Years Experience</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                      <p className="text-3xl font-bold text-purple-700 mb-2">
                        ₹{selectedDoctorData.fee}
                      </p>
                      <p className="text-sm text-purple-600">
                        Consultation Fee
                      </p>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-bold text-gray-900 mb-4">
                      Why Choose This Doctor?
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <span className="text-gray-700">
                          {selectedDoctorData.successRate}% patient success rate
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="text-gray-700">
                          {selectedDoctorData.reviews}+ satisfied patients
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <span className="text-gray-700">
                          {selectedDoctorData.experience} years of dental
                          expertise
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="text-gray-700">
                          Just {selectedDoctorData.distance}km away
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
