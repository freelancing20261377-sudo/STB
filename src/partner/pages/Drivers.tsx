import React, { useState } from "react";

export default function PartnerDrivers() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["All", "On Duty", "Available", "High Rated"];

  return (
    <>
      {/* Summary Stats (Bento-style Grid) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-blue-600 bg-blue-50 p-2 rounded-lg">
              group
            </span>
            <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded">
              +4%
            </span>
          </div>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
            Total Drivers
          </p>
          <h3 className="text-4xl font-bold text-gray-900">128</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-green-700 bg-green-50 p-2 rounded-lg">
              bolt
            </span>
            <div className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse mt-1"></div>
          </div>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
            Active Now
          </p>
          <h3 className="text-4xl font-bold text-gray-900">94</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-amber-700 bg-amber-50 p-2 rounded-lg">
              schedule
            </span>
          </div>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
            On Duty
          </p>
          <h3 className="text-4xl font-bold text-gray-900">102</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-blue-600 bg-blue-50 p-2 rounded-lg">
              star
            </span>
          </div>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
            Avg Rating
          </p>
          <h3 className="text-4xl font-bold text-gray-900">4.9</h3>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="space-y-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              search
            </span>
            <input
              className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary/10 transition-all outline-none"
              placeholder="Search Driver Name, ID, or Vehicle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
            />
          </div>
          <button className="bg-white border border-gray-200 rounded-xl px-5 py-3 flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-gray-500">
              tune
            </span>
            Advanced Filters
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors ${isActive ? "bg-blue-600 text-white shadow-md" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </section>

      {/* Driver List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xl font-medium text-title-lg text-gray-900">
            All Drivers
          </h2>
          <span className="text-label-sm text-gray-500">
            Showing 1-20 of 128
          </span>
        </div>

        {/* Driver Card 1 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-5">
            <div className="relative shrink-0">
              <img
                className="w-16 h-16 rounded-full object-cover border-2 border-primary-fixed"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuCND9AiHoExwxZkUVZlkGxFFTyqdTd6F1kocrKy8YErFC5g4gIQTNu57l-uPm07W7Swbsr7GvPX3jnRkCfGmSuXWNk71D7K2hEfZ1ees6ct16vsXCO4xpSyiqpYPGVgMDzFJbjWJEPunPzcRvjFh6DXnGqJ-VUMx0qXiIFBI2WTJFUqZMNYay9vnoQoifMBdygra3HqcrhVS8CzobEA26aAvV-_sbwlck7gezqklZwZWoGIipkHhWYVVWGb_5z44WM5TC63ir9w8"
                alt="Driver"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-4">
                <div className="truncate">
                  <h4 className="text-xl font-medium text-title-lg text-gray-900 leading-tight truncate">
                    Michael Chen
                  </h4>
                  <p className="text-label-sm text-gray-500 mt-1">
                    ID: STB-882109
                  </p>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <div className="flex items-center text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full text-xs font-bold">
                    <span
                      className="material-symbols-outlined text-[14px] mr-1"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    4.9
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-green-700 mt-2">
                    On Duty
                  </span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-y-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600 text-[18px]">
                    directions_car
                  </span>
                  <span className="text-body-sm text-gray-500 truncate">
                    Mercedes S-Class
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600 text-[18px]">
                    call
                  </span>
                  <span className="text-body-sm text-gray-500 truncate">
                    +1 555-0122
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-gray-200 flex gap-4">
            <button className="flex-1 bg-white border border-gray-200 text-blue-600 text-sm font-medium py-2.5 rounded-lg hover:bg-blue-50 transition-colors">
              Logs
            </button>
            <button className="flex-1 bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all">
              Contact
            </button>
          </div>
        </div>

        {/* Driver Card 2 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-5">
            <div className="relative shrink-0">
              <img
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrmJSbyF02lCPhe14NLa_kQM43gU9gUYanZl3oXMB6rGp7AO_LzlUpYFNmn7pBhQZINeB_tIFJOAm3CwKAIlm_GADhl8-IradU7IOHnMNew2IUwfi-uV1NcvM1FAL239KNah2NapLrwaV3ZMyRzoTQOLDRKAr_ZdGH3x3WiU7I9QC3g696ulgC3s5HpprZ-5qX6Aav495YpGqKWjj_mSYBtHSzwsOx-sJBL2HP-lWi7pMOuSrQuGQfYw4EjMzCLdw4SJn6GVHN-og"
                alt="Driver"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-amber-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-4">
                <div className="truncate">
                  <h4 className="text-xl font-medium text-title-lg text-gray-900 leading-tight truncate">
                    Sarah Jenkins
                  </h4>
                  <p className="text-label-sm text-gray-500 mt-1">
                    ID: STB-883441
                  </p>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <div className="flex items-center text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full text-xs font-bold">
                    <span
                      className="material-symbols-outlined text-[14px] mr-1"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    5.0
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-amber-700 mt-2">
                    Away
                  </span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-y-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600 text-[18px]">
                    directions_car
                  </span>
                  <span className="text-body-sm text-gray-500 truncate">
                    Audi A8 L
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600 text-[18px]">
                    call
                  </span>
                  <span className="text-body-sm text-gray-500 truncate">
                    +1 555-0433
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-gray-200 flex gap-4">
            <button className="flex-1 bg-white border border-gray-200 text-blue-600 text-sm font-medium py-2.5 rounded-lg hover:bg-blue-50 transition-colors">
              Logs
            </button>
            <button className="flex-1 bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all">
              Contact
            </button>
          </div>
        </div>

        {/* Driver Card 3 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-5">
            <div className="relative shrink-0">
              <img
                className="w-16 h-16 rounded-full object-cover border-2 border-primary-fixed"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW4VJQQpduRgYzzx8BZbFsxszURulsKm5_ps7n4nOvghALSCtCsCSnKXQiluKONLu1Y7_Q_LXUw_gZlRLJfuFNgHgB2V48zZJCrXTeehqFEWkFOQnU_BhuD61BNa9vKIYQ3rkIxCvCAXW42GI6VnpT2m0GW28DHOTxZdR2YYzNRfSYpQlJ-k4sYdaUfcULM4KrxVE7WjZ-xvT61xd0VgIaZq4q1yBTJMKuLvDFi6U2y5gsyd-KENPsO7IqQzD-EKfA8YwahTVZlcM"
                alt="Driver"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-4">
                <div className="truncate">
                  <h4 className="text-xl font-medium text-title-lg text-gray-900 leading-tight truncate">
                    David Miller
                  </h4>
                  <p className="text-label-sm text-gray-500 mt-1">
                    ID: STB-889021
                  </p>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <div className="flex items-center text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full text-xs font-bold">
                    <span
                      className="material-symbols-outlined text-[14px] mr-1"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    4.8
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-green-700 mt-2">
                    On Duty
                  </span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-y-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600 text-[18px]">
                    directions_car
                  </span>
                  <span className="text-body-sm text-gray-500 truncate">
                    BMW 7 Series
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600 text-[18px]">
                    call
                  </span>
                  <span className="text-body-sm text-gray-500 truncate">
                    +1 555-0988
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-gray-200 flex gap-4">
            <button className="flex-1 bg-white border border-gray-200 text-blue-600 text-sm font-medium py-2.5 rounded-lg hover:bg-blue-50 transition-colors">
              Logs
            </button>
            <button className="flex-1 bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all">
              Contact
            </button>
          </div>
        </div>
      </section>

      {/* Performance & Activity (Asymmetric Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Summary */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full">
          <h3 className="text-xl font-medium text-title-lg text-gray-900 mb-6">
            Performance Summary
          </h3>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-end mb-3">
                <span className="text-label-sm text-gray-500 uppercase tracking-wider">
                  Completed Trips
                </span>
                <span className="text-sm font-medium text-gray-900 font-medium">
                  2,412 / 3,000
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Weekly Revenue
                </p>
                <p className="text-2xl font-bold text-blue-600">S$18.5k</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  On-time %
                </p>
                <p className="text-2xl font-bold text-green-700">98.2%</p>
              </div>
            </div>
            <button className="w-full py-3 text-blue-600 border border-primary text-sm font-medium rounded-lg hover:bg-blue-600 focus:text-white hover:text-white transition-all active:scale-95 shadow-sm">
              View Detailed Reports
            </button>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full">
          <h3 className="text-xl font-medium text-title-lg text-gray-900 mb-6">
            Recent Activity
          </h3>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                <span className="material-symbols-outlined text-[20px] text-blue-600">
                  check_circle
                </span>
              </div>
              <div className="flex-1 mt-0.5">
                <p className="text-gray-900">
                  <span className="font-medium text-gray-900">
                    Michael Chen
                  </span>{" "}
                  completed Trip #BK-99210
                </p>
                <p className="text-[11px] font-bold tracking-widest uppercase text-gray-500 mt-1.5">
                  2 Minutes Ago
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100">
                <span className="material-symbols-outlined text-[20px] text-amber-600">
                  login
                </span>
              </div>
              <div className="flex-1 mt-0.5">
                <p className="text-gray-900">
                  <span className="font-medium text-gray-900">
                    David Miller
                  </span>{" "}
                  clocked in for Duty
                </p>
                <p className="text-[11px] font-bold tracking-widest uppercase text-gray-500 mt-1.5">
                  15 Minutes Ago
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0 border border-green-100">
                <span className="material-symbols-outlined text-[20px] text-green-600">
                  add_reaction
                </span>
              </div>
              <div className="flex-1 mt-0.5">
                <p className="text-gray-900">
                  <span className="font-medium text-gray-900">
                    Sarah Jenkins
                  </span>{" "}
                  received 5-star rating
                </p>
                <p className="text-[11px] font-bold tracking-widest uppercase text-gray-500 mt-1.5">
                  45 Minutes Ago
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0 border border-red-600/20">
                <span className="material-symbols-outlined text-[20px] text-red-600">
                  error
                </span>
              </div>
              <div className="flex-1 mt-0.5">
                <p className="text-gray-900">
                  <span className="font-medium text-gray-900">Mark Wilson</span>{" "}
                  reported a maintenance issue
                </p>
                <p className="text-[11px] font-bold tracking-widest uppercase text-gray-500 mt-1.5">
                  1 Hour Ago
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-md lg:bottom-6 lg:right-6 md:right-lg flex items-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined">person_add</span>
        <span className="text-sm font-medium">Add Driver</span>
      </button>
    </>
  );
}
