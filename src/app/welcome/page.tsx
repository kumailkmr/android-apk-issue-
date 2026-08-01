"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { IoGlobeOutline } from 'react-icons/io5';

export default function WelcomeScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="w-full flex-1 flex flex-col justify-between bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white p-6 relative overflow-hidden select-none">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      {/* Top Floating Language shortcut */}
      <div className="flex justify-end z-20 select-none">
        <button 
          onClick={() => router.push('/language')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-[10px] font-extrabold text-white/80 transition-all cursor-pointer select-none"
        >
          <IoGlobeOutline className="text-xs" />
          <span>Language / زبان</span>
        </button>
      </div>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col justify-center items-center py-6 select-none z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[190px] aspect-square rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center relative shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent opacity-50" />
          <img src="/logo.png" alt="Anjuman-e-Sharie Shian Logo" className="w-40 h-40 object-contain drop-shadow-2xl z-10 brightness-110" />
        </motion.div>

        {/* Welcome message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-8 flex flex-col gap-3"
        >
          <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-accent tracking-wide uppercase leading-tight font-sans drop-shadow-sm">
            Anjuman Digital
          </h2>
          <p className="text-xs text-emerald-100/70 max-w-[280px] mx-auto leading-relaxed font-semibold">
            The unified portal of Anjuman-e-Sharie Shian for Islamic learning, welfare, and community services.
          </p>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-3 z-20 pb-4"
      >
        <button 
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-accent to-amber-500 text-emerald-950 shadow-[0_8px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.4)] transition-all font-black uppercase tracking-widest text-[11px] active:scale-[0.98]"
          onClick={() => router.push('/login')}
        >
          Sign In / Register
        </button>

        <button 
          className="w-full py-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all font-bold uppercase tracking-widest text-[11px] active:scale-[0.98]"
          onClick={() => {
            if (typeof window !== 'undefined') {
              localStorage.setItem('userMode', 'guest');
            }
            router.push('/dashboard');
          }}
        >
          Continue as Guest
        </button>
      </motion.div>
    </div>
  );
}

