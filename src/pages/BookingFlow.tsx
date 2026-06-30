import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import MapComponent from "../components/MapComponent";
import { useAuth } from "../context/AuthContext";
import {
  Check,
  X,
  Users,
  Briefcase,
  Filter,
  ChevronDown,
  ChevronUp,
  Phone,
  MessageCircle,
  User,
  Mail,
  PhoneCall,
  Star,
  ArrowRight,
  Shield,
  Car,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";

export default function BookingFlow({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [searchData, setSearchData] = useState<any>(null);

  // Custom form state
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState(
    "Test Booking (No Payment)",
  );

  // Confirmation
  const [bookingId, setBookingId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic filter states inside the booking flow
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPassengers, setSelectedPassengers] = useState<string>("any");
  const [sliderPrice, setSliderPrice] = useState<number>(500);
  const [debouncedPrice, setDebouncedPrice] = useState<number>(500);
  const [dbMinPrice, setDbMinPrice] = useState<number>(80);
  const [dbMaxPrice, setDbMaxPrice] = useState<number>(500);
  const [filteredVehicles, setFilteredVehicles] = useState<any[]>([]);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(true); // Collapsible on mobile

  const vehicleCategoriesMap = useMemo(
    () => [
      {
        key: "SEDAN",
        dbName: "Luxury Sedans",
        label: "Sedan",
        image: "/executive sedan.jpg",
      },
      {
        key: "SUV",
        dbName: "Premium SUVs",
        label: "SUV",
        image: "/Luxury suv.webp",
      },
      {
        key: "MPV",
        dbName: "Executive MPVs",
        label: "MPV",
        image: "/Premium MPV-1.jpg",
      },
      {
        key: "VAN",
        dbName: "VIP Minibuses",
        label: "VIP Minibus",
        image: "/VIP Minibus.jpg",
      },
    ],
    [],
  );

  useEffect(() => {
    const data = sessionStorage.getItem("bookingSearch");
    if (data) {
      const parsed = JSON.parse(data);
      setSearchData(parsed);
      setFilteredVehicles(parsed.results || []);
      if (parsed.searchParams && parsed.searchParams.passengers) {
        setSelectedPassengers(parsed.searchParams.passengers.toString());
      }
    } else if (!embedded) {
      navigate("/");
    }
  }, [navigate, embedded]);

  // Load dynamic min/max prices from the database categories
  useEffect(() => {
    async function loadMeta() {
      try {
        const response = await axios.get("/api/vehicles/meta");
        if (response.data) {
          const minVal = Math.round(response.data.minRate);
          const maxVal = Math.round(response.data.maxRate);
          setDbMinPrice(minVal);
          setDbMaxPrice(maxVal);
          setSliderPrice(maxVal);
          setDebouncedPrice(maxVal);
        }
      } catch (err) {
        console.error("Failed to load metadata inside BookingFlow:", err);
      }
    }
    loadMeta();
  }, []);

  // Debounce the slider rate to prevent flooding the server
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPrice(sliderPrice);
    }, 400);
    return () => clearTimeout(handler);
  }, [sliderPrice]);

  // Query PostgreSQL database in real-time on filter change
  useEffect(() => {
    if (!searchData) return;

    async function applyFilters() {
      setIsFiltering(true);
      try {
        const payload = {
          bookingType: searchData.searchParams.bookingType,
          date: searchData.searchParams.date,
          time: searchData.searchParams.time,
          duration: searchData.searchParams.duration,
          passengers:
            selectedPassengers === "any" ? 1 : parseInt(selectedPassengers),
          categories: selectedTypes,
          maxPrice: debouncedPrice,
        };

        const res = await axios.post("/api/vehicles/filter", payload);
        if (res.data && res.data.vehicles) {
          // Map to match internal structure with estimated total price
          const mapped = res.data.vehicles.map((v: any) => ({
            ...v,
            estimatedTotal: v.estimatedTotal,
          }));
          setFilteredVehicles(mapped);
        }
      } catch (err) {
        console.error("Failed to filter vehicles inside BookingFlow:", err);
      } finally {
        setIsFiltering(false);
      }
    }

    applyFilters();
  }, [debouncedPrice, selectedTypes, selectedPassengers, searchData]);

  useEffect(() => {
    if (user) {
      if (!customerEmail && user.email) setCustomerEmail(user.email);
      if (!customerName && user.customerProfile) {
        const first = user.customerProfile.first_name || "";
        const last = user.customerProfile.last_name || "";
        if (first || last) setCustomerName(`${first} ${last}`.trim());
      }
    }
  }, [user]);

  if (!searchData) return null;

  const handleVehicleSelect = async (vehicle: any) => {
    setSelectedVehicle(vehicle);

    if (!user) {
      let sessionId = localStorage.getItem("guestSessionId");
      if (!sessionId) {
        sessionId = "guest_" + Date.now();
        localStorage.setItem("guestSessionId", sessionId);
      }
      const payload = {
        ...searchData.searchParams,
        vehicleId: vehicle.id,
        totalPrice: vehicle.estimatedTotal,
      };
      await axios.post("/api/booking-drafts", {
        sessionId,
        searchParams: payload,
      });
      navigate("/login/customer", {
        state: { returnTo: "/customer/bookings" },
      });
    } else {
      setIsSubmitting(true);
      try {
        const payload = {
          ...searchData.searchParams,
          vehicleId: vehicle.id,
          customerName: customerName || user.customerProfile?.first_name || "",
          customerEmail: customerEmail || user.email || "",
          customerPhone:
            customerPhone || user.customerProfile?.phone_number || "",
          totalPrice: vehicle.estimatedTotal,
        };
        await axios.post("/api/booking/create", payload);
        navigate("/customer/bookings");
      } catch (e) {
        alert("Error creating booking");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const payload = {
        ...searchData.searchParams,
        vehicleId: selectedVehicle.id,
        customerName,
        customerEmail,
        customerPhone,
        specialRequests,
        totalPrice: selectedVehicle.estimatedTotal,
      };

      const res = await axios.post("/api/booking/create", payload);

      const sessionId = localStorage.getItem("guestSessionId");
      if (sessionId) {
        axios
          .post(`/api/booking-drafts/convert`, { sessionId })
          .catch(() => {});
      }

      if (!user) {
        navigate("/login/customer", {
          state: { returnTo: "/customer/bookings" },
        });
      } else {
        navigate("/customer/bookings");
      }
    } catch (err) {
      alert("Error processing booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...searchData.searchParams,
        vehicleId: selectedVehicle.id,
        customerName,
        customerEmail,
        customerPhone,
        specialRequests,
        totalPrice: selectedVehicle.estimatedTotal,
      };

      const res = await axios.post("/api/booking/create", payload);
      setBookingId(res.data.bookingId);

      const sessionId = localStorage.getItem("guestSessionId");
      if (sessionId) {
        axios
          .post(`/api/booking-drafts/convert`, { sessionId })
          .catch(() => {});
      }

      setStep(4);
    } catch (err) {
      alert("Error processing booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerClass = embedded
    ? "w-full font-['Manrope']"
    : "min-h-screen bg-gray-50 pt-20 pb-12 font-['Manrope']";

  const innerContainerClass = embedded
    ? "w-full"
    : step === 1
      ? "max-w-6xl mx-auto px-4"
      : "max-w-4xl mx-auto px-4";

  const handleVehicleTypeSelect = (dbName: string) => {
    setSelectedTypes((prev) =>
      prev.includes(dbName)
        ? prev.filter((t) => t !== dbName)
        : [...prev, dbName],
    );
  };

  return (
    <div className={containerClass}>
      <div className={innerContainerClass}>
        {!embedded && (
          <div className="mb-8">
            {/* Premium page title */}
            <h1 className="text-3xl font-bold text-slate-900 mb-5" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Complete Your Booking
            </h1>
            {/* Premium stepper */}
            <div className="flex items-center gap-0">
              {[{ n: 1, label: "Vehicle" }, { n: 2, label: "Details" }, { n: 3, label: "Payment" }, { n: 4, label: "Confirm" }].map((s, i, arr) => (
                <React.Fragment key={s.n}>
                  <div className="flex items-center gap-2">
                    <div
                      className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300"
                      style={{
                        background: step >= s.n ? "#E9A23B" : step === s.n - 1 ? "#f3f4f6" : "#f3f4f6",
                        color: step >= s.n ? "#0a1128" : "#9ca3af",
                        boxShadow: step === s.n ? "0 0 0 3px rgba(233,162,59,0.25)" : "none",
                      }}
                    >
                      {step > s.n ? <Check className="w-3.5 h-3.5" /> : s.n}
                    </div>
                    <span
                      className="text-xs font-semibold hidden sm:block"
                      style={{ color: step >= s.n ? "#0a1128" : "#9ca3af" }}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <div
                      className="flex-1 mx-2 h-[2px] min-w-[20px] rounded-full transition-all duration-500"
                      style={{ background: step > s.n ? "#E9A23B" : "#e5e7eb" }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            {/* Selected Category Banner */}
            {searchData.searchParams.selectedCategory && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl shadow-sm border border-amber-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 mb-1">
                      Selected Category
                    </h2>
                    <p className="text-amber-700 font-semibold text-xl">
                      {searchData.searchParams.selectedCategory}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="tel:+919840167444"
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      Call Now
                    </a>
                    <a
                      href="https://wa.me/919840167444"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl font-semibold transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-bold mb-2 text-slate-800">
                  Trip Summary
                </h2>
                <p className="text-gray-600 text-sm">
                  <strong>From:</strong>{" "}
                  {searchData.searchParams.bookingType === "airport" &&
                  searchData.searchParams.pickupType === "Arrival"
                    ? searchData.searchParams.airport
                    : searchData.searchParams.pickup || "To be specified"}{" "}
                  <br />
                  <strong>To:</strong>{" "}
                  {searchData.searchParams.bookingType === "airport" &&
                  searchData.searchParams.pickupType === "Departure"
                    ? searchData.searchParams.airport
                    : searchData.searchParams.destination || "As directed"}{" "}
                  <br />
                  <strong>Date:</strong>{" "}
                  {new Date(searchData.searchParams.date).toLocaleDateString()}{" "}
                  at {searchData.searchParams.time} <br />
                  <strong>Type:</strong>{" "}
                  {searchData.searchParams.bookingType.toUpperCase()}
                </p>
                {searchData.tripMetadata &&
                  searchData.tripMetadata.travelDistance && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl grid grid-cols-3 gap-2 text-center border border-gray-100">
                      <div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase">
                          Distance
                        </div>
                        <div className="text-sm font-bold text-slate-800">
                          {searchData.tripMetadata.travelDistance}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase">
                          Est. Time
                        </div>
                        <div className="text-sm font-bold text-slate-800">
                          {searchData.tripMetadata.travelTime}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase">
                          ETA
                        </div>
                        <div className="text-sm font-bold text-slate-800">
                          {searchData.tripMetadata.eta}
                        </div>
                      </div>
                    </div>
                  )}
              </div>
              {(searchData.searchParams.pickupCoords ||
                searchData.searchParams.destinationCoords) && (
                <MapComponent
                  pickupCoords={searchData.searchParams.pickupCoords}
                  destinationCoords={searchData.searchParams.destinationCoords}
                  className="h-48 rounded-xl"
                />
              )}
            </div>

            {/* Concierge-Style Dual Bento Grid (Filters Left, Vehicles Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Filter Sidebar */}
              <div className="lg:col-span-4 bg-white p-6 border border-gray-100 rounded-2xl shadow-sm space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-amber-500" />
                    <h3 className="font-bold text-slate-800 text-sm">
                      Refine Your Selection
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedTypes([]);
                      setSelectedPassengers("any");
                      setSliderPrice(dbMaxPrice);
                    }}
                    className="text-xs text-gray-400 font-semibold hover:text-amber-500"
                  >
                    Reset
                  </button>
                </div>

                {/* Vehicle Types (Selectable Cards) */}
                <div className="space-y-3">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Vehicle Types
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {vehicleCategoriesMap.map((cat) => {
                      const isSelected = selectedTypes.includes(cat.dbName);
                      return (
                        <button
                          key={cat.key}
                          onClick={() => handleVehicleTypeSelect(cat.dbName)}
                          className={`flex flex-col items-center justify-center p-3 text-center border rounded-xl text-xs font-bold transition-all overflow-hidden ${
                            isSelected
                              ? "border-amber-500 bg-amber-50/40 text-amber-600"
                              : "border-gray-100 bg-gray-50/30 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <div className="w-full h-16 mb-2 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={cat.image}
                              alt={cat.label}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Seating Capacity Filter */}
                <div className="space-y-3 pt-2">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Seating Capacity
                  </span>
                  <div className="space-y-1.5">
                    {[
                      { key: "any", label: "Any Seating" },
                      { key: "4", label: "4+ Passengers (Sedans/SUVs)" },
                      { key: "7", label: "7+ Passengers (MPVs)" },
                      { key: "13", label: "13+ Passengers (Minibuses)" },
                    ].map((opt) => {
                      const isSelected = selectedPassengers === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => setSelectedPassengers(opt.key)}
                          className={`w-full text-left px-3 py-2 border rounded-lg text-xs font-semibold flex justify-between items-center transition-all ${
                            isSelected
                              ? "border-l-4 border-l-amber-500 border-amber-200 bg-amber-50/10 text-slate-800 font-bold"
                              : "border-gray-100 bg-white hover:bg-gray-50 text-gray-500"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {isSelected && (
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range Slider */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-end text-xs font-bold">
                    <span className="text-gray-400 uppercase tracking-wider text-[10px]">
                      Max Hourly Rate
                    </span>
                    <span className="text-slate-800 font-extrabold font-mono text-sm">
                      S${sliderPrice}/hr
                    </span>
                  </div>
                  <input
                    type="range"
                    min={dbMinPrice}
                    max={dbMaxPrice}
                    value={sliderPrice}
                    onChange={(e) => setSliderPrice(parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                    <span>S${dbMinPrice}</span>
                    <span>S${dbMaxPrice}</span>
                  </div>
                </div>

                {isFiltering && (
                  <div className="text-[10px] text-amber-600 font-bold text-center bg-amber-50 py-1.5 rounded-lg animate-pulse">
                    Filtering live database...
                  </div>
                )}
              </div>

              {/* Right Column: Dynamic Available Vehicles Grid */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-800">
                    Available Vehicles ({filteredVehicles.length})
                  </h2>
                  <span className="text-xs text-gray-400 font-mono">
                    Live PostgreSQL connection
                  </span>
                </div>

                {filteredVehicles.length === 0 ? (
                  <div className="bg-white p-12 rounded-2xl text-center border border-gray-100 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-3">
                      <X className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">
                      No Matching Vehicles
                    </h4>
                    <p className="text-gray-400 text-xs max-w-sm mb-4">
                      No vehicles currently match your filters. Try clearing
                      some selections or increasing the maximum hourly rate
                      slider.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedTypes([]);
                        setSelectedPassengers("any");
                        setSliderPrice(dbMaxPrice);
                      }}
                      className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg"
                    >
                      Clear Selections
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredVehicles.map((v: any) => (
                      <article
                        key={v.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow"
                      >
                        <div className="relative h-44 overflow-hidden bg-gray-100">
                          <img
                            src={v.image}
                            alt={v.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h2 className="text-navy font-bold text-base leading-tight">
                                {v.name}
                              </h2>
                              <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mt-1">
                                {v.type}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-amber-600 text-xl font-extrabold">
                                S${v.estimatedTotal}
                              </span>
                              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                                Estimated Total
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mb-5 p-3 bg-gray-50/50 rounded-lg border border-gray-100/50 text-[11px] text-gray-500 font-medium">
                            <div className="flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 text-amber-500" />
                              <span>{v.capacity} Passengers</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                              <span>{v.luggage || 4} Luggage</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleVehicleSelect(v)}
                            disabled={isSubmitting}
                            className="mt-auto w-full bg-[#E9A23B] text-black font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
                          >
                            {isSubmitting && selectedVehicle?.id === v.id
                              ? "Processing..."
                              : "Select Vehicle"}
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Main Form Card */}
            <form
              onSubmit={handleCustomerSubmit}
              className="lg:col-span-2 rounded-2xl overflow-hidden shadow-[0_24px_50px_-12px_rgba(0,0,0,0.12)] border border-gray-100/80"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {/* Dark Navy Header */}
              <div
                className="px-8 py-6 flex items-center gap-4"
                style={{ background: "linear-gradient(135deg, #0a1128 0%, #111a3a 100%)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(233,162,59,0.15)", border: "1px solid rgba(233,162,59,0.3)" }}
                >
                  <User className="w-5 h-5" style={{ color: "#E9A23B" }} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Passenger Details</h2>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>We'll use this info to confirm your booking</p>
                </div>
              </div>

              {/* Form Body */}
              <div className="bg-white p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <User className="w-4 h-4 text-gray-300" />
                      </div>
                      <input
                        required
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="John Smith"
                        className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm text-slate-800 font-medium outline-none transition-all duration-200"
                        style={{ boxShadow: "none" }}
                        onFocus={(e) => { e.target.style.borderColor = "#E9A23B"; e.target.style.boxShadow = "0 0 0 3px rgba(233,162,59,0.12)"; }}
                        onBlur={(e) => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Mail className="w-4 h-4 text-gray-300" />
                      </div>
                      <input
                        required
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm text-slate-800 font-medium outline-none transition-all duration-200"
                        style={{ boxShadow: "none" }}
                        onFocus={(e) => { e.target.style.borderColor = "#E9A23B"; e.target.style.boxShadow = "0 0 0 3px rgba(233,162,59,0.12)"; }}
                        onBlur={(e) => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <PhoneCall className="w-4 h-4 text-gray-300" />
                      </div>
                      <input
                        required
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+65 9123 4567"
                        className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm text-slate-800 font-medium outline-none transition-all duration-200"
                        style={{ boxShadow: "none" }}
                        onFocus={(e) => { e.target.style.borderColor = "#E9A23B"; e.target.style.boxShadow = "0 0 0 3px rgba(233,162,59,0.12)"; }}
                        onBlur={(e) => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
                      />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                      Special Requests
                      <span className="ml-1.5 text-gray-400 normal-case font-medium">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Star className="w-4 h-4 text-gray-300" />
                      </div>
                      <input
                        type="text"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Child seat, wheelchair access…"
                        className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm text-slate-800 font-medium outline-none transition-all duration-200"
                        style={{ boxShadow: "none" }}
                        onFocus={(e) => { e.target.style.borderColor = "#E9A23B"; e.target.style.boxShadow = "0 0 0 3px rgba(233,162,59,0.12)"; }}
                        onBlur={(e) => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
                      />
                    </div>
                  </div>
                </div>

                {/* Trust badge */}
                <div
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl mb-7"
                  style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
                >
                  <Shield className="w-4 h-4 flex-shrink-0" style={{ color: "#16a34a" }} />
                  <p className="text-xs font-semibold" style={{ color: "#15803d" }}>
                    Your personal data is encrypted and never shared with third parties.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl text-sm transition-all duration-200 hover:opacity-90 disabled:opacity-50 active:scale-[0.99]"
                    style={{ background: "linear-gradient(135deg, #E9A23B 0%, #d4882a 100%)", color: "#0a1128" }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Continue to Payment
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Right: Booking Summary Sidebar */}
            <div className="space-y-4" style={{ fontFamily: "'Manrope', sans-serif" }}>
              {/* Selected Vehicle Card */}
              {selectedVehicle && (
                <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.1)]">
                  <div className="relative h-36 overflow-hidden bg-gray-100">
                    <img
                      src={selectedVehicle.image}
                      alt={selectedVehicle.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,17,40,0.7) 0%, transparent 60%)" }} />
                    <div className="absolute bottom-3 left-4 right-4">
                      <p className="text-white font-bold text-sm leading-tight">{selectedVehicle.name}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>{selectedVehicle.type}</p>
                    </div>
                  </div>
                  <div className="bg-white p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Estimated Total</span>
                      <span className="text-lg font-extrabold" style={{ color: "#E9A23B" }}>S${selectedVehicle.estimatedTotal}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <Users className="w-3.5 h-3.5" style={{ color: "#E9A23B" }} />
                        {selectedVehicle.capacity} pax
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <Briefcase className="w-3.5 h-3.5" style={{ color: "#E9A23B" }} />
                        {selectedVehicle.luggage || 4} bags
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Trip Summary Card */}
              {searchData.searchParams && (
                <div
                  className="rounded-2xl p-5 border border-gray-100 bg-white shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)] space-y-3.5"
                >
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Trip Summary</p>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(233,162,59,0.12)" }}>
                      <MapPin className="w-3.5 h-3.5" style={{ color: "#E9A23B" }} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">From</p>
                      <p className="text-xs text-slate-700 font-semibold leading-snug">
                        {searchData.searchParams.bookingType === "airport" && searchData.searchParams.pickupType === "Arrival"
                          ? searchData.searchParams.airport
                          : searchData.searchParams.pickup || "To be specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(10,17,40,0.06)" }}>
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">To</p>
                      <p className="text-xs text-slate-700 font-semibold leading-snug">
                        {searchData.searchParams.bookingType === "airport" && searchData.searchParams.pickupType === "Departure"
                          ? searchData.searchParams.airport
                          : searchData.searchParams.destination || "As directed"}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-3 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gray-300" />
                      <span className="text-xs text-slate-600 font-semibold">
                        {new Date(searchData.searchParams.date).toLocaleDateString("en-SG", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-gray-300" />
                      <span className="text-xs text-slate-600 font-semibold">{searchData.searchParams.time}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Secure checkout badge */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium pt-1">
                <Shield className="w-3.5 h-3.5" />
                Secure & encrypted checkout
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <form
            onSubmit={handlePaymentSubmit}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-bold mb-6 text-slate-800">Payment</h2>
            <div className="bg-gray-50 p-6 rounded-xl mb-8 flex items-center justify-between border border-gray-100">
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">
                  Total to Pay
                </p>
                <h3 className="text-3xl font-extrabold text-slate-900">
                  S${selectedVehicle?.estimatedTotal}
                </h3>
              </div>
              <div className="text-right text-sm text-gray-600 font-medium">
                {selectedVehicle?.name} <br />
                {searchData.searchParams.date &&
                  new Date(searchData.searchParams.date).toLocaleDateString()}
              </div>
            </div>

            <div className="mb-8 space-y-4">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Select Payment Method
              </label>
              {[
                "Credit Card (Stripe)",
                "PayNow",
                "Google Pay",
                "Apple Pay",
                "Test Booking (No Payment)",
              ].map((method) => (
                <label
                  key={method}
                  className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === method ? "border-primary bg-blue-600/5" : "border-gray-200 hover:border-primary/50"}`}
                >
                  <input
                    type="radio"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-primary"
                  />
                  <span className="ml-3 font-semibold text-slate-700">
                    {method}
                  </span>
                </label>
              ))}
            </div>

            {paymentMethod === "Credit Card (Stripe)" && (
              <div className="mb-8 grid grid-cols-2 gap-4 border border-gray-200 p-6 rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
                  <span className="font-bold text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm text-sm">
                    Secure Payment Gateway Integration Placeholder
                  </span>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Card Number
                  </label>
                  <input
                    disabled
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
                    value="**** **** **** ****"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Expiry
                  </label>
                  <input
                    disabled
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
                    value="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    CVC
                  </label>
                  <input
                    disabled
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
                    value="***"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#E9A23B] text-black font-bold py-3 rounded-xl hover:opacity-90 disabled:opacity-50"
              >
                {isSubmitting
                  ? "Processing..."
                  : paymentMethod === "Test Booking (No Payment)"
                    ? "Confirm Booking (Test)"
                    : `Pay S$${selectedVehicle?.estimatedTotal} & Confirm`}
              </button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-gray-500 mb-8 border-b border-gray-100 pb-8">
              Thank you, {customerName}. Your driver is scheduled.
            </p>

            <div className="text-left bg-gray-50 p-6 rounded-xl mb-8 max-w-sm mx-auto border border-gray-100">
              <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                Booking Reference
              </div>
              <div className="text-xl font-mono font-bold text-slate-800 mb-4">
                {bookingId}
              </div>

              <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                Vehicle Details
              </div>
              <div className="text-sm font-semibold text-slate-700 mb-4">
                {selectedVehicle?.name}
              </div>

              <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                Total Paid
              </div>
              <div className="text-sm font-semibold text-green-600">
                S${selectedVehicle?.estimatedTotal} via {paymentMethod}
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-8">
              We have sent a confirmation email to{" "}
              <strong>{customerEmail}</strong>.
            </p>

            <button
              onClick={() => navigate("/customer/dashboard")}
              className="bg-slate-900 text-white font-bold py-3 px-8 rounded-xl hover:opacity-90"
            >
              Go to My Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
