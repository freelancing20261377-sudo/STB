import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Bookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
    // Setting up simple interval polling for realtime updates
    const interval = setInterval(fetchBookings, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/api/admin/bookings");
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

  const filtered = bookings.filter((b) => {
    if (filterStatus !== "ALL" && b.status !== filterStatus) return false;
    if (
      search &&
      !b.customerName.toLowerCase().includes(search.toLowerCase()) &&
      !b.id.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="px-margin-mobile md:px-8 pb-12 w-full max-w-[1600px] mx-auto">
      {/* Page Header & Top Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-stack-lg">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl font-bold text-gray-900 mb-1">
            Bookings
          </h2>
          <p className="text-base text-gray-500">
            Manage and track all reservations across the fleet.
          </p>
        </div>
      </div>

      {/* Filters & Data Table Container */}
      <div className="elevation-1 rounded-xl border border-gray-200 overflow-hidden flex flex-col bg-white">
        {/* Filters Tabs */}
        <div className="flex items-center gap-6 px-6 border-b border-gray-200 overflow-x-auto no-scrollbar bg-white">
          <button
            onClick={() => setFilterStatus("ALL")}
            className={`h-14 px-2 font-medium text-sm whitespace-nowrap transition-colors ${filterStatus === "ALL" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-900"}`}
          >
            All Bookings{" "}
            <span className="ml-1.5 inline-flex items-center justify-center bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {bookings.length}
            </span>
          </button>
          <button
            onClick={() => setFilterStatus("CONFIRMED")}
            className={`h-14 px-2 font-medium text-sm whitespace-nowrap transition-colors ${filterStatus === "CONFIRMED" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-900"}`}
          >
            Confirmed{" "}
            <span className="ml-1.5 inline-flex items-center justify-center bg-slate-50-variant text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {bookings.filter((b) => b.status === "CONFIRMED").length}
            </span>
          </button>
          <button
            onClick={() => setFilterStatus("PENDING")}
            className={`h-14 px-2 font-medium text-sm whitespace-nowrap transition-colors ${filterStatus === "PENDING" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-900"}`}
          >
            Pending
          </button>
        </div>

        {/* Table Controls (Filter/Search within table) */}
        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border-b border-gray-200/50">
          <div className="relative w-full sm:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[18px]">
              search
            </span>
            <input
              className="w-full h-10 pl-9 pr-4 text-sm bg-gray-50 border-none rounded-md focus:ring-1 focus:ring-blue-600 text-gray-900 placeholder:text-gray-500/70"
              placeholder="Search by ID or Customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-gray-200 text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Booking ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Service Type</th>
                <th className="px-6 py-4 font-medium">Date & Time</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
                <th className="px-6 py-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-base text-gray-900 bg-white divide-y divide-surface-variant/50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8">
                    Loading Bookings...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                filtered.map((b) => (
                  <tr
                    key={b.id}
                    onClick={() => navigate(`/admin/bookings/${b.id}`)}
                    className="hover:bg-gray-50 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <span className="font-semibold text-blue-600 group-hover:text-blue-600-container transition-colors">
                        #{b.id.substring(0, 8).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-50-variant flex items-center justify-center text-xs font-bold text-gray-900">
                          {b.customerName?.charAt(0) || "?"}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{b.customerName}</span>
                          <span className="text-xs text-gray-500">
                            {b.customerEmail}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="capitalize">{b.bookingType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span>{new Date(b.date).toLocaleDateString()}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(b.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(b.status)}`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">
                      SGD {parseFloat(b.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="flex items-center justify-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => navigate(`/admin/bookings/${b.id}`)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-md border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-slate-50-variant transition-colors flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            visibility
                          </span>
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <style>{`
 .elevation-1 {
 box-shadow: 0 4px 12px rgba(0, 88, 190, 0.05); /* very soft neutral-blue shadow */
 }
 `}</style>
    </div>
  );
}
