import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageWithFallback from "../../components/ImageWithFallback";

export default function Dashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/api/customer/bookings");
      setBookings(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = bookings.reduce(
    (sum, b) => (b.status !== "CANCELLED" ? sum + parseFloat(b.amount) : sum),
    0,
  );
  const upcomingBookings = bookings.filter(
    (b) =>
      b.status === "PENDING" ||
      b.status === "CONFIRMED" ||
      b.status === "IN_PROGRESS",
  );

  return (
    <main className="p-8 max-w-[1440px] mx-auto w-full space-y-8 flex-1">
      {/* Row 1: Analytics */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/70 backdrop-blur-md border border-white/50 shadow-[0_4px_12px_rgba(0,88,190,0.05)] rounded-xl p-6 flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <p className="text-base text-gray-500">Total Bookings</p>
            <span
              className="material-symbols-outlined text-blue-600 bg-blue-100/20 p-2 rounded-lg"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              fact_check
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900">{bookings.length}</h3>
        </div>
        <div className="bg-white/70 backdrop-blur-md border border-white/50 shadow-[0_4px_12px_rgba(0,88,190,0.05)] rounded-xl p-6 flex flex-col justify-between h-32 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <p className="text-base text-gray-500">Upcoming Trips</p>
            <span
              className="material-symbols-outlined text-blue-600 bg-blue-100/20 p-2 rounded-lg"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              flight_takeoff
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            {upcomingBookings.length}
          </h3>
        </div>
        <div className="bg-white/70 backdrop-blur-md border border-white/50 shadow-[0_4px_12px_rgba(0,88,190,0.05)] rounded-xl p-6 flex flex-col justify-between h-32 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <p className="text-base text-gray-500">Total Spent</p>
            <span
              className="material-symbols-outlined text-blue-600 bg-blue-100/20 p-2 rounded-lg"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              payments
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            S${totalSpent.toFixed(2)}
          </h3>
        </div>
        <div className="bg-white/70 backdrop-blur-md border border-white/50 shadow-[0_4px_12px_rgba(0,88,190,0.05)] rounded-xl p-6 flex flex-col justify-between h-32 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <p className="text-base text-gray-500">Loyalty Points</p>
            <span
              className="material-symbols-outlined text-[#D4AF37] bg-[#D4AF37]/10 p-2 rounded-lg"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              workspace_premium
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            {Math.floor(totalSpent * 0.1)}
          </h3>
        </div>
      </section>

      {/* Row 2: 70/30 Split */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (70%) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white/70 backdrop-blur-md border border-white/50 shadow-[0_4px_12px_rgba(0,88,190,0.05)] rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Upcoming Bookings
              </h2>
              <button
                onClick={() => navigate("/customer/bookings")}
                className="text-blue-600 hover:text-blue-600 transition-colors text-base flex items-center gap-1"
              >
                View All{" "}
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  arrow_forward
                </span>
              </button>
            </div>
            <div className="overflow-x-auto w-full">
              {loading ? (
                <div className="py-8 text-center text-gray-500">Loading...</div>
              ) : bookings.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  You have no bookings yet.
                </div>
              ) : (
                <table className="w-full text-left border-collapse whitespace-nowrap min-w-[600px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 text-xs uppercase tracking-wider font-semibold text-gray-500 font-medium">
                        ID
                      </th>
                      <th className="pb-3 text-xs uppercase tracking-wider font-semibold text-gray-500 font-medium">
                        Service
                      </th>
                      <th className="pb-3 text-xs uppercase tracking-wider font-semibold text-gray-500 font-medium">
                        Date
                      </th>
                      <th className="pb-3 text-xs uppercase tracking-wider font-semibold text-gray-500 font-medium">
                        Status
                      </th>
                      <th className="pb-3 text-xs uppercase tracking-wider font-semibold text-gray-500 font-medium text-right">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-base">
                    {bookings.slice(0, 5).map((b) => (
                      <tr
                        key={b.id}
                        onClick={() =>
                          navigate(`/customer/booking-details/${b.id}`)
                        }
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="py-4 text-gray-900 font-medium">
                          #{b.id.substring(0, 8).toUpperCase()}
                        </td>
                        <td className="py-4 capitalize">{b.bookingType}</td>
                        <td className="py-4 text-gray-500">
                          {new Date(b.date).toLocaleDateString()}
                        </td>
                        <td className="py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              b.status === "CONFIRMED"
                                ? "bg-blue-100/20 text-blue-600"
                                : b.status === "PENDING"
                                  ? "bg-[#D4AF37]/20 text-[#B8860B]"
                                  : b.status === "CANCELLED"
                                    ? "bg-red-600/10 text-red-600"
                                    : "bg-gray-100/20 text-gray-500"
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="py-4 text-right font-medium">
                          S${parseFloat(b.amount).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Upcoming Itinerary */}
          <div className="bg-white/70 backdrop-blur-md border border-white/50 shadow-[0_4px_12px_rgba(0,88,190,0.05)] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Upcoming Itinerary: Marina Bay Sands
            </h2>
            <div className="relative pl-6 border-l-2 border-gray-200 space-y-8">
              <div className="relative">
                <div className="absolute -left-[35px] top-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center border-4 border-surface-container-lowest shadow-sm">
                  <span
                    className="material-symbols-outlined text-[12px]"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    done
                  </span>
                </div>
                <h4 className="text-lg text-body-lg text-gray-900 font-medium">
                  Changi Airport Pickup
                </h4>
                <p className="text-base text-gray-500 mt-1">
                  Oct 15, 14:00 PM • Mercedes S-Class
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[35px] top-1 w-6 h-6 bg-gray-200est text-blue-600 rounded-full flex items-center justify-center border-4 border-surface-container-lowest shadow-sm">
                  <span
                    className="material-symbols-outlined text-[12px]"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    hotel
                  </span>
                </div>
                <h4 className="text-lg text-body-lg text-gray-900 font-medium">
                  Hotel Check-in
                </h4>
                <p className="text-base text-gray-500 mt-1">
                  Oct 15, 15:30 PM • Marina Bay Sands, Tower 1
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[35px] top-1 w-6 h-6 bg-gray-200est text-gray-500 rounded-full flex items-center justify-center border-4 border-surface-container-lowest shadow-sm">
                  <span
                    className="material-symbols-outlined text-[12px]"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    restaurant
                  </span>
                </div>
                <h4 className="text-lg text-body-lg text-gray-900 font-medium">
                  Dinner Reservation
                </h4>
                <p className="text-base text-gray-500 mt-1">
                  Oct 15, 19:00 PM • Spago Dining Room
                </p>
              </div>
            </div>
          </div>

          {/* Live Vehicle Tracking Card (Main Feature) */}
          <div className="bg-white/70 backdrop-blur-md border border-[rgba(0,88,190,0.2)] shadow-[0_10px_30px_-10px_rgba(0,88,190,0.25)] rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                Live Vehicle Tracking
              </h2>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center gap-1.5 ring-1 ring-green-200">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>{" "}
                LIVE
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
              {/* Map Preview (70%) */}
              <div className="lg:col-span-7 relative rounded-xl overflow-hidden bg-gray-50 h-[320px] border border-gray-200 shadow-inner">
                {/* Mock Map Grid */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#c6c6cd_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
                {/* Route Line */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 80 260 Q 200 200 350 240 T 600 120"
                    fill="none"
                    stroke="#0058be"
                    strokeDasharray="12 6"
                    strokeLinecap="round"
                    strokeWidth="6"
                  ></path>
                  {/* Destination Marker */}
                  <circle cx="600" cy="120" fill="#ba1a1a" r="8"></circle>
                  <circle
                    cx="600"
                    cy="120"
                    fill="#ba1a1a"
                    fillOpacity="0.2"
                    r="16"
                  >
                    <animate
                      attributeName="r"
                      dur="1.5s"
                      from="8"
                      repeatCount="indefinite"
                      to="24"
                    ></animate>
                    <animate
                      attributeName="fill-opacity"
                      dur="1.5s"
                      from="0.3"
                      repeatCount="indefinite"
                      to="0"
                    ></animate>
                  </circle>
                </svg>
                {/* Moving Vehicle Icon Mock */}
                <div className="absolute left-[340px] top-[230px] -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg border-2 border-white">
                    <span
                      className="material-symbols-outlined text-lg"
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      directions_car
                    </span>
                  </div>
                </div>
                {/* Floating ETA Overlays */}
                <div className="absolute top-4 left-4 space-y-2">
                  <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-xl p-4 border border-gray-200 min-w-[120px]">
                    <p className="text-xs text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">
                      Estimated Arrival
                    </p>
                    <p className="font-bold text-blue-600">12 mins</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-lg py-2 px-3 border border-gray-200 inline-block">
                    <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 0" }}
                      >
                        distance
                      </span>{" "}
                      4.2 km away
                    </p>
                  </div>
                </div>
                <button className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg border border-gray-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-all active:scale-95">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    my_location
                  </span>
                </button>
              </div>

              {/* Driver Info Panel (30%) */}
              <div className="lg:col-span-3 flex flex-col justify-between py-2">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-blue-600/20 shadow-md">
                        <img
                          alt="Michael Tan"
                          className="w-full h-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuChlitIMPMaO0Dx2Dp4m5z5Zca89nLZ8KMak8dmZrPRQesdWZZh2KOnxmd9Hc2RZJ-NO9TfsMnxizxP9r_Ma5Y9QdRb83G-QSSxC3laW3mpGdef0NiLH21R9DtiaPhyCGN4aIt_SbjrtED9bSI9-EawXSqEjy0VLXnD3TptUX5R7oKoJ4e_60ezAmJ5QX7nT1O63RIbrw5_WLS840bdmw7JfUTRoDQqIEbOgRfIWk2ZJJaLtNZpOAH6F7V6cMIKHeqFTfQZmk6Xyog"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-[#D4AF37] text-white px-1.5 py-0.5 rounded-md text-[10px] font-bold shadow-sm flex items-center gap-0.5">
                        <span
                          className="material-symbols-outlined text-[10px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>{" "}
                        4.9
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Michael Tan
                      </h4>
                      <p className="text-gray-500">Premier Chauffeur</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase text-xs uppercase tracking-wider font-semibold tracking-wider mb-1">
                        Vehicle Details
                      </p>
                      <p className="font-semibold text-gray-900">
                        Mercedes-Benz S-Class
                      </p>
                      <p className="text-blue-600 font-mono text-sm tracking-wider">
                        SGX 4582K
                      </p>
                    </div>
                    <div className="pt-3 border-t border-gray-200 flex items-center gap-2 text-blue-600">
                      <span
                        className="material-symbols-outlined animate-bounce"
                        style={{ fontVariationSettings: "'FILL' 0" }}
                      >
                        navigation
                      </span>
                      <span className="text-sm font-bold">Driver En Route</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-4">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all active:scale-95">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      call
                    </span>{" "}
                    Call Driver
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-all active:scale-95">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      chat
                    </span>{" "}
                    Message
                  </button>
                </div>
              </div>
            </div>

            {/* Journey Timeline */}
            <div className="mt-12 px-4">
              <div className="relative">
                <div className="absolute top-4 left-0 w-full h-1 bg-gray-200/20 rounded-full z-0"></div>
                <div className="absolute top-4 left-0 w-[50%] h-1 bg-blue-600 rounded-full transition-all duration-1000 z-0"></div>
                <div className="relative z-10 flex justify-between">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                      <span
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-gray-900">
                        Confirmed
                      </p>
                      <p className="text-[9px] text-gray-500">13:45 PM</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                      <span
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-gray-900">
                        Assigned
                      </p>
                      <p className="text-[9px] text-gray-500">13:50 PM</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg ring-4 ring-blue-600/20">
                      <span
                        className="material-symbols-outlined text-lg animate-pulse"
                        style={{ fontVariationSettings: "'FILL' 0" }}
                      >
                        navigation
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-blue-600">
                        En Route
                      </p>
                      <p className="text-[9px] text-blue-600/70">In Progress</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-3 opacity-50">
                    <div className="w-9 h-9 rounded-full bg-gray-200est text-gray-500 flex items-center justify-center shadow-sm">
                      <span
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 0" }}
                      >
                        person_pin_circle
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-medium text-gray-500">
                        Pickup
                      </p>
                      <p className="text-[9px] text-gray-500">--:--</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-3 opacity-50">
                    <div className="w-9 h-9 rounded-full bg-gray-200est text-gray-500 flex items-center justify-center shadow-sm">
                      <span
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 0" }}
                      >
                        flag
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-medium text-gray-500">
                        Reached
                      </p>
                      <p className="text-[9px] text-gray-500">--:--</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Updates Feed */}
            <div className="mt-10 p-5 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-xs text-xs uppercase tracking-wider font-semibold text-gray-500 tracking-wider">
                  Live Activity Feed
                </h5>
                <span className="text-[10px] text-gray-500 font-medium">
                  Last updated: 14:12 PM
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shadow-[0_0_8px_rgba(0,88,190,0.5)]"></div>
                  <div className="flex-1 flex justify-between items-start">
                    <p className="text-sm text-gray-900 font-medium">
                      Driver is 2 km away from pickup point
                    </p>
                    <span className="text-[11px] text-gray-500 whitespace-nowrap">
                      Just now
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-gray-200 mt-1.5"></div>
                  <div className="flex-1 flex justify-between items-start">
                    <p className="text-sm text-gray-500">
                      Vehicle entered Marina Bay Financial Center area
                    </p>
                    <span className="text-[11px] text-gray-500 whitespace-nowrap">
                      4 mins ago
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-gray-200 mt-1.5"></div>
                  <div className="flex-1 flex justify-between items-start">
                    <p className="text-sm text-gray-500">
                      Driver Michael Tan started the journey
                    </p>
                    <span className="text-[11px] text-gray-500 whitespace-nowrap">
                      12 mins ago
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (30%) */}
        <div className="space-y-8">
          {/* Recommended Packages */}
          <div className="bg-white/70 backdrop-blur-md border border-white/50 shadow-[0_4px_12px_rgba(0,88,190,0.05)] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recommended for You
            </h2>
            <div className="space-y-4">
              <div className="group cursor-pointer rounded-lg overflow-hidden relative h-32">
                <ImageWithFallback
                  alt="Gardens by the Bay"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4ZQohpWGTVezBZ-YhseBlrkUTKct9v68HY4HdsP60B3L0sU0Ym9nSJeZqtL15mc_uTP8QNeeMdTLaGqbV1CAnRR7v2PLwdwWw1fm8fjkGQqdTQD0I0lrVQu14tdFdF4Zkve7_6ykR4cjqDozumRfbxJUowbuA2SrzcO99svpFEpPWKYcH9qYxK_fQ-DK6b0P-Pq9byQ-3G5tgMsrV_aaY8yCYQ1J_NjUv0V20BpQklLPEeEejJtWYaYcK_ovMGJDLzNKvzGLbwfA"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                  <h4 className="text-white text-lg text-body-lg font-medium">
                    Gardens by the Bay VIP
                  </h4>
                  <p className="text-white/80 text-base text-sm">
                    Guided Tour &amp; Canopy Walk
                  </p>
                </div>
              </div>
              <div className="group cursor-pointer rounded-lg overflow-hidden relative h-32">
                <ImageWithFallback
                  alt="Luxury Transport"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2000&auto=format&fit=crop"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                  <h4 className="text-white text-lg text-body-lg font-medium">
                    City Sightseeing
                  </h4>
                  <p className="text-white/80 text-base text-sm">
                    Private Chauffeur Service
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-white/70 backdrop-blur-md border border-white/50 shadow-[0_4px_12px_rgba(0,88,190,0.05)] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Updates
            </h2>
            <ul className="space-y-4 divide-y divide-outline-variant/20">
              <li className="pt-4 first:pt-0 flex gap-3 items-start">
                <span
                  className="material-symbols-outlined text-blue-600 mt-0.5"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  check_circle
                </span>
                <div>
                  <p className="text-base text-gray-900 font-medium">
                    Booking Confirmed
                  </p>
                  <p className="text-base text-sm text-gray-500">
                    Your MBS Staycation has been confirmed.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </li>
              <li className="pt-4 flex gap-3 items-start">
                <span
                  className="material-symbols-outlined text-[#D4AF37] mt-0.5"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  star
                </span>
                <div>
                  <p className="text-base text-gray-900 font-medium">
                    Points Earned
                  </p>
                  <p className="text-base text-sm text-gray-500">
                    You earned 500 points from your last trip.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
