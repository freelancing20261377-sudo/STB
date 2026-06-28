import React, { useState, useRef } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleResetData = () => {
    if (
      confirm(
        "Are you sure you want to factory reset the platform? This action cannot be undone.",
      )
    ) {
      alert("Platform resetting...");
    }
  };

  const handleInviteMember = () => {
    alert("Invite link generated and sent.");
  };

  return (
    <div className="px-margin-mobile md:px-8 pb-12 w-full max-w-[1200px] mx-auto overflow-x-hidden">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-stack-lg">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl font-bold text-gray-900 mb-1">
            Platform Settings
          </h2>
          <p className="text-base text-gray-500">
            Configure platform operations, branding, and integrations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 h-[44px] bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-600/90 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Navigation Slider/Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white elevation-1 rounded-xl p-2 sticky top-24 border border-gray-200">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab("general")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors whitespace-nowrap lg:whitespace-normal ${activeTab === "general" ? "bg-blue-100/50 text-blue-600 font-semibold" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={
                    activeTab === "general"
                      ? { fontVariationSettings: "'FILL' 1" }
                      : {}
                  }
                >
                  business
                </span>
                General Profile
              </button>
              <button
                onClick={() => setActiveTab("brand")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors whitespace-nowrap lg:whitespace-normal ${activeTab === "brand" ? "bg-blue-100/50 text-blue-600 font-semibold" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={
                    activeTab === "brand"
                      ? { fontVariationSettings: "'FILL' 1" }
                      : {}
                  }
                >
                  palette
                </span>
                Brand & Theme
              </button>
              <button
                onClick={() => setActiveTab("payment")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors whitespace-nowrap lg:whitespace-normal ${activeTab === "payment" ? "bg-blue-100/50 text-blue-600 font-semibold" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={
                    activeTab === "payment"
                      ? { fontVariationSettings: "'FILL' 1" }
                      : {}
                  }
                >
                  payments
                </span>
                Payment Gateways
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors whitespace-nowrap lg:whitespace-normal ${activeTab === "notifications" ? "bg-blue-100/50 text-blue-600 font-semibold" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={
                    activeTab === "notifications"
                      ? { fontVariationSettings: "'FILL' 1" }
                      : {}
                  }
                >
                  notifications_active
                </span>
                Notifications
              </button>
              <button
                onClick={() => setActiveTab("team")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors whitespace-nowrap lg:whitespace-normal ${activeTab === "team" ? "bg-blue-100/50 text-blue-600 font-semibold" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={
                    activeTab === "team"
                      ? { fontVariationSettings: "'FILL' 1" }
                      : {}
                  }
                >
                  admin_panel_settings
                </span>
                Team Access
              </button>
            </nav>
          </div>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 space-y-8">
          {/* General Profile Section */}
          {activeTab === "general" && (
            <>
              <div className="bg-white elevation-1 rounded-xl border border-gray-200 p-6 md:p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-4">
                  General Profile
                </h3>

                <div className="space-y-6 max-w-2xl">
                  {/* Logo Upload */}
                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/svg+xml"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div
                      onClick={handleUploadClick}
                      className="w-24 h-24 rounded-lg bg-gray-100 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-blue-600 transition-colors cursor-pointer group overflow-hidden"
                    >
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt="Logo Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <>
                          <span className="material-symbols-outlined group-hover:text-blue-600 group-hover:scale-110 transition-transform">
                            add_photo_alternate
                          </span>
                          <span className="text-xs mt-1 font-medium">
                            Upload
                          </span>
                        </>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Company Logo
                      </h4>
                      <p className="text-sm text-gray-500 mb-3">
                        Recommended size: 512x512px. Max 2MB (PNG, JPG, SVG).
                      </p>
                      <button
                        onClick={handleRemoveLogo}
                        className="text-sm font-medium text-blue-600 hover:text-blue-600-container"
                      >
                        Remove current logo
                      </button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        className="w-full h-[44px] px-4 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-gray-900"
                        defaultValue="SG Premium Transport"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Support Email
                      </label>
                      <input
                        type="email"
                        className="w-full h-[44px] px-4 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-gray-900"
                        defaultValue="bookings@sgpremium.com"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        className="w-full h-[44px] px-4 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-gray-900"
                        defaultValue="+65 6123 4567"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Registered Address
                      </label>
                      <textarea
                        className="w-full p-4 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-gray-900 resize-y min-h-[100px]"
                        defaultValue="10 Bayfront Ave, Marina Bay Sands, Singapore 018956"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* Localization Section */}
              <div className="bg-white elevation-1 rounded-xl border border-gray-200 p-6 md:p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-4">
                  Regional & Localization
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 max-w-2xl">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">
                      Default Currency
                    </label>
                    <div className="relative">
                      <select className="w-full h-[44px] px-4 appearance-none bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-gray-900 pr-10">
                        <option value="SGD">SGD - Singapore Dollar</option>
                        <option value="USD">USD - US Dollar</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        expand_more
                      </span>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">
                      Timezone
                    </label>
                    <div className="relative">
                      <select className="w-full h-[44px] px-4 appearance-none bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-gray-900 pr-10">
                        <option value="Asia/Singapore">
                          (GMT+08:00) Singapore
                        </option>
                        <option value="Asia/Tokyo">(GMT+09:00) Tokyo</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-100/10 border border-red-600/30 rounded-xl p-6 md:p-8 mt-12">
                <h3 className="text-lg font-semibold text-red-600 mb-2">
                  Danger Zone
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Irreversible actions regarding your platform data.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t border-red-600/20">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Factory Reset Platform
                    </h4>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Wipe all bookings, customers, and fleet data. Retains
                      settings.
                    </p>
                  </div>
                  <button
                    onClick={handleResetData}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-md font-medium hover:bg-red-600 hover:text-white transition-colors whitespace-nowrap"
                  >
                    Reset Data
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === "brand" && (
            <div className="bg-white elevation-1 rounded-xl border border-gray-200 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-4">
                Brand & Theme
              </h3>
              <p className="text-gray-500 mb-6">
                Customization options for your brand identity.
              </p>

              <div className="space-y-6 max-w-2xl">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">
                      Primary Color
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded shadow-sm border border-gray-200 bg-[#0058be]"></div>
                      <input
                        type="text"
                        className="w-full h-[44px] px-4 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-gray-900 uppercase font-mono text-sm"
                        defaultValue="#0058BE"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">
                      Secondary Color
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded shadow-sm border border-gray-200 bg-[#0b1c30]"></div>
                      <input
                        type="text"
                        className="w-full h-[44px] px-4 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-gray-900 uppercase font-mono text-sm"
                        defaultValue="#0B1C30"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "payment" && (
            <div className="bg-white elevation-1 rounded-xl border border-gray-200 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-4">
                Payment Gateways
              </h3>

              <div className="space-y-6 max-w-2xl">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Currency & Tax
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        GST/VAT Rate (%)
                      </label>
                      <input
                        type="number"
                        className="w-full h-[44px] px-4 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-gray-900"
                        defaultValue="9"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">
                      Stripe Integration
                    </h4>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#E6F4EA] text-[#137333]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#137333]"></span>{" "}
                      Connected
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Publishable Key
                      </label>
                      <input
                        type="text"
                        className="w-full h-[44px] px-4 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-gray-900"
                        defaultValue="pk_test_51NxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Secret Key
                      </label>
                      <input
                        type="password"
                        className="w-full h-[44px] px-4 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-gray-900"
                        defaultValue="sk_test_51NxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-white elevation-1 rounded-xl border border-gray-200 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-4">
                Notifications
              </h3>

              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Email Notifications
                    </h4>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Send transactional emails and booking updates to
                      customers.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-slate-50-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">Admin Alerts</h4>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Receive daily summaries and system alerts to admin email.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-slate-50-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">SMS Reminders</h4>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Send automated SMS reminders 24 hours before a booking.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-50-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="bg-white elevation-1 rounded-xl border border-gray-200 p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Team Access
                </h3>
                <button
                  onClick={handleInviteMember}
                  className="flex items-center gap-2 px-4 h-[36px] bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-100/80 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    person_add
                  </span>
                  <span>Invite Member</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-gray-200 text-xs uppercase tracking-wider font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="px-4 py-3 font-medium">User</th>
                      <th className="px-4 py-3 font-medium">Role</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-base text-gray-900 divide-y divide-surface-variant/50">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://ui-avatars.com/api/?name=Admin+User&background=0058be&color=fff"
                            alt="Admin"
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              Admin User (You)
                            </div>
                            <div className="text-sm text-gray-500">
                              admin@sgpremium.com
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600/10 text-blue-600 border border-blue-600/20">
                          Owner
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 text-sm text-[#137333]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#137333]"></span>{" "}
                          Active
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          className="p-1.5 text-gray-500 hover:text-blue-600 rounded-md"
                          disabled
                        >
                          <span className="material-symbols-outlined text-[18px] opacity-30">
                            more_vert
                          </span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-50-variant flex items-center justify-center text-gray-500 font-medium text-xs">
                            SM
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              Sarah Manager
                            </div>
                            <div className="text-sm text-gray-500">
                              sarah@sgpremium.com
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100-high text-gray-500 border border-gray-200">
                          Manager
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 text-sm text-[#137333]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#137333]"></span>{" "}
                          Active
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-slate-50-variant rounded-md transition-colors">
                          <span className="material-symbols-outlined text-[18px]">
                            more_vert
                          </span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
 .elevation-1 {
 box-shadow: 0 4px 12px rgba(0, 88, 190, 0.05); /* very soft neutral-blue shadow */
 }
 `}</style>
    </div>
  );
}
