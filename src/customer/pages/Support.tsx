import React from "react";

export default function Support() {
  return (
    <main className="p-8 w-full h-[calc(100vh-4rem)] overflow-y-auto max-w-6xl mx-auto flex flex-col gap-stack-lg flex-1">
      {/* Page Header */}
      <div className="flex flex-col gap-stack-sm md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-gray-900">Support Center</h2>
          <p className="text-lg text-body-lg text-gray-500 mt-2">
            Get help with bookings, packages, payments, and travel assistance.
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
              placeholder="Search support articles..."
              type="text"
            />
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold whitespace-nowrap hover:bg-gray-900 transition-colors">
            Create Support Ticket
          </button>
        </div>
      </div>

      {/* Content Split Layout */}
      <div className="flex flex-col lg:flex-row gap-stack-lg">
        {/* Left Side (70%) */}
        <div className="w-full lg:w-[70%] flex flex-col gap-stack-lg">
          {/* FAQ Categories */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-stack-md">
              FAQ Categories
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <button className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-sm transition-all flex flex-col items-center justify-center gap-3 group">
                <span
                  className="material-symbols-outlined text-4xl text-blue-600 group-hover:text-blue-600 transition-colors"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  event_available
                </span>
                <span className="text-lg font-semibold text-gray-900">
                  Bookings
                </span>
              </button>
              <button className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-sm transition-all flex flex-col items-center justify-center gap-3 group">
                <span
                  className="material-symbols-outlined text-4xl text-blue-600 group-hover:text-blue-600 transition-colors"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  card_travel
                </span>
                <span className="text-lg font-semibold text-gray-900">
                  Packages
                </span>
              </button>
              <button className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-sm transition-all flex flex-col items-center justify-center gap-3 group">
                <span
                  className="material-symbols-outlined text-4xl text-blue-600 group-hover:text-blue-600 transition-colors"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  payments
                </span>
                <span className="text-lg font-semibold text-gray-900">
                  Payments
                </span>
              </button>
              <button className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-sm transition-all flex flex-col items-center justify-center gap-3 group">
                <span
                  className="material-symbols-outlined text-4xl text-blue-600 group-hover:text-blue-600 transition-colors"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  flight_takeoff
                </span>
                <span className="text-lg font-semibold text-gray-900 text-center">
                  Airport Transfers
                </span>
              </button>
              <button className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-sm transition-all flex flex-col items-center justify-center gap-3 group col-span-2 sm:col-span-1">
                <span
                  className="material-symbols-outlined text-4xl text-blue-600 group-hover:text-blue-600 transition-colors"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  person
                </span>
                <span className="text-lg font-semibold text-gray-900 text-center">
                  Account &amp; Profile
                </span>
              </button>
            </div>
          </section>

          {/* Popular Questions */}
          <section className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-stack-md">
              Popular Questions
            </h3>
            <div className="flex flex-col gap-2">
              <details className="group bg-background rounded-lg border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer text-lg font-semibold text-gray-900 hover:bg-gray-50 transition-colors list-none">
                  How do I modify a booking?
                  <span
                    className="material-symbols-outlined group-open:rotate-180 transition-transform"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    expand_more
                  </span>
                </summary>
                <div className="p-4 pt-0 text-base text-gray-500 border-t border-gray-200 mt-2">
                  You can modify a booking up to 24 hours before your scheduled
                  service. Navigate to the 'Bookings' tab, select your upcoming
                  ride, and click 'Modify Booking'. For urgent changes, please
                  contact our concierge directly.
                </div>
              </details>
              <details className="group bg-background rounded-lg border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer text-lg font-semibold text-gray-900 hover:bg-gray-50 transition-colors list-none">
                  How do I cancel a package?
                  <span
                    className="material-symbols-outlined group-open:rotate-180 transition-transform"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    expand_more
                  </span>
                </summary>
                <div className="p-4 pt-0 text-base text-gray-500 border-t border-gray-200 mt-2">
                  Package cancellations depend on the specific terms of your
                  package tier. Generally, multi-day packages require 48 hours
                  notice. Please review your specific package details or contact
                  support.
                </div>
              </details>
              <details className="group bg-background rounded-lg border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer text-lg font-semibold text-gray-900 hover:bg-gray-50 transition-colors list-none">
                  How do refunds work?
                  <span
                    className="material-symbols-outlined group-open:rotate-180 transition-transform"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    expand_more
                  </span>
                </summary>
                <div className="p-4 pt-0 text-base text-gray-500 border-t border-gray-200 mt-2">
                  Refunds are processed automatically upon successful
                  cancellation according to our policy. Funds typically reflect
                  in your original payment method within 3-5 business days.
                </div>
              </details>
              <details className="group bg-background rounded-lg border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer text-lg font-semibold text-gray-900 hover:bg-gray-50 transition-colors list-none">
                  How can I contact my chauffeur?
                  <span
                    className="material-symbols-outlined group-open:rotate-180 transition-transform"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    expand_more
                  </span>
                </summary>
                <div className="p-4 pt-0 text-base text-gray-500 border-t border-gray-200 mt-2">
                  Your chauffeur's contact details will be revealed in the
                  active booking screen 2 hours prior to your scheduled pickup
                  time for privacy and security reasons.
                </div>
              </details>
            </div>
          </section>

          {/* Recent Support Tickets */}
          <section className="bg-white rounded-xl p-6 border border-gray-200 overflow-hidden">
            <div className="flex justify-between items-center mb-stack-md">
              <h3 className="text-xl font-bold text-gray-900">
                Recent Support Tickets
              </h3>
              <button className="text-blue-600 text-lg font-semibold hover:underline">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase">
                      Ticket ID
                    </th>
                    <th className="py-3 px-4 text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase">
                      Subject
                    </th>
                    <th className="py-3 px-4 text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="py-3 px-4 text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase">
                      Last Updated
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-base text-gray-900">
                      #TK-8902
                    </td>
                    <td className="py-4 px-4 text-base text-gray-900">
                      Modify pickup location for tomorrow
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-500 border border-gray-200">
                        Open
                      </span>
                    </td>
                    <td className="py-4 px-4 text-base text-gray-500">
                      2 hours ago
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-base text-gray-900">
                      #TK-8854
                    </td>
                    <td className="py-4 px-4 text-base text-gray-900">
                      Invoice request for May package
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                        Resolved
                      </span>
                    </td>
                    <td className="py-4 px-4 text-base text-gray-500">
                      Yesterday
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-base text-gray-900">
                      #TK-8711
                    </td>
                    <td className="py-4 px-4 text-base text-gray-900">
                      Vehicle preference update
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                        Resolved
                      </span>
                    </td>
                    <td className="py-4 px-4 text-base text-gray-500">
                      May 12, 2024
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Side (30%) */}
        <div className="w-full lg:w-[30%] flex flex-col gap-stack-lg">
          {/* Emergency Assistance Card */}
          <div className="bg-blue-600 text-white rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-transparent pointer-events-none"></div>
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span
                  className="material-symbols-outlined text-white"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  local_hospital
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  24/7 Concierge Support
                </h3>
                <p className="text-base text-white/80 mb-6">
                  Immediate assistance for ongoing rides or urgent matters.
                </p>
              </div>
              <button className="w-full bg-white text-blue-600 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  call
                </span>
                Contact Now
              </button>
            </div>
          </div>

          {/* Support Options Card */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-stack-md">
              Other Ways to Connect
            </h3>
            <div className="flex flex-col gap-2">
              <button className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left border border-transparent hover:border-gray-200">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-blue-600">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    chat
                  </span>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    Live Chat
                  </div>
                  <div className="text-base text-xs text-gray-500">
                    Typically replies in minutes
                  </div>
                </div>
              </button>
              <button className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left border border-transparent hover:border-gray-200">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    message
                  </span>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    WhatsApp Support
                  </div>
                  <div className="text-base text-xs text-gray-500">
                    +65 9123 4567
                  </div>
                </div>
              </button>
              <button className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left border border-transparent hover:border-gray-200">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-blue-600">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    support_agent
                  </span>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    Call Concierge
                  </div>
                  <div className="text-base text-xs text-gray-500">
                    +65 6789 0123
                  </div>
                </div>
              </button>
              <button className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left border border-transparent hover:border-gray-200">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-blue-600">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    mail
                  </span>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    Email Support
                  </div>
                  <div className="text-base text-xs text-gray-500">
                    support@lioncity.luxury
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-safe-area-bottom"></div>
    </main>
  );
}
