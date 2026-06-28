import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import CTA from "../components/CTA";

export default function MainLayout() {
  return (
    <div className="font-['Inter'] relative w-full overflow-x-hidden text-gray-800 flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <CTA />
    </div>
  );
}
