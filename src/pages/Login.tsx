import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Key,
  Eye,
  EyeOff,
  ArrowLeft,
  Shield,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Compass,
  Car,
  ShieldCheck,
  Milestone,
  Database,
  Activity,
  Fingerprint,
  RefreshCw,
} from "lucide-react";

type AuthScreen = "signin" | "forgot" | "otp" | "reset" | "verified";
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
    tagline: "Continue your premium travel experience",
    badge: "Luxury Mobility Ecosystem",
    bgClass: "from-blue-600/10 to-[#E9A23B]/10",
    leftBgImage:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1952&auto=format&fit=crop", // MBS Skyline
    title: (
      <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
        Journeys that
        <br />
        define{" "}
        <span className="text-[#E9A23B] italic font-light">perfection</span>.
      </h2>
    ),
    description:
      "Access Singapore's premier chauffeured experiences, airport gateway VIP escorts, and customized private fleet journeys.",
    bullets: [
      "Handpicked elite master professional drivers",
      "Pristine first-class executive vehicles",
      "Curated experiential routes across Singapore",
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
    tagline: "Manage your vehicles, drivers and bookings.",
    badge: "Fleet Logistics & Dispatch",
    bgClass: "from-blue-500/10 to-sky-450/10",
    leftBgImage:
      "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=1920&auto=format&fit=crop", // Executive Mercedes Chauffeur
    title: (
      <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
        Precision logistics.
        <br />
        Optimized{" "}
        <span className="text-sky-450 italic font-light text-sky-400">
          dispatch
        </span>
        .
      </h2>
    ),
    description:
      "Empowering fleet partners with state-of-the-art telemetry, real-time dispatch, routing tools, and driver scheduling.",
    bullets: [
      "Real-time telemetry & dispatch synchronization",
      "Integrated professional driver calendars",
      "Instant digital wallet payments & invoice settlement",
    ],
    accentText: "text-sky-400",
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
    shortName: "Singapore Control Center",
    tagline: "Secure access to the Singapore Tour Booking Management Center.",
    badge: "Enterprise Control Suite",
    bgClass: "from-indigo-600/10 to-emerald-500/10",
    leftBgImage: "", // Removed background image
    title: <></>,
    description: "",
    bullets: [],
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

export default function Login() {
  const { type } = useParams<{ type: string }>();
  // Navigation & Authentication
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from =
    location.state?.returnTo || location.state?.from?.pathname || "/";

  // Determine starting default portal based on context or redirect route
  const getInitialPortal = (): PortalType => {
    if (type === "admin" || from.startsWith("/admin")) return "admin";
    if (
      type === "fleet" ||
      type === "partner" ||
      from.startsWith("/partner") ||
      from.startsWith("/driver")
    )
      return "fleet";
    return "customer";
  };

  const [portal, setPortal] = useState<PortalType>(getInitialPortal);
  const theme = PORTAL_THEMES[portal];

  useEffect(() => {
    setPortal(getInitialPortal());
  }, [type]);

  // Screen State
  const [screen, setScreen] = useState<AuthScreen>("signin");

  // Input States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Password Recovery Flow States
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Handle standard Sign In submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const requestedRole =
        portal === "fleet"
          ? "OPERATOR"
          : portal === "admin"
            ? "ADMIN"
            : "CUSTOMER";
      const res = await axios.post("/api/auth/login", {
        email,
        password,
        requestedRole,
      });
      if (res.data.success) {
        login(res.data);
        const role = res.data.user.role;

        // Convert any existing booking draft
        const sessionId = localStorage.getItem("guestSessionId");
        if (sessionId && role === "CUSTOMER") {
          try {
            await axios.post("/api/booking-drafts/convert", { sessionId });
            localStorage.removeItem("guestSessionId");
          } catch (e) {
            console.error("Failed to convert draft", e);
          }
        }

        // Determine dashboard route
        if (from !== "/") {
          navigate(from, { replace: true });
        } else if (role === "CUSTOMER") {
          navigate("/customer/dashboard", { replace: true });
        } else if (role === "OPERATOR") {
          navigate("/partner/dashboard", { replace: true });
        } else if (role === "ADMIN") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to login");
      setIsLoading(false);
    }
  };

  // Helper for OTP auto-focus next input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Simulated Recovery flow triggers
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail) {
      setError("Please enter your email address");
      return;
    }
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      setIsLoading(false);
      setScreen("otp");
    }, 1200);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.some((val) => !val)) {
      setError("Please enter the full 6-digit code");
      return;
    }
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      setIsLoading(false);
      setScreen("reset");
    }, 1000);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      setIsLoading(false);
      setScreen("verified");
    }, 1500);
  };

  // Evaluate password strength
  const evaluatePassword = (pass: string) => {
    setNewPassword(pass);
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

  return (
    <div className="relative min-h-screen font-['Inter'] bg-slate-950 text-white flex overflow-hidden">
      {/* Background ambient accents tracking active identity */}
      <div
        className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br transition-all duration-700 ${theme.bgClass} rounded-full blur-[140px] pointer-events-none`}
      />
      <div
        className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-tl transition-all duration-700 ${theme.bgClass} rounded-full blur-[140px] pointer-events-none`}
      />

      {/* Grid container spanning Split layouts of Singapore Visuals vs Form panel */}
      <div
        className={`w-full min-h-screen relative z-10 ${portal === "admin" ? "flex items-center justify-center" : "grid lg:grid-cols-2"}`}
      >
        {/* Left pane: Brand visual block (Desktop Only) */}
        {portal !== "admin" && (
          <div className="hidden lg:flex relative flex-col justify-between p-12 lg:p-16 xl:p-20 overflow-hidden border-r border-white/5">
            <div className="absolute inset-0 z-0">
              <AnimatePresence mode="wait">
                {theme.leftBgImage && (
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
                )}
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
                className="relative z-10 max-w-lg mt-auto mb-16"
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
        )}

        {/* Right pane: Elegant interactive authorization workspace */}
        <div
          className={`flex items-center justify-center p-6 md:p-12 lg:p-16 xl:p-24 w-full h-full ${portal === "admin" ? "" : "lg:col-span-1"}`}
        >
          <div
            className={`w-full flex flex-col justify-center ${portal === "admin" ? "max-w-[520px]" : "max-w-md 2xl:max-w-[440px]"}`}
          >
            {/* Logo/Tagline (Mobile Only Showcase for Customer/Fleet, always visible for Admin) */}
            <div
              className={`${portal === "admin" ? "flex" : "flex lg:hidden"} flex-col items-center justify-center text-center gap-2 mb-8 ${portal === "admin" ? "mt-0" : "mt-12"}`}
            >
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

            {/* Main Form Box with Layered Glass and Shadows */}
            <div className="bg-slate-900/40 border border-white/10 backdrop-blur-3xl px-8 py-10 md:px-10 md:py-12 rounded-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden ring-1 ring-white/5">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-70"></div>
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none"></div>

              <AnimatePresence mode="wait">
                {/* 1. SIGN IN SCREEN */}
                {screen === "signin" && (
                  <motion.div
                    key={`${portal}-signin`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-2 mb-8">
                      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                        {portal === "customer"
                          ? "Welcome Back"
                          : portal === "fleet"
                            ? "Fleet Operator Login"
                            : "Administrator Portal"}
                      </h1>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {theme.tagline}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-500/10 border border-red-500/20 text-red-200 text-xs rounded-xl p-3 text-center flex items-center justify-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          {error}
                        </motion.div>
                      )}

                      <div className="space-y-4">
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

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-semibold tracking-wider text-gray-300 uppercase">
                              Password
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                setError("");
                                setScreen("forgot");
                              }}
                              className={`text-xs ${theme.accentText} transition-all font-medium hover:underline`}
                            >
                              Forgot Password?
                            </button>
                          </div>
                          <div className="relative group">
                            <Key
                              className={`absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 transition-colors ${theme.focusIconClass}`}
                            />
                            <input
                              type={showPassword ? "text" : "password"}
                              required
                              placeholder="••••••••"
                              className={`w-full bg-black/40 border border-white/10 ${theme.accentBorder} rounded-xl py-3 pl-12 pr-12 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300 shadow-inner`}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
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
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full cursor-pointer relative overflow-hidden group ${theme.buttonBg} ${theme.buttonText} font-bold h-[48px] rounded-xl transition-all duration-300 hover:scale-[1.01] ${theme.buttonShadow} disabled:opacity-50 flex items-center justify-center text-sm font-semibold tracking-wide uppercase`}
                      >
                        {isLoading ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <span className="flex items-center gap-2">
                            Sign In <ArrowRight className="w-4 h-4" />
                          </span>
                        )}
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                      </button>

                      <div className="text-center text-xs text-gray-400 font-medium">
                        Don't have an account?{" "}
                        <Link
                          to="/register"
                          state={{
                            portal,
                            returnTo: from !== "/" ? from : undefined,
                          }}
                          className={`font-semibold ${theme.accentText} hover:underline transition-colors`}
                        >
                          Register account
                        </Link>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* 2. FORGOT PASSWORD SCREEN */}
                {screen === "forgot" && (
                  <motion.div
                    key="forgot"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      onClick={() => {
                        setError("");
                        setScreen("signin");
                      }}
                      className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white font-medium mb-6 transition-colors group"
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />{" "}
                      Back to Sign In
                    </button>

                    <div className="space-y-2 mb-8">
                      <h1 className="text-2xl font-bold tracking-tight text-white">
                        Reset Password
                      </h1>
                      <p className="text-sm text-gray-400">
                        Confirm your email address to receive a secure security
                        verification code
                      </p>
                    </div>

                    <form onSubmit={handleForgotSubmit} className="space-y-6">
                      {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-xs rounded-xl p-3 text-center">
                          {error}
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-semibold tracking-wider text-gray-300 uppercase mb-2">
                          Registered Email
                        </label>
                        <div className="relative group">
                          <Mail
                            className={`absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 transition-colors ${theme.focusIconClass}`}
                          />
                          <input
                            type="email"
                            required
                            placeholder="your-email@example.com"
                            className={`w-full bg-black/40 border border-white/10 ${theme.accentBorder} rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300`}
                            value={recoveryEmail}
                            onChange={(e) => setRecoveryEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full cursor-pointer relative overflow-hidden group ${theme.buttonBg} ${theme.buttonText} font-semibold h-[48px] rounded-xl hover:scale-[1.01] ${theme.buttonShadow} transition-all flex items-center justify-center text-sm tracking-wide uppercase`}
                      >
                        {isLoading ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <span>Send Code</span>
                        )}
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* 3. OPT VERIFICATION SCREEN */}
                {screen === "otp" && (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      onClick={() => setScreen("forgot")}
                      className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white font-medium mb-6 transition-colors group"
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />{" "}
                      Edit Email Address
                    </button>

                    <div className="space-y-2 mb-8">
                      <div
                        className={`w-12 h-12 rounded-2xl ${theme.bulletsBg} flex items-center justify-center mb-4`}
                      >
                        <Smartphone className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      <h1 className="text-2xl font-bold tracking-tight text-white">
                        Enter Verification Code
                      </h1>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        We sent a secure 6-digit verification code to{" "}
                        <span className="text-white font-medium">
                          {recoveryEmail || "your email"}
                        </span>
                        .
                      </p>
                    </div>

                    <form onSubmit={handleOtpSubmit} className="space-y-6">
                      {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-xs rounded-xl p-3 text-center">
                          {error}
                        </div>
                      )}

                      <div className="flex justify-between gap-2.5">
                        {otpCode.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`otp-${idx}`}
                            type="text"
                            maxLength={1}
                            autoFocus={idx === 0}
                            className={`w-12 h-14 bg-black/40 border border-white/10 focus:border-opacity-100 ${theme.accentBorder} rounded-xl text-center text-xl font-bold text-white outline-none transition-all duration-300`}
                            value={digit}
                            onChange={(e) =>
                              handleOtpChange(idx, e.target.value)
                            }
                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          />
                        ))}
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full cursor-pointer relative overflow-hidden group ${theme.buttonBg} ${theme.buttonText} font-semibold h-[48px] rounded-xl hover:scale-[1.01] ${theme.buttonShadow} transition-all flex items-center justify-center text-sm tracking-wide uppercase`}
                      >
                        {isLoading ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <span>Verify & Proceed</span>
                        )}
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                      </button>

                      <div className="text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setError("");
                            setOtpCode(["", "", "", "", "", ""]);
                            const el = document.getElementById("otp-0");
                            el?.focus();
                          }}
                          className={`text-xs ${theme.accentText} hover:underline font-medium transition-colors`}
                        >
                          Resend Verification Code
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* 4. RESET PASSWORD */}
                {screen === "reset" && (
                  <motion.div
                    key="reset"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-2 mb-8">
                      <h1 className="text-2xl font-bold tracking-tight text-white">
                        Create New Password
                      </h1>
                      <p className="text-sm text-gray-400">
                        Secure your premium account with a strong password
                      </p>
                    </div>

                    <form onSubmit={handleResetSubmit} className="space-y-5">
                      {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-xs rounded-xl p-3 text-center">
                          {error}
                        </div>
                      )}

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold tracking-wider text-gray-300 uppercase mb-2">
                            New Password
                          </label>
                          <div className="relative group">
                            <Key
                              className={`absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 transition-colors ${theme.focusIconClass}`}
                            />
                            <input
                              type="password"
                              required
                              placeholder="Min 6 characters"
                              className={`w-full bg-black/40 border border-white/10 ${theme.accentBorder} rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300`}
                              value={newPassword}
                              onChange={(e) => evaluatePassword(e.target.value)}
                            />
                          </div>

                          {/* Password strength meter */}
                          {newPassword && (
                            <div className="mt-2 space-y-1.5">
                              <div className="flex justify-between items-center text-[10px] text-gray-400">
                                <span>
                                  Strength:{" "}
                                  <strong className="text-white">
                                    {getStrengthLabel().label}
                                  </strong>
                                </span>
                                <span>{passwordStrength}/4</span>
                              </div>
                              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden flex gap-0.5">
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

                        <div>
                          <label className="block text-xs font-semibold tracking-wider text-gray-300 uppercase mb-2">
                            Confirm New Password
                          </label>
                          <div className="relative group">
                            <Key
                              className={`absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 transition-colors ${theme.focusIconClass}`}
                            />
                            <input
                              type="password"
                              required
                              placeholder="Re-enter password"
                              className={`w-full bg-black/40 border border-white/10 ${theme.accentBorder} rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300`}
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full cursor-pointer relative overflow-hidden group ${theme.buttonBg} ${theme.buttonText} font-semibold h-[48px] rounded-xl hover:scale-[1.01] ${theme.buttonShadow} transition-all flex items-center justify-center text-sm tracking-wide uppercase`}
                      >
                        {isLoading ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <span>Update Password</span>
                        )}
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* 5. VERIFIED CONFIRMATION SCREEN */}
                {screen === "verified" && (
                  <motion.div
                    key="verified"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 mx-auto mb-6">
                      <CheckCircle2 className="w-9 h-9 stroke-[1.5]" />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
                      Password Reset Successful
                    </h1>
                    <p className="text-sm text-gray-400 max-w-xs mx-auto mb-8">
                      Your premium security credentials have been updated. You
                      can now log in securely using your new password.
                    </p>

                    <button
                      onClick={() => {
                        setEmail("");
                        setPassword("");
                        setError("");
                        setScreen("signin");
                      }}
                      className={`w-full cursor-pointer relative overflow-hidden group ${theme.buttonBg} ${theme.buttonText} font-bold h-[48px] rounded-xl transition-all flex items-center justify-center text-sm font-semibold tracking-wide uppercase`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Sign In Securely <ArrowRight className="w-4 h-4" />
                      </span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
