import React from "react";
import Hero from "../components/Hero";
import FleetIntro from "../components/FleetIntro";
import FleetSelection from "../components/FleetSelection";
import ExperiencesFilters from "../components/ExperiencesFilters";
import WhyChooseUs from "../components/WhyChooseUs";
import ReviewsFAQ from "../components/ReviewsFAQ";

export default function LandingPage() {
  return (
    <div
      id="home"
      className="font-['Inter'] relative w-full overflow-x-hidden text-gray-800"
    >
      <Hero />

      <div
        id="fleet-intro"
        className="bg-background-light py-10 flex justify-center w-full min-h-[600px]"
      >
        <FleetIntro />
      </div>

      <div id="fleet" className="py-20 flex justify-center w-full bg-[#f8fafc]">
        <FleetSelection />
      </div>

      <div
        id="experiences"
        className="py-20 flex justify-center w-full bg-[#fcfcfc] flex-col items-center"
      >
        <ExperiencesFilters />
      </div>

      <div id="about">
        <WhyChooseUs />
      </div>

      <div id="airport" className="w-full bg-[#f8fafc]">
        <ReviewsFAQ />
      </div>
    </div>
  );
}
