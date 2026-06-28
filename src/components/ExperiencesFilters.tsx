import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import { tours } from "../data/tours";
import {
  Check,
  X,
  Users,
  Briefcase,
  DollarSign,
  Calendar,
  MapPin,
  Clock,
  Heart,
} from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import SignInPromptModal from "./SignInPromptModal";

interface Vehicle {
  id: string;
  make: string;
  model: string;
  name: string;
  type: string;
  capacity: number;
  luggage: number;
  licensePlate: string;
  image: string;
  hourlyRate: number;
  estimatedTotal: number;
  operatorName: string;
}

export default function ExperiencesFilters() {
  const navigate = useNavigate();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingTourTitle, setPendingTourTitle] = useState<string | undefined>();

  const handleWishlistClick = (tourId: string, tourTitle: string) => {
    if (!user) {
      setPendingTourTitle(tourTitle);
      setShowSignInModal(true);
      return;
    }
    toggleWishlist(tourId);
  };

  // Settings & Configuration
  const [isMultiSelect, setIsMultiSelect] = useState<boolean>(true);

  // Dynamic filter state from database
  const [dbMinPrice, setDbMinPrice] = useState<number>(80);
  const [dbMaxPrice, setDbMaxPrice] = useState<number>(500);

  // Selected filters state
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPassengers, setSelectedPassengers] = useState<string>("any");
  const [sliderPrice, setSliderPrice] = useState<number>(500);
  const [debouncedPrice, setDebouncedPrice] = useState<number>(500);

  // Results state
  const [vehiclesList, setVehiclesList] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasApplied, setHasApplied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Seamless Booking Dialog State
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [selectedVehicleToBook, setSelectedVehicleToBook] =
    useState<Vehicle | null>(null);
  const [pickup, setPickup] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<string>("");
  const [bookingTime, setBookingTime] = useState<string>("12:00");
  const [bookingDuration, setBookingDuration] = useState<string>("3");

  // Map icons and technical DB category names
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

  // Fetch price metadata dynamically on mount
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
        console.error("Failed to load metadata:", err);
      }
    }
    loadMeta();
  }, []);

  // Debounce the slider to avoid excessive API requests
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPrice(sliderPrice);
    }, 400);
    return () => clearTimeout(handler);
  }, [sliderPrice]);

  // Load vehicles automatically on debounced filter change or apply trigger
  const fetchFilteredVehicles = async (isManualClick: boolean = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const payload = {
        bookingType: "hourly",
        passengers:
          selectedPassengers === "any" ? 1 : parseInt(selectedPassengers),
        categories: selectedTypes,
        maxPrice: debouncedPrice,
      };

      const res = await axios.post("/api/vehicles/filter", payload);
      if (res.data && res.data.vehicles) {
        setVehiclesList(res.data.vehicles);
      }
      if (isManualClick) {
        setHasApplied(true);
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch matching vehicles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto fetch when debounced price, vehicle type or passengers change
  useEffect(() => {
    fetchFilteredVehicles(false);
  }, [debouncedPrice, selectedTypes, selectedPassengers]);

  const handleVehicleTypeSelect = (dbName: string) => {
    if (isMultiSelect) {
      setSelectedTypes((prev) =>
        prev.includes(dbName)
          ? prev.filter((t) => t !== dbName)
          : [...prev, dbName],
      );
    } else {
      setSelectedTypes((prev) => (prev.includes(dbName) ? [] : [dbName]));
    }
  };

  const handleClearAll = () => {
    setSelectedTypes([]);
    setSelectedPassengers("any");
    setSliderPrice(dbMaxPrice);
    setDebouncedPrice(dbMaxPrice);
    setHasApplied(false);
  };

  const handleRemoveChip = (
    type: "type" | "passenger" | "price",
    value?: string,
  ) => {
    if (type === "type" && value) {
      setSelectedTypes((prev) => prev.filter((t) => t !== value));
    } else if (type === "passenger") {
      setSelectedPassengers("any");
    } else if (type === "price") {
      setSliderPrice(dbMaxPrice);
    }
  };

  // Active filter chips computation
  const activeChips = useMemo(() => {
    const list = [];
    selectedTypes.forEach((t) => {
      const matched = vehicleCategoriesMap.find((item) => item.dbName === t);
      list.push({
        id: `type-${t}`,
        label: matched ? matched.label : t,
        type: "type" as const,
        value: t,
      });
    });
    if (selectedPassengers !== "any") {
      list.push({
        id: "passengers",
        label: `${selectedPassengers}+ Passengers`,
        type: "passenger" as const,
      });
    }
    if (sliderPrice < dbMaxPrice) {
      list.push({
        id: "price",
        label: `Max S$${sliderPrice}/hr`,
        type: "price" as const,
      });
    }
    return list;
  }, [
    selectedTypes,
    selectedPassengers,
    sliderPrice,
    dbMaxPrice,
    vehicleCategoriesMap,
  ]);

  // Seamless booking triggers
  const handleOpenBooking = (vehicle: Vehicle) => {
    setSelectedVehicleToBook(vehicle);
    // Set a default date of tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingDate(tomorrow.toISOString().split("T")[0]);
    setShowBookingModal(true);
  };

  const handleConfirmBookingSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !bookingDate || !bookingTime) {
      alert("Please fill in pickup details");
      return;
    }

    try {
      const searchParams = {
        bookingType: "hourly",
        pickup,
        destination: destination || "As directed",
        date: bookingDate,
        time: bookingTime,
        duration: parseInt(bookingDuration),
        passengers: selectedVehicleToBook ? selectedVehicleToBook.capacity : 4,
      };

      // Query live API search to get exact results
      const response = await axios.post("/api/search", searchParams);

      // Inject specifically our selected vehicle with accurate total price based on hourly rate
      const results = response.data.vehicles.map((v: any) => {
        if (
          v.id === selectedVehicleToBook?.id ||
          v.name === selectedVehicleToBook?.name
        ) {
          return {
            ...v,
            id: selectedVehicleToBook.id,
            estimatedTotal:
              selectedVehicleToBook.hourlyRate * parseInt(bookingDuration),
          };
        }
        return v;
      });

      // Write session storage
      sessionStorage.setItem(
        "bookingSearch",
        JSON.stringify({
          searchParams,
          results:
            results.length > 0
              ? results
              : [
                  {
                    id: selectedVehicleToBook?.id,
                    name: selectedVehicleToBook?.name,
                    type: selectedVehicleToBook?.type,
                    capacity: selectedVehicleToBook?.capacity,
                    luggage: selectedVehicleToBook?.luggage || 4,
                    image: selectedVehicleToBook?.image,
                    estimatedTotal:
                      (selectedVehicleToBook?.hourlyRate || 150) *
                      parseInt(bookingDuration),
                  },
                ],
          tripMetadata: {
            travelDistance: response.data.travelDistance || null,
            travelTime: response.data.travelTime || null,
            eta: response.data.eta || null,
          },
        }),
      );

      setShowBookingModal(false);
      navigate("/customer/new-booking");
    } catch (err) {
      console.error(err);
      alert("Failed to initialize booking session. Please try again.");
    }
  };

  return (
    <div
      className="w-full max-w-7xl mx-auto px-4 md:px-10"
      id="refine-selection-root"
    >
      <main className="mb-16 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div data-purpose="header-text">
            <p className="section-subtitle mb-2">OUR SELECTION</p>
            <h1 className="text-3xl font-bold text-brand-navy">
              Featured Singapore Experiences
            </h1>
          </div>
          <a
            className="text-brand-teal font-semibold text-sm flex items-center hover:underline mt-4 md:mt-0"
            href="#tours"
          >
            View All Tours
            <svg
              className="h-4 w-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 5l7 7m0 0l-7 7m7-7H3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </a>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tours.map((tour) => (
              <article
                key={tour.slug}
                className="experience-card flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transform transition duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="w-full h-48 overflow-hidden relative">
                  <ImageWithFallback
                    alt={tour.title}
                    className="w-full h-full object-cover"
                    src={tour.coverImage || tour.heroImage}
                  />
                  {/* Wishlist heart button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleWishlistClick(tour.id, tour.title);
                    }}
                    title={isWishlisted(tour.id) ? "Remove from wishlist" : "Add to wishlist"}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow transition-transform hover:scale-110 active:scale-95"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isWishlisted(tour.id)
                          ? "fill-rose-500 text-rose-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="card-title text-lg mb-3 font-bold text-brand-navy">
                    {tour.title}
                  </h3>
                  <p className="card-desc mb-6 text-sm text-gray-600 line-clamp-3">
                    {tour.subtitle}
                  </p>
                  <div className="mt-auto">
                    <Link
                      to={`/tours/${tour.slug}`}
                      className="details-btn block w-full text-center hover:opacity-90 transition-opacity bg-brand-light text-brand-navy border border-gray-200 font-bold py-3 rounded-lg text-sm"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </main>

      <section className="w-full pt-10 border-t border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl font-bold text-brand-navy">
              Refine Your Selection
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Configure your transport requirements to discover available
              professional vehicles
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Toggle Configuration (Single vs Multi select) */}
            <div className="flex items-center bg-gray-100 p-1 rounded-lg text-xs mr-2 border border-gray-200">
              <button
                onClick={() => {
                  setIsMultiSelect(false);
                  setSelectedTypes((prev) => prev.slice(0, 1));
                }}
                className={`px-2.5 py-1 rounded font-bold transition-all ${!isMultiSelect ? "bg-white text-brand-navy shadow-sm" : "text-gray-500 hover:text-brand-navy"}`}
              >
                Single-Select
              </button>
              <button
                onClick={() => setIsMultiSelect(true)}
                className={`px-2.5 py-1 rounded font-bold transition-all ${isMultiSelect ? "bg-white text-brand-navy shadow-sm" : "text-gray-500 hover:text-brand-navy"}`}
              >
                Multi-Select
              </button>
            </div>

            <button
              onClick={handleClearAll}
              className="text-brand-navy text-xs font-bold underline decoration-2 underline-offset-4 hover:opacity-80 transition-opacity"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Dynamic Filter Dashboard */}
        <div className="filter-section p-6 md:p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Vehicle Type Filter */}
            <div data-purpose="vehicle-type-filter">
              <p className="filter-label mb-4 text-xs font-bold text-gray-400 tracking-wider">
                VEHICLE TYPE
              </p>
              <div className="grid grid-cols-2 gap-3">
                {vehicleCategoriesMap.map((cat) => {
                  const isSelected = selectedTypes.includes(cat.dbName);
                  return (
                    <button
                      key={cat.key}
                      onClick={() => handleVehicleTypeSelect(cat.dbName)}
                      className={`vehicle-option flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 overflow-hidden ${
                        isSelected
                          ? "border-amber-500 bg-amber-50/40 text-amber-600 font-bold"
                          : "border-gray-100 hover:bg-gray-50 text-gray-600"
                      }`}
                      aria-pressed={isSelected}
                    >
                      <div
                        className={`w-full h-16 mb-2 rounded-lg overflow-hidden flex-shrink-0 transition-transform duration-300 ${isSelected ? "scale-105 ring-2 ring-amber-500 ring-offset-1" : ""}`}
                      >
                        <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider mt-1">
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Passengers Filter */}
            <div data-purpose="passenger-filter">
              <p className="filter-label mb-4 text-xs font-bold text-gray-400 tracking-wider">
                PASSENGERS
              </p>
              <div className="space-y-2.5">
                {[
                  { key: "any", label: "Any Seating Capacity" },
                  { key: "4", label: "4+ Passengers (Sedans / SUVs)" },
                  { key: "7", label: "7+ Passengers (Executive MPVs)" },
                  { key: "13", label: "13+ Passengers (VIP Minibuses)" },
                ].map((opt) => {
                  const isSelected = selectedPassengers === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => setSelectedPassengers(opt.key)}
                      className={`passenger-option w-full text-left p-3.5 px-5 rounded-xl border font-bold text-xs transition-all flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        isSelected
                          ? "border-l-4 border-l-amber-500 border-amber-200 bg-amber-50/20 text-brand-navy"
                          : "border-gray-100 bg-white hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-amber-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hourly Rate Filter */}
            <div className="flex flex-col" data-purpose="hourly-rate-filter">
              <p className="filter-label mb-3 text-xs font-bold text-gray-400 tracking-wider uppercase">
                Max Hourly Rate (SGD)
              </p>
              <div className="text-xl font-extrabold text-brand-navy flex items-center gap-1 mb-6">
                <span>S${sliderPrice}</span>
                <span className="text-xs text-gray-400 font-medium font-mono">
                  / hour max
                </span>
              </div>

              <div className="px-2 mb-6 relative">
                <input
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer range-slider accent-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  max={dbMaxPrice}
                  min={dbMinPrice}
                  type="range"
                  value={sliderPrice}
                  onChange={(e) => setSliderPrice(parseInt(e.target.value))}
                  aria-label="Maximum hourly rate slider"
                />
                <div className="flex justify-between mt-3 text-[10px] font-bold text-gray-400">
                  <span>S${dbMinPrice}</span>
                  <span>S${dbMaxPrice}+</span>
                </div>
              </div>

              <div className="mt-auto">
                <button
                  onClick={() => fetchFilteredVehicles(true)}
                  disabled={isLoading}
                  className="apply-btn w-full bg-amber-500 text-black font-bold text-xs py-4 rounded-xl uppercase tracking-wider hover:bg-amber-400 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isLoading ? "Verifying..." : "Apply Filters"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Chip Row */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6 items-center">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Active Filters:
            </span>
            {activeChips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => handleRemoveChip(chip.type, chip.value)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-100 text-brand-navy rounded-full text-xs font-bold hover:bg-amber-100/50 transition-colors"
                title={`Remove filter: ${chip.label}`}
              >
                <span>{chip.label}</span>
                <X className="w-3.5 h-3.5 text-brand-navy/60 hover:text-brand-navy" />
              </button>
            ))}
          </div>
        )}

        {/* Results Container */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-brand-navy">
              Available Fleet ({vehiclesList.length})
            </h3>
            <span className="text-xs text-gray-400 font-medium">
              Real-time database query results
            </span>
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="bg-white border border-gray-100 rounded-2xl p-4 space-y-4 animate-pulse"
                  >
                    <div className="h-44 bg-gray-100 rounded-xl"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    </div>
                    <div className="h-10 bg-gray-100 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-100 text-center text-sm font-semibold">
                {error}
              </div>
            ) : vehiclesList.length === 0 ? (
              <div className="bg-gray-50 border border-gray-100 p-12 rounded-2xl text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                  <X className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-brand-navy text-lg mb-1">
                  No Matching Vehicles Found
                </h4>
                <p className="text-gray-500 text-sm max-w-md">
                  No vehicles currently match your filters or seating capacity
                  constraints. Try expanding your price limit or clearing active
                  vehicle types.
                </p>
                <button
                  onClick={handleClearAll}
                  className="mt-4 bg-brand-navy text-white font-bold text-xs px-5 py-2.5 rounded-lg"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {vehiclesList.map((vehicle) => (
                  <article
                    key={vehicle.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow group"
                  >
                    <div className="relative h-48 overflow-hidden bg-gray-50">
                      <ImageWithFallback
                        src={vehicle.image}
                        alt={vehicle.name}
                        fallbackSrc="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute top-3.5 right-3.5 bg-brand-navy/80 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm">
                        {vehicle.type}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-base text-brand-navy">
                            {vehicle.name}
                          </h4>
                          <p className="text-[10px] font-bold text-amber-500 tracking-wider uppercase mt-1">
                            Chauffeur Service Included
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-brand-navy text-xl font-black">
                            S${vehicle.hourlyRate}
                          </span>
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                            per hour
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-6 p-3 bg-gray-50/50 rounded-xl border border-gray-100/50 text-[11px] text-gray-600 font-medium">
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-amber-500" />
                          <span>{vehicle.capacity} Passengers</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                          <span>{vehicle.luggage} Luggage</span>
                        </div>
                        <div className="col-span-2 text-[10px] text-gray-400 font-mono mt-1 border-t border-gray-100 pt-1.5 flex justify-between">
                          <span>Plate: {vehicle.licensePlate}</span>
                          <span>Operator: {vehicle.operatorName}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenBooking(vehicle)}
                        className="mt-auto w-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs py-3 rounded-lg uppercase tracking-wider transition-colors"
                      >
                        Book This Vehicle
                      </button>
                    </div>
                  </article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Seamless Booking Parameters Capture Dialog */}
      {showBookingModal && selectedVehicleToBook && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-gray-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-extrabold text-brand-navy text-lg">
                Trip Details
              </h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-1 text-gray-400 hover:text-brand-navy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-amber-50/30 border border-amber-100/50 rounded-2xl flex gap-4 mb-6">
              <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0">
                <ImageWithFallback
                  src={selectedVehicleToBook.image}
                  fallbackSrc="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800"
                  alt={selectedVehicleToBook.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                  {selectedVehicleToBook.type}
                </span>
                <h4 className="font-bold text-brand-navy text-sm">
                  {selectedVehicleToBook.name}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  S${selectedVehicleToBook.hourlyRate}/hr rate
                </p>
              </div>
            </div>

            <form onSubmit={handleConfirmBookingSearch} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Pickup Location in Singapore
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    required
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Changi Airport, Marina Bay Sands, etc."
                    className="w-full pl-10 pr-4 py-3 border border-gray-100 rounded-xl bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Destination (Optional)
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="As directed or specific hotel"
                    className="w-full pl-10 pr-4 py-3 border border-gray-100 rounded-xl bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      required
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-100 rounded-xl bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      required
                      type="time"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-100 rounded-xl bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Duration (Hours)
                </label>
                <select
                  value={bookingDuration}
                  onChange={(e) => setBookingDuration(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {[2, 3, 4, 5, 6, 8, 10, 12, 24].map((h) => (
                    <option key={h} value={h}>
                      {h} Hours
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-brand-navy">
                <span className="font-bold text-sm">Est. Total Price:</span>
                <span className="font-black text-xl">
                  S$
                  {selectedVehicleToBook.hourlyRate * parseInt(bookingDuration)}
                </span>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="w-1/3 px-4 py-3 border border-gray-100 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs py-3 rounded-xl uppercase tracking-wider transition-colors shadow-md shadow-amber-500/10"
                >
                  Proceed to Booking
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Sign-in prompt modal for wishlist */}
      <SignInPromptModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        tourTitle={pendingTourTitle}
      />
    </div>
  );
}
