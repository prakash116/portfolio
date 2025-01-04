import React from "react";
import WeatherClock from "../components/WeatherClock";
import { HiDocumentDownload } from "react-icons/hi"
import { IoLogoLinkedin } from "react-icons/io5";
import { FaGithubSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

function Home() {

  const baseUrl = window.location.origin;
  const cv = `${baseUrl}/cv.pdf`;
  console.log(cv);

function downloadFile() {
  const file = cv.split('/').pop();
  const aTag = document.createElement('a');
  aTag.setAttribute('href', cv);
  aTag.setAttribute('download', file);
  document.body.appendChild(aTag);
  aTag.click();
  document.body.removeChild(aTag);
}


  return (
    <>
      <div className="md:flex h-[75vh] ">
        <div className="md:w-[7vw]"></div>
        <div className="md:w-[60vw] flex flex-col justify-center">
          <div className=" flex flex-col w-full md:w-[40vw] justify-center text-center">
            <h1 className="text-[4vh] md:text-[3vw] p-0 m-0 font-semibold font-serif text-white">Hello<span className="text-yellow-200">,</span> My Name is <br /> Prakash Mani</h1>
            <p className="p-1 font-serif text-yellow-200">MERN Stack Developer</p>
           <div className="flex justify-around border border-blue-950 p-2 mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo sapiente minima perspiciatis, necessitatibus nam non quisquam saepe nostrum fugit autem corrupti a esse est atque corporis aperiam maiores, id at!
           </div>
            
          </div>
        </div> 
        <div className="w-full h-[37vh] md:h-[75vh] flex flex-col justify-center items-center md:w-96 md:gap-5 md:mr-20 gap-2 p-2">
          <WeatherClock />
          <div className="flex justify-center items-center gap-4 md:flex-col">
          <button className="mt-1"><span className="btn border-yellow-100 hover:border-red-400 text-white">About Me</span></button>
            <div className="flex gap-3 justify-center mt-2 btn border-yellow-100 hover:border-red-400 text-white" onClick={downloadFile}>
              <h1 className="font-bold text-white ">Get Resume</h1>
              <button className="animate-bounce mt-1"><HiDocumentDownload color="rgb(232, 232, 136)" size={25}/></button>
            </div>
            </div>
        </div>
        <div className="hidden md:flex flex-col justify-center gap-3 mr-6">
          <a><FaGithubSquare color="white" size={35}/></a>
          <a><IoLogoLinkedin color="white" size={35}/></a>
          <a><MdEmail color="white" size={35}/></a>
          <a><FaSquareWhatsapp color="white" size={35}/></a>
        </div>
      </div>
    </>
  );
}

export default Home;
