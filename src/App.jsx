import React, { Suspense, lazy, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AnimatedFooter from "./components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

const Landing = lazy(() => import("./components/pages/Landing"));
const HeroSection = lazy(() => import("./components/pages/Hero"));
const AboutPage = lazy(() => import("./components/pages/AboutMe"));
const ProjectsPage = lazy(() => import("./components/pages/ProjectPage"));
const SkillsPage = lazy(() => import("./components/pages/Skills"));
const Services = lazy(() => import("./components/pages/Services"));
const ContactUs = lazy(() => import("./components/pages/ContactUs"));

// Loading component with Framer Motion animations
const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="flex space-x-3">
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="block w-5 h-5 bg-indigo-600 rounded-full"
            animate={{
              y: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 text-white flex flex-col justify-center items-center gap-2  text-xl font-light"
      >
        <span>Loading Portfolio...</span>
        <span className="font-bold text-blue-800">Prakash Mani</span>
      </motion.h2>
    </motion.div>
  );
};

const RouteFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center px-4">
    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-900/70 px-5 py-3 text-sm text-white/80 backdrop-blur-sm">
      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-400" />
      Loading page...
    </div>
  </div>
);

// Page transition component with scroll to top
const PageLayout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Show loading screen only on initial load
  if (loading && location.pathname === "/") {
    return <LoadingScreen />;
  }

  return (
    <>
      <Navbar />

      <div className="pt-16 min-h-screen">
        <Suspense fallback={<RouteFallback />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageLayout>
                    <Landing />
                  </PageLayout>
                }
              />
              <Route
                path="/home"
                element={
                  <PageLayout>
                    <HeroSection />
                  </PageLayout>
                }
              />
              <Route
                path="/about"
                element={
                  <PageLayout>
                    <AboutPage />
                  </PageLayout>
                }
              />
              <Route
                path="/project"
                element={
                  <PageLayout>
                    <ProjectsPage />
                  </PageLayout>
                }
              />
              <Route
                path="/skill"
                element={
                  <PageLayout>
                    <SkillsPage />
                  </PageLayout>
                }
              />
              <Route
                path="/services"
                element={
                  <PageLayout>
                    <Services />
                  </PageLayout>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageLayout>
                    <ContactUs />
                  </PageLayout>
                }
              />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>
      <AnimatedFooter />
      <div><Toaster/></div>
    </>
  );
}

export default App;
