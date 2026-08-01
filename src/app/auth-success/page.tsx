"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { IoCheckmarkCircle, IoSparklesOutline } from 'react-icons/io5';
import { mockMember } from '@/data/mockData';

export default function AuthSuccessScreen() {
  const router = useRouter();

  // Auto direct to dashboard after 4 seconds as well, in case they don't click
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userMode', 'authenticated');
      localStorage.setItem('userRole', 'coordinator');
    }
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 3800);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="w-full flex-1 flex flex-col justify-between items-center bg-gradient-to-br from-primary to-primary-dark text-white p-6 relative overflow-hidden select-none">
      
      {/* Islamic geometric mandala backdrop */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="star" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 30,0 L 45,15 L 60,30 L 45,45 L 30,60 L 15,45 L 0,30 L 15,15 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#star)" />
        </svg>
      </div>

      <div className="h-10" />

      {/* Main Success Container */}
      <div className="flex-1 flex flex-col justify-center items-center text-center z-10 select-none">
        {/* Animated rings for visual excellence */}
        <div className="relative flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="absolute w-24 h-24 rounded-full border-2 border-accent/25"
          />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-18 h-18 rounded-full bg-white text-primary border-2 border-accent/30 flex items-center justify-center text-4xl shadow-xl"
          >
            <IoCheckmarkCircle className="text-emerald-600" />
          </motion.div>
        </div>

        {/* Welcome message */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex flex-col items-center gap-1.5"
        >
          <h2 className="text-base font-extrabold text-accent-light uppercase tracking-wider flex items-center gap-1">
            <IoSparklesOutline />
            Verified successfully
          </h2>
          <h1 className="text-lg font-black tracking-wide leading-snug mt-1">
            Welcome, {mockMember.name}!
          </h1>
          <p className="text-xs text-emerald-100/70 max-w-[240px] leading-relaxed mt-2 font-medium">
            Your digital ID <span className="font-mono text-white font-bold">{mockMember.cardNumber}</span> is synced. You have full access to education, donation, and volunteer tools.
          </p>
        </motion.div>
      </div>

      {/* Action Button to Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full z-10 pb-8"
      >
        <Button 
          variant="accent" 
          fullWidth
          onClick={() => router.push('/dashboard')}
        >
          <span className="text-xs uppercase tracking-wider font-extrabold">Enter Dashboard Home</span>
        </Button>
      </motion.div>
    </div>
  );
}
