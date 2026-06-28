import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function PartnerDashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    fleetSize: 0,
    activeTrips: 0,
    monthlyRev: "0.00",
    rating: 4.8,
    pendingTrips: 0,
    totalBookings: 0,
    driverCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("/api/partner/dashboard");
      setStats({
        fleetSize: res.data.fleetSize || 0,
        activeTrips: res.data.activeTrips || 0,
        monthlyRev: res.data.monthlyRevenue || "0.00",
        rating: 4.8, // Static rating unless implemented
        pendingTrips: res.data.pendingTrips || 0,
        totalBookings: res.data.totalBookings || 0,
        driverCount: res.data.driverCount || 0,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const available = stats.fleetSize - stats.activeTrips;

  return (
    <>
      {/* Welcome Section */}
      <section>
        <h2 className="text-xl font-bold text-gray-900">Fleet Overview</h2>
        <p className="text-sm text-body-sm text-gray-500">
          Manage your assets and earnings in real-time.
        </p>
      </section>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col gap-2 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
          <span className="text-xs font-medium text-label-sm text-gray-500 uppercase tracking-wider">
            Fleet Size
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-blue-600">
              {stats.fleetSize}
            </span>
            <span className="text-xs font-medium text-label-sm text-blue-600">
              Vehicles
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col gap-2 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
          <span className="text-xs font-medium text-label-sm text-gray-500 uppercase tracking-wider">
            Active Trips
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-blue-600">
              {stats.activeTrips}
            </span>
            <span className="text-xs font-medium text-label-sm text-blue-600">
              In Transit
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col gap-2 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
          <span className="text-xs font-medium text-label-sm text-gray-500 uppercase tracking-wider">
            Monthly Rev.
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-blue-600">
              {stats.monthlyRev}
            </span>
            <span className="text-xs font-medium text-label-sm text-blue-600">
              SGD
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col gap-2 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
          <span className="text-xs font-medium text-label-sm text-gray-500 uppercase tracking-wider">
            Assigned Bookings
          </span>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold text-blue-600">
              {stats.totalBookings}
            </span>
          </div>
        </div>
      </div>

      {/* Fleet Status Section */}
      <section className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-title-lg text-gray-900">
            Fleet Status
          </h3>
        </div>
        <div className="space-y-6">
          <div className="h-6 w-full bg-gray-100 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-blue-600"
              style={{
                width:
                  stats.fleetSize > 0
                    ? `${(available / stats.fleetSize) * 100}%`
                    : "0%",
              }}
              title="Available"
            ></div>
            <div
              className="h-full bg-blue-600"
              style={{
                width:
                  stats.fleetSize > 0
                    ? `${(stats.activeTrips / stats.fleetSize) * 100}%`
                    : "0%",
              }}
              title="On Trip"
            ></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                <span className="text-xs font-medium text-label-sm uppercase tracking-wider text-gray-500">
                  Available
                </span>
              </div>
              <span className="text-xl font-medium text-title-lg ml-5">
                {available > 0 ? available : 0}
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                <span className="text-xs font-medium text-label-sm uppercase tracking-wider text-gray-500">
                  On Trip
                </span>
              </div>
              <span className="text-xl font-medium text-title-lg ml-5">
                {stats.activeTrips}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Assignments */}
        <section>
          <div className="flex justify-between items-end mb-4 px-2">
            <h3 className="text-xl font-medium text-title-lg text-gray-900">
              Drivers
            </h3>
          </div>
          <div className="bg-white p-8 rounded-xl border border-gray-200 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 mb-4">
              <span className="material-symbols-outlined text-[32px]">
                group
              </span>
            </div>
            <p className="text-lg font-medium text-title-md text-gray-900 mb-2">
              {stats.driverCount} Drivers Registered
            </p>
            <p className="text-sm text-body-sm text-gray-500 max-w-[250px]">
              Manage your active drivers from the drivers tab.
            </p>
          </div>
        </section>

        {/* Recent Activity Feed */}
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <h3 className="text-xl font-medium text-title-lg text-gray-900 mb-6">
            Recent Activity
          </h3>
          <div className="flex-1 flex flex-col items-center justify-center text-center mt-4 mb-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 mb-4">
              <span className="material-symbols-outlined text-[32px]">
                history
              </span>
            </div>
            <p className="text-lg font-medium text-title-md text-gray-900 mb-2">
              No recent activity
            </p>
            <p className="text-sm text-body-sm text-gray-500 max-w-[250px]">
              Track events like new bookings, payment disbursements, and vehicle
              approvals here.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
