import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const [isVisible, setIsVisible] = useState(!isHome);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const hasScrolled = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!isHome) {
      setIsVisible(true);
      return;
    }

    // Reset state when returning to home
    hasScrolled.current = false;
    lastScrollY.current = window.scrollY;
    setIsVisible(false);
    setScrolled(false);
    setPastHero(false);

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = Math.max(0, window.scrollY);

          // Track whether we've scrolled past the hero section
          setPastHero(currentScrollY > window.innerHeight * 0.85);

          if (!hasScrolled.current) {
            // First scroll — show the navbar regardless of direction
            hasScrolled.current = true;
            setScrolled(true);
            setIsVisible(true);
          } else {
            // Subsequent scrolls — direction-based show/hide
            if (currentScrollY > lastScrollY.current) {
              // Scrolling down — hide navbar
              setIsVisible(false);
            } else if (currentScrollY < lastScrollY.current) {
              // Scrolling up — show navbar
              setIsVisible(true);
            }
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };
    if (isMobileMenuOpen || isDropdownOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isMobileMenuOpen, isDropdownOpen]);

  const handleAccountClick = () => {
    if (user) {
      if (user.role === "ADMIN") navigate("/admin");
      else if (user.role === "OPERATOR" || user.role === "DRIVER")
        navigate("/partner");
      else navigate("/customer");
    } else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  // White text when over the dark hero; dark text below hero or on non-home pages
  const useWhiteText = isHome && !pastHero;
  // Fully transparent over hero, translucent after
  const isTransparent = isHome && !pastHero;

  const nonHomeClass =
    "w-full z-50 pointer-events-none";
  const homeClass =
    "fixed top-0 left-0 w-full z-50 pointer-events-none";

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={isHome ? { y: -20, opacity: 0 } : undefined}
            transition={
              isHome
                ? { duration: 0.6, ease: "easeOut" }
                : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }
            className={isHome ? homeClass : nonHomeClass}
          >
            <header
              className={`pointer-events-auto w-full h-[52px] lg:h-[64px] flex items-center justify-between px-6 lg:px-12 relative transition-all duration-500 ${
                isTransparent
                  ? 'bg-transparent border-b border-transparent'
                  : 'bg-white/80 backdrop-blur-[14px] border-b border-gray-200 shadow-sm'
              }`}
            >
              <Link
                to="/"
                className={`text-lg md:text-2xl font-bold tracking-tight z-10 flex items-center gap-2 transition-colors duration-500 ${useWhiteText ? 'text-white' : 'text-slate-900'}`}
              >
                STB
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-10 text-[13px] font-semibold uppercase tracking-widest z-10">
                <Link className={`relative group py-1 transition-colors duration-500 ${useWhiteText ? 'text-white' : 'text-slate-900'}`} to="/">
                  <span className="opacity-100 transition-opacity">Home</span>
                  {isHome && (
                    <span className="absolute -bottom-1 left-1/2 w-4 h-[2px] bg-[#E9A23B] -translate-x-1/2 rounded-full shadow-[0_0_8px_rgba(233,162,59,0.5)]"></span>
                  )}
                </Link>
                <a
                  className={`transition-colors duration-500 py-1 group relative ${
                    useWhiteText ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-slate-900'
                  }`}
                  href="/#experiences"
                >
                  Experiences
                </a>
                <a
                  className={`transition-colors duration-500 py-1 group relative ${
                    useWhiteText ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-slate-900'
                  }`}
                  href="/#fleet"
                >
                  Fleet
                </a>
                <a
                  className={`transition-colors duration-500 py-1 group relative ${
                    useWhiteText ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-slate-900'
                  }`}
                  href="/#airport"
                >
                  Airport Transfer
                </a>
                <a
                  className={`transition-colors duration-500 py-1 group relative ${
                    useWhiteText ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-slate-900'
                  }`}
                  href="/#about"
                >
                  About
                </a>
                <a
                  className={`transition-colors duration-500 py-1 group relative ${
                    useWhiteText ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-slate-900'
                  }`}
                  href="/#contact"
                >
                  Contact
                </a>
              </nav>

              <div className="hidden lg:block z-10 relative">
                <button
                  onClick={handleAccountClick}
                  className={`group flex items-center gap-2 relative overflow-hidden font-semibold py-2.5 px-6 rounded-full transition-all duration-500 backdrop-blur-md cursor-pointer text-sm tracking-wide shadow-[0_4px_16px_rgba(0,0,0,0.1)] ${
                    useWhiteText
                      ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                      : 'bg-slate-900/8 hover:bg-slate-900/15 text-slate-900 border border-slate-900/20'
                  }`}
                >
                  <span className="relative z-10">
                    {user ? "My Account" : "Sign in"}
                  </span>
                  {!user && (
                    <ChevronDown
                      size={16}
                      className={`relative z-10 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  )}
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && !user && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 right-0 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                    >
                      <div className="flex flex-col py-1">
                        <Link
                          to="/login/customer"
                          onClick={() => setIsDropdownOpen(false)}
                          className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium flex items-center gap-2"
                        >
                          <span>👤</span> Customer Login
                        </Link>
                        <div className="h-px bg-gray-100 w-full"></div>
                        <Link
                          to="/login/fleet"
                          onClick={() => setIsDropdownOpen(false)}
                          className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#E9A23B] transition-colors font-medium flex items-center gap-2"
                        >
                          <span>🚐</span> Fleet Login
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Hamburger Button */}
              <button
                className={`lg:hidden p-2 z-10 transition-colors duration-500 pointer-events-auto ${useWhiteText ? 'text-white hover:text-gray-300' : 'text-slate-900 hover:text-gray-600'}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                )}
              </button>
            </header>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-[#0a1128]/95 backdrop-blur-2xl pt-[100px] lg:hidden flex flex-col items-center justify-start animate-in duration-300 pointer-events-auto overflow-y-auto"
          >
            <nav className="flex flex-col items-center space-y-6 text-xl font-medium tracking-wide w-full px-6 pb-20">
              <Link
                className="text-white w-full text-center py-2 relative"
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
                {isHome && (
                  <span className="absolute -bottom-2 left-1/2 w-6 h-[2px] bg-[#E9A23B] -translate-x-1/2 rounded-full"></span>
                )}
              </Link>
              <a
                className="text-white/70 hover:text-white transition-colors w-full text-center py-2"
                href="/#experiences"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Experiences
              </a>
              <a
                className="text-white/70 hover:text-white transition-colors w-full text-center py-2"
                href="/#fleet"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Fleet
              </a>
              <a
                className="text-white/70 hover:text-white transition-colors w-full text-center py-2"
                href="/#airport"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Airport Transfer
              </a>
              <a
                className="text-white/70 hover:text-white transition-colors w-full text-center py-2"
                href="/#about"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                className="text-white/70 hover:text-white transition-colors w-full text-center py-2"
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>

              {user ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleAccountClick();
                  }}
                  className="mt-8 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium py-3 px-12 rounded-full transition-all duration-300 w-full max-w-xs text-center cursor-pointer backdrop-blur-md pointer-events-auto"
                >
                  My Account
                </button>
              ) : (
                <div className="mt-8 w-full max-w-xs flex flex-col gap-3">
                  <Link
                    to="/login/customer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium py-3 px-12 rounded-full transition-all duration-300 w-full text-center cursor-pointer backdrop-blur-md pointer-events-auto flex justify-center items-center gap-2"
                  >
                    <span>👤</span> Customer Sign In
                  </Link>
                  <Link
                    to="/login/fleet"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-[#E9A23B]/20 hover:bg-[#E9A23B]/30 text-white border border-[#E9A23B]/30 font-medium py-3 px-12 rounded-full transition-all duration-300 w-full text-center cursor-pointer backdrop-blur-md pointer-events-auto flex justify-center items-center gap-2"
                  >
                    <span>🚐</span> Fleet Sign In
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
