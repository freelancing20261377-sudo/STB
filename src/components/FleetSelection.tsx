import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

export default function FleetSelection() {
  return (
    <main className="max-w-[1200px] mx-auto py-12 px-4 md:px-12 w-full">
      <header className="mb-10 px-4">
        <p className="text-orange-primary uppercase tracking-widest text-xs font-bold mb-2">
          Elite Selection
        </p>
        <h1 className="text-navy text-3xl font-extrabold">
          Premium Mobility Fleet
        </h1>
      </header>

      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4"
        data-purpose="fleet-grid"
      >
        {/* Card 1: Executive Sedan */}
        <article
          className="bg-white rounded-2xl overflow-hidden card-shadow border border-gray-100 flex flex-col"
          data-purpose="vehicle-card"
        >
          <div className="relative h-64 overflow-hidden">
            <ImageWithFallback
              alt="Executive Sedan"
              className="w-full h-full object-cover object-center"
              src="/executive sedan.jpg"
            />
            <span className="absolute top-4 left-4 badge-dark text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              Executive
            </span>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-navy font-bold text-lg">Executive Sedan</h2>
              <div className="text-right">
                <span className="text-orange-primary text-2xl font-bold">
                  S$120
                </span>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                  Per Hour
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 mb-8 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                <span>3 Passengers</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                <span>2 Luggage</span>
              </div>
            </div>
          </div>
        </article>

        {/* Card 2: Luxury SUV */}
        <article
          className="bg-white rounded-2xl overflow-hidden card-shadow border border-gray-100 flex flex-col"
          data-purpose="vehicle-card"
        >
          <div className="relative h-64 overflow-hidden">
            <ImageWithFallback
              alt="Luxury SUV"
              className="w-full h-full object-cover object-center"
              src="/Luxury suv.webp"
            />
            <span className="absolute top-4 left-4 badge-dark text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              Ultimate Luxury
            </span>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-navy font-bold text-lg">Luxury SUV</h2>
              <div className="text-right">
                <span className="text-orange-primary text-2xl font-bold">
                  S$180
                </span>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                  Per Hour
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 mb-8 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                <span>4 Passengers</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                <span>3 Luggage</span>
              </div>
            </div>
          </div>
        </article>

        {/* Card 3: Premium MPV */}
        <article
          className="bg-white rounded-2xl overflow-hidden card-shadow border border-gray-100 flex flex-col"
          data-purpose="vehicle-card"
        >
          <div className="relative h-64 overflow-hidden">
            <ImageWithFallback
              alt="Premium MPV"
              className="w-full h-full object-cover object-center"
              src="/Premium MPV-1.jpg"
            />
            <span className="absolute top-4 left-4 badge-dark text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              Business Class
            </span>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-navy font-bold text-lg">Premium MPV</h2>
              <div className="text-right">
                <span className="text-orange-primary text-2xl font-bold">
                  S$150
                </span>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                  Per Hour
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 mb-8 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                <span>6 Passengers</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                <span>4 Luggage</span>
              </div>
            </div>
          </div>
        </article>

        {/* Card 4: VIP Minibus */}
        <article
          className="bg-white rounded-2xl overflow-hidden card-shadow border border-gray-100 flex flex-col"
          data-purpose="vehicle-card"
        >
          <div className="relative h-64 overflow-hidden">
            <ImageWithFallback
              alt="VIP Minibus"
              className="w-full h-full object-cover object-center"
              src="/VIP Minibus.jpg"
            />
            <span className="absolute top-4 left-4 badge-dark text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              Group Travel
            </span>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-navy font-bold text-lg">VIP Minibus</h2>
              <div className="text-right">
                <span className="text-orange-primary text-2xl font-bold">
                  S$250
                </span>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                  Per Hour
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 mb-8 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                <span>13 Passengers</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                <span>10 Luggage</span>
              </div>
            </div>
          </div>
        </article>
      </section>

      <div className="mt-12 text-center">
        <Link 
          to="/fleets"
          className="inline-flex items-center px-6 py-3 border border-amber-500 text-amber-600 hover:bg-amber-50 font-semibold rounded-xl transition-colors duration-200 group"
        >
          See all fleets
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </main>
  );
}
