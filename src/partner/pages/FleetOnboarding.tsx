import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function FleetOnboarding() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    companyName: "",
    businessRegistration: "",
    contactPerson: "",
    email: "",
    phoneNumber: "",
    companyAddress: "",
    fleetName: "",
    fleetSize: "",
    vehicleTypes: "",
    operatingAreas: "",
    businessDescription: "",
    categoryId: "",
    make: "",
    model: "",
    year: "",
    licensePlate: "",
    seatingCapacity: "",
    luggageCapacity: "",
    vehicleColor: "",
    transmission: "Automatic",
    fuelType: "Petrol",
    driverName: "",
    driverPhone: "",
    driverEmail: "",
    licenseNumber: "",
  });

  useEffect(() => {
    if (user && user.operatorProfile) {
      if (
        user.operatorProfile.onboarding_step > 1 &&
        user.operatorProfile.onboarding_step <= 5
      ) {
        setStep(user.operatorProfile.onboarding_step);
      }
      setFormData((prev) => ({
        ...prev,
        companyName: user.operatorProfile.company_name || prev.companyName,
      }));
    }

    axios
      .get("/api/vehicle-categories")
      .then((res) => setCategories(res.data))
      .catch(() => {});
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = async () => {
    setLoading(true);
    try {
      await axios.post("/api/partner/onboarding", { step, payload: formData });

      // Update local profile state if possible, though easier to just rely on re-fetch on next reload. Let's do a hard location change when done.
      if (step < 5) {
        setStep(step + 1);
      } else {
        // Complete! Next route change will reflect in layout check... but to be safe, fetch /me
        const profileRes = await axios.get("/api/auth/me");
        // Hack: update context manually if possible, or just force reload
        window.location.href = "/partner/dashboard";
      }
    } catch (err) {
      alert("Failed to save progress");
    } finally {
      setLoading(false);
    }
  };

  const renderStepIcon = (num: number, label: string) => (
    <div className="flex flex-col items-center">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= num ? "bg-blue-600 text-white" : "bg-slate-50-variant text-gray-500"}`}
      >
        {num}
      </div>
      <span className="text-xs mt-1 font-medium hidden md:block">{label}</span>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <div className="mb-4">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Website
        </button>
      </div>
      <div className="bg-white dark:bg-slate-50 border border-gray-200 shadow-sm rounded-2xl p-6 md:p-10">
        <h1 className="text-headline-md font-bold text-center mb-8">
          Partner Onboarding
        </h1>

        <div className="flex justify-between items-center mb-12 relative px-4">
          <div className="absolute left-8 right-8 top-4 h-[2px] bg-slate-50-variant -z-10"></div>
          {renderStepIcon(1, "Company")}
          {renderStepIcon(2, "Fleet")}
          {renderStepIcon(3, "Vehicle")}
          {renderStepIcon(4, "Driver")}
          {renderStepIcon(5, "Review")}
        </div>

        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-title-lg font-semibold">
                1. Company Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Business Reg / UEN
                  </label>
                  <input
                    type="text"
                    name="businessRegistration"
                    value={formData.businessRegistration}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Company Address
                  </label>
                  <input
                    type="text"
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-title-lg font-semibold">
                2. Fleet Information
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Fleet Name
                  </label>
                  <input
                    type="text"
                    name="fleetName"
                    value={formData.fleetName}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Estimated Fleet Size
                  </label>
                  <input
                    type="number"
                    name="fleetSize"
                    value={formData.fleetSize}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Target Operating Areas
                  </label>
                  <input
                    type="text"
                    name="operatingAreas"
                    placeholder="e.g. Islandwide, CBD, Airport"
                    value={formData.operatingAreas}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Business Description
                  </label>
                  <textarea
                    name="businessDescription"
                    value={formData.businessDescription}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-title-lg font-semibold">
                3. Add First Vehicle
              </h2>
              <p className="text-gray-500">
                You must add at least one vehicle to activate your fleet
                dashboard.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  >
                    <option value="">Select Category...</option>
                    {categories.map((c: any) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    License Plate
                  </label>
                  <input
                    type="text"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Make</label>
                  <input
                    type="text"
                    name="make"
                    placeholder="e.g. Toyota"
                    value={formData.make}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Model
                  </label>
                  <input
                    type="text"
                    name="model"
                    placeholder="e.g. Alphard"
                    value={formData.model}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Year</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Color
                  </label>
                  <input
                    type="text"
                    name="vehicleColor"
                    value={formData.vehicleColor}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Seating Capacity
                  </label>
                  <input
                    type="number"
                    name="seatingCapacity"
                    value={formData.seatingCapacity}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Luggage Capacity
                  </label>
                  <input
                    type="number"
                    name="luggageCapacity"
                    value={formData.luggageCapacity}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-title-lg font-semibold">
                4. Add Driver (Optional)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="driverName"
                    value={formData.driverName}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="driverPhone"
                    value={formData.driverPhone}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="driverEmail"
                    value={formData.driverEmail}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    License Number
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-title-lg font-semibold">
                5. Review & Submit
              </h2>
              <p className="text-gray-500">
                Please review your information before completing onboarding.
              </p>

              <div className="bg-gray-100 rounded-lg p-4 space-y-2 mt-4">
                <div>
                  <span className="font-semibold">Company:</span>{" "}
                  {formData.companyName}
                </div>
                <div>
                  <span className="font-semibold">Fleet:</span>{" "}
                  {formData.fleetName || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Vehicle:</span>{" "}
                  {formData.make} {formData.model} ({formData.licensePlate})
                </div>
                {formData.driverName && (
                  <div>
                    <span className="font-semibold">Driver:</span>{" "}
                    {formData.driverName}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-8">
            <button
              onClick={handleNext}
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-sm font-medium font-bold hover:bg-blue-600/90 transition-colors disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : step === 5
                  ? "Complete Onboarding"
                  : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
