import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BookingDetails() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDetails();
    const interval = setInterval(fetchDetails, 10000);
    return () => clearInterval(interval);
  }, [id]);

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`/api/customer/bookings/${id}`);
      setBooking(res.data);
    } catch (e) {
      console.error(e);
      if (!booking) navigate("/customer/bookings");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]";
      case "PENDING":
        return "bg-[#FFF8E1] text-[#B08D00] border border-[#FFECB3]";
      case "COMPLETED":
        return "bg-gray-100 text-gray-500 border border-gray-200";
      case "CANCELLED":
        return "bg-red-100 text-red-700 border border-red-600/20";
      default:
        return "bg-gray-100 text-gray-900";
    }
  };

  if (loading && !booking) {
    return <div className="p-8 text-center">Loading Booking...</div>;
  }
  if (!booking) return null;

  return (
    <main className="p-6 lg:p-8 flex-1">
      {/* Header */}
      <div className="flex items-center gap-4 mb-stack-lg">
        <button
          onClick={() => navigate("/customer/bookings")}
          aria-label="Go back"
          className="w-[44px] h-[44px] flex items-center justify-center rounded-full hover:bg-gray-50 text-gray-500 transition-colors"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            arrow_back
          </span>
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Booking #{booking.id.substring(0, 8).toUpperCase()}
          </h2>
          <p className="text-base text-gray-500 mt-1">
            Created on {new Date(booking.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="ml-auto">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold ${getStatusColor(booking.status)}`}
          >
            {booking.status}
          </span>
        </div>
      </div>

      {/* 2-Column Layout Container */}
      <div className="flex flex-col lg:flex-row gap-stack-lg items-start">
        {/* Left Column (Approx 60%) */}
        <div className="w-full lg:w-3/5 space-y-stack-lg">
          {/* Trip Itinerary Timeline */}
          <section className="bg-white rounded-xl p-stack-md shadow-[0_4px_12px_rgba(0,88,190,0.1)]">
            <div className="flex justify-between items-center mb-stack-md">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-blue-600"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  route
                </span>
                Itinerary
              </h3>
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase">
                {new Date(booking.date).toLocaleDateString()}
              </span>
            </div>
            <div className="relative pl-6 mt-4 border-l-2 border-gray-200 ml-3 pb-4">
              {/* Pickup Node */}
              <div className="absolute w-4 h-4 rounded-full bg-blue-600 -left-[9px] top-1 border-4 border-white"></div>
              <div className="mb-stack-lg">
                <p className="text-xs uppercase tracking-wider font-semibold text-blue-600 uppercase font-bold tracking-wider mb-1">
                  Pickup •{" "}
                  {new Date(booking.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <h4 className="text-lg text-body-lg font-semibold text-gray-900">
                  {booking.details.pickup ||
                    booking.details.pickup_location ||
                    "N/A"}
                </h4>
                {booking.details.flightNumber && (
                  <div className="mt-3 flex items-center gap-2 text-gray-500 bg-white px-3 py-2 rounded-lg border border-gray-200 w-fit">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      flight_land
                    </span>
                    <span className="text-base">
                      Flight {booking.details.flightNumber}
                    </span>
                  </div>
                )}
              </div>

              {/* Dropoff Node */}
              <div className="absolute w-4 h-4 rounded-full bg-on-surface-variant -left-[9px] bottom-6 border-4 border-white"></div>
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase font-bold tracking-wider mb-1">
                  Destination
                </p>
                <h4 className="text-lg text-body-lg font-semibold text-gray-900">
                  {booking.details.destination ||
                    booking.details.drop_location ||
                    "Return to base / Hourly"}
                </h4>
                {booking.details.duration && (
                  <p className="text-base text-gray-500 mt-1">
                    Duration: {booking.details.duration}{" "}
                    {booking.details.bookingType === "daily" ? "days" : "hours"}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Vehicle Request Card (Tonal Layering Level 1) */}
          <section className="bg-white rounded-xl p-stack-md shadow-[0_4px_12px_rgba(0,88,190,0.1)]">
            <h3 className="text-lg font-semibold text-gray-900 mb-stack-sm flex items-center gap-2">
              <span
                className="material-symbols-outlined text-blue-600"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                directions_car
              </span>
              Vehicle Details
            </h3>
            <div className="flex flex-col gap-4 mt-4 mb-4">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase">
                  Booking Type
                </p>
                <p className="text-base font-medium capitalize">
                  {booking.details.bookingType}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase">
                  Passengers
                </p>
                <p className="text-base font-medium">
                  {booking.details.passengers || "-"}
                </p>
              </div>
            </div>

            {booking.assignedVehicle || booking.assignedDriver ? (
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 space-y-4">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Fulfillment Assignment
                </h4>
                {booking.assignedVehicle && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-600 text-[24px]">
                      directions_car
                    </span>
                    <div>
                      <p className="text-lg text-body-lg text-gray-900 font-semibold">
                        {booking.assignedVehicle.make}{" "}
                        {booking.assignedVehicle.model}
                      </p>
                      <p className="text-base text-gray-500 font-mono">
                        {booking.assignedVehicle.license_plate}
                      </p>
                    </div>
                  </div>
                )}
                {booking.assignedDriver && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-600 text-[24px]">
                      person
                    </span>
                    <div>
                      <p className="text-lg text-body-lg text-gray-900 font-semibold">
                        {booking.assignedDriver.name}
                      </p>
                      <p className="text-base text-gray-500">
                        {booking.assignedDriver.phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-4 p-4 rounded-lg bg-[#FFF8E1] border border-[#FFECB3] text-[#B08D00] flex gap-2 items-start">
                <span className="material-symbols-outlined">info</span>
                <p className="text-sm">
                  Driver and specific vehicle details will be assigned closer to
                  your pickup date. We will notify you when they are ready.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Right Column (Approx 40%) - Sticky Sidebar */}
        <div className="w-full lg:w-2/5 space-y-stack-lg sticky top-24">
          {/* Payment Summary */}
          <section className="bg-white rounded-xl p-stack-md shadow-[0_8px_24px_rgba(0,88,190,0.15)] border border-[#d3e4fe] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-stack-md">
              Payment Summary
            </h3>
            <div className="space-y-3 mb-6">
              <div className="w-full h-[1px] bg-gray-200/30 my-4"></div>
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-lg font-semibold font-bold text-gray-900">
                    Total Amount
                  </span>
                </div>
                <span className="text-xl font-bold font-bold text-blue-600">
                  S${parseFloat(booking.amount).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
              <span
                className="material-symbols-outlined text-blue-600 mt-0.5"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                info
              </span>
              <p className="text-base text-gray-500 text-sm leading-snug">
                Cancellation is free up to 2 hours before the scheduled pickup
                time.
              </p>
            </div>
          </section>

          {/* Action Buttons */}
          <section className="flex flex-col gap-3">
            {booking.status === "PENDING" && (
              <button
                onClick={() =>
                  alert("Redirecting to secure payment gateway...")
                }
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                Pay S${parseFloat(booking.amount).toFixed(2)} Now
              </button>
            )}
            <button
              aria-disabled
              className="w-full h-[44px] mt-2 text-blue-600 text-base font-medium hover:underline flex items-center justify-center gap-2"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                download
              </span>
              Download Invoice (PDF)
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}
