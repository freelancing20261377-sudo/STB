import React from "react";

export default function CTA() {
  return (
    <div className="w-full flex-grow flex flex-col items-center">
      <main className="flex-grow flex flex-col items-center pt-[80px] pb-[100px] px-6 w-full max-w-[1486px] mx-auto overflow-hidden">
        {/* CTA Banner Section */}
        <section className="w-full relative rounded-[32px] overflow-hidden shadow-custom-card flex flex-col md:flex-row min-h-[420px] bg-stb-dark-blue">
          {/* Left Content Area */}
          <div className="w-full md:w-[50%] p-[40px] md:px-[60px] flex flex-col justify-center bg-stb-dark-blue z-10">
            <h1 className="text-white text-[38px] md:text-[46px] leading-[1.2] font-semibold mb-6">
              Create Unforgettable
              <br />
              Singapore Memories
            </h1>
            <p className="text-white/90 text-[17px] leading-[1.6] font-medium max-w-[480px]">
              From luxury transportation to curated travel experiences,
              Singapore Tour Booking helps you discover Singapore with comfort,
              convenience, and world-class service.
            </p>
          </div>
          {/* Right Image Area */}
          <div className="w-full md:w-[50%] relative min-h-[300px] md:min-h-[420px] flex items-center justify-center p-[40px]">
            <img
              alt="Luxury Singapore skyline at sunset"
              className="absolute inset-0 w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXh5hcFyDaTlkCVHvRdUDugFfrFI-07xxc0CcqROymnLrlmuJGvLPo0-0aHCyRtF9Z-EBs_N_beSRQNpOG0udHmvJIMFWhFTlDbJH2OIdp0naQw_GLOZbfc-WfAZ56p9dW7IDjCg6XiMDdzggvWnp7pCjy5CNk18Q5_gWnEeBJMN2uzuKS8zDhX0aRoAvN6Hggd5dmhYwRWf-wYl9kby_Az9HbYYRldsRcdv0AHbYgbMjETctq52mWLLZdgpLDwzl6N9oadg5Pe4U"
            />
            {/* Subtle Dark Overlay */}
            <div className="absolute inset-0 bg-black/20 z-10"></div>
            {/* CTA Button */}
            <a
              href="#home"
              className="relative z-20 bg-stb-orange hover:bg-opacity-90 text-[#111827] font-semibold text-[15px] py-[15px] px-[30px] rounded-[8px] transition-colors shadow-lg shadow-black/20 inline-block"
            >
              Start Your Journey Today
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white w-full border-t border-[#F3F4F6] pt-[80px] pb-[40px] px-6 lg:px-[60px]">
        <div className="max-w-[1366px] mx-auto w-full flex flex-col gap-12">
          {/* Top Footer Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-[100px]">
            {/* Left: Brand Info */}
            <div className="w-full lg:max-w-[340px] flex flex-col">
              <h2 className="text-stb-dark-blue text-[22px] font-bold tracking-tight mb-5">
                Singapore Tour Booking
              </h2>
              <p className="text-stb-footer-text text-[15px] leading-[1.6] mb-8">
                Singapore's leading luxury transportation and curated tour
                partner. Elevating your journey one mile at a time.
              </p>
              {/* Social Icons */}
              <div className="flex gap-4">
                <button
                  onClick={() => alert("Share functionality coming soon!")}
                  aria-label="Share"
                  className="w-[42px] h-[42px] rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
                >
                  <svg
                    fill="none"
                    height="18"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
                  </svg>
                </button>
                <button
                  onClick={() =>
                    (window.location.href = "mailto:support@example.com")
                  }
                  aria-label="Email"
                  className="w-[42px] h-[42px] rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
                >
                  <svg
                    fill="none"
                    height="18"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      height="16"
                      rx="2"
                      ry="2"
                      width="20"
                      x="2"
                      y="4"
                    ></rect>
                    <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Right: Links Columns */}
            <div className="flex flex-wrap lg:flex-nowrap gap-10 lg:gap-[120px] flex-grow justify-start lg:justify-end w-full">
              {/* Company Column */}
              <div className="flex flex-col min-w-[120px]">
                <h3 className="text-stb-dark-blue text-[12px] font-bold tracking-[1.5px] uppercase mb-[30px]">
                  COMPANY
                </h3>
                <ul className="flex flex-col gap-5 text-[15px] text-stb-footer-text">
                  <li>
                    <a
                      className="hover:text-stb-dark-blue transition-colors"
                      href="#about"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-stb-dark-blue transition-colors"
                      href="#contact"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-stb-dark-blue transition-colors"
                      href="#terms"
                    >
                      Terms
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-stb-dark-blue transition-colors"
                      href="#privacy"
                    >
                      Privacy
                    </a>
                  </li>
                </ul>
              </div>

              {/* Services Column */}
              <div className="flex flex-col min-w-[120px]">
                <h3 className="text-stb-dark-blue text-[12px] font-bold tracking-[1.5px] uppercase mb-[30px]">
                  SERVICES
                </h3>
                <ul className="flex flex-col gap-5 text-[15px] text-stb-footer-text">
                  <li>
                    <a
                      className="hover:text-stb-dark-blue transition-colors"
                      href="#hourly"
                    >
                      Hourly Rent
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-stb-dark-blue transition-colors"
                      href="#airport"
                    >
                      Airport Transfer
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-stb-dark-blue transition-colors"
                      href="#sightseeing"
                    >
                      Sightseeing
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-stb-dark-blue transition-colors"
                      href="#corporate"
                    >
                      Corporate
                    </a>
                  </li>
                </ul>
              </div>

              {/* Office Column */}
              <div className="flex flex-col min-w-[150px]">
                <h3 className="text-stb-dark-blue text-[12px] font-bold tracking-[1.5px] uppercase mb-[30px]">
                  OFFICE
                </h3>
                <div className="text-[15px] text-stb-footer-text leading-[1.6]">
                  <p>Marina Bay Sands</p>
                  <p>Singapore 018956</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-[35px] border-t border-stb-footer-border mt-2">
            <p className="text-stb-copyright-text text-[13px] text-center md:text-left">
              © 2024 Singapore Tour Booking. All rights reserved.
            </p>
            <div className="flex gap-4 md:gap-6 text-[10px] font-bold tracking-[1.5px] text-stb-tagline-text">
              <span>RELIABLE</span>
              <span>PREMIUM</span>
              <span>PROFESSIONAL</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
