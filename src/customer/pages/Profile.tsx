import React from "react";

export default function Profile() {
  return (
    <main className="p-8 w-full h-[calc(100vh-4rem)] overflow-y-auto max-w-6xl mx-auto flex flex-col gap-stack-lg flex-1">
      {/* Page Header */}
      <div className="flex flex-col gap-stack-sm md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-gray-900">My Profile</h2>
          <p className="text-lg text-body-lg text-gray-500 mt-2">
            Manage your account, preferences, and travel settings.
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="relative w-full md:w-72">
            <span
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              search
            </span>
            <input
              className="w-full bg-white text-gray-900 pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-base"
              placeholder="Search settings..."
              type="text"
            />
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold whitespace-nowrap hover:bg-gray-900 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Content Split Layout */}
      <div className="flex flex-col lg:flex-row gap-stack-lg">
        {/* Left Side (70%) */}
        <div className="w-full lg:w-[70%] flex flex-col gap-stack-lg">
          {/* Personal Information */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-stack-md">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase mb-1">
                  Full Name
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  Jason Lee
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase mb-1">
                  Email
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  jason.lee@email.com
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase mb-1">
                  Phone
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  +65 9123 4567
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase mb-1">
                  Nationality
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  Singapore
                </div>
              </div>
            </div>
          </section>

          {/* Travel Preferences */}
          <section className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-stack-md">
              Travel Preferences
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-background p-4 rounded-lg border border-gray-200">
                <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase mb-1">
                  Preferred Vehicle
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  Mercedes S-Class
                </div>
              </div>
              <div className="bg-background p-4 rounded-lg border border-gray-200">
                <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase mb-1">
                  Preferred Language
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  English
                </div>
              </div>
              <div className="bg-background p-4 rounded-lg border border-gray-200">
                <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase mb-1">
                  Favorite Package Type
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  Luxury Experiences
                </div>
              </div>
              <div className="bg-background p-4 rounded-lg border border-gray-200">
                <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase mb-1">
                  Travel Style
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  Premium Concierge
                </div>
              </div>
            </div>
          </section>

          {/* Reviews & Ratings */}
          <section className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-stack-md">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  My Reviews &amp; Ratings
                </h3>
                <p className="text-gray-500 mt-1">
                  Share feedback about your travel experiences.
                </p>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-gray-900 transition-colors">
                  Write a Review
                </button>
                <button className="border border-gray-200 text-gray-900 px-4 py-2 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
                  View All Reviews
                </button>
              </div>
            </div>

            {/* Review Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-background p-4 rounded-lg border border-gray-200">
                <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase mb-1">
                  Avg Rating
                </div>
                <div className="text-lg font-semibold text-gray-900 flex items-center gap-1">
                  4.8{" "}
                  <span
                    className="material-symbols-outlined text-xs text-blue-600"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                </div>
              </div>
              <div className="bg-background p-4 rounded-lg border border-gray-200">
                <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase mb-1">
                  Total Reviews
                </div>
                <div className="text-lg font-semibold text-gray-900">24</div>
              </div>
              <div className="bg-background p-4 rounded-lg border border-gray-200">
                <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase mb-1">
                  Services
                </div>
                <div className="text-lg font-semibold text-gray-900">18</div>
              </div>
              <div className="bg-background p-4 rounded-lg border border-gray-200">
                <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase mb-1">
                  Loyalty Bonus
                </div>
                <div className="text-lg font-semibold text-blue-600">
                  1,200 Pts
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Reviews List */}
              <div className="flex flex-col gap-4">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase">
                  Recent Reviews
                </h4>
                <div className="p-4 bg-background rounded-lg border border-gray-200 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-lg font-semibold text-gray-900">
                        Changi Airport Transfer
                      </div>
                      <div className="text-xs text-gray-500">
                        Oct 15, 2023 • Driver: Michael Tan
                      </div>
                    </div>
                    <div className="flex text-blue-600">
                      <span
                        className="material-symbols-outlined text-xs"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-xs"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-xs"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-xs"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-xs"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500 italic">
                    "Excellent service. Driver arrived early and the vehicle was
                    spotless."
                  </p>
                  <div className="flex gap-3">
                    <button className="text-blue-600 text-xs font-bold hover:underline">
                      Edit Review
                    </button>
                    <button className="text-gray-500 text-xs font-bold hover:underline">
                      View Booking
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-background rounded-lg border border-gray-200 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-lg font-semibold text-gray-900">
                        Marina Bay Sands Staycation
                      </div>
                      <div className="text-xs text-gray-500">Oct 10, 2023</div>
                    </div>
                    <div className="flex text-blue-600">
                      <span
                        className="material-symbols-outlined text-xs"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-xs"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-xs"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-xs"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-xs"
                        style={{ fontVariationSettings: "'FILL' 0" }}
                      >
                        star
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500 italic">
                    "Great experience overall. Concierge support was very
                    helpful."
                  </p>
                </div>
              </div>

              {/* Categories & Rewards */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase">
                    Review Categories
                  </h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-900">Chauffeur Service</span>
                        <span className="text-gray-500">4.9 ★</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-[98%]"></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-900">Airport Transfers</span>
                        <span className="text-gray-500">4.7 ★</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-[94%]"></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-900">Tour Packages</span>
                        <span className="text-gray-500">4.5 ★</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-[90%]"></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-900">Hotel Bookings</span>
                        <span className="text-gray-500">4.8 ★</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-[96%]"></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-900">Concierge Support</span>
                        <span className="text-gray-500">5.0 ★</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-[100%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-100/10 p-4 rounded-lg border border-blue-600/20 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      card_giftcard
                    </span>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">
                      Review Rewards
                    </div>
                    <div className="text-xs text-gray-500">
                      Earn loyalty points by reviewing completed bookings.{" "}
                      <span className="text-blue-600 font-bold">
                        +50 Points
                      </span>{" "}
                      per verified review.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Security & Account */}
          <section className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-stack-md">
              Security &amp; Account
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-gray-200">
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    Change Password
                  </div>
                  <div className="text-xs text-gray-500">
                    Last changed 3 months ago
                  </div>
                </div>
                <button className="text-blue-600 text-lg font-semibold hover:underline">
                  Update Password
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-gray-200">
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    Two-Factor Authentication
                  </div>
                  <div className="text-xs text-green-700">Enabled</div>
                </div>
                <button className="text-blue-600 text-lg font-semibold hover:underline">
                  Manage Security
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-gray-200">
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    Login Activity
                  </div>
                  <div className="text-xs text-gray-500">
                    View recent sign-ins
                  </div>
                </div>
                <span
                  className="material-symbols-outlined text-gray-500"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  chevron_right
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-gray-200">
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    Notification Preferences
                  </div>
                  <div className="text-xs text-gray-500">
                    Email and SMS alerts
                  </div>
                </div>
                <span
                  className="material-symbols-outlined text-gray-500"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  chevron_right
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Side (30%) */}
        <div className="w-full lg:w-[30%] flex flex-col gap-stack-lg">
          {/* Profile Card */}
          <div className="bg-blue-600 text-white rounded-xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-transparent pointer-events-none"></div>
            <div className="relative z-10 flex flex-col items-center text-center gap-4">
              <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden border-4 border-white/20">
                <img
                  alt="Jason Lee"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFPLUJ7xY_WC_CUUAXYHJL5PY77gsGPDtTq5uwB9UU4nl8LKrJTwDXD3tV6haO8d0e0u6yHtFYAcTHYS-VZnNWvUH87upAyMUX5-ewncNzann6mV6uVcidSQecPGOruPb2cJKxdlu7MQLpBDtoQ9X4TyetB3NEujvcnvwCk0QDe_8euBgiZE3It6bIMZ9qnaQN2myFj2LXIpvvGX_r9iEmyq1Pm1dEIF0qqRzDrnGF3oCRZIiiBGZA3QmX9KvPicV6ivvNbUiz_2s"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Jason Lee</h3>
                <p className="text-base text-white/80">Premium Member</p>
                <p className="text-xs text-white/60 mt-1">Member Since 2023</p>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="text-xs uppercase tracking-wider font-semibold">
                  Loyalty Points: 12,450
                </span>
              </div>
              <button className="w-full bg-white text-blue-600 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Account Summary Card */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-stack-md">
              Account Summary
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Total Bookings</span>
                <span className="text-lg font-semibold text-gray-900">124</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Packages Booked</span>
                <span className="text-lg font-semibold text-gray-900">36</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Total Spent</span>
                <span className="text-lg font-semibold text-gray-900">
                  SGD 24,500
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-gray-500">Loyalty Points</span>
                <span className="text-lg font-semibold text-blue-600">
                  12,450
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-safe-area-bottom"></div>
    </main>
  );
}
