import React, { useEffect, useState } from "react";
import "./weather.css";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       setLat(latitude);
  //       setLon(longitude);
  //     },
  //     (err) => {
  //       alert("Unable to find your location");
  //       console.error(err);
  //       setLoading(false);
  //     }
  //   );
  // }, []);

  useEffect(() => {
    if (lat && lon) {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ae6fde7d5972cab3bd9eba9ca929dd55`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [lat, lon]);

  if(loading) {
    console.log("Loading weather");
  }

  if(!weather){
    console.log("Don't load weather");
  }

  return (
    <div className="containerw">
      {weather ? (
        <>
         <h1 className="text-center font-bold text-yellow-100 mt-1">City: {weather.name}</h1>
         <div className="flex center">
           <div>
             <img
               src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
               alt="Weather Icon"
               className="w-20"
             />
           </div>
           <div className="p-1 m-0">
             <p className="font-semibold text-yellow-100">Temp: {Math.round(weather.main.temp - 273.15)}°C</p>
             <p className="font-semibold text-yellow-100">Cloud: {weather.weather[0].description}</p>
             <p className="font-semibold text-yellow-100">Humidity: {weather.main.humidity}%</p>
           </div>
         </div>
         </>
      ): (
        <h2 className="flex justify-center text-xl font-semibold align-middle mt-11 mr-10 text-yellow-100">Loading...</h2>
      )}
    </div>
  );
};

export default Weather;
