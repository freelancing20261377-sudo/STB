import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    activeCustomers: 0,
    pendingBookings: 0,
  });

  useEffect(() => {
    axios
      .get("/api/admin/dashboard")
      .then((res) => setStats(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="px-4 sm:px-8 pb-12 max-w-7xl mx-auto w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl font-bold text-gray-900">
            Admin Dashboard
          </h2>
          <p className="text-gray-500 mt-1">
            Overview of your operations and performance.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-gray-900 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined text-sm">download</span>
            Export
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-600/90 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-sm">
              calendar_month
            </span>
            Last 30 Days
          </button>
        </div>
      </div>

      {/* Metric Cards (Bento Style) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {/* Card 1 */}
        <div className="bg-white rounded-xl p-4 card-shadow flex flex-col col-span-2 lg:col-span-2 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 blur-xl group-hover:scale-110 transition-transform duration-500"></div>
          <div className="flex items-center gap-3 mb-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700">
              <span
                className="material-symbols-outlined icon-fill"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                payments
              </span>
            </div>
            <h3 className="text-gray-500 font-medium">Total Revenue</h3>
          </div>
          <div className="mt-auto relative z-10">
            <p className="text-xl font-bold text-gray-900 mb-1">
              SGD{" "}
              {stats.totalRevenue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-sm text-blue-600 font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                trending_up
              </span>
              vs last month
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl p-4 card-shadow flex flex-col col-span-2 lg:col-span-2 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-100 rounded-full opacity-50 blur-xl group-hover:scale-110 transition-transform duration-500"></div>
          <div className="flex items-center gap-3 mb-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-blue-100/20 flex items-center justify-center text-blue-600">
              <span
                className="material-symbols-outlined icon-fill"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                book_online
              </span>
            </div>
            <h3 className="text-gray-500 font-medium">Total Bookings</h3>
          </div>
          <div className="mt-auto relative z-10">
            <p className="text-xl font-bold text-gray-900 mb-1">
              {stats.totalBookings}
            </p>
            <p className="text-sm text-blue-600 font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                trending_up
              </span>
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl p-4 card-shadow flex flex-col col-span-1 lg:col-span-1">
          <h3 className="text-gray-500 font-medium text-sm mb-2">
            Active Vehicles
          </h3>
          <div className="mt-auto">
            <p className="text-xl font-bold text-gray-900">42</p>
            <div className="w-full bg-gray-100 mt-2 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full"
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl p-4 card-shadow flex flex-col col-span-1 lg:col-span-1">
          <h3 className="text-gray-500 font-medium text-sm mb-2">
            Tour Packages
          </h3>
          <div className="mt-auto">
            <p className="text-xl font-bold text-gray-900">18</p>
            <p className="text-xs text-gray-500 mt-1">4 running promos</p>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white rounded-xl p-4 card-shadow flex flex-col col-span-1 lg:col-span-1">
          <h3 className="text-gray-500 font-medium text-sm mb-2">Customers</h3>
          <div className="mt-auto">
            <p className="text-xl font-bold text-gray-900">892</p>
            <p className="text-xs text-blue-600 mt-1">+24 this week</p>
          </div>
        </div>

        {/* Card 6 */}
        <div className="bg-red-100/30 border border-red-600/20 rounded-xl p-4 card-shadow flex flex-col col-span-1 lg:col-span-1 relative overflow-hidden">
          <h3 className="text-gray-500 font-medium text-sm mb-2">
            Pending Requests
          </h3>
          <div className="mt-auto flex items-end justify-between">
            <p className="text-xl font-bold text-red-600">12</p>
            <span className="material-symbols-outlined text-red-600 opacity-50 text-3xl">
              warning
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 card-shadow border border-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue & Bookings Trend
              </h3>
              <p className="text-sm text-gray-500">
                Monthly comparison for current year
              </p>
            </div>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 px-2 py-1 rounded bg-gray-50">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>{" "}
                Revenue
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 px-2 py-1 rounded bg-gray-50">
                <span className="w-2 h-2 rounded-full bg-blue-200"></span>{" "}
                Bookings
              </span>
            </div>
          </div>
          {/* Faux Chart Representation using CSS Grid/Flex for visual structure */}
          <div className="h-64 flex items-end justify-between gap-2 relative mt-4 border-l border-b border-gray-100 pb-2 pl-2">
            {/* Y Axis labels */}
            <div className="absolute -left-8 bottom-0 top-0 flex flex-col justify-between text-xs text-gray-500 py-2">
              <span>150k</span>
              <span>100k</span>
              <span>50k</span>
              <span>0</span>
            </div>
            {/* Grid lines */}
            <div
              className="absolute inset-0 border-t border-gray-50 pointer-events-none"
              style={{ top: "25%" }}
            ></div>
            <div
              className="absolute inset-0 border-t border-gray-50 pointer-events-none"
              style={{ top: "50%" }}
            ></div>
            <div
              className="absolute inset-0 border-t border-gray-50 pointer-events-none"
              style={{ top: "75%" }}
            ></div>

            {/* Data Bars */}
            <div className="flex-1 flex flex-col justify-end group">
              <div
                className="w-full bg-blue-200 rounded-t-sm hover:opacity-80 transition-opacity"
                style={{ height: "30%" }}
              ></div>
              <div className="text-center text-xs text-gray-500 mt-2">Jan</div>
            </div>
            <div className="flex-1 flex flex-col justify-end group">
              <div
                className="w-full bg-blue-200 rounded-t-sm hover:opacity-80 transition-opacity"
                style={{ height: "45%" }}
              ></div>
              <div className="text-center text-xs text-gray-500 mt-2">Feb</div>
            </div>
            <div className="flex-1 flex flex-col justify-end group relative">
              <div className="absolute w-3 h-3 bg-blue-600 rounded-full border-2 border-surface-container-lowest top-[-40%] left-1/2 -translate-x-1/2 z-10"></div>
              <div
                className="w-full bg-blue-200 rounded-t-sm hover:opacity-80 transition-opacity"
                style={{ height: "40%" }}
              ></div>
              <div className="text-center text-xs text-gray-500 mt-2">Mar</div>
            </div>
            <div className="flex-1 flex flex-col justify-end group relative">
              <div className="absolute w-3 h-3 bg-blue-600 rounded-full border-2 border-surface-container-lowest top-[-60%] left-1/2 -translate-x-1/2 z-10"></div>
              <div
                className="w-full bg-blue-200 rounded-t-sm hover:opacity-80 transition-opacity"
                style={{ height: "60%" }}
              ></div>
              <div className="text-center text-xs text-gray-500 mt-2">Apr</div>
            </div>
            <div className="flex-1 flex flex-col justify-end group relative">
              <div className="absolute w-3 h-3 bg-blue-600 rounded-full border-2 border-surface-container-lowest top-[-80%] left-1/2 -translate-x-1/2 z-10"></div>
              <div
                className="w-full bg-blue-200 rounded-t-sm hover:opacity-80 transition-opacity"
                style={{ height: "75%" }}
              ></div>
              <div className="text-center text-xs text-gray-500 mt-2">May</div>
            </div>
            <div className="flex-1 flex flex-col justify-end group relative">
              <div className="absolute w-3 h-3 bg-blue-600 rounded-full border-2 border-surface-container-lowest top-[-90%] left-1/2 -translate-x-1/2 z-10"></div>
              <div
                className="w-full bg-blue-600 rounded-t-sm hover:opacity-80 transition-opacity"
                style={{ height: "85%" }}
              ></div>
              <div className="text-center text-xs text-gray-500 font-bold mt-2">
                Jun
              </div>
            </div>
            {/* Connecting SVG lines for pseudo-line chart */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              style={{ zIndex: 5 }}
            >
              <path
                className="text-blue-600"
                d="M 8% 70% L 25% 55% L 41% 60% L 58% 40% L 75% 20% L 91% 10%"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </div>
        </div>

        {/* Secondary Chart Area (Donut) */}
        <div className="bg-white rounded-xl p-6 card-shadow border border-gray-50 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Package Performance
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Distribution of bookings by package
          </p>
          <div className="flex-1 flex items-center justify-center relative min-h-[200px]">
            {/* CSS Donut Chart representation */}
            <div className="w-48 h-48 rounded-full border-[24px] border-surface-container-low relative">
              <div className="absolute inset-[-24px] rounded-full border-[24px] border-primary border-t-transparent border-r-transparent rotate-45"></div>
              <div className="absolute inset-[-24px] rounded-full border-[24px] border-blue-600-container border-b-transparent border-l-transparent rotate-12"></div>
              {/* Center Info */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-full">
                <span className="text-2xl font-bold text-gray-900">1.2k</span>
                <span className="text-xs text-gray-500">Total</span>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                <span className="text-gray-900">City Highlights</span>
              </div>
              <span className="font-medium">45%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-100"></span>
                <span className="text-gray-900">Gardens VIP</span>
              </div>
              <span className="font-medium">35%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-50-variant"></span>
                <span className="text-gray-900">Other</span>
              </div>
              <span className="font-medium">20%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Activity Feed & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 card-shadow border border-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h3>
            <button className="text-blue-600 text-sm font-semibold hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-6">
            {/* Activity Item 1 */}
            <div className="flex gap-4 relative">
              <div className="absolute left-[19px] top-10 bottom-[-24px] w-px bg-gray-200/30"></div>
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-blue-600 z-10 shrink-0 border-2 border-surface-container-lowest">
                <span className="material-symbols-outlined text-[20px]">
                  book_online
                </span>
              </div>
              <div>
                <p className="text-gray-900 font-medium">
                  New Booking{" "}
                  <span className="font-bold text-blue-600">#STB-9021</span>
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  by Sarah Lim • Full Day City Tour
                </p>
                <p className="text-xs text-outline font-medium mt-1">2m ago</p>
              </div>
            </div>
            {/* Activity Item 2 */}
            <div className="flex gap-4 relative">
              <div className="absolute left-[19px] top-10 bottom-[-24px] w-px bg-gray-200/30"></div>
              <div className="w-10 h-10 rounded-full bg-red-100/50 flex items-center justify-center text-red-600 z-10 shrink-0 border-2 border-surface-container-lowest">
                <span className="material-symbols-outlined text-[20px]">
                  cancel
                </span>
              </div>
              <div>
                <p className="text-gray-900 font-medium">
                  Booking Cancellation{" "}
                  <span className="font-bold">#STB-8942</span>
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  Customer requested refund • Processing
                </p>
                <p className="text-xs text-outline font-medium mt-1">15m ago</p>
              </div>
            </div>
            {/* Activity Item 3 */}
            <div className="flex gap-4 relative">
              <div className="absolute left-[19px] top-10 bottom-[-24px] w-px bg-gray-200/30"></div>
              <div className="w-10 h-10 rounded-full bg-gray-100-highest flex items-center justify-center text-blue-600 z-10 shrink-0 border-2 border-surface-container-lowest">
                <span className="material-symbols-outlined text-[20px]">
                  person_add
                </span>
              </div>
              <div>
                <p className="text-gray-900 font-medium">
                  New Customer Register
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  David Chen completed onboarding profile.
                </p>
                <p className="text-xs text-outline font-medium mt-1">1h ago</p>
              </div>
            </div>
            {/* Activity Item 4 */}
            <div className="flex gap-4 relative">
              <div className="w-10 h-10 rounded-full bg-blue-100/20 flex items-center justify-center text-blue-600-container z-10 shrink-0 border-2 border-surface-container-lowest">
                <span className="material-symbols-outlined text-[20px]">
                  edit_note
                </span>
              </div>
              <div>
                <p className="text-gray-900 font-medium">Package Update</p>
                <p className="text-sm text-gray-500 mt-0.5">
                  'Gardens by the Bay VIP' price adjusted by Admin.
                </p>
                <p className="text-xs text-outline font-medium mt-1">3h ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 card-shadow border border-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            <button className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-blue-600 hover:bg-gray-50 transition-all group text-left">
              <div className="w-8 h-8 rounded bg-slate-50-variant text-gray-900 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  directions_car
                </span>
              </div>
              <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                Add Vehicle
              </span>
            </button>
            <button className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-blue-600 hover:bg-gray-50 transition-all group text-left">
              <div className="w-8 h-8 rounded bg-slate-50-variant text-gray-900 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <span className="hidden text-[18px]">inventory_2</span>
              </div>
              <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                Add Package
              </span>
            </button>
            <button className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-blue-600 hover:bg-gray-50 transition-all group text-left">
              <div className="w-8 h-8 rounded bg-slate-50-variant text-gray-900 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  campaign
                </span>
              </div>
              <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                Create Promotion
              </span>
            </button>
            <button className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-blue-600 hover:bg-gray-50 transition-all group text-left">
              <div className="w-8 h-8 rounded bg-slate-50-variant text-gray-900 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  edit_document
                </span>
              </div>
              <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                Manage Content
              </span>
            </button>
          </div>
        </div>
      </div>
      <style>{`
 .card-shadow {
 box-shadow: 0 4px 12px rgba(0, 88, 190, 0.1);
 }
 `}</style>
    </div>
  );
}
