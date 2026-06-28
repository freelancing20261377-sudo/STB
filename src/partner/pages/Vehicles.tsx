import React, { useState } from "react";

export default function PartnerVehicles() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All Vehicles", "Available", "On Trip", "Maintenance"];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab.split(" ")[0]); // 'All', 'Available', 'On', 'Maintenance'
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">My Vehicles</h2>
        <p className="text-sm text-body-sm text-gray-500">
          Manage your premium fleet of 24 active vehicles.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {tabs.map((tab) => {
          const tabKey = tab.split(" ")[0];
          const isActive = activeTab === tabKey;
          return (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`${isActive ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"} text-sm font-medium px-5 py-2 rounded-full whitespace-nowrap transition-colors`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Vehicle Card Example 1 */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
          <div className="aspect-video bg-gray-100 relative overflow-hidden">
            <img
              alt="Porsche 911"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop"
            />
            <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest shadow-sm">
              Available
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-medium text-title-lg text-gray-900 mb-2">
              Porsche 911 Carrera
            </h3>
            <div className="flex items-center gap-2 text-gray-500 mb-6">
              <span className="material-symbols-outlined text-[16px]">
                location_on
              </span>
              <span className="text-sm text-body-sm">Los Angeles, CA</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-lg font-medium text-title-md text-blue-600">
                S$299 / day
              </span>
              <button className="w-10 h-10 border border-gray-200 text-gray-500 rounded-full flex items-center justify-center hover:bg-blue-50 hover:-rotate-45 hover:text-blue-600 transition-all">
                <span className="material-symbols-outlined text-[20px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Vehicle Card Example 2 */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
          <div className="aspect-video bg-gray-100 relative overflow-hidden">
            <img
              alt="Mercedes S-Class"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800"
            />
            <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest shadow-sm">
              On Trip
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-medium text-title-lg text-gray-900 mb-2">
              Mercedes S-Class
            </h3>
            <div className="flex items-center gap-2 text-gray-500 mb-6">
              <span className="material-symbols-outlined text-[16px]">
                location_on
              </span>
              <span className="text-sm text-body-sm">Singapore CBD</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-lg font-medium text-title-md text-blue-600">
                S$450 / day
              </span>
              <button className="w-10 h-10 border border-gray-200 text-gray-500 rounded-full flex items-center justify-center hover:bg-blue-50 hover:-rotate-45 hover:text-blue-600 transition-all">
                <span className="material-symbols-outlined text-[20px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Vehicle Card Example 3 */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
          <div className="aspect-video bg-gray-100 relative overflow-hidden">
            <img
              alt="BMW 7 Series"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />
            <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest shadow-sm">
              Maintenance
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-medium text-title-lg text-gray-900 mb-2">
              BMW 7 Series
            </h3>
            <div className="flex items-center gap-2 text-gray-500 mb-6">
              <span className="material-symbols-outlined text-[16px]">
                location_on
              </span>
              <span className="text-sm text-body-sm">Workshop A</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-lg font-medium text-title-md text-blue-600">
                S$400 / day
              </span>
              <button className="w-10 h-10 border border-gray-200 text-gray-500 rounded-full flex items-center justify-center hover:bg-blue-50 hover:-rotate-45 hover:text-blue-600 transition-all">
                <span className="material-symbols-outlined text-[20px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
