import React, { useState } from "react";
import Education from "./Education";
import Experience from "./Experience";

function EduExe() {
  const [isEducation, setIsEducation] = useState(true);

  const handleEdu = () => {
    setIsEducation(true);
  };

  const handleExe = () => {
    setIsEducation(false);
  };

  const activeButtonStyle = {
   color: "gray"
  };
  
  const inactiveButtonStyle = {
    backgroundColor: "rgb(192, 194, 200)",
    color: "black",
    border: "1px solid yellow"
  };

  return (
    <>
    <div className="flex justify-center">
      <div className="text-white md:text-[2vw] md:font-normal font-semibold border bg-slate-950 font-serif border-yellow-100 rounded-md w-[95%] flex justify-center">
        <button
          onClick={handleEdu}
          style={isEducation ? activeButtonStyle : inactiveButtonStyle}
          className="p-2 md:p-5 rounded-md w-1/2"
        >
          Education
        </button>
        <button
          onClick={handleExe}
          style={!isEducation ? activeButtonStyle : inactiveButtonStyle}
          className="p-2 md:p-5 rounded-md w-1/2"
        >
          Experience
        </button>
      </div>
      </div>
      {isEducation ? <Education /> : <Experience />}
    </>
  );
}

export default EduExe;
