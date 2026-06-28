import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PartnerBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/api/partner/bookings");
      setBookings(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]";
      case "IN_PROGRESS":
        return "bg-[#E8F0FE] text-[#1A73E8] border-[#D2E3FC]";
      case "PENDING":
        return "bg-[#FFF8E1] text-[#B08D00] border-[#FFECB3]";
      case "COMPLETED":
        return "bg-gray-100 text-gray-500 border-gray-200";
      case "CANCELLED":
        return "bg-red-100 text-red-700 border-red-600/20";
      default:
        return "bg-slate-50-variant text-gray-900";
    }
  };

  return (
    <>
      {/* Dashboard Header Info */}
      <section>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Bookings</h2>
            <p className="text-sm text-body-sm text-gray-500">
              Manage your active and upcoming fleet schedule
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section>
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            search
          </span>
          <input
            className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:border-primary focus:ring-1 focus:ring-primary/10 text-base outline-none transition-all"
            placeholder="Search Booking ID or Customer"
            type="text"
          />
        </div>
      </section>

      {/* Booking List Area */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-8 text-gray-500">
            Loading assigned bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500 shadow-sm">
            <span className="material-symbols-outlined text-[48px] mb-4">
              event_busy
            </span>
            <p className="text-lg font-semibold">No Assigned Bookings</p>
            <p>
              When administrators assign trips to your vehicles, they will
              appear here.
            </p>
          </div>
        ) : (
          bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                  <span className="text-xs font-medium text-label-sm text-blue-600 uppercase tracking-wider">
                    #{b.id.substring(0, 8).toUpperCase()}
                  </span>
                  <h3 className="text-xl font-medium text-title-lg text-gray-900">
                    {b.customerName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(b.date).toLocaleDateString()} at{" "}
                    {new Date(b.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full flex items-center gap-1.5 border ${getStatusColor(b.status)}`}
                >
                  <span className="text-xs font-medium text-label-sm font-medium">
                    {b.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 py-6 border-y border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center mt-1">
                    <span className="material-symbols-outlined text-blue-600 text-[20px]">
                      circle
                    </span>
                    <div className="w-[2px] h-10 bg-gray-200/50 my-1"></div>
                    <span className="material-symbols-outlined text-tertiary text-[20px]">
                      location_on
                    </span>
                  </div>
                  <div className="flex-1 space-y-6">
                    <div>
                      <p className="text-xs font-medium text-label-sm text-gray-500 uppercase tracking-wider mb-1">
                        Pickup
                      </p>
                      <p className="text-base text-gray-900">
                        {b.details.pickup || b.details.pickup_location || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-label-sm text-gray-500 uppercase tracking-wider mb-1">
                        Destination
                      </p>
                      <p className="text-base text-gray-900">
                        {b.details.destination ||
                          b.details.drop_location ||
                          "Return to base / Hourly"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-6 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-500">
                      directions_car
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      {b.vehicleModel}
                    </span>
                    <span className="text-xs text-gray-500">
                      {b.vehicleLicensePlate}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-label-sm text-gray-500 uppercase tracking-wider mb-1">
                    Revenue
                  </p>
                  <p className="text-xl font-medium text-title-lg text-blue-600">
                    SGD {parseFloat(b.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
