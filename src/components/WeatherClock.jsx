import React from 'react'
import Weather from './weather'
import Clock from './clock'

function WeatherClock() {
  return (
    <>
      <div className='flex relative z-0'>
        <div>
            <Weather/>
        </div>
       
        <div className='ml-[-62px] z-10'>
            <Clock/>
        </div>
       
      </div>
    </>
  )
}

export default WeatherClock
