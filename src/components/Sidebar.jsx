import React, { useState, useEffect, useRef } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaDiagramProject } from "react-icons/fa6";
import { MdOutlineContactPhone } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { AiFillRobot } from "react-icons/ai";

function Sidebar() {
  const [icon, setIcon] = useState(true);
  const sidebarRef = useRef(null);

  const handleClick = () => {
    setIcon(!icon); // Toggle the sidebar state
  };

  const handleNavLinkClick = () => {
    setIcon(true); // Close the sidebar when a NavLink is clicked
  };

  const handleOutsideClick = (e) => {
    // Close the sidebar if the click happens outside of the sidebar
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIcon(true);
    }
  };

  useEffect(() => {
    if (!icon) {
      // Add event listener to detect clicks outside the sidebar
      document.addEventListener("mousedown", handleOutsideClick);
    }
  }, [icon]);

  return (
    <div>
      {/* Toggle Button */}
      <button onClick={handleClick}>
        {icon ? (
          <IoMenu color="white" size={35} />
        ) : (
          <RxCross2 color="white" size={35} />
        )}
      </button>

      {/* Sidebar */}
      {!icon && (
        <div
          ref={sidebarRef}
          className="flex flex-col absolute bg-slate-900 h-[80vh] w-[78vw] top-[10vh] ml-[-70vw]"
        >
          <div className="flex z-10 flex-col w-full font-serif text-[3.5vh] absolute text-white gap-3 p-1 pt-2">
            <NavLink to="/home" onClick={handleNavLinkClick}>
              <button className="p-1 pl-5 pr-2 hover:bg-slate-500 w-full flex justify-start gap-2 rounded-xl border-b-2 border-yellow-200">
                <div className="flex items-center gap-2">
                  <AiFillHome size={28} />
                  Home
                </div>
              </button>
            </NavLink>
            <NavLink to="/projects" onClick={handleNavLinkClick}>
              <button className="p-1 pl-5 pr-2 hover:bg-slate-500 w-full flex gap-2 justify-start rounded-xl border-b-2 border-yellow-200">
                <div className="flex items-center gap-2">
                  <FaDiagramProject size={28} /> Projects
                </div>
              </button>
            </NavLink>
            <NavLink to="/about" onClick={handleNavLinkClick}>
              <button className="p-1 pl-5 pr-2 hover:bg-slate-500 w-full flex gap-2 justify-start rounded-xl border-b-2 border-yellow-200">
                <div className="flex items-center gap-2">
                  <FaQuestionCircle size={28} /> About Us
                </div>
              </button>
            </NavLink>
            <NavLink to="/contact" onClick={handleNavLinkClick}>
              <button className="p-1 pl-5 pr-2 hover:bg-slate-500 w-full flex gap-2 justify-start rounded-xl border-b-2 border-yellow-200">
                <div className="flex items-center gap-2">
                  <MdOutlineContactPhone size={28} /> Contact
                </div>
              </button>
            </NavLink>
            <NavLink to="/hireme" onClick={handleNavLinkClick}>
              <button className="p-1 pl-5 pr-2 hover:bg-slate-500 w-full flex gap-2 justify-start rounded-xl border-b-2 border-yellow-200">
                <div className="flex items-center gap-2">
                  <AiFillRobot size={28} /> Hire Me
                </div>
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
