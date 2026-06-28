import React from "react";

export default function Customers() {
  return (
    <div className="px-margin-mobile md:px-8 pb-12 w-full max-w-[1600px] mx-auto">
      {/* Page Header & Top Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-stack-lg">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl font-bold text-gray-900 mb-1">
            Customers
          </h2>
          <p className="text-base text-gray-500">
            View and manage customer directory and profiles.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 h-[44px] bg-white border border-gray-200 rounded-lg text-gray-900 text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">
              download
            </span>
            <span>Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 h-[44px] bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-600/90 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>New Customer</span>
          </button>
        </div>
      </div>

      {/* Filters & Data Table Container */}
      <div className="elevation-1 rounded-xl border border-gray-200 overflow-hidden flex flex-col bg-white">
        {/* Table Controls (Filter/Search within table) */}
        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border-b border-gray-200/50">
          <div className="relative w-full sm:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[18px]">
              search
            </span>
            <input
              className="w-full h-10 pl-9 pr-4 text-sm bg-gray-50 border-none rounded-md focus:ring-1 focus:ring-blue-600 text-gray-900 placeholder:text-gray-500/70"
              placeholder="Search customers..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-3 h-10 bg-white border border-gray-200 rounded-md text-gray-500 text-sm hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center">
              <span className="material-symbols-outlined text-[18px]">
                filter_list
              </span>
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-gray-200 text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Contact Info</th>
                <th className="px-6 py-4 font-medium text-right">Bookings</th>
                <th className="px-6 py-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-base text-gray-900 bg-white divide-y divide-surface-variant/50">
              <tr className="hover:bg-gray-50 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      className="w-10 h-10 rounded-full object-cover border border-gray-100"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhha2ICLEzQ_rqQ2fkFOqv8IGbLZr-LPIg2NeyDwCANIhnS3PmSXLThBRMmOrAVtyCQFAwuYfpcgklAwKQSctuLX49esU-lowxTtNT9WxR_vQ1dgmpp9ulHgV_WwMq4o0d8fl_TD42MNLat3H7Z2Elclo4i2rsSV4CMKg5s4JnLWmpTK9ezdcNlyFthAboFOZshbNDeDHLlLklJfN9gRx3O7_pguYKDzfPZh-TdQCAC31TgKsR16nV_-L7UEoN65GdY4j27WUETrY"
                      alt="Customer"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        Jason Lee
                      </div>
                      <div className="text-xs text-gray-500">CUS-8892</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    jason.lee@email.com
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    +65 9123 4567
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-semibold text-blue-600 text-lg">
                    12
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
                      title="Email"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        mail
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 border border-gray-100">
                      SW
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Sarah Wong
                      </div>
                      <div className="text-xs text-gray-500">CUS-9104</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    s.wong@corporate.sg
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    +65 8234 5678
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-semibold text-blue-600 text-lg">8</span>
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
                      title="Email"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        mail
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
            Showing 1 to 10 of 892 entries
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
            <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-50 text-gray-500 text-sm font-medium transition-colors">
              3
            </button>
            <span className="text-gray-500">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-50 text-gray-500 text-sm font-medium transition-colors">
              90
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
