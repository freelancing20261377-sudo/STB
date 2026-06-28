import React from "react";
import { Check } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

export default function FleetIntro() {
  return (
    <div className="w-full font-['Plus_Jakarta_Sans'] font-sans py-16">
      <div className="max-w-[1200px] w-full mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase block">
              THE FLEET
            </span>
            <h1 className="text-text-navy text-[42px] font-bold leading-tight">
              Premium Fleet Collection
            </h1>
            <p className="text-text-muted text-[17px] leading-relaxed max-w-[500px]">
              Travel in comfort with our carefully selected fleet: Executive
              Sedans, Luxury SUVs, Premium MPVs, Family Vans, Corporate
              Vehicles, and VIP Luxury Cars. Professional chauffeur service
              included.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-y-4 max-w-[400px]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FFF5E6] flex items-center justify-center">
                <Check
                  className="text-accent w-[18px] h-[18px] font-bold"
                  strokeWidth={3}
                />
              </div>
              <span className="text-text-navy font-semibold text-[15px]">
                Luxury Sedans
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FFF5E6] flex items-center justify-center">
                <Check
                  className="text-accent w-[18px] h-[18px] font-bold"
                  strokeWidth={3}
                />
              </div>
              <span className="text-text-navy font-semibold text-[15px]">
                Executive MPVs
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FFF5E6] flex items-center justify-center">
                <Check
                  className="text-accent w-[18px] h-[18px] font-bold"
                  strokeWidth={3}
                />
              </div>
              <span className="text-text-navy font-semibold text-[15px]">
                Premium SUVs
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FFF5E6] flex items-center justify-center">
                <Check
                  className="text-accent w-[18px] h-[18px] font-bold"
                  strokeWidth={3}
                />
              </div>
              <span className="text-text-navy font-semibold text-[15px]">
                VIP Minibuses
              </span>
            </div>
          </div>
          <div className="pt-2">
            <a
              href="#fleet"
              className="bg-text-navy text-white px-9 py-4 rounded-[10px] text-[15px] font-bold hover:bg-opacity-90 transition-all duration-300 shadow-lg shadow-text-navy/20 inline-block"
            >
              View All Vehicles
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="grid grid-cols-2 gap-3 h-[450px] lg:h-[520px]">
            <div className="flex flex-col gap-3">
              <div className="h-2/5 rounded-[24px] overflow-hidden relative group shadow-lg bg-slate-100">
                <ImageWithFallback
                  src="/executive sedan.jpg"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Executive Sedan"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-4 text-white text-xs font-bold tracking-wider uppercase">
                  Sedans
                </div>
              </div>
              <div className="h-3/5 rounded-[24px] overflow-hidden relative group shadow-lg bg-slate-100">
                <ImageWithFallback
                  src="/Luxury suv.webp"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Luxury SUV"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-4 text-white text-xs font-bold tracking-wider uppercase">
                  Luxury SUVs
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 pt-8">
              <div className="h-3/5 rounded-[24px] overflow-hidden relative group shadow-lg bg-slate-100">
                <ImageWithFallback
                  src="Premium MPV-1.jpg"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Premium MPV"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-4 text-white text-xs font-bold tracking-wider uppercase">
                  MPVs & Family Vans
                </div>
              </div>
              <div className="h-2/5 rounded-[24px] overflow-hidden relative group shadow-lg bg-slate-100">
                <ImageWithFallback
                  src="/VIP Mini.jpg"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="VIP Minibus"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-4 text-white text-xs font-bold tracking-wider uppercase">
                  Corporate & VIP Cars
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 left-[-20px] lg:left-[-40px] bg-white p-6 md:p-8 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center gap-6 md:gap-10 min-w-[280px] md:min-w-[340px] z-10 border border-slate-100">
            <div className="text-center">
              <div className="text-text-navy text-[28px] md:text-[32px] font-extrabold leading-none">
                50+
              </div>
              <div className="text-[#8898AA] text-[10px] font-bold tracking-[0.2em] mt-2 uppercase">
                Vehicles
              </div>
            </div>
            <div className="h-10 w-[1px] bg-slate-200"></div>
            <div className="text-center">
              <div className="text-text-navy text-[28px] md:text-[32px] font-extrabold leading-none">
                24/7
              </div>
              <div className="text-[#8898AA] text-[10px] font-bold tracking-[0.2em] mt-2 uppercase">
                Service
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
