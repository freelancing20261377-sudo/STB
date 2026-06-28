import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Key,
  Eye,
  EyeOff,
  User,
  Building,
  ArrowRight,
  Compass,
  Sparkles,
  ChevronDown,
  UserCheck,
  Car,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

type PortalType = "customer" | "fleet" | "admin";

interface PortalTheme {
  name: string;
  brandName: string;
  shortName: string;
  tagline: string;
  badge: string;
  bgClass: string;
  leftBgImage: string;
  title: React.ReactNode;
  description: string;
  bullets: string[];
  accentText: string;
  accentBorder: string;
  buttonBg: string;
  buttonText: string;
  buttonShadow: string;
  bulletsBg: string;
  bulletIcon: React.ReactNode;
  themeIcon: React.ComponentType<any>;
  focusIconClass: string;
}

const PORTAL_THEMES: Record<PortalType, PortalTheme> = {
  customer: {
    name: "Singapore Tour Booking",
    brandName: "Singapore Tour Booking",
    shortName: "Singapore Premium",
    tagline: "Join our handpicked premium circle",
    badge: "Direct Boarding & Access",
    bgClass: "from-blue-600/10 to-[#E9A23B]/10",
    leftBgImage:
      "https://images.unsplash.com/photo-1542820229-081e0c12af0b?q=80&w=1952&auto=format&fit=crop", // Jewel Changi
    title: (
      <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
        Your gateway to
        <br />
        Singapore's{" "}
        <span className="text-[#E9A23B] italic font-light">finest</span>.
      </h2>
    ),
    description:
      "Create an account to manage premium bespoke tours, luxury chauffeur bookings, and customized private fleet journeys.",
    bullets: [
      "Instant access to VIP lounge transfers",
      "Corporate invoice integrations & billing profiles",
      "Direct live tracking & route adjustments",
    ],
    accentText: "text-[#E9A23B]",
    accentBorder:
      "border-[#E9A23B]/20 focus:border-[#E9A23B]/70 focus:ring-[#E9A23B]/30",
    buttonBg: "bg-gradient-to-r from-[#E9A23B] to-[#D48D2A]",
    buttonText: "text-black",
    buttonShadow: "hover:shadow-[0_8px_32px_rgba(233,162,59,0.35)]",
    bulletsBg: "bg-[#E9A23B]/10 border border-[#E9A23B]/30 text-[#E9A23B]",
    bulletIcon: <Sparkles className="w-3.5 h-3.5" />,
    themeIcon: Sparkles,
    focusIconClass: "group-focus-within:text-[#E9A23B]",
  },
  fleet: {
    name: "Singapore Fleet Operations",
    brandName: "Singapore Fleet Operations",
    shortName: "Singapore Fleet",
    tagline: "Register as a Fleet Partner",
    badge: "Fleet Growth Network",
    bgClass: "from-blue-500/10 to-sky-450/10",
    leftBgImage:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1920&auto=format&fit=crop", // Roads and Vehicles
    title: (
      <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
        Accelerate your
        <br />
        fleet <span className="text-sky-450 italic font-light">potential</span>.
      </h2>
    ),
    description:
      "Register your limousine or tour fleet company to receive direct VIP bookings, telemetry syncs, and premium driver assignments.",
    bullets: [
      "Automated passenger route navigation",
      "Detailed performance analytics & driver rosters",
      "Flexible digital payouts & dispatch options",
    ],
    accentText: "text-sky-450 text-sky-400",
    accentBorder:
      "border-sky-500/20 focus:border-sky-500/70 focus:ring-sky-500/30",
    buttonBg: "bg-gradient-to-r from-sky-500 to-blue-600",
    buttonText: "text-white",
    buttonShadow: "hover:shadow-[0_8px_32px_rgba(14,165,233,0.35)]",
    bulletsBg: "bg-sky-500/10 border border-sky-500/30 text-sky-400",
    bulletIcon: <Car className="w-3.5 h-3.5" />,
    themeIcon: Car,
    focusIconClass: "group-focus-within:text-sky-400",
  },
  admin: {
    name: "Singapore Tour Booking Control Center",
    brandName: "Singapore Tour Booking Control Center",
    shortName: "Singapore Control",
    tagline: "Request Administrator Access",
    badge: "System Guard & Terminal",
    bgClass: "from-indigo-600/10 to-emerald-500/10",
    leftBgImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop", // Cyber Tech Space Deep
    title: (
      <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
        Administer the
        <br />
        global{" "}
        <span className="text-emerald-400 italic font-light">platform</span>.
      </h2>
    ),
    description:
      "Request a secure system administration profile to manage luxury bookings, approval gates, platforms, and financial parameters.",
    bullets: [
      "Unified management of client requests",
      "Complete fleet operator vetting dashboard",
      "Real-time billing & platform fee controllers",
    ],
    accentText: "text-emerald-400",
    accentBorder:
      "border-emerald-500/20 focus:border-emerald-500/70 focus:ring-emerald-500/30",
    buttonBg: "bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600",
    buttonText: "text-white",
    buttonShadow: "hover:shadow-[0_8px_32px_rgba(16,185,129,0.35)]",
    bulletsBg:
      "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400",
    bulletIcon: <ShieldCheck className="w-3.5 h-3.5" />,
    themeIcon: ShieldCheck,
    focusIconClass: "group-focus-within:text-emerald-400",
  },
};

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine starting default portal from router state
  const getInitialPortal = (): PortalType => {
    if (location.state?.portal) {
      const p = location.state.portal as PortalType;
      if (["customer", "fleet", "admin"].includes(p)) {
        return p;
      }
    }
    return "customer";
  };

  const [portal, setPortal] = useState<PortalType>(getInitialPortal);
  const theme = PORTAL_THEMES[portal];

  const [role, setRole] = useState<"CUSTOMER" | "OPERATOR" | "ADMIN">(() => {
    if (portal === "admin") return "ADMIN";
    if (portal === "fleet") return "OPERATOR";
    return "CUSTOMER";
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const evaluatePassword = (pass: string) => {
    setPassword(pass);
    let score = 0;
    if (pass.length > 5) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    setPasswordStrength(score);
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return { label: "Weak", color: "bg-red-400" };
    if (passwordStrength <= 2)
      return { label: "Medium", color: "bg-yellow-400" };
    return { label: "Strong", color: "bg-green-500" };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/auth/register", {
        email,
        password,
        role_name: role,
        first_name: firstName,
        last_name: lastName,
        company_name: companyName,
      });
      if (res.data.success) {
        navigate(`/login/${portal}`, {
          state: { returnTo: location.state?.returnTo },
        });
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to register");
      setIsLoading(false);
    }
  };

  // Synchronize dynamic skin visual changes when changing account type
  const handleRoleChange = (newRole: "CUSTOMER" | "OPERATOR" | "ADMIN") => {
    setRole(newRole);
    if (newRole === "ADMIN") {
      setPortal("admin");
    } else if (newRole === "OPERATOR") {
      setPortal("fleet");
    } else {
      setPortal("customer");
    }
  };

  return (
    <div className="relative min-h-screen font-['Inter'] bg-slate-950 text-white flex overflow-hidden">
      {/* Background ambient accents tracking active identity */}
      <div
        className={`absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-br transition-all duration-700 ${theme.bgClass} rounded-full blur-[140px] pointer-events-none`}
      />
      <div
        className={`absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tl transition-all duration-700 ${theme.bgClass} rounded-full blur-[140px] pointer-events-none`}
      />

      <div className="w-full grid lg:grid-cols-12 min-h-screen relative z-10">
        {/* Left pane: Pure luxury visual block (Desktop Only) */}
        <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 relative flex-col justify-between p-12 overflow-hidden border-r border-white/5">
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={theme.leftBgImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.75, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                src={theme.leftBgImage}
                className="w-full h-full object-cover contrast-[1.12] brightness-[1.05] saturate-[1.15]"
                alt={theme.brandName}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/25 to-slate-950/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950" />
          </div>

          <div className="relative z-10 flex items-center gap-2">
            <Compass
              className={`w-8 h-8 transition-colors duration-500 ${theme.accentText} stroke-[1.5] animate-pulse`}
            />
            <span className="text-xl font-bold tracking-wider uppercase text-white">
              Singapore{" "}
              <span className="font-light text-white/70">Premium</span>
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={portal}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 max-w-lg"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider mb-6">
                <theme.themeIcon
                  className={`w-3.5 h-3.5 ${theme.accentText}`}
                />
                <span className="text-gray-300">{theme.badge}</span>
              </div>

              {theme.title}

              <p className="text-gray-400 text-base leading-relaxed mb-8 font-light">
                {theme.description}
              </p>

              <div className="space-y-4 border-t border-white/10 pt-8">
                {theme.bullets.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-sm text-gray-300"
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${theme.bulletsBg}`}
                    >
                      {theme.bulletIcon}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 text-xs text-gray-500 font-light tracking-wide">
            © 2026 Singapore Tour Booking. All privileges reserved.
          </div>
        </div>

        {/* Right pane: Register form container */}
        <div className="col-span-12 lg:col-span-7 xl:col-span-6 flex items-center justify-center p-6 md:p-12 xl:p-24 overflow-y-auto">
          <div className="w-full max-w-md my-auto">
            {/* Logo/Tagline (Mobile Only Showcase) */}
            <div className="flex lg:hidden flex-col items-center justify-center text-center gap-2 mb-8">
              <Compass
                className={`w-10 h-10 transition-colors duration-500 ${theme.accentText} stroke-[1.5] mb-2`}
              />
              <div className="flex items-center gap-1.5 justify-center">
                <span className="text-xl font-bold tracking-wider uppercase">
                  {theme.brandName}
                </span>
              </div>
              <p className="text-xs text-gray-400 max-w-xs">{theme.badge}</p>
            </div>

            {/* Main Form Box with Glass Layering */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl px-6 py-8 md:p-10 rounded-[28px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>

              <div className="space-y-2 mb-8 relative z-20">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                  Create Account
                </h1>
                <p className="text-sm text-gray-400">{theme.tagline}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-200 text-xs rounded-xl p-3 text-center"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="space-y-4">
                  {/* Premium Role/Type Picker Selector */}
                  <div>
                    <label className="block text-xs font-semibold tracking-wider text-gray-300 uppercase mb-2">
                      Account Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { key: "CUSTOMER", label: "Customer", icon: Sparkles },
                        { key: "OPERATOR", label: "Fleet", icon: Car },
                      ].map((opt) => {
                        const isSel = role === opt.key;
                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => handleRoleChange(opt.key as any)}
                            className={`flex flex-col items-center justify-center py-2.5 px-1.5 rounded-xl border text-center transition-all duration-300 relative overflow-hidden ${
                              isSel
                                ? `border-current ${theme.accentText} bg-white/5 ring-1 ring-current/20`
                                : "border-white/15 hover:border-white/30 text-gray-400 hover:text-white bg-black/30"
                            }`}
                          >
                            <opt.icon className="w-5 h-5 mb-1 stroke-[1.5]" />
                            <span className="text-[10px] font-bold tracking-wider uppercase">
                              {opt.label}
                            </span>
                            {isSel && (
                              <motion.span
                                layoutId="activeRegisterRoleIndicator"
                                className="absolute bottom-0 inset-x-0 h-[2px] bg-current"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold tracking-wider text-gray-300 uppercase mb-2">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 transition-colors ${theme.focusIconClass}`}
                      />
                      <input
                        type="email"
                        required
                        placeholder="luxury@traveler.com"
                        className={`w-full bg-black/40 border border-white/10 ${theme.accentBorder} rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300 shadow-inner`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-semibold tracking-wider text-gray-300 uppercase mb-2">
                      Password
                    </label>
                    <div className="relative group">
                      <Key
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 transition-colors ${theme.focusIconClass}`}
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Min 6 characters"
                        className={`w-full bg-black/40 border border-white/10 ${theme.accentBorder} rounded-xl py-3 pl-12 pr-12 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300 shadow-inner`}
                        value={password}
                        onChange={(e) => evaluatePassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-[18px] h-[18px]" />
                        ) : (
                          <Eye className="w-[18px] h-[18px]" />
                        )}
                      </button>
                    </div>

                    {/* Password strength meter */}
                    {password && (
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between items-center text-[10px] text-gray-400">
                          <span>
                            Strength:{" "}
                            <strong className="text-white">
                              {getStrengthLabel().label}
                            </strong>
                          </span>
                        </div>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden flex gap-0.5">
                          <div
                            className={`h-full transition-all duration-300 ${passwordStrength >= 1 ? getStrengthLabel().color : "bg-transparent"} flex-1`}
                          />
                          <div
                            className={`h-full transition-all duration-300 ${passwordStrength >= 2 ? getStrengthLabel().color : "bg-transparent"} flex-1`}
                          />
                          <div
                            className={`h-full transition-all duration-300 ${passwordStrength >= 3 ? getStrengthLabel().color : "bg-transparent"} flex-1`}
                          />
                          <div
                            className={`h-full transition-all duration-300 ${passwordStrength >= 4 ? getStrengthLabel().color : "bg-transparent"} flex-1`}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Conditional Fields based on Chosen Role */}
                  <AnimatePresence mode="wait">
                    {role === "CUSTOMER" || role === "ADMIN" ? (
                      <motion.div
                        key="names"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-4 pt-1">
                          <div>
                            <label className="block text-xs font-semibold tracking-wider text-gray-300 uppercase mb-2">
                              First Name
                            </label>
                            <div className="relative group">
                              <User
                                className={`absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 transition-colors ${theme.focusIconClass}`}
                              />
                              <input
                                type="text"
                                required
                                placeholder="David"
                                className={`w-full bg-black/40 border border-white/10 ${theme.accentBorder} rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300`}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold tracking-wider text-gray-300 uppercase mb-2">
                              Last Name
                            </label>
                            <div className="relative group">
                              <User
                                className={`absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 transition-colors ${theme.focusIconClass}`}
                              />
                              <input
                                type="text"
                                required
                                placeholder="Lee"
                                className={`w-full bg-black/40 border border-white/10 ${theme.accentBorder} rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300`}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="company"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-1">
                          <label className="block text-xs font-semibold tracking-wider text-gray-300 uppercase mb-2">
                            Company Name
                          </label>
                          <div className="relative group">
                            <Building
                              className={`absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 transition-colors ${theme.focusIconClass}`}
                            />
                            <input
                              type="text"
                              required
                              placeholder="E.g. Sovereign Limousines Ltd"
                              className={`w-full bg-black/40 border border-white/10 ${theme.accentBorder} rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300`}
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full cursor-pointer relative overflow-hidden group ${theme.buttonBg} ${theme.buttonText} font-bold h-[48px] rounded-xl transition-all duration-300 hover:scale-[1.01] ${theme.buttonShadow} disabled:opacity-50 flex items-center justify-center text-sm font-semibold tracking-wide uppercase`}
                >
                  {isLoading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">
                      Sign Up <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                </button>

                {/* Login link */}
                <div className="text-center text-xs text-gray-400 font-medium">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    state={{ portal, returnTo: location.state?.returnTo }}
                    className={`font-semibold ${theme.accentText} hover:underline transition-colors`}
                  >
                    Sign In
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
