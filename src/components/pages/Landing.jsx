"use client";

import React from "react";
import Carousel from "../Carousel";
import HeroSection from "./Hero";
import ContactFormSection from "../ContactFormSection";
import ContactInfoSection from "../ContactInfoSection";

function Landing() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="w-full max-w-[100vw]">
        <HeroSection />
      </div>

      {/* Carousel with constrained width */}
      <div className="w-full overflow-hidden">
        <Carousel />
      </div>
    </div>
  );
}

export default Landing;
