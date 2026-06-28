import React from "react";

export default function Reports() {
  return (
    <div className="px-margin-mobile md:px-8 pb-12 w-full max-w-[1200px] mx-auto overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-stack-lg">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl font-bold text-gray-900 mb-1">
            Reports & Analytics
          </h2>
          <p className="text-base text-gray-500">Performance overview</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl elevation-1 border border-gray-200 p-6">
          <p className="text-xs tracking-wider text-gray-500 font-bold mb-2 uppercase">
            Total Revenue
          </p>
          <div className="text-3xl font-bold text-gray-900">S$142,500</div>
          <div className="text-sm text-[#137333] mt-2 flex items-center gap-1 font-medium">
            <span className="material-symbols-outlined text-[16px]">
              trending_up
            </span>{" "}
            +12.5%
          </div>
        </div>
        <div className="bg-white rounded-xl elevation-1 border border-gray-200 p-6">
          <p className="text-xs tracking-wider text-gray-500 font-bold mb-2 uppercase">
            Bookings
          </p>
          <div className="text-3xl font-bold text-gray-900">342</div>
          <div className="text-sm text-[#137333] mt-2 flex items-center gap-1 font-medium">
            <span className="material-symbols-outlined text-[16px]">
              trending_up
            </span>{" "}
            +8.2%
          </div>
        </div>
        <div className="bg-white rounded-xl elevation-1 border border-gray-200 p-6">
          <p className="text-xs tracking-wider text-gray-500 font-bold mb-2 uppercase">
            Avg Trip Value
          </p>
          <div className="text-3xl font-bold text-gray-900">S$416</div>
          <div className="text-sm text-gray-500 mt-2 flex items-center gap-1 font-medium">
            <span className="material-symbols-outlined text-[16px]">
              trending_flat
            </span>{" "}
            0.0%
          </div>
        </div>
        <div className="bg-white rounded-xl elevation-1 border border-gray-200 p-6">
          <p className="text-xs tracking-wider text-gray-500 font-bold mb-2 uppercase">
            New Customers
          </p>
          <div className="text-3xl font-bold text-gray-900">84</div>
          <div className="text-sm text-red-600 mt-2 flex items-center gap-1 font-medium">
            <span className="material-symbols-outlined text-[16px]">
              trending_down
            </span>{" "}
            -2.4%
          </div>
        </div>
      </div>

      {/* Chart Mockup */}
      <div className="bg-white rounded-xl elevation-1 border border-gray-200 p-6 h-80 flex flex-col items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-gray-500 mb-4">
          monitoring
        </span>
        <p className="text-gray-500 font-medium">
          Detailed charts view unavailable in basic preview
        </p>
      </div>
      <style>{`
 .elevation-1 {
 box-shadow: 0 4px 12px rgba(0, 88, 190, 0.05); /* very soft neutral-blue shadow */
 }
 `}</style>
    </div>
  );
}
