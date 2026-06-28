import React from "react";

export default function SEO() {
  return (
    <div className="px-margin-mobile md:px-8 pb-12 w-full max-w-[1200px] mx-auto overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-stack-lg">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl font-bold text-gray-900 mb-1">
            SEO Performance
          </h2>
          <p className="text-base text-gray-500">
            Monitor search visibility and optimize meta content.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 h-[44px] bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-600/90 transition-colors shadow-sm">
          <span>Generate Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl elevation-1 border border-gray-200 p-6">
          <p className="text-xs font-bold text-gray-500 tracking-wider mb-2 uppercase">
            Organic Traffic
          </p>
          <div className="text-3xl font-bold text-gray-900 mb-1">45,231</div>
          <div className="text-sm text-[#137333] font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">
              arrow_upward
            </span>{" "}
            +12.5%
          </div>
        </div>
        <div className="bg-white rounded-xl elevation-1 border border-gray-200 p-6">
          <p className="text-xs font-bold text-gray-500 tracking-wider mb-2 uppercase">
            Average CTR
          </p>
          <div className="text-3xl font-bold text-gray-900 mb-1">4.8%</div>
          <div className="text-sm text-[#137333] font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">
              arrow_upward
            </span>{" "}
            +0.3%
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl elevation-1 border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-4">
          <span className="material-symbols-outlined text-blue-600">
            edit_document
          </span>
          <h3 className="text-lg font-semibold text-gray-900">
            Meta Titles & Descriptions Editor
          </h3>
        </div>
        <div className="space-y-4 max-w-3xl">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Target Page
            </label>
            <div className="relative">
              <select className="w-full h-[44px] px-4 appearance-none bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-gray-900 pr-10">
                <option value="/packages/gardens-vip">
                  /packages/gardens-vip
                </option>
                <option value="/tours/marina-bay">/tours/marina-bay</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                expand_more
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Meta Title (Max 60 chars)
            </label>
            <input
              type="text"
              defaultValue="VIP Gardens by the Bay Tour | SG Premium"
              className="w-full h-[44px] px-4 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Meta Description (Max 160 chars)
            </label>
            <textarea
              className="w-full p-4 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-gray-900 min-h-[100px] resize-y"
              defaultValue="Experience the ultimate luxury tour of Gardens by the Bay. Exclusive access, private guide, and premium transport included."
            ></textarea>
          </div>
          <button className="flex items-center gap-2 px-4 h-[44px] bg-blue-100 text-blue-900 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors mt-2">
            Save Changes
          </button>
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
