import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Project from "./pages/Projects";
import About from "./pages/About";
import HireMe from "./pages/HireMe";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/portfolio" element= {<LandingPage/>}/>
          <Route path="/home" element= {<Home/>}/>
          <Route path="/projects" element= {<Project/>}/>
          <Route path="/contact" element= {<Contact/>}/>
          <Route path="/about" element= {<About/>}/>
          <Route path="/hireme" element= {<HireMe/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
