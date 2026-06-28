import React from "react";
import ImageWithFallback from "../../components/ImageWithFallback";

export default function Packages() {
  return (
    <div className="px-margin-mobile md:px-8 pb-12 w-full max-w-[1600px] mx-auto">
      {/* Page Header & Top Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-stack-lg">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl font-bold text-gray-900 mb-1">
            Tour Packages
          </h2>
          <p className="text-base text-gray-500">
            Manage all active and archived travel packages.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Add Button */}
          <button className="flex items-center gap-2 px-4 h-[44px] bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-600/90 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Add New Package</span>
          </button>
        </div>
      </div>

      {/* Filters & Data Table Container */}
      <div className="elevation-1 rounded-xl border border-gray-200 overflow-hidden flex flex-col bg-white">
        {/* Filters Tabs */}
        <div className="flex items-center gap-6 px-6 border-b border-gray-200 overflow-x-auto no-scrollbar bg-white">
          <button className="h-14 px-2 font-medium text-sm text-blue-600 border-b-2 border-blue-600 whitespace-nowrap">
            All Packages{" "}
            <span className="ml-1.5 inline-flex items-center justify-center bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              18
            </span>
          </button>
          <button className="h-14 px-2 font-medium text-sm text-gray-500 hover:text-gray-900 whitespace-nowrap transition-colors">
            Active{" "}
            <span className="ml-1.5 inline-flex items-center justify-center bg-slate-50-variant text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
              12
            </span>
          </button>
          <button className="h-14 px-2 font-medium text-sm text-gray-500 hover:text-gray-900 whitespace-nowrap transition-colors">
            Drafts{" "}
            <span className="ml-1.5 inline-flex items-center justify-center bg-slate-50-variant text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
              4
            </span>
          </button>
          <button className="h-14 px-2 font-medium text-sm text-gray-500 hover:text-gray-900 whitespace-nowrap transition-colors">
            Archived
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
              placeholder="Search packages..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-3 h-10 bg-white border border-gray-200 rounded-md text-gray-500 text-sm hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center">
              <span className="material-symbols-outlined text-[18px]">
                filter_list
              </span>
              <span>Category Filter</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-gray-200 text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Package Info</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Duration</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-base text-gray-900 bg-white divide-y divide-surface-variant/50">
              {/* Row 1 */}
              <tr className="hover:bg-gray-50 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1579899388835-26ab7017cd5d?auto=format&fit=crop&q=80&w=150&h=150"
                        alt="Gardens by the bay"
                        className="w-full h-full object-cover bg-slate-50"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 block">
                        Gardens by the Bay VIP
                      </span>
                      <span className="text-xs text-gray-500">PKG-1002</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100-high text-gray-500">
                    Luxury
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">SGD 299</div>
                </td>
                <td className="px-6 py-4 text-gray-500">4 Hours</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#137333]"></span>
                    Active
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-slate-50-variant rounded-md transition-colors"
                      title="View Details"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        visibility
                      </span>
                    </button>
                    <button
                      className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-slate-50-variant rounded-md transition-colors"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        edit
                      </span>
                    </button>
                    <button
                      className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-md transition-colors"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-gray-50 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1543265885-3b91bc6b2c4d?auto=format&fit=crop&q=80&w=150&h=150"
                        alt="Sentosa trails"
                        className="w-full h-full object-cover bg-slate-50"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 block">
                        Sentosa Hidden Trails
                      </span>
                      <span className="text-xs text-gray-500">PKG-1018</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100-high text-gray-500">
                    Adventure
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">SGD 150</div>
                </td>
                <td className="px-6 py-4 text-gray-500">6 Hours</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
                    Draft
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-slate-50-variant rounded-md transition-colors"
                      title="View Details"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        visibility
                      </span>
                    </button>
                    <button
                      className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-slate-50-variant rounded-md transition-colors"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        edit
                      </span>
                    </button>
                    <button
                      className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-md transition-colors"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-white">
          <span className="text-sm text-gray-500">
            Showing 1 to 10 of 18 entries
          </span>
          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              <span className="material-symbols-outlined text-[18px]">
                chevron_left
              </span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-600 text-white text-sm font-medium">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-50 text-gray-500 text-sm font-medium transition-colors">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50">
              <span className="material-symbols-outlined text-[18px]">
                chevron_right
              </span>
            </button>
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
