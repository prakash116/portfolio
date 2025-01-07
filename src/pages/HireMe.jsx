import React from 'react'
import SendMail from '../components/SendMail'

function HireMe() {
  return (
    <>
    <div className=' font-serif font-bold'>
        <div className='flex justify-center items-center flex-col gap-5 w-full h-36'>
            <h1 className='text-4xl md:text-6xl tracking-widest'>Contact Me</h1>
            <div className='flex gap-2 p-2 bg-indigo-950 hover:ring-2 hover:bg-indigo-900 w-fit px-6 rounded-full'>
                <button>Home</button>
                <p>||</p>
                <button>Contact</button>
            </div>
        </div>
        <div className='w-full flex p-3 flex-col md:flex-row justify-around '>
          <div className='w-full md:w-1/3 p-3'>
            <div className='w-full h-full bg-indigo-950 hover:ring-2 text-slate-500 hover:bg-indigo-900 hover:rounded-lg hover:text-white'>
                <h1 className='font-serif font-medium  text-[3.5vw] text-center pt-4'>Follow Me</h1>
            </div>
          </div>
          <div className='w-full bg-indigo-900 md:w-1/2 p-3 hover:ring-2 hover:rounded-md'><SendMail></SendMail></div>
          
          <div className='w-full md:w-1/3 p-3'>
            <div className='w-full h-full bg-indigo-950 text-slate-500 hover:ring-2 hover:bg-indigo-900 hover:rounded-lg hover:text-white'>
                <h1 className='font-serif font-medium  text-[3.5vw] text-center pt-4'>Follow Me</h1>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default HireMe
