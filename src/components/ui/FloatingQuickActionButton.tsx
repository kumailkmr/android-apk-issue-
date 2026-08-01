"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoAddOutline, 
  IoHeart, 
  IoTime, 
  IoTv, 
  IoSearch, 
  IoCall,
  IoCloseOutline
} from 'react-icons/io5';

interface FloatingQuickActionProps {
  onOpenDonate: () => void;
  onOpenPrayerTimes: () => void;
  onOpenLive: () => void;
  onOpenSearch: () => void;
  onOpenEmergency: () => void;
}

export const FloatingQuickActionButton: React.FC<FloatingQuickActionProps> = ({
  onOpenDonate,
  onOpenPrayerTimes,
  onOpenLive,
  onOpenSearch,
  onOpenEmergency
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { id: 'donate', label: 'Pay Donation & Sadqa', icon: <IoHeart className="text-rose-400" />, onClick: onOpenDonate, bg: 'bg-rose-950/90 text-rose-100 border-rose-800/40' },
    { id: 'prayer', label: 'Prayer Times & Qibla', icon: <IoTime className="text-amber-400" />, onClick: onOpenPrayerTimes, bg: 'bg-slate-900/90 text-amber-100 border-slate-700' },
    { id: 'live', label: 'Abu Turab TV Live', icon: <IoTv className="text-red-400" />, onClick: onOpenLive, bg: 'bg-slate-900/90 text-red-100 border-slate-700' },
    { id: 'search', label: 'Universal Search', icon: <IoSearch className="text-emerald-400" />, onClick: onOpenSearch, bg: 'bg-slate-900/90 text-emerald-100 border-slate-700' },
    { id: 'emergency', label: 'Secretariat Helpline', icon: <IoCall className="text-blue-400" />, onClick: onOpenEmergency, bg: 'bg-slate-900/90 text-blue-100 border-slate-700' }
  ];

  return (
    <>
      {/* Backdrop overlay when expanded */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40"
          />
        )}
      </AnimatePresence>

      {/* Floating Speed Dial Container */}
      <div className="fixed bottom-20 right-5 z-40 flex flex-col items-end gap-2.5 select-none">
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2, staggerChildren: 0.05 }}
              className="flex flex-col items-end gap-2.5 mb-1"
            >
              {actions.map((act) => (
                <motion.button
                  key={act.id}
                  onClick={() => {
                    setIsOpen(false);
                    act.onClick();
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border shadow-xl backdrop-blur-md cursor-pointer transition-all ${act.bg}`}
                >
                  <span className="text-xs font-black tracking-wide">{act.label}</span>
                  <span className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center text-sm">
                    {act.icon}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-primary via-emerald-800 to-amber-500 text-white flex items-center justify-center text-2xl shadow-2xl border-2 border-white/20 cursor-pointer backdrop-blur-md"
          aria-label="Quick Actions Menu"
        >
          {isOpen ? <IoCloseOutline /> : <IoAddOutline />}
        </motion.button>
      </div>
    </>
  );
};
