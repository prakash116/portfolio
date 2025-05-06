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

      {/* Grid section with proper width constraints */}
      <div className="grid grid-cols-1 lg:grid-cols-2 px-4 md:px-6 gap-8 max-w-7xl mx-auto w-full">
        {/* Contact Form Section */}
        <div className="w-full">
          <ContactFormSection />
        </div>

        {/* Contact Info and FAQ Sections */}
        <div className="w-full space-y-6 md:space-y-8">
          <ContactInfoSection />
        </div>
      </div>
    </div>
  );
}

export default Landing;