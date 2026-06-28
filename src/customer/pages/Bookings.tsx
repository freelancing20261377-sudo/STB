import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Bookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 10000);
    return () => clearInterval(interval);
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
        return "bg-gray-100 text-gray-900";
    }
  };

  return (
    <main className="p-8 w-full flex-1">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between items-center mb-stack-md flex-wrap gap-4">
          <h2 className="text-4xl font-bold text-gray-900 font-bold">
            My Bookings
          </h2>
          <Link
            to="/customer/new-booking"
            className="bg-[#E9A23B] text-[#000000] px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-colors shadow"
          >
            New Booking
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-[700px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-gray-200 text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Booking ID</th>
                  <th className="px-6 py-4 font-medium">Service Type</th>
                  <th className="px-6 py-4 font-medium">Date & Time</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="text-base text-gray-900 divide-y divide-surface-variant/50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8">
                      Loading Bookings...
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">
                      You have no bookings yet.
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr
                      key={b.id}
                      onClick={() =>
                        navigate(`/customer/booking-details/${b.id}`)
                      }
                      className="hover:bg-gray-50 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <span className="font-semibold text-blue-600 group-hover:text-blue-600-container transition-colors">
                          #{b.id.substring(0, 8).toUpperCase()}
                        </span>
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
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
