import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LocationInput from "./LocationInput";
import MapComponent from "./MapComponent";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "motion/react";

export default function BookingWidget({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  // ── Vehicle sub-tab ──────────────────────────────────────────────────────────
  const [vehicleSubTab, setVehicleSubTab] = useState<"hourly" | "daily" | "airport">("hourly");

  // ── Daily mode ───────────────────────────────────────────────────────────────
  const [dailyMode, setDailyMode] = useState<"single" | "multiple">("single");

  // ── Airport direction ────────────────────────────────────────────────────────
  const [airportDirection, setAirportDirection] = useState<"arrival" | "departure">("arrival");

  // ── Shared form state ────────────────────────────────────────────────────────
  const [pickup, setPickup] = useState("");
  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [destination, setDestination] = useState("");
  const [destinationCoords, setDestinationCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [time, setTime] = useState("10:00");
  const [duration, setDuration] = useState("2");
  const [passengers, setPassengers] = useState("1");
  const [flightNumber, setFlightNumber] = useState("");
  const [airport, setAirport] = useState("Singapore Changi Airport (SIN)");
  const [terminal, setTerminal] = useState("T1");

  // ── Geolocation auto-detect ───────────────────────────────────────────────────
  const [geoStatus, setGeoStatus] = useState<"detecting" | "detected" | "failed">("detecting");

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoStatus("failed");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await axios.get(
            "https://nominatim.openstreetmap.org/reverse",
            {
              params: {
                lat: coords.latitude,
                lon: coords.longitude,
                format: "json",
              },
            },
          );
          const address = res.data?.display_name;
          if (address) {
            setPickup(address);
            setPickupCoords({ lat: coords.latitude, lon: coords.longitude });
            setGeoStatus("detected");
          } else {
            setGeoStatus("failed");
          }
        } catch {
          setGeoStatus("failed");
        }
      },
      () => setGeoStatus("failed"),
      { timeout: 8000, maximumAge: 60000 },
    );
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // ── Derived values ────────────────────────────────────────────────────────────
  const pickupType = airportDirection === "arrival" ? "Arrival" : "Departure";

  const numDays =
    date && endDate
      ? Math.max(1, Math.ceil((endDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)) + 1)
      : 1;

  const effectiveDuration =
    vehicleSubTab === "daily"
      ? dailyMode === "multiple"
        ? numDays
        : 1
      : parseInt(duration);

  // ── Search logic (no event param — called automatically) ───────────────────
  const performSearch = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const searchParams = {
        bookingType: vehicleSubTab,
        pickup:
          vehicleSubTab === "airport" && airportDirection === "arrival"
            ? `${airport} - ${terminal}`
            : pickup,
        pickupCoords,
        destination:
          vehicleSubTab === "airport" && airportDirection === "departure"
            ? `${airport} - ${terminal}`
            : destination,
        destinationCoords,
        date: date?.toISOString(),
        time,
        duration: effectiveDuration,
        passengers: parseInt(passengers),
        flightNumber,
        pickupType,
        airport,
        terminal,
      };

      const response = await axios.post("/api/search", searchParams);

      sessionStorage.setItem(
        "bookingSearch",
        JSON.stringify({
          searchParams,
          results: response.data.vehicles,
          tripMetadata: {
            travelDistance: response.data.travelDistance,
            travelTime: response.data.travelTime,
            eta: response.data.eta,
          },
        }),
      );

      if (!user) {
        let sessionId = localStorage.getItem("guestSessionId");
        if (!sessionId) {
          sessionId = Math.random().toString(36).substring(2, 15);
          localStorage.setItem("guestSessionId", sessionId);
        }
        await axios.post("/api/booking-drafts", { sessionId, searchParams });
        navigate("/booking");
      } else {
        if (window.location.pathname !== "/customer/new-booking") {
          navigate("/customer/new-booking");
        } else {
          const event = new CustomEvent("bookingSearchEvt");
          window.dispatchEvent(event);
        }
      }
    } catch (error) {
      console.error(error);
      alert("Error finding vehicles. Please check your inputs.");
    } finally {
      setIsLoading(false);
    }
  };

  // ── Auto-search: fires when all required fields are complete ──────────────
  const allFieldsFilled =
    Boolean(pickup) &&
    Boolean(date) &&
    (vehicleSubTab !== "daily" || dailyMode !== "multiple" || Boolean(endDate));

  useEffect(() => {
    if (!allFieldsFilled || isLoading) return;
    const timer = setTimeout(() => {
      performSearch();
    }, 800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickup, date, endDate, time, duration, passengers, vehicleSubTab, dailyMode]);

  // ── Time options ──────────────────────────────────────────────────────────────
  const generateTimeOptions = () => {
    const options = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 15) {
        const hour = h.toString().padStart(2, "0");
        const min = m.toString().padStart(2, "0");
        options.push(`${hour}:${min}`);
      }
    }
    return options;
  };
  const timeOptions = generateTimeOptions();

  // ── Animation key: triggers form re-animation on any sub-selection change ────
  const formKey = `${vehicleSubTab}-${dailyMode}-${airportDirection}`;

  return (
    <div className="bg-white rounded-[24px] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden flex flex-col mt-4 relative z-10 backdrop-blur-xl">

      {/* ── Loading Overlay ── */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm rounded-[24px] flex flex-col items-center justify-center gap-6"
          >
            {/* Spinning ring */}
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#E9A23B] animate-spin" />
              <div className="absolute inset-[6px] rounded-full border-4 border-transparent border-t-[#0a1128]/30 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
            </div>

            {/* Text */}
            <div className="text-center">
              <p className="text-slate-900 font-semibold text-lg tracking-tight">Finding Available Fleets</p>
              <p className="text-gray-400 text-sm mt-1">Matching vehicles for your trip…</p>
            </div>

            {/* Pulsing dots */}
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[#E9A23B]"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Primary Tabs: Vehicle Booking | Tour Packages ── */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-gray-100 bg-gray-50/80 relative">
        {(["vehicle", "tour"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[140px] md:min-w-0 py-4 md:py-5 text-xs md:text-sm font-semibold transition-colors flex flex-col items-center justify-center gap-1 relative ${
              activeTab === tab
                ? "text-slate-900 bg-white"
                : "text-gray-500 hover:text-slate-900 hover:bg-white/50"
            }`}
          >
            {tab === "vehicle" && "Vehicle Booking"}
            {tab === "tour" && "Tour Packages"}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E9A23B] rounded-t-full shadow-[0_-2px_10px_rgba(233,162,59,0.5)]"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-10">

        {/* ── Tour Packages ── */}
        {activeTab === "tour" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-10"
          >
            <h3 className="text-2xl font-bold mb-4 tracking-tight">
              Explore Our Curated Singapore Experiences
            </h3>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Discover the Night Safari, City Discovery, and more carefully
              selected premium tours.
            </p>
            <button
              onClick={() => {
                document
                  .getElementById("experiences")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#E9A23B] text-black font-semibold py-3 px-10 rounded-full hover:scale-105 hover:shadow-[0_8px_24px_rgba(233,162,59,0.3)] transition-all uppercase tracking-wider text-sm"
            >
              View Tours
            </button>
          </motion.div>

        ) : (

          /* ── Vehicle Booking ── */
          <>
            {/* Vehicle Sub-Tabs (pill toggles) */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {(["hourly", "daily"] as const).map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setVehicleSubTab(sub)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    vehicleSubTab === sub
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-white text-gray-500 border-gray-200 hover:border-slate-400 hover:text-slate-700"
                  }`}
                >
                  {sub === "hourly" && "Hourly Booking"}
                  {sub === "daily" && "Daily Booking"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={formKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-end gap-6 w-full mb-8"
              >

                {/* ── Daily Mode Toggle (Single / Multiple) ── */}
                {vehicleSubTab === "daily" && (
                  <div className="w-full lg:col-span-4">
                    <div className="flex gap-2">
                      {(["single", "multiple"] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setDailyMode(mode)}
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                            dailyMode === mode
                              ? "bg-[#E9A23B] text-black border-[#E9A23B]"
                              : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          {mode === "single" ? "Single Day" : "Multiple Days"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Airport Direction Toggle ── */}
                {vehicleSubTab === "airport" && (
                  <div className="w-full lg:col-span-4">
                    <div className="flex gap-2 flex-wrap">
                      {(["arrival", "departure"] as const).map((dir) => (
                        <button
                          key={dir}
                          type="button"
                          onClick={() => setAirportDirection(dir)}
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                            airportDirection === dir
                              ? "bg-[#E9A23B] text-black border-[#E9A23B]"
                              : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          {dir === "arrival" ? "Airport → Hotel" : "Hotel → Airport"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Airport Details (Airport + Terminal selects) ── */}
                {vehicleSubTab === "airport" && (
                  <div className="w-full lg:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Airport Details
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={airport}
                        onChange={(e) => setAirport(e.target.value)}
                        className="w-1/2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
                      >
                        <option value="Singapore Changi Airport (SIN)">Changi Airport</option>
                        <option value="Seletar Airport (XSP)">Seletar Airport</option>
                      </select>
                      <select
                        value={terminal}
                        onChange={(e) => setTerminal(e.target.value)}
                        className="w-1/2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
                      >
                        {airport.includes("Changi") ? (
                          <>
                            <option value="T1">Terminal 1</option>
                            <option value="T2">Terminal 2</option>
                            <option value="T3">Terminal 3</option>
                            <option value="T4">Terminal 4</option>
                          </>
                        ) : (
                          <option value="Main">Main Terminal</option>
                        )}
                      </select>
                    </div>
                  </div>
                )}

                {/* ── Flight Number (Airport, optional) ── */}
                {vehicleSubTab === "airport" && (
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Flight Number{" "}
                      <span className="text-gray-400 normal-case font-normal">(optional)</span>
                    </label>
                    <input
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
                      placeholder="e.g. SQ321"
                    />
                  </div>
                )}

                {/* ── Pickup Location ── */}
                <div className="w-full">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Pickup Location
                    {geoStatus === "detecting" && (
                      <span className="inline-flex items-center gap-1 normal-case font-normal text-gray-400">
                        <svg className="animate-spin h-3 w-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                        </svg>
                        Detecting…
                      </span>
                    )}
                    {geoStatus === "detected" && (
                      <span className="inline-flex items-center gap-1 normal-case font-normal text-emerald-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                        Auto-detected
                      </span>
                    )}
                  </label>
                  <LocationInput
                    value={pickup}
                    onChange={setPickup}
                    onSelect={(lat, lon) => setPickupCoords({ lat, lon })}
                    required
                  />
                </div>

                {/* ── Drop Location (Hourly only) ── */}
                {vehicleSubTab === "hourly" && (
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Drop Location
                    </label>
                    <LocationInput
                      value={destination}
                      onChange={setDestination}
                      onSelect={(lat, lon) => setDestinationCoords({ lat, lon })}
                      placeholder="As directed"
                    />
                  </div>
                )}

                {/* ── Start / Pickup Date ── */}
                <div className="w-full">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    {vehicleSubTab === "daily" ? "Start Date" : "Pickup Date"}
                  </label>
                  <DatePicker
                    selected={date}
                    onChange={(d: Date | null) => setDate(d)}
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary"
                    placeholderText="DD/MM/YYYY"
                    required
                  />
                </div>

                {/* ── End Date (Daily + Multiple only) ── */}
                {vehicleSubTab === "daily" && dailyMode === "multiple" && (
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      End Date
                      {date && endDate && (
                        <span className="text-[#E9A23B] font-normal normal-case ml-1.5">
                          ({numDays} {numDays === 1 ? "day" : "days"})
                        </span>
                      )}
                    </label>
                    <DatePicker
                      selected={endDate}
                      onChange={(d: Date | null) => setEndDate(d)}
                      minDate={date || new Date()}
                      dateFormat="dd/MM/yyyy"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary"
                      placeholderText="DD/MM/YYYY"
                      required
                    />
                  </div>
                )}

                {/* ── Pickup Time ── */}
                <div className="w-full">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Pickup Time
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
                    required
                  >
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ── Duration in Hours (Hourly only) ── */}
                {vehicleSubTab === "hourly" && (
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Duration (Hours)
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
                      required
                    >
                      {[2, 3, 4, 5, 6, 8, 10, 12].map((h) => (
                        <option key={h} value={h}>
                          {h} Hours
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* ── Passengers ── */}
                <div className="w-full">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Passengers
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ── Auto-search status indicator ── */}
                {allFieldsFilled && (
                  <div className="w-full lg:col-span-4 flex items-center gap-2 pt-2">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-[#E9A23B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                        </svg>
                        <span className="text-sm text-gray-500 font-medium">Finding available fleets…</span>
                      </>
                    ) : (
                      <span className="text-xs text-gray-400">Results will appear automatically once all fields are filled.</span>
                    )}
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

            {/* ── Map ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <MapComponent
                pickupCoords={pickupCoords}
                destinationCoords={destinationCoords}
                className="h-64 mt-4 rounded-xl shadow-inner border border-gray-100"
              />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
