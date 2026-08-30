"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import LoadingScreen, { LOADING_DURATION_MS } from "./LoadingScreen";
import MusicPlayer from "./MusicPlayer";
import Navbar from "./Navbar";
import PageTransition from "./PageTransition";

export default function ClientShell({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(pathname === "/");

  useEffect(() => {
    if (!loading) return undefined;

    const timer = window.setTimeout(() => setLoading(false), LOADING_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [loading]);

  return (
    <>
      <AnimatePresence>{loading && pathname === "/" && <LoadingScreen />}</AnimatePresence>
      <Navbar />
      <main className="min-h-screen pt-16">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <MusicPlayer />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111827",
            color: "#f8fafc",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
    </>
  );
}
