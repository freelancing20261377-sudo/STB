import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Calendar,
  Car,
  PackageSearch,
  Users,
  FileText,
  SearchCheck,
  LineChart,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  HelpCircle,
} from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();
  const path = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Bookings", path: "/admin/bookings", icon: Calendar },
    { name: "Vehicles", path: "/admin/vehicles", icon: Car },
    { name: "Packages", path: "/admin/packages", icon: PackageSearch },
    { name: "Customers", path: "/admin/customers", icon: Users },
    { name: "Content", path: "/admin/content", icon: FileText },
    { name: "SEO", path: "/admin/seo", icon: SearchCheck },
    { name: "Reports", path: "/admin/reports", icon: LineChart },
  ];

  return (
    <div className="bg-slate-50 text-gray-900 h-full font-sans flex antialiased min-h-screen">
      {/* SideNavBar */}
      <nav
        className={`bg-white h-screen w-64 fixed left-0 top-0 flex flex-col py-6 px-4 z-40 border-r border-gray-200 transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="mb-8 px-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg">
            SG
          </div>
          <div>
            <h1 className="font-bold text-gray-900 leading-tight">
              SG Premium
            </h1>
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Admin Portal
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto space-y-1">
          {navItems.map((item) => {
            const isActive = path.includes(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive ? "text-blue-700 font-semibold bg-blue-50 border-r-2 border-blue-700" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-blue-700" : "text-gray-400"}
                />
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="mt-auto space-y-1 pt-4 border-t border-gray-200">
          <Link
            to="/admin/settings"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${path.includes("/admin/settings") ? "text-blue-700 font-semibold bg-blue-50 border-r-2 border-blue-700" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
          >
            <Settings
              size={18}
              className={
                path.includes("/admin/settings")
                  ? "text-blue-700"
                  : "text-gray-400"
              }
            />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 w-full text-left"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 relative min-h-screen min-w-0">
        {/* TopNavBar */}
        <header className="bg-white/80 backdrop-blur-md h-16 w-full md:w-[calc(100%-16rem)] fixed right-0 top-0 z-30 shadow-sm flex items-center justify-between px-4 sm:px-8 transition-all duration-300 border-b border-gray-200">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-500 hover:bg-gray-50 rounded-full p-2 transition-all duration-300"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="relative w-full max-w-md hidden sm:block">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                className="w-full bg-white border border-gray-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                placeholder="Search bookings, customers, packages..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-gray-500 hover:bg-gray-50 rounded-full p-2 transition-all duration-300 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="text-gray-500 hover:bg-gray-50 rounded-full p-2 transition-all duration-300">
              <HelpCircle size={20} />
            </button>
            <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block"></div>
            <button className="flex items-center gap-2 hover:bg-gray-50 rounded-full p-1 pr-3 transition-all duration-300">
              <img
                className="w-8 h-8 rounded-full object-cover"
                alt="Admin"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB2f2gs5o7PLlutZDDaeLqNHYW_4Ms6jLedmiSL9xTMpFNyTuE0WY8Omex4rIVY89-T0u3DJat-mvyN8ZWkrm1wOVFG00JyPz4PX1hd9DEtXPL7F6iC7YScsiqt9DPmQzoNiCd08YtFaSVE6bfoN0r_J2qWSMnrbQhT-EpRlf84VDxkoUNc2MdubBgAdGaqDBdJ8wVG2mFjSzo57Snaq3QTBiBptsk_MVTbS5gZirtUDdCRfUBCISsfsGcR7u7hOcPoFdi2To_C28"
              />
              <span className="font-semibold text-sm hidden sm:block text-gray-900">
                {user?.email || "Admin"}
              </span>
            </button>
          </div>
        </header>

        {/* Overlay for mobile menu */}
        {mobileMenuOpen && (
          <div
            className="bg-black/50 fixed inset-0 z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}

        <main className="w-full pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
