import React from "react";
import Carousel from "../Carousel";
import HeroSection from "./Hero";
import ContactFormSection from "../ContactFormSection";
import ContactInfoSection from "../ContactInfoSection";

function Landing() {
  return (
    <div>
      <HeroSection />
      <Carousel />
      <div className="grid grid-cols-1 lg:grid-cols-2 p-6 gap-12">
        {/* Contact Form Section */}
        <ContactFormSection />

        {/* Contact Info and FAQ Sections */}
        <div className="space-y-8">
          <ContactInfoSection />
        </div>
      </div>
    </div>
  );
}

export default Landing;
