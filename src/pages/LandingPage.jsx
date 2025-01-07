import React from 'react'
import Home from './Home'
import AboutMe from './AboutMe'
import Contact from './Contact'
import Project from './Projects'


function LandingPage() {
  return (
    <>
      <Home/>
      <hr />
      <Project/>
      <hr />
      <AboutMe/>
      <hr />
      <Contact/>
    </>
  )
}

export default LandingPage
