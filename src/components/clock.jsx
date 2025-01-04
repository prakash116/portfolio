import React, { useEffect } from 'react';
import './Clock.css'; // Assuming you move your styles to a CSS file

const Clock = () => {
  useEffect(() => {
    const hr = document.getElementById('hour');
    const min = document.getElementById('min');
    const sec = document.getElementById('sec');

    const displayTime = () => {
      const date = new Date();
      const hh = date.getHours();
      const mm = date.getMinutes();
      const ss = date.getSeconds();

      const hRotation = 30 * hh + mm / 2;
      const mRotation = 6 * mm;
      const sRotation = 6 * ss;

      hr.style.transform = `rotate(${hRotation}deg)`;
      min.style.transform = `rotate(${mRotation}deg)`;
      sec.style.transform = `rotate(${sRotation}deg)`;
    };

    const interval = setInterval(displayTime, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="container">
      <div className="clock">
        <div style={{ '--clr': 'rgb(232, 232, 136)', '--h': '40px', '--w': '3px' }} id="hour" className="hand">
          <i></i>
        </div>
        <div style={{ '--clr': 'rgb(232, 232, 136)', '--h': '48px', '--w': '2px' }} id="min" className="hand">
          <i></i>
        </div>
        <div style={{ '--clr': 'rgb(232, 232, 136)', '--h': '50px', '--w': '1px' }} id="sec" className="hand">
          <i></i>
        </div>
      </div>
    </div>
  );
};

export default Clock;

