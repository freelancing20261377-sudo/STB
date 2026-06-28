import React from "react";

export default function WhyChooseUs() {
  return (
    <div className="bg-white">
      <section
        className="py-20 px-5 max-w-6xl mx-auto"
        data-purpose="features-section"
      >
        <div className="text-center mb-10">
          <p className="eyebrow-text text-stb-orange uppercase mb-2">
            THE STB DIFFERENCE
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-stb-navy">
            Why Choose Singapore Tour Booking
          </h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            className="bg-stb-gray-bg border border-gray-100 rounded-xl p-6 shadow-sm"
            data-purpose="feature-card"
          >
            <div className="mb-4">
              <svg
                className="w-6 h-6 text-stb-orange"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></path>
              </svg>
            </div>
            <h3 className="text-stb-navy font-bold text-sm mb-2">
              Premium Service Standards
            </h3>
            <p className="text-stb-body text-xs leading-relaxed">
              Meticulous attention to detail and high-end hospitality in every
              interaction for a seamless experience.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="bg-stb-gray-bg border border-gray-100 rounded-xl p-6 shadow-sm"
            data-purpose="feature-card"
          >
            <div className="mb-4">
              <svg
                className="w-6 h-6 text-stb-orange"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></path>
              </svg>
            </div>
            <h3 className="text-stb-navy font-bold text-sm mb-2">
              Flexible Booking Options
            </h3>
            <p className="text-stb-body text-xs leading-relaxed">
              Easily adjust your travel dates and vehicle types to match your
              plans with our simple interface.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="bg-stb-gray-bg border border-gray-100 rounded-xl p-6 shadow-sm"
            data-purpose="feature-card"
          >
            <div className="mb-4">
              <svg
                className="w-6 h-6 text-stb-orange"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></path>
                <path
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></path>
              </svg>
            </div>
            <h3 className="text-stb-navy font-bold text-sm mb-2">
              Photography Assistance
            </h3>
            <p className="text-stb-body text-xs leading-relaxed">
              Our drivers help capture your best moments at key stops throughout
              the tour for lasting memories.
            </p>
          </div>

          {/* Card 4 */}
          <div
            className="bg-stb-gray-bg border border-gray-100 rounded-xl p-6 shadow-sm"
            data-purpose="feature-card"
          >
            <div className="mb-4">
              <svg
                className="w-6 h-6 text-stb-orange"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></path>
                <path
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></path>
              </svg>
            </div>
            <h3 className="text-stb-navy font-bold text-sm mb-2">
              Local Expertise
            </h3>
            <p className="text-stb-body text-xs leading-relaxed">
              Insights from professional guides who know Singapore's hidden gems
              and vibrant culture.
            </p>
          </div>

          {/* Card 5 */}
          <div
            className="bg-stb-gray-bg border border-gray-100 rounded-xl p-6 shadow-sm"
            data-purpose="feature-card"
          >
            <div className="mb-4">
              <svg
                className="w-6 h-6 text-stb-orange"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></path>
              </svg>
            </div>
            <h3 className="text-stb-navy font-bold text-sm mb-2">
              Reliable Timing
            </h3>
            <p className="text-stb-body text-xs leading-relaxed">
              Punctuality is our priority, ensuring your schedule remains
              stress-free and efficient.
            </p>
          </div>

          {/* Card 6 */}
          <div
            className="bg-stb-gray-bg border border-gray-100 rounded-xl p-6 shadow-sm"
            data-purpose="feature-card"
          >
            <div className="mb-4">
              <svg
                className="w-6 h-6 text-stb-orange"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></path>
              </svg>
            </div>
            <h3 className="text-stb-navy font-bold text-sm mb-2">
              Personalized Experiences
            </h3>
            <p className="text-stb-body text-xs leading-relaxed">
              Bespoke itineraries tailored specifically to your unique interests
              and personal preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <footer
        className="w-full bg-stb-navy py-20 px-6 text-center"
        data-purpose="stats-banner"
      >
        <h2 className="text-white text-2xl md:text-3xl font-semibold mb-16">
          Trusted By Travelers Worldwide
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 max-w-6xl mx-auto">
          {/* Stat 1 */}
          <div data-purpose="stat-item">
            <p className="text-stb-orange text-4xl font-bold mb-2">10,000+</p>
            <p className="stat-label text-white uppercase opacity-70">
              SUCCESSFUL JOURNEYS
            </p>
          </div>
          {/* Stat 2 */}
          <div data-purpose="stat-item">
            <p className="text-stb-orange text-4xl font-bold mb-2">4.9/5</p>
            <p className="stat-label text-white uppercase opacity-70">
              AVERAGE GUEST RATING
            </p>
          </div>
          {/* Stat 3 */}
          <div data-purpose="stat-item">
            <p className="text-stb-orange text-4xl font-bold mb-2">24/7</p>
            <p className="stat-label text-white uppercase opacity-70">
              CUSTOMER SUPPORT
            </p>
          </div>
          {/* Stat 4 */}
          <div data-purpose="stat-item">
            <p className="text-stb-orange text-4xl font-bold mb-2">100%</p>
            <p className="stat-label text-white uppercase opacity-70">
              PREMIUM NETWORK
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
