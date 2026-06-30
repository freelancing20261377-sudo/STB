import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Users,
  Car,
  User,
  Phone,
  Mail,
  Shield,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Timer,
  Plane,
  Star,
  CreditCard,
  FileText,
  Save,
} from "lucide-react";

const AMBER = "#E9A23B";
const NAVY = "#0a1128";

export default function BookingDetails() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  // Editable form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`/api/customer/bookings/${id}`);
      const b = res.data;
      setBooking(b);
      // Populate form fields
      setName(b.details?.customerName || "");
      setEmail(b.details?.customerEmail || "");
      setPhone(b.details?.customerPhone || "");
      setPickup(b.details?.pickup || b.details?.pickup_location || "");
      setDestination(b.details?.destination || b.details?.drop_location || "");
      setSpecialRequests(b.details?.specialRequests || "");
      if (b.date) {
        const d = new Date(b.date);
        setDate(d.toISOString().split("T")[0]);
        setTime(d.toTimeString().slice(0, 5));
      }
    } catch (e) {
      console.error(e);
      navigate("/customer/bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // In a real app this would PUT to the API
      await new Promise((r) => setTimeout(r, 800));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Failed to update booking.");
    } finally {
      setSaving(false);
    }
  };

  const statusConfig: Record<
    string,
    { icon: React.ReactNode; bg: string; text: string; border: string; label: string }
  > = {
    CONFIRMED: {
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      bg: "#f0fdf4",
      text: "#16a34a",
      border: "#bbf7d0",
      label: "Confirmed",
    },
    PENDING: {
      icon: <Timer className="w-3.5 h-3.5" />,
      bg: "#fffbeb",
      text: "#b45309",
      border: "#fde68a",
      label: "Pending",
    },
    COMPLETED: {
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      bg: "#f8fafc",
      text: "#64748b",
      border: "#e2e8f0",
      label: "Completed",
    },
    CANCELLED: {
      icon: <XCircle className="w-3.5 h-3.5" />,
      bg: "#fef2f2",
      text: "#dc2626",
      border: "#fecaca",
      label: "Cancelled",
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-10 h-10 rounded-full border-2 animate-spin"
            style={{ borderColor: AMBER, borderTopColor: "transparent" }}
          />
          <p className="text-sm text-gray-400 font-medium">Loading booking…</p>
        </div>
      </div>
    );
  }

  if (!booking) return null;

  const status = statusConfig[booking.status] || statusConfig.PENDING;
  const isEditable = booking.status === "PENDING";
  const bookingDate = new Date(booking.date);

  const inputClass =
    "w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-slate-800 font-medium outline-none transition-all duration-200 bg-white";
  const readonlyClass =
    "w-full pl-11 pr-4 py-3 border border-gray-100 rounded-xl text-sm text-slate-700 font-medium bg-gray-50 cursor-not-allowed";

  const Field = ({
    label,
    icon,
    value,
    onChange,
    type = "text",
    placeholder = "",
    readonly = false,
  }: {
    label: string;
    icon: React.ReactNode;
    value: string;
    onChange?: (v: string) => void;
    type?: string;
    placeholder?: string;
    readonly?: boolean;
  }) => (
    <div>
      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-300">
          {icon}
        </div>
        <input
          type={type}
          value={value}
          readOnly={readonly || !isEditable}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={readonly || !isEditable ? readonlyClass : inputClass}
          onFocus={
            isEditable && !readonly
              ? (e) => {
                  e.target.style.borderColor = AMBER;
                  e.target.style.boxShadow = "0 0 0 3px rgba(233,162,59,0.12)";
                }
              : undefined
          }
          onBlur={
            isEditable && !readonly
              ? (e) => {
                  e.target.style.borderColor = "";
                  e.target.style.boxShadow = "";
                }
              : undefined
          }
        />
      </div>
    </div>
  );

  return (
    <main
      className="p-6 lg:p-8 flex-1"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      {/* ── Header ── */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/customer/bookings")}
          aria-label="Go back"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-slate-900 truncate">
            Booking #{booking.id.substring(0, 10).toUpperCase()}
          </h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            Created on{" "}
            {new Date(booking.createdAt).toLocaleDateString("en-SG", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <span
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex-shrink-0"
          style={{
            background: status.bg,
            color: status.text,
            border: `1px solid ${status.border}`,
          }}
        >
          {status.icon}
          {status.label}
        </span>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 gap-6">
          {/* ── LEFT: Booking Form ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Notice for non-editable bookings */}
            {!isEditable && (
              <div
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: "#fffbeb", border: "1px solid #fde68a" }}
              >
                <AlertCircle
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: "#b45309" }}
                />
                <p
                  className="text-xs font-semibold leading-relaxed"
                  style={{ color: "#92400e" }}
                >
                  This booking is <strong>{booking.status}</strong> and cannot
                  be modified. Contact support if you need assistance.
                </p>
              </div>
            )}

            {/* ── Passenger Details Card ── */}
            <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)] border border-gray-100/80">
              <div
                className="px-6 py-5 flex items-center gap-3"
                style={{
                  background: `linear-gradient(135deg, ${NAVY} 0%, #111a3a 100%)`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(233,162,59,0.15)",
                    border: "1px solid rgba(233,162,59,0.3)",
                  }}
                >
                  <User className="w-4 h-4" style={{ color: AMBER }} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Passenger Details
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {isEditable
                      ? "Update your contact information"
                      : "Contact information for this booking"}
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field
                  label="Full Name"
                  icon={<User className="w-4 h-4" />}
                  value={name}
                  onChange={setName}
                  placeholder="John Smith"
                />
                <Field
                  label="Email Address"
                  icon={<Mail className="w-4 h-4" />}
                  value={email}
                  onChange={setEmail}
                  type="email"
                  placeholder="john@example.com"
                />
                <Field
                  label="Phone Number"
                  icon={<Phone className="w-4 h-4" />}
                  value={phone}
                  onChange={setPhone}
                  type="tel"
                  placeholder="+65 9123 4567"
                />
                <Field
                  label="Special Requests"
                  icon={<Star className="w-4 h-4" />}
                  value={specialRequests}
                  onChange={setSpecialRequests}
                  placeholder="Child seat, wheelchair access…"
                />
              </div>
            </div>

            {/* ── Trip Details Card ── */}
            <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)] border border-gray-100/80">
              <div
                className="px-6 py-5 flex items-center gap-3"
                style={{
                  background: `linear-gradient(135deg, ${NAVY} 0%, #111a3a 100%)`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(233,162,59,0.15)",
                    border: "1px solid rgba(233,162,59,0.3)",
                  }}
                >
                  <MapPin className="w-4 h-4" style={{ color: AMBER }} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Trip Details
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Pickup, destination & schedule
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field
                  label="Pickup Location"
                  icon={<MapPin className="w-4 h-4" />}
                  value={pickup}
                  onChange={setPickup}
                  placeholder="Changi Airport T3"
                />
                <Field
                  label="Destination"
                  icon={<MapPin className="w-4 h-4" />}
                  value={destination}
                  onChange={setDestination}
                  placeholder="Marina Bay Sands"
                />
                <Field
                  label="Date"
                  icon={<Calendar className="w-4 h-4" />}
                  value={date}
                  onChange={setDate}
                  type="date"
                />
                <Field
                  label="Time"
                  icon={<Clock className="w-4 h-4" />}
                  value={time}
                  onChange={setTime}
                  type="time"
                />

                {/* Read-only fields */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Booking Type
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-300">
                      <FileText className="w-4 h-4" />
                    </div>
                    <input
                      readOnly
                      value={
                        (booking.details?.bookingType || "—").charAt(0).toUpperCase() +
                        (booking.details?.bookingType || "—").slice(1)
                      }
                      className={readonlyClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Passengers
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-300">
                      <Users className="w-4 h-4" />
                    </div>
                    <input
                      readOnly
                      value={booking.details?.passengers || "—"}
                      className={readonlyClass}
                    />
                  </div>
                </div>

                {booking.details?.flightNumber && (
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Flight Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-300">
                        <Plane className="w-4 h-4" />
                      </div>
                      <input
                        readOnly
                        value={booking.details.flightNumber}
                        className={readonlyClass}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>



            {/* ── Action Buttons ── */}
            {isEditable && (
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-60"
                  style={{
                    background: saved ? "#16a34a" : AMBER,
                    color: saved ? "#fff" : "#0a1128",
                  }}
                >
                  {saving ? (
                    <>
                      <div
                        className="w-4 h-4 border-2 rounded-full animate-spin"
                        style={{
                          borderColor: "#0a1128",
                          borderTopColor: "transparent",
                        }}
                      />
                      Saving…
                    </>
                  ) : saved ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Submit Form
                    </>
                  )}
                </button>

              </div>
            )}
          </div>


        </div>
      </form>
    </main>
  );
}
