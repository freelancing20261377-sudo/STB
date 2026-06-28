import React from "react";

export default function PartnerProfile() {
  return (
    <>
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Profile</h2>
        <p className="text-gray-500 text-sm text-body-sm max-w-2xl">
          Manage your fleet account, business information, payment settings, and
          portal preferences.
        </p>
      </div>

      {/* Summary Cards Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3">
          <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">
            Business Status
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm shadow-green-500/50"></span>
            <span className="text-xl font-medium text-title-lg text-gray-900">
              Verified Partner
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-1">
          <span className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">
            Fleet Size
          </span>
          <span className="text-3xl font-bold text-blue-600">12</span>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Active Vehicles
          </span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-1">
          <span className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">
            Active Drivers
          </span>
          <span className="text-3xl font-bold text-blue-600">18</span>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Qualified Operators
          </span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-1">
          <span className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">
            Member Since
          </span>
          <span className="text-3xl font-bold text-gray-900">2023</span>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Q3 Enrollment
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Profile & Contact */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Company Profile Card */}
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
              <div className="relative shrink-0">
                <img
                  className="w-32 h-32 rounded-xl object-cover border border-gray-200 shadow-sm"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHWzXtHVPPhLDWg9HrgKMkZ608nbmSCS8ncZqi4DjreG_fiKMPdwXHPGcOPC6CvQefpJDPB44Mx4grai8LSu3Wk2hNSxFydzWOXJrmwVYaRlC3_09S0Iw8Q_6v8W5OfSpFO2gKQRQPApjDA_EFcmeyQqMpkts0i-UPBtk8Z2rG5JQ5_PYckT-cDK196TtuXC2NQN2gpqO6QFFP99QxuyfXn7c9yCLciUTE_N8CeZlSTEGO7t7RIlMdZoGZIu1mmYXWXS0m79QTSSY"
                  alt="Company profile"
                />
                <div className="absolute -bottom-2 -right-2 bg-blue-50 text-white p-1 rounded-full border-4 border-white shadow-sm">
                  <span className="material-symbols-outlined text-[16px] m-1">
                    verified
                  </span>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left mt-2 md:mt-0">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 justify-center md:justify-start">
                  <h3 className="text-2xl font-bold font-bold">
                    Elite Logistics SG
                  </h3>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest w-fit mx-auto md:mx-0">
                    Premium Tier
                  </span>
                </div>
                <p className="text-gray-500 text-base mb-4">
                  Luxury & Executive Chauffeured Services
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-sm font-medium">
                  <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-bold">4.9/5</span>
                    <span className="font-normal opacity-80">
                      (1,240 Trips)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500 px-2.5 py-1">
                    <span className="material-symbols-outlined text-[16px]">
                      calendar_today
                    </span>
                    <span>Since June 2023</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
                <button className="w-full bg-blue-50 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">
                    edit
                  </span>
                  Edit Profile
                </button>
              </div>
            </div>
            <hr className="border-gray-200 mb-6" />

            {/* Business Info Grid */}
            <div className="grid md:grid-cols-2 gap-y-6 gap-x-12">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                  Company Registration
                </label>
                <p className="text-base text-gray-900 font-medium">
                  202305612K
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                  Operator Type
                </label>
                <p className="text-base text-gray-900 font-medium">
                  Premium Chauffeured Services
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                  Primary Contact
                </label>
                <p className="text-base text-gray-900 font-medium">
                  Michael Tan
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                  Contact Email
                </label>
                <p className="text-base text-gray-900 font-medium text-blue-600 hover:underline cursor-pointer">
                  michael.tan@elitelt.sg
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                  Phone Number
                </label>
                <p className="text-base text-gray-900 font-medium">
                  +65 9123 4567
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                  Registered Address
                </label>
                <p className="text-base text-gray-900 font-medium leading-relaxed">
                  12 Marina View, #22-01 Asia Square Tower 2, Singapore 018961
                </p>
              </div>
            </div>
          </section>

          {/* Banking & Payouts */}
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium text-title-lg text-gray-900">
                Banking & Payouts
              </h3>
              <button className="text-blue-600 text-sm font-medium hover:underline decoration-2 underline-offset-4">
                Update Details
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-200 shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-blue-600 text-[24px]">
                    account_balance
                  </span>
                </div>
                <div>
                  <p className="text-lg font-medium text-title-md text-gray-900 mb-0.5">
                    DBS Bank Ltd
                  </p>
                  <p className="text-sm text-body-sm text-gray-500">
                    Elite Logistics Singapore • **** 8821
                  </p>
                </div>
              </div>
              <div className="text-left md:text-right w-full md:w-auto">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Last Payout
                </p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  SGD 4,200.00
                </p>
                <p className="text-[10px] text-green-700 font-bold uppercase tracking-wider">
                  Transferred on May 15, 2024
                </p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                  Payout Frequency
                </label>
                <p className="text-base font-medium text-gray-900">
                  Weekly (Mondays)
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                  Tax Status
                </label>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider w-fit">
                  GST Registered
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Preferences & Docs */}
        <div className="w-full lg:w-[400px] flex flex-col gap-8">
          {/* Fleet Preferences */}
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-medium text-title-lg text-gray-900 mb-6">
              Fleet Preferences
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-3">
                  Service Areas
                </label>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100/50 border border-blue-600-container text-blue-700 px-3 py-1.5 rounded-md text-xs font-medium">
                    CBD
                  </span>
                  <span className="bg-blue-100/50 border border-blue-600-container text-blue-700 px-3 py-1.5 rounded-md text-xs font-medium">
                    Changi Airport
                  </span>
                  <span className="bg-blue-100/50 border border-blue-600-container text-blue-700 px-3 py-1.5 rounded-md text-xs font-medium">
                    Sentosa
                  </span>
                  <span className="bg-blue-100/50 border border-blue-600-container text-blue-700 px-3 py-1.5 rounded-md text-xs font-medium">
                    Marina Bay
                  </span>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-3">
                  Vehicle Categories
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-600 text-[20px]">
                      check_circle
                    </span>
                    <span className="text-base text-gray-900">
                      Luxury Sedan
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-600 text-[20px]">
                      check_circle
                    </span>
                    <span className="text-base text-gray-900">Premium MPV</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-600 text-[20px]">
                      check_circle
                    </span>
                    <span className="text-base text-gray-900">VIP Minibus</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-base text-gray-500">Operating Hours</span>
                <span className="text-sm font-medium text-blue-600 bg-blue-600/10 px-3 py-1 rounded-md">
                  24/7 Available
                </span>
              </div>
            </div>
          </section>

          {/* Document Status */}
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-medium text-title-lg text-gray-900 mb-6">
              Compliance & Docs
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-green-600 text-[20px]">
                    verified_user
                  </span>
                  <span className="text-sm text-body-sm text-gray-900 font-medium">
                    Fleet Insurance
                  </span>
                </div>
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  Approved
                </span>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-green-600 text-[20px]">
                    description
                  </span>
                  <span className="text-sm text-body-sm text-gray-900 font-medium">
                    Vehicle Registration
                  </span>
                </div>
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  Approved
                </span>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-600 text-[20px]">
                    business
                  </span>
                  <span className="text-sm text-body-sm text-gray-900 font-medium">
                    Business License
                  </span>
                </div>
                <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  Pending
                </span>
              </div>
              <div className="mt-6 p-4 bg-red-100/50 border border-red-600/20 text-red-700 rounded-xl flex gap-3">
                <span className="material-symbols-outlined text-red-600 text-[20px]">
                  warning
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-1 text-red-600">
                    Action Required
                  </p>
                  <p className="text-body-sm font-medium">
                    Insurance policy expires in 5 days.
                  </p>
                </div>
              </div>
              <button className="w-full mt-6 bg-white border-2 border-primary text-blue-600 px-6 py-3 rounded-xl text-sm font-medium hover:bg-blue-600 focus:text-white hover:text-white active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">
                  cloud_upload
                </span>
                Upload Documents
              </button>
            </div>
          </section>

          {/* Notification Toggles */}
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-medium text-title-lg text-gray-900 mb-6">
              Portal Preferences
            </h3>
            <div className="space-y-6">
              <ToggleItem label="New Bookings" defaultChecked={false} />
              <ToggleItem label="Driver Updates" defaultChecked={true} />
              <ToggleItem label="Payment Alerts" defaultChecked={true} />
              <ToggleItem label="Document Expiry" defaultChecked={true} />
            </div>
          </section>
        </div>
      </div>

      {/* Mobile Quick Actions FAB Area */}
      <div className="mt-12 md:hidden flex flex-col gap-3">
        <button className="w-full bg-blue-50 text-white py-4 rounded-xl font-bold shadow-lg">
          Save All Changes
        </button>
        <button className="w-full bg-white border border-gray-200 text-gray-900 py-4 rounded-xl font-bold">
          Discard Changes
        </button>
      </div>
    </>
  );
}

function ToggleItem({
  label,
  defaultChecked,
}: {
  label: string;
  defaultChecked: boolean;
}) {
  const [checked, setChecked] = React.useState(defaultChecked);

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <button
        onClick={() => setChecked(!checked)}
        className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${checked ? "bg-blue-50" : "bg-gray-200"}`}
      >
        <span
          className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform transform ${checked ? "translate-x-5" : "translate-x-0"}`}
        ></span>
      </button>
    </div>
  );
}
