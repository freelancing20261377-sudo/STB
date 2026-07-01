import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Car } from "lucide-react";
import Navbar from "../components/Navbar";
import SignInPromptModal from "../components/SignInPromptModal";
import { useAuth } from "../context/AuthContext";

const ALL_FLEETS = [
  {
    category: "Executive Sedan",
    examples: "Toyota Camry, Hyundai Sonata, Honda Accord",
    image: "/executive sedan.jpg",
  },
  {
    category: "Luxury Sedan",
    examples: "Mercedes-Benz E-Class, BMW 5 Series, Audi A6",
    image:
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop",
  },
  {
    category: "Executive SUV",
    examples: "Toyota Harrier, Hyundai Santa Fe",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2071&auto=format&fit=crop",
  },
  {
    category: "Luxury SUV",
    examples: "Mercedes GLE, BMW X5, Audi Q7",
    image: "/Luxury suv.webp",
  },
  {
    category: "Premium MPV",
    examples: "Toyota Alphard, Toyota Vellfire",
    image: "/Premium MPV-1.jpg",
  },
  {
    category: "Luxury MPV",
    examples: "Lexus LM, Mercedes V-Class",
    image: "/fleets/Lexus-LM.jpg",
  },
  {
    category: "Executive Van",
    examples: "Mercedes Vito, Hyundai Staria",
    image: "/fleets/Merceds vito.jpeg",
  },
  {
    category: "VIP Minibus",
    examples: "Toyota Coaster, Mercedes Sprinter",
    image: "/VIP Minibus.jpg",
  },
  {
    category: "Executive Coach",
    examples: "20–30 Seater Coach",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop",
  },
  {
    category: "Luxury Coach",
    examples: "Premium 40–45 Seater Coach",
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop",
  },
  {
    category: "Electric Luxury Fleet",
    examples: "Tesla Model Y, BMW i5, Mercedes EQE",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop",
  },
  {
    category: "Wedding & Events",
    examples: "Rolls-Royce Ghost, Bentley Flying Spur",
    image: "/fleets/Rolls royce wedding.webp",
  },
  {
    category: "Corporate Chauffeur",
    examples: "Mercedes E-Class, BMW 5 Series",
    image:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2036&auto=format&fit=crop",
  },
  {
    category: "VIP Limousine",
    examples: "Mercedes S-Class, BMW 7 Series, Rolls-Royce Ghost",
    image: "/fleets/VIP LIMOSHINE.jpeg",
  },
];

export default function AllFleets() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showSignInModal, setShowSignInModal] = useState(false);

  useEffect(() => {
    if (user) {
      const pending = sessionStorage.getItem("pendingBookingSearch");
      if (pending) {
        sessionStorage.setItem("bookingSearch", pending);
        sessionStorage.removeItem("pendingBookingSearch");
        navigate("/booking");
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl mb-4">
            Our Complete Fleet Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Explore our comprehensive range of premium vehicles. Whether you
            need a simple transfer, a luxurious wedding car, or a high-capacity
            coach, we have the perfect transport solution for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_FLEETS.map((fleet, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col group"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={fleet.image}
                  alt={fleet.category}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                  {fleet.category}
                </h3>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Example Vehicles
                </h4>
                <p className="text-gray-700 font-medium">{fleet.examples}</p>
                <div className="mt-6 mt-auto">
                  <button
                    onClick={() => {
                      const searchData = {
                        searchParams: {
                          bookingType: "Transport",
                          pickup: "Current Location",
                          destination: "Selected Destination",
                          date: new Date().toISOString().split("T")[0],
                          time: "12:00",
                          passengers: "4",
                        },
                        results: [],
                      };
                      if (!user) {
                        sessionStorage.setItem("pendingBookingSearch", JSON.stringify(searchData));
                        setShowSignInModal(true);
                      } else {
                        sessionStorage.setItem("bookingSearch", JSON.stringify(searchData));
                        navigate("/booking");
                      }
                    }}
                    className="block w-full text-center py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Book Category
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <SignInPromptModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        title="Sign in to Book"
        subtitle="Please sign in or create an account to proceed with your booking."
        icon={<Car className="w-8 h-8 fill-white text-white" />}
      />
    </div>
  );
}
