import React from "react";
import { GoHome } from "react-icons/go";
import { NavLink } from "react-router-dom";
function Header() {

//  const userName = prompt("Enter your Nickname")
 
 let greeting;

  const getGreeting = () => {
    const now = new Date(); 
    const hours = now.getHours();

    switch (true) {
      case hours >= 4 && hours < 12:
        greeting = "Good Morning";
        break;
      case hours >= 12 && hours < 17:
        greeting = "Good Afternoon";
        break;
      case hours >= 17 && hours < 22:
        greeting = "Good Evening";
        break;
      default:
        greeting = "Namaskar";
        break;
    }
  
    return greeting;
  };
  
  getGreeting();

  

  return (
    <>
      <header className="headerbg z-10 sticky top-0 text-white font-serif border-blue-950 h-[10vh] md:h-auto border-b-2">
        <div className="container flex justify-between items-center h-16 ml-3">
        <NavLink
            rel="noopener noreferrer"
            to="/"
            aria-label="Back to homepage"
            className="flex items-center p-3 hover:bg-blue-950 hover:rounded-md"
          >
            <GoHome size={33} ></GoHome>
        </NavLink>
         {/* <h1 className="md:text-sm text-[2vh] absolute left-[20vw] md:left-[35vw] text-yellow-200 font-serif">Welcome, {userName ? (`${userName+ " Sir/Ma'am"}`):("Sir")} <span>{greeting}</span></h1> */}
          <ul className="h-14  hidden space-x-1 md:flex absolute right-10 ">
          <li className="flex">
              <NavLink
                rel="noopener noreferrer"
                to="/home"
                className="flex items-center px-8 hover:border-yellow-100 hover:border-b-2 hover:rounded-xl"
              >
                Home
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                rel="noopener noreferrer"
                to="/projects"
                className="flex items-center px-8 hover:border-yellow-100 hover:border-b-2 hover:rounded-xl"
              >
                Projects
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                rel="noopener noreferrer"
                to="/about"
                className="flex items-center px-8 hover:border-yellow-100 hover:border-b-2 hover:rounded-xl"
              >
                About Us
              </NavLink>
            </li>
          
            <li className="flex">
              <NavLink
                rel="noopener noreferrer"
                to="/contact"
                className="flex items-center px-8 hover:border-b-2 hover:border-yellow-100  hover:rounded-xl"
              >
                Contact
              </NavLink>
            </li>
            <li className="flex">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center px-8 py-[-10px] border-t-2 border-b-2 hover:border-l hover:border-r hover:border-yellow-100  hover:bg-black rounded-2xl hover:rounded-2xl"
              >
                Hire Me
              </a>
            </li>
          </ul>
          <button className="flex justify-end p-4 md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
