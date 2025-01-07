import React from "react";
import { AiFillEye } from "react-icons/ai";
import { FaGithubSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneSquare } from "react-icons/fa";
import EduExe from "../components/EduExe";
import { NavLink } from "react-router-dom";

function AboutMe() {
  function viewPdf() {
    window.open("/cv.pdf", "_blank");
  }

  const letters = [
    { char: "M", image: "/images/m.png" },
    { char: "E", image: "/images/e.png" },
    { char: "R", image: "/images/r.png" },
    { char: "N", image: "/images/n.jpeg" },
  ];

  return (
    <>
      <div className="h-[75vh] w-full md:flex">
        <div className="h-[30vh] md:w-[30vw] md:h-full w-full flex flex-col justify-center items-center md:gap-4 gap-1">
          <img
            className="rounded-sm h-[27vh] md:h-[50vh] md:w-[50vh] object-cover object-center"
            src="/images/I.jpg"
            alt="Description of the image"
            style={{ boxShadow: "4px 4px 6px rgba(255, 255, 0, 0.4)" }}
          />
        </div>
        <div className="h-[45vh] md:h-full md:w-[55vw] flex flex-col justify-center items-center">
          <h1 className="font-serif font-extrabold text-yellow-300 md:text-3xl flex md:w-full text-xl md:p-2">
            ABOUT ME
          </h1>
          <h1 className="text-white md:pl-2 flex md:w-full [text-shadow:_0_4px_4px_rgb(255_255_0_/_0.7)] font-bold md:text-3xl text-2xl">
            Prakash Mani
          </h1>
          <p className="flex mb-1 font-serif flex-wrap justify-around text-justify md:p-2 pl-2 p-2 text-sm md:text md:mt-[-4px]">
            Lorem ipsum dolor sit ao quisquam, error amet Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Recusandae molestias nemo,
            nesciunt a eum adipisci, veniam sint suscipit quisquam tempore
            quibusdam inventore explicabo? Ipsam, modi ratione repudiandae.
          </p>
          <div className="flex md:gap-10 gap-3 justify-center">
            <h1
              className="flex md:text text-sm justify-center items-center bg-black w-fit border border-y-yellow-200 hover:border-red-600 rounded-md px-5 gap-3 btn"
              onClick={viewPdf}
            >
              Curriculum vitae
              <span>
                <AiFillEye color="white" />
              </span>
            </h1>
            <h1
              className="flex md:text text-sm justify-center items-center bg-black w-fit border border-y-yellow-200 hover:border-red-600 rounded-md px-5 gap-3 btn"
              onClick={viewPdf}
            >
              Curriculum vitae
              <span>
                <AiFillEye color="white" />
              </span>
            </h1>
          </div>
          <dev>
            <div className="flex justify-center gap-6 mt-5">
              <NavLink target="_blank" to="https://github.com/prakash116">
                <FaGithubSquare color="white" size={35} />
              </NavLink>
              <NavLink
                target="_blank"
                to="https://www.linkedin.com/in/prakashmani87/"
              >
                <IoLogoLinkedin color="white" size={35} />
              </NavLink>
              <NavLink target="_blank" to="mailto:prakashmanig000@gmail.com">
                <MdEmail color="white" size={35} />
              </NavLink>
              <NavLink target="_blank" to="https://wa.me/qr/XZNOZHJWQBQNG1">
                <FaSquareWhatsapp color="white" size={35} />
              </NavLink>
              <NavLink target="_blank" to="tel:+918795901180">
                <FaPhoneSquare color="white" size={35} />
              </NavLink>
            </div>
          </dev>
        </div>
        <div className="hidden md:flex flex-col justify-center items-center w-[15vw] h-[75vh]">
          <div className="text-white text-[5vw] text-center font-bold tracking-widest leading-none">
            {letters.map((letter, index) => (
              <h1
                key={index}
                className="block font-extrabold text-white text-image"
                style={{ backgroundImage: `url(${letter.image})` }}
              >
                {letter.char}
              </h1>
            ))}
            <div className="flex flex-col">
              <span className="text-lg">Stack</span>
              <span className="text-lg ">Developer</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <EduExe />
      </div>
    </>
  );
}

export default AboutMe;
