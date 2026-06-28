import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import {
  LayoutDashboard,
  Calendar,
  Briefcase,
  HelpCircle,
  User,
  LogOut,
  Menu,
  X,
  Heart,
} from "lucide-react";

export default function CustomerLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const { unreadCount: wishlistUnread } = useWishlist();
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logout();
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard", path: "/customer/dashboard", icon: LayoutDashboard },
    { name: "Bookings", path: "/customer/bookings", icon: Calendar },
    { name: "Packages", path: "/customer/packages", icon: Briefcase },
    { name: "Wishlist", path: "/customer/wishlist", icon: Heart, badge: wishlistUnread },
    { name: "Support", path: "/customer/support", icon: HelpCircle },
    { name: "Profile", path: "/customer/profile", icon: User },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile menu toggle */}
        <div className="md:hidden flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <span className="font-semibold text-gray-900">Customer Menu</span>
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
              Portal Menu
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
                        ? "bg-blue-50 text-blue-700 font-semibold shadow-sm"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={item.name === "Wishlist" && isActive ? "text-rose-500 fill-rose-500" : item.name === "Wishlist" ? "text-rose-400" : isActive ? "text-blue-600" : "text-gray-400"}
                    />
                    <span className="flex-1">{item.name}</span>
                    {"badge" in item && (item as any).badge > 0 && (
                      <span className="min-w-[20px] h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1.5">
                        {(item as any).badge}
                      </span>
                    )}
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
