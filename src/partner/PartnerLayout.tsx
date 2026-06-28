import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Car,
  Calendar,
  Users,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function PartnerLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout, user, loading } = useAuth();

  useEffect(() => {
    if (loading || !user) return;

    const isOperator = user.role === "OPERATOR";
    const isOnboardingRoute = location.pathname.includes("/partner/onboarding");

    if (isOperator && user.operatorProfile) {
      const step = user.operatorProfile.onboarding_step || 1;
      if (step < 6 && !isOnboardingRoute) {
        navigate("/partner/onboarding", { replace: true });
      } else if (step >= 6 && isOnboardingRoute) {
        navigate("/partner/dashboard", { replace: true });
      }
    }
  }, [user, loading, location.pathname, navigate]);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logout();
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard", path: "/partner/dashboard", icon: LayoutDashboard },
    { name: "Vehicles", path: "/partner/vehicles", icon: Car },
    { name: "Bookings", path: "/partner/bookings", icon: Calendar },
    { name: "Drivers", path: "/partner/drivers", icon: Users },
    { name: "Profile", path: "/partner/profile", icon: User },
  ];

  const isOnboardingRoute = location.pathname.includes("/partner/onboarding");

  if (isOnboardingRoute) {
    return (
      <div className="bg-slate-50 text-gray-900 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile menu toggle */}
        <div className="md:hidden flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <span className="font-semibold text-gray-900">Partner Menu</span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-500 hover:text-gray-900"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`${mobileMenuOpen ? "block" : "hidden"} md:block w-full md:w-64 shrink-0`}
        >
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-32">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 px-2">
              Partner Portal
            </h2>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname.includes(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                      isActive
                        ? "bg-amber-50 text-amber-700 font-semibold shadow-sm"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={isActive ? "text-amber-600" : "text-gray-400"}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 font-medium rounded-2xl transition-all duration-200"
              >
                <LogOut size={18} className="text-gray-400" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
