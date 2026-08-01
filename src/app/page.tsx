"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/welcome');
    }, 2800); // Redirect after 2.8 seconds
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="w-full flex-1 flex flex-col justify-between items-center bg-gradient-to-br from-primary to-primary-dark text-white p-6 relative overflow-hidden select-none">
      
      {/* Islamic Geometric Background Accent Vector */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              {/* Islamic Star Pattern outline */}
              <path d="M 20,0 L 40,20 L 20,40 L 0,20 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M 0,0 L 40,40 M 0,40 L 40,0" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="20" cy="20" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating blurred light spheres */}
      <div className="absolute top-1/4 -right-16 w-48 h-48 rounded-full bg-accent/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-16 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Upper dummy spacing to push content down */}
      <div className="h-10" />

      {/* Logo & Brand Details */}
      <div className="flex flex-col items-center text-center z-10">
        {/* Animated outer ring and logo container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-28 h-28 rounded-full bg-white flex items-center justify-center p-2 shadow-2xl border-2 border-accent/20"
        >
          <img src="/logo.png" alt="Anjuman Logo" className="w-24 h-24 object-contain" />
        </motion.div>

        {/* Brand Name Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex flex-col gap-1.5"
        >
          <h1 className="text-xl font-extrabold tracking-wider uppercase font-sans">
            Anjuman Shari e Shian
          </h1>
          <span className="text-[10px] font-bold text-accent-light uppercase tracking-widest leading-none font-sans">
            Digital Platform
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-xs text-emerald-100 mt-4 max-w-[200px] leading-relaxed font-medium"
        >
          Unified Ecosystem for Education, Welfare & Member Services
        </motion.p>
      </div>

      {/* Bottom loading skeleton shimmer indicator */}
      <div className="flex flex-col items-center gap-4 z-10 w-full pb-8">
        {/* Shimmer loading bar */}
        <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 bottom-0 w-1/2 bg-accent-light rounded-full"
          />
        </div>
        
        <span className="text-[8px] font-bold text-emerald-300 uppercase tracking-widest">
          Version 1.0.0 • Loading...
        </span>
      </div>
    </div>
  );
}
