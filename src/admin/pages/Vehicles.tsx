import React from "react";
import ImageWithFallback from "../../components/ImageWithFallback";

export default function Vehicles() {
  return (
    <div className="px-margin-mobile md:px-8 pb-12 w-full max-w-[1200px] mx-auto overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-stack-lg">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl font-bold text-gray-900 mb-1">
            Vehicle Management
          </h2>
          <p className="text-base text-gray-500">
            Manage your fleet and availability.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 h-[44px] bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-600/90 transition-colors shadow-sm">
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Add New Vehicle</span>
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-stack-md no-scrollbar">
        <button className="px-4 h-[36px] items-center justify-center rounded-md border border-blue-600 bg-blue-100/50 text-blue-600 text-sm font-medium whitespace-nowrap transition-colors">
          All Vehicles
        </button>
        <button className="px-4 h-[36px] items-center justify-center rounded-md border border-gray-200 text-gray-500 bg-white text-sm font-medium whitespace-nowrap hover:bg-gray-50 hover:text-gray-900 transition-colors">
          Executive Sedan
        </button>
        <button className="px-4 h-[36px] items-center justify-center rounded-md border border-gray-200 text-gray-500 bg-white text-sm font-medium whitespace-nowrap hover:bg-gray-50 hover:text-gray-900 transition-colors">
          Luxury SUV
        </button>
        <button className="px-4 h-[36px] items-center justify-center rounded-md border border-gray-200 text-gray-500 bg-white text-sm font-medium whitespace-nowrap hover:bg-gray-50 hover:text-gray-900 transition-colors">
          Premium MPV
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-xl overflow-hidden elevation-1 border border-gray-200 flex flex-col group">
          <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800"
              alt="Mercedes S-Class"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-slate-50/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider text-gray-900 flex items-center gap-1.5 border border-gray-200">
              <div className="w-1.5 h-1.5 rounded-full bg-[#137333]"></div>{" "}
              AVAILABLE
            </div>
          </div>
          <div className="p-5 flex flex-col flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Mercedes-Benz S-Class
            </h3>
            <div className="flex items-center gap-4 text-gray-500 text-sm mb-4 border-b border-gray-200/50 pb-4">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">
                  person
                </span>{" "}
                3
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">
                  work
                </span>{" "}
                2
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <button className="h-[36px] flex items-center justify-center gap-1.5 rounded-md border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors">
                <span className="material-symbols-outlined text-[16px]">
                  edit
                </span>{" "}
                Edit
              </button>
              <button className="h-[36px] flex items-center justify-center gap-1.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-600/90 transition-colors">
                <span className="material-symbols-outlined text-[16px]">
                  calendar_clock
                </span>{" "}
                Update
              </button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl overflow-hidden elevation-1 border border-gray-200 flex flex-col group">
          <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2000&auto=format&fit=crop"
              alt="Toyota Alphard"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 scale-x-[-1]"
            />
            <div className="absolute top-3 left-3 bg-slate-50/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider text-gray-900 flex items-center gap-1.5 border border-gray-200">
              <div className="w-1.5 h-1.5 rounded-full bg-[#fbbc04]"></div> IN
              USE
            </div>
          </div>
          <div className="p-5 flex flex-col flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Toyota Alphard
            </h3>
            <div className="flex items-center gap-4 text-gray-500 text-sm mb-4 border-b border-gray-200/50 pb-4">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">
                  person
                </span>{" "}
                6
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">
                  work
                </span>{" "}
                4
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <button className="h-[36px] flex items-center justify-center gap-1.5 rounded-md border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors">
                <span className="material-symbols-outlined text-[16px]">
                  edit
                </span>{" "}
                Edit
              </button>
              <button className="h-[36px] flex items-center justify-center gap-1.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-600/90 transition-colors">
                <span className="material-symbols-outlined text-[16px]">
                  calendar_clock
                </span>{" "}
                Update
              </button>
            </div>
          </div>
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
