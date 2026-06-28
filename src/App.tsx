/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TourDetails from "./pages/TourDetails";
import BookingFlow from "./pages/BookingFlow";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Bookings from "./admin/pages/Bookings";
import AdminBookingDetails from "./admin/pages/BookingDetails";
import Vehicles from "./admin/pages/Vehicles";
import Packages from "./admin/pages/Packages";
import Customers from "./admin/pages/Customers";
import Content from "./admin/pages/Content";
import SEO from "./admin/pages/SEO";
import Reports from "./admin/pages/Reports";
import Settings from "./admin/pages/Settings";

// Customer Pages
import CustomerLayout from "./customer/CustomerLayout";
import CustomerDashboard from "./customer/pages/Dashboard";
import CustomerBookings from "./customer/pages/Bookings";
import CustomerPackages from "./customer/pages/Packages";
import CustomerBookingDetails from "./customer/pages/BookingDetails";
import CustomerNewBooking from "./customer/pages/NewBooking";
import CustomerSupport from "./customer/pages/Support";
import CustomerProfile from "./customer/pages/Profile";

// Partner Pages
import PartnerLayout from "./partner/PartnerLayout";
import PartnerDashboard from "./partner/pages/Dashboard";
import PartnerBookings from "./partner/pages/Bookings";
import PartnerVehicles from "./partner/pages/Vehicles";
import PartnerDrivers from "./partner/pages/Drivers";
import PartnerProfile from "./partner/pages/Profile";
import FleetOnboarding from "./partner/pages/FleetOnboarding";

import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import CustomerWishlist from "./customer/pages/Wishlist";
import { ProtectedRoute } from "./context/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";
import AllFleets from "./pages/AllFleets";

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
      <BrowserRouter>
        <Routes>
          {/* Standalone full-screen routes */}
          <Route path="/login/:type" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/fleets" element={<AllFleets />} />
          <Route path="/booking" element={<BookingFlow />} />

          {/* Admin Routes - Standalone with its own sidebar */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:id" element={<AdminBookingDetails />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="packages" element={<Packages />} />
            <Route path="customers" element={<Customers />} />
            <Route path="content" element={<Content />} />
            <Route path="seo" element={<SEO />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Main Website Layout (Header & Footer) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/tours/:slug" element={<TourDetails />} />

            {/* Customer Routes inside Main Website Layout */}
            <Route
              path="/customer"
              element={
                <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                  <CustomerLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate to="/customer/dashboard" replace />}
              />
              <Route path="dashboard" element={<CustomerDashboard />} />
              <Route path="bookings" element={<CustomerBookings />} />
              <Route path="new-booking" element={<CustomerNewBooking />} />
              <Route path="packages" element={<CustomerPackages />} />
              <Route
                path="booking-details/:id"
                element={<CustomerBookingDetails />}
              />
              <Route path="wishlist" element={<CustomerWishlist />} />
              <Route path="support" element={<CustomerSupport />} />
              <Route path="profile" element={<CustomerProfile />} />
            </Route>

            {/* Partner / Fleet Routes inside Main Website Layout */}
            <Route
              path="/partner"
              element={
                <ProtectedRoute allowedRoles={["OPERATOR", "DRIVER"]}>
                  <PartnerLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate to="/partner/dashboard" replace />}
              />
              <Route path="onboarding" element={<FleetOnboarding />} />
              <Route path="dashboard" element={<PartnerDashboard />} />
              <Route path="bookings" element={<PartnerBookings />} />
              <Route path="vehicles" element={<PartnerVehicles />} />
              <Route path="drivers" element={<PartnerDrivers />} />
              <Route path="profile" element={<PartnerProfile />} />
            </Route>
          </Route>

          {/* Default Login Route (Fallback) */}
          <Route
            path="/login"
            element={<Navigate to="/login/customer" replace />}
          />
        </Routes>
      </BrowserRouter>
      </WishlistProvider>
    </AuthProvider>
  );
}
