import React from "react";

function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center footer footer-center border-t-2 h-[15vh] border-blue-950 text-base-content rounded p-8">
      <nav className="grid grid-flow-col gap-6">
        <a href="#about" className="link link-hover">About Us</a>
        <a href="#contact" className="link link-hover">Contact</a>
      </nav>
      <aside className="mt-[-40px]">
        <p className="text-sm">
          Welcome to my Portfolio Collection
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
