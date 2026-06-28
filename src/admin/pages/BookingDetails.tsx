import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BookingDetails() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState("");
  const [updating, setUpdating] = useState(false);

  const [vehicles, setVehicles] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [assigningType, setAssigningType] = useState<
    "VEHICLE" | "DRIVER" | null
  >(null);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchDetails();
    fetchOptions();
    const interval = setInterval(fetchDetails, 10000);
    return () => clearInterval(interval);
  }, [id]);

  const fetchOptions = async () => {
    try {
      const [v, d] = await Promise.all([
        axios.get("/api/admin/vehicles"),
        axios.get("/api/admin/drivers"),
      ]);
      setVehicles(v.data);
      setDrivers(d.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`/api/admin/bookings/${id}`);
      setBooking(res.data);
      if (!editingNotes) {
        setNotesDraft(res.data.details.internalNotes || "");
      }
    } catch (e) {
      console.error(e);
      if (!booking) navigate("/admin/bookings");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status: string) => {
    try {
      setUpdating(true);
      await axios.put(`/api/admin/bookings/${id}`, { status });
      await fetchDetails();
    } catch (e) {
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const saveNotes = async () => {
    try {
      setUpdating(true);
      await axios.put(`/api/admin/bookings/${id}`, {
        internalNotes: notesDraft,
      });
      setEditingNotes(false);
      await fetchDetails();
    } catch (e) {
      alert("Failed to save notes");
    } finally {
      setUpdating(false);
    }
  };

  const submitAssignment = async () => {
    if (!selectedAssignmentId) return;
    try {
      setUpdating(true);
      const payload: any = {};
      if (assigningType === "VEHICLE") payload.vehicleId = selectedAssignmentId;
      if (assigningType === "DRIVER") payload.driverId = selectedAssignmentId;

      await axios.post(`/api/admin/bookings/${id}/assign`, payload);
      setAssigningType(null);
      setSelectedAssignmentId("");
      await fetchDetails();
    } catch (e) {
      alert("Failed to assign");
    } finally {
      setUpdating(false);
    }
  };

  if (loading && !booking) {
    return <div className="p-8 text-center">Loading Booking...</div>;
  }
  if (!booking) return null;

  const assignedVehicle = booking.items?.find(
    (i: any) => i.item_type === "VEHICLE",
  );
  const assignedDriver = booking.items?.find(
    (i: any) => i.item_type === "DRIVER",
  );

  const assignedVehicleInfo = vehicles.find(
    (v) => v.id === assignedVehicle?.reference_id,
  );
  const assignedDriverInfo = drivers.find(
    (d) => d.id === assignedDriver?.reference_id,
  );

  return (
    <div className="px-margin-mobile md:px-8 pb-12 w-full max-w-[1200px] mx-auto overflow-x-hidden relative">
      {/* Assignment Modal (Simple overlay) */}
      {assigningType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Assign {assigningType}
            </h3>
            <select
              className="w-full bg-gray-50 border border-gray-200 rounded p-2 mb-4"
              value={selectedAssignmentId}
              onChange={(e) => setSelectedAssignmentId(e.target.value)}
            >
              <option value="">-- Select {assigningType} --</option>
              {assigningType === "VEHICLE" &&
                vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.model} ({v.license_plate})
                  </option>
                ))}
              {assigningType === "DRIVER" &&
                drivers.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.first_name} {d.last_name}
                  </option>
                ))}
            </select>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setAssigningType(null)}
                className="px-4 py-2 border rounded font-medium"
              >
                Cancel
              </button>
              <button
                onClick={submitAssignment}
                disabled={updating || !selectedAssignmentId}
                className="px-4 py-2 bg-blue-600 text-white rounded font-medium"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4 mb-stack-lg">
        <button
          onClick={() => navigate("/admin/bookings")}
          aria-label="Go back"
          className="w-[44px] h-[44px] flex items-center justify-center rounded-full hover:bg-gray-50 text-gray-500 transition-colors"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            arrow_back
          </span>
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Booking #{booking.id.substring(0, 8).toUpperCase()}
          </h2>
          <p className="text-base text-gray-500 mt-1">
            Created on {new Date(booking.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <select
            value={booking.status}
            onChange={(e) => updateStatus(e.target.value)}
            disabled={updating}
            className={`bg-white border border-gray-200 text-sm font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              booking.status === "CONFIRMED"
                ? "text-[#137333]"
                : booking.status === "PENDING"
                  ? "text-[#B08D00]"
                  : booking.status === "CANCELLED"
                    ? "text-red-600"
                    : "text-gray-900"
            }`}
          >
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      </div>

      {/* Grid Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-stack-lg items-start">
        {/* Left Column (Main Details) - Approx 66% */}
        <div className="lg:col-span-2 space-y-stack-lg">
          {/* Customer & Trip Basic Info Card */}
          <section className="bg-white rounded-xl p-stack-md shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-stack-md border-b border-gray-200 pb-2">
              Trip Information
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase">
                  Customer
                </p>
                <p className="text-base font-medium">{booking.customerName}</p>
                <p className="text-sm text-gray-500">{booking.customerEmail}</p>
                <p className="text-sm text-gray-500">{booking.customerPhone}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase">
                  Type
                </p>
                <p className="text-base font-medium capitalize">
                  {booking.bookingType}
                </p>
                <p className="text-sm text-gray-500">
                  Passengers: {booking.details.passengers || "-"}
                </p>
                <p className="text-sm text-gray-500">
                  Flight: {booking.details.flightNumber || "-"}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-blue-600 mt-0.5">
                  location_on
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase">
                    Pickup
                  </p>
                  <p className="text-base font-medium">
                    {booking.details.pickup ||
                      booking.details.pickup_location ||
                      "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(booking.date).toLocaleDateString()}{" "}
                    {new Date(booking.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <div className="w-0.5 h-6 bg-gray-200 ml-[11px]"></div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-gray-500 mt-0.5">
                  flag
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase">
                    Destination
                  </p>
                  <p className="text-base font-medium">
                    {booking.details.destination ||
                      booking.details.drop_location ||
                      "Return to base / Hourly"}
                  </p>
                  {booking.details.duration && (
                    <p className="text-sm text-gray-500">
                      Duration: {booking.details.duration}{" "}
                      {booking.details.bookingType === "daily"
                        ? "days"
                        : "hours"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Vehicle & Driver Assignment Card */}
          <section className="bg-white rounded-xl p-stack-md shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-stack-md border-b border-gray-200 pb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Fulfillment & Assignment
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-md mb-6">
              <div className="flex flex-col h-full bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase mb-2">
                  Vehicle
                </p>
                {assignedVehicleInfo ? (
                  <div className="mb-4">
                    <p className="font-bold text-gray-900">
                      {assignedVehicleInfo.model}
                    </p>
                    <p className="text-sm text-gray-500">
                      {assignedVehicleInfo.license_plate}
                    </p>
                  </div>
                ) : (
                  <div className="mb-4 text-gray-500 italic text-sm">
                    No vehicle assigned
                  </div>
                )}
                <div className="mt-auto">
                  <button
                    onClick={() => {
                      setAssigningType("VEHICLE");
                      setSelectedAssignmentId(assignedVehicleInfo?.id || "");
                    }}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-900 hover:bg-white transition-colors shadow-sm"
                  >
                    {assignedVehicleInfo
                      ? "Reassign Vehicle"
                      : "Assign Vehicle"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col h-full bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase mb-2">
                  Driver
                </p>
                {assignedDriverInfo ? (
                  <div className="mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-gray-500 text-4xl">
                      account_circle
                    </span>
                    <div>
                      <p className="font-bold text-gray-900">
                        {assignedDriverInfo.first_name}{" "}
                        {assignedDriverInfo.last_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {assignedDriverInfo.license_number ||
                          "ID: " + assignedDriverInfo.id.substring(0, 6)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 text-gray-500 italic text-sm">
                    No driver assigned
                  </div>
                )}
                <div className="mt-auto">
                  <button
                    onClick={() => {
                      setAssigningType("DRIVER");
                      setSelectedAssignmentId(assignedDriverInfo?.id || "");
                    }}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-900 hover:bg-white transition-colors shadow-sm"
                  >
                    {assignedDriverInfo ? "Reassign Driver" : "Assign Driver"}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#E6F4EA] p-3 rounded text-sm text-[#137333] flex gap-2">
              <span className="material-symbols-outlined text-[#137333] text-[20px]">
                info
              </span>
              <span>
                Requested Category:{" "}
                <strong>
                  {booking.details.vehicleCategoryExpected || "Any"}
                </strong>
              </span>
            </div>
          </section>

          {/* Internal Notes */}
          <section className="bg-white rounded-xl p-stack-md shadow-sm border border-[#FFECB3]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[#B08D00]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  note
                </span>
                Internal Notes
              </h3>
              {!editingNotes ? (
                <button
                  onClick={() => setEditingNotes(true)}
                  className="text-sm font-bold text-blue-600 hover:underline"
                >
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingNotes(false)}
                    className="text-sm font-bold text-gray-500 hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveNotes}
                    className="text-sm font-bold text-blue-600 hover:underline"
                    disabled={updating}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
            {editingNotes ? (
              <textarea
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                className="w-full min-h-[100px] border border-gray-200 rounded-lg p-2 text-sm focus:ring-1 focus:ring-blue-600 outline-none"
                placeholder="Add internal staff notes here... this is hidden from customers."
              />
            ) : (
              <p className="text-sm text-gray-500 whitespace-pre-wrap">
                {booking.details.internalNotes || "No internal notes."}
              </p>
            )}
          </section>
        </div>

        {/* Right Column (Sidebar) - Approx 33% */}
        <div className="lg:col-span-1 space-y-stack-lg sticky top-24">
          {/* Payment Summary */}
          <section className="bg-white rounded-xl p-stack-md shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-stack-md">
              Payment Info
            </h3>
            <div className="space-y-3 mb-6">
              <div className="w-full h-[1px] bg-gray-200/30 my-4"></div>
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-lg font-semibold font-bold text-gray-900">
                    Total Amount
                  </span>
                </div>
                <span className="text-xl font-bold font-bold text-blue-600">
                  S${parseFloat(booking.amount).toFixed(2)}
                </span>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <section className="flex flex-col gap-3">
            {booking.status !== "CANCELLED" && (
              <button
                onClick={() => updateStatus("CANCELLED")}
                disabled={updating}
                className="w-full h-[44px] bg-red-600/10 text-red-600 text-base font-medium rounded hover:bg-red-600/20 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">
                  cancel
                </span>
                Cancel Booking
              </button>
            )}
            {booking.status === "CANCELLED" && (
              <button
                onClick={() => updateStatus("PENDING")}
                disabled={updating}
                className="w-full h-[44px] border border-gray-200 text-gray-900 text-base font-medium rounded hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">
                  restore
                </span>
                Restore Booking
              </button>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
