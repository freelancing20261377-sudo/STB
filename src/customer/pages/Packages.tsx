import React, { useState } from "react";
import { Link } from "react-router-dom";
import { tours } from "../../data/tours";
import ImageWithFallback from "../../components/ImageWithFallback";

export default function Packages() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Map tours to categories for filtering
  const getCategory = (slug: string) => {
    if (slug.includes("luxury") || slug.includes("yacht")) return "Luxury";
    if (slug.includes("adventure") || slug.includes("safari"))
      return "Adventure";
    if (slug.includes("night") || slug.includes("airport"))
      return "Nature / Transit";
    if (
      slug.includes("city") ||
      slug.includes("hourly") ||
      slug.includes("daily")
    )
      return "City Tours";
    return "Luxury";
  };

  const filteredTours =
    selectedCategory === "All"
      ? tours
      : tours.filter((t) => {
          const cat = getCategory(t.slug);
          return cat.toLowerCase().includes(selectedCategory.toLowerCase());
        });

  return (
    <main className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px] mx-auto w-full flex-1 font-sans">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Available Packages
          </h2>
          <p className="text-slate-600 max-w-2xl">
            Browse all available Singapore tour experiences and premium travel
            packages curated for our guests.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <Link
            to="/"
            className="px-4 h-[44px] bg-[#0058BE] text-white rounded-lg font-medium hover:bg-[#004a9e] transition-colors shadow-sm flex items-center gap-2 text-sm justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Book Custom Travel
          </Link>
        </div>
      </div>

      {/* Categories Chips */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
        {["All", "Luxury", "Adventure", "City Tours"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-[#0058BE] text-white shadow-sm"
                : "bg-white border border-gray-200 text-slate-600 hover:text-slate-950 hover:border-slate-400"
            }`}
          >
            {cat === "All" ? "All Experiences" : cat}
          </button>
        ))}
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTours.map((tour) => (
          <article
            key={tour.slug}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative border border-gray-100"
          >
            <div className="relative h-64 overflow-hidden bg-gray-50">
              <ImageWithFallback
                alt={tour.title}
                src={tour.coverImage || tour.heroImage}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-[#0058BE]/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {tour.slug.includes("transfer") ||
                  tour.slug.includes("booking")
                    ? "Private Service"
                    : "Bespoke Package"}
                </span>
                <span className="bg-emerald-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm w-fit">
                  {getCategory(tour.slug)}
                </span>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2 gap-2">
                <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-[#0058BE] transition-colors">
                  {tour.title}
                </h3>
              </div>
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                {tour.subtitle}
              </p>

              <div className="flex items-center gap-4 mt-auto mb-5 text-slate-500 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">
                    schedule
                  </span>
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-amber-500">
                    star
                  </span>
                  <span className="text-slate-800 font-bold">5.0</span>
                  <span>({tour.reviews.length} Reviews)</span>
                </div>
              </div>

              <hr className="border-gray-100 mb-5" />

              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    Starting from
                  </span>
                  <span className="text-xl font-black text-[#0058BE]">
                    {tour.price}
                  </span>
                </div>
                <Link
                  to={`/tours/${tour.slug}`}
                  className="px-5 py-3 bg-[#0058BE] hover:bg-[#004a9e] text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm hover:shadow"
                >
                  View Details
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredTours.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 mt-8">
          <p className="text-slate-500 font-medium">
            No packages found for this selection.
          </p>
        </div>
      )}
    </main>
  );
}
