import React, { useState } from "react";
import { SiNamebase } from "react-icons/si";
import { FaGithubSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import SendMail from "../components/SendMail";

function Contact() {
  return (
    <>
      <section className="py-5 text-white md:pt-[10vh] md:h-[75vh]">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="md:py-0 md:px-6">
            <h1 className="text-3xl font-bold">Get in touch</h1>
            <div className="pt-2 space-y-2">
              <p className="flex items-center">
                <p className="w-5 h-5 mr-2 ml-1 sm:mr-6">
                  <SiNamebase />
                </p>
                <span>Prakash Mani</span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Azadpur Delhi India 110052</span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span>+91 8795901180 </span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span>prakashmanig000@gmail.com</span>
              </p>
            </div>
            <dev className="hidden md:block">
              <div>
                 <h2 className="text-lg font-bold pt-4">Connect with me on social media</h2>
              </div>
              <div className="flex mt-2 justify-start gap-6">
                <a >
                  <FaGithubSquare color="white" size={35} />
                </a>
                <a href="https://www.linkedin.com/in/prakashmani87/">
                  <IoLogoLinkedin color="white" size={35} />
                </a>
                <a>
                  <FaSquareWhatsapp color="white" size={35} />
                </a>
                <a href="">
                <FaSquareInstagram color="white" size={35} />
                </a>
                <a href="">
                <FaFacebookSquare color="white" size={35}/>
                </a>
              </div>
            </dev>
          </div>
          <SendMail/>
        </div>
      </section>
    </>
  );
}
export default Contact;
