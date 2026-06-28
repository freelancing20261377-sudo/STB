import React from "react";

export default function Content() {
  return (
    <div className="px-margin-mobile md:px-8 pb-12 w-full max-w-[1200px] mx-auto overflow-x-hidden">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-stack-lg">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl font-bold text-gray-900 mb-1">
            Content Management
          </h2>
          <p className="text-base text-gray-500">
            Update landing page content, banners, and policies.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 h-[44px] border border-gray-200 rounded-lg text-gray-900 text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">
              preview
            </span>
            <span>Preview</span>
          </button>
          <button className="flex items-center gap-2 px-4 h-[44px] bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-600/90 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">
              publish
            </span>
            <span>Publish Changes</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Content Navigation Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white elevation-1 rounded-xl p-2 sticky top-24 border border-gray-200">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto no-scrollbar">
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-100/50 text-blue-600 font-semibold text-left whitespace-nowrap lg:whitespace-normal">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  home_work
                </span>
                Hero Section
              </button>
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 text-left transition-colors whitespace-nowrap lg:whitespace-normal">
                <span className="material-symbols-outlined text-[20px]">
                  diamond
                </span>
                Why Choose Us
              </button>
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 text-left transition-colors whitespace-nowrap lg:whitespace-normal">
                <span className="material-symbols-outlined text-[20px]">
                  reviews
                </span>
                Testimonials
              </button>
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 text-left transition-colors whitespace-nowrap lg:whitespace-normal">
                <span className="material-symbols-outlined text-[20px]">
                  policy
                </span>
                Policies & Terms
              </button>
            </nav>
          </div>
        </div>

        {/* Content Editor Area */}
        <div className="flex-1 space-y-8">
          <div className="bg-white elevation-1 rounded-xl border border-gray-200 p-6 md:p-8">
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Hero Section
              </h3>
              <div className="flex bg-gray-50 rounded-lg p-1">
                <button className="px-3 py-1.5 text-sm font-medium rounded-md bg-white shadow-sm text-gray-900">
                  Desktop
                </button>
                <button className="px-3 py-1.5 text-sm font-medium rounded-md text-gray-500 hover:text-gray-900">
                  Mobile
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Image Editor */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Background Image
                </label>
                <div className="relative h-[240px] rounded-xl overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1542385151-efd9000785a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                    alt="Hero Background preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-gray-900 rounded-lg font-medium shadow-lg hover:bg-white transition-colors">
                      <span className="material-symbols-outlined text-sm">
                        swap_horiz
                      </span>
                      Change Image
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Optimal size: 1920x1080px. Format: JPG or WebP.
                </p>
              </div>

              {/* Typography Editors */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">
                    Headline
                  </label>
                  <input
                    type="text"
                    className="w-full h-[44px] px-4 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-gray-900 text-lg font-bold"
                    defaultValue="Experience Singapore in Unmatched Luxury"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">
                    Subheadline
                  </label>
                  <textarea
                    className="w-full p-4 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-gray-900 resize-y min-h-[100px]"
                    defaultValue="Premium chauffeured transport and bespoke tours tailored for the discerning traveler."
                  ></textarea>
                </div>
              </div>

              {/* Button Action Editor */}
              <div className="pt-4 border-t border-gray-200/50">
                <h4 className="font-medium text-gray-900 mb-3">
                  Primary Call-to-Action
                </h4>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Button Text
                    </label>
                    <input
                      type="text"
                      className="w-full h-[40px] px-3 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none text-sm text-gray-900"
                      defaultValue="Book Your Ride"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Link Target
                    </label>
                    <input
                      type="text"
                      className="w-full h-[40px] px-3 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none text-sm text-gray-900"
                      defaultValue="#booking-widget"
                    />
                  </div>
                </div>
              </div>
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
