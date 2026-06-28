import React, { useState, useEffect } from "react";
import BookingWidget from "../../components/BookingWidget";
import BookingFlow from "../../pages/BookingFlow";
import axios from "axios";

export default function NewBooking() {
  const [activeTab, setActiveTab] = useState("vehicle");
  const [hasSearchData, setHasSearchData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkDraftAndData = async () => {
    setIsLoading(true);
    let sessionData = sessionStorage.getItem("bookingSearch");

    // If no active search in session, check backend for draft
    if (!sessionData) {
      try {
        const sessionId = localStorage.getItem("guestSessionId");
        if (sessionId) {
          const res = await axios.get(`/api/booking-drafts/${sessionId}`);
          if (res.data && res.data.search_parameters) {
            // Re-run search to get live vehicle data
            const searchRes = await axios.post(
              "/api/search",
              res.data.search_parameters,
            );
            const searchObj = {
              searchParams: res.data.search_parameters,
              results: searchRes.data.vehicles,
              tripMetadata: {
                travelDistance: searchRes.data.travelDistance,
                travelTime: searchRes.data.travelTime,
                eta: searchRes.data.eta,
              },
            };
            sessionStorage.setItem("bookingSearch", JSON.stringify(searchObj));
            setHasSearchData(true);
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch draft:", err);
      }
    } else {
      setHasSearchData(true);
      setIsLoading(false);
      return;
    }

    setHasSearchData(false);
    setIsLoading(false);
  };

  useEffect(() => {
    checkDraftAndData();

    const handleEvt = () => {
      checkDraftAndData();
    };

    window.addEventListener("bookingSearchEvt", handleEvt);
    return () => window.removeEventListener("bookingSearchEvt", handleEvt);
  }, []);

  if (isLoading) {
    return <div className="p-8">Loading booking details...</div>;
  }

  return (
    <main className="p-4 md:p-8 w-full flex-1 bg-slate-50">
      <div className="max-w-[1440px] mx-auto">
        {!hasSearchData ? (
          <>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-bold">
              New Booking
            </h2>
            <BookingWidget activeTab={activeTab} setActiveTab={setActiveTab} />
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-8 -mx-4 md:mx-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-4xl font-bold text-gray-900 font-bold">
                Select Vehicle & Confirm
              </h2>
              <button
                onClick={() => {
                  sessionStorage.removeItem("bookingSearch");
                  setHasSearchData(false);
                }}
                className="text-sm font-bold text-gray-500 hover:text-gray-800"
              >
                Start Over
              </button>
            </div>
            {/* Render BookingFlow in embedded mode (we wrap it but need to tweak it slightly to remove the full-screen layout constraints) */}
            <div className="embedded-flow overflow-hidden">
              <BookingFlow embedded={true} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
