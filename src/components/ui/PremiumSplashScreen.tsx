"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onFinish: () => void;
}

export const PremiumSplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            onFinish();
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white select-none overflow-hidden"
        >
          {/* Islamic Geometric Backdrop */}
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
            <svg width="100%" height="100%">
              <pattern id="splash-geometric" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 30,0 L 60,30 L 30,60 L 0,30 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="30" cy="30" r="12" fill="none" stroke="currentColor" strokeWidth="0.8" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#splash-geometric)" />
            </svg>
          </div>

          <div className="w-full flex justify-end z-10">
            <button
              onClick={() => {
                setIsVisible(false);
                onFinish();
              }}
              className="text-xs font-bold text-emerald-300 hover:text-white bg-white/10 px-3 py-1 rounded-full border border-white/20 transition-all"
            >
              Skip
            </button>
          </div>

          {/* Center Brand Showcase */}
          <div className="flex flex-col items-center gap-4 text-center z-10 my-auto">
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
              className="relative w-28 h-28 flex items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500/20 to-amber-500/20 border border-emerald-400/30 p-2 shadow-2xl backdrop-blur-xl"
            >
              {/* Spinning Star Glow */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-3xl border border-emerald-400/20 opacity-60"
              />
              
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/logo.png" 
                alt="Anjuman-e-Sharie Shian Logo" 
                className="w-20 h-20 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col gap-1 mt-2"
            >
              <span className="text-[11px] font-black text-amber-300 tracking-[0.3em] uppercase">
                انجمن شرعی شیعیان
              </span>
              <h1 className="text-xl font-black text-white tracking-wide">
                Anjuman-e-Sharie Shian
              </h1>
              <p className="text-xs text-emerald-200/90 font-medium tracking-wider">
                Serving Faith • Education • Community
              </p>
            </motion.div>
          </div>

          {/* Progress Bar & Footer */}
          <div className="w-full max-w-xs flex flex-col items-center gap-3 z-10 pb-4">
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-white/10 p-0.5">
              <motion.div 
                className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <span className="text-[9.5px] font-extrabold text-slate-400 tracking-widest uppercase">
              Initializing Islamic Ecosystem • {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
