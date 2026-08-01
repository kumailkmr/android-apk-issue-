"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedIcon, IconName } from '@/components/ui/icons';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: string;
  onSelectTab: (tabId: string, subView?: string) => void;
  triggerToast: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  currentTab,
  onSelectTab,
  triggerToast
}) => {
  const drawerItems: { id: string; label: string; icon: IconName; targetTab: string; subView?: string }[] = [
    { id: 'nav-home', label: 'Home', icon: 'home', targetTab: 'home' },
    { id: 'nav-discover', label: 'Discover', icon: 'islamic-geometry', targetTab: 'discover' },
    { id: 'nav-live', label: 'Live Broadcast', icon: 'play', targetTab: 'home' },
    { id: 'nav-lectures', label: 'Lectures', icon: 'open-quran', targetTab: 'discover' },
    { id: 'nav-books', label: 'Books Library', icon: 'book', targetTab: 'learn' },
    { id: 'nav-courses', label: 'Courses & Tajweed', icon: 'rehal', targetTab: 'learn' },
    { id: 'nav-shrines', label: 'Holy Shrines', icon: 'karbala', targetTab: 'discover' },
    { id: 'nav-events', label: 'Events & Assemblies', icon: 'islamic-calendar', targetTab: 'home' },
    { id: 'nav-gallery', label: 'Photo & Video Gallery', icon: 'sparkles', targetTab: 'discover' },
    { id: 'nav-news', label: 'Announcements', icon: 'notifications', targetTab: 'home' },
    { id: 'nav-about', label: 'About Anjuman', icon: 'mosque', targetTab: 'profile', subView: 'about' },
    { id: 'nav-leadership', label: 'Leadership Directory', icon: 'user', targetTab: 'home' },
    { id: 'nav-departments', label: 'Departments & Wings', icon: 'crypto-node', targetTab: 'services' },
    { id: 'nav-volunteer', label: 'Volunteer Portal', icon: 'shield-check', targetTab: 'services', subView: 'launcher' },
    { id: 'nav-membership', label: 'Digital Membership ID', icon: 'qr', targetTab: 'profile' },
    { id: 'nav-maktab', label: 'Maktab Super-Module', icon: 'rehal', targetTab: 'services', subView: 'maktab' },
    { id: 'nav-companion', label: 'Islamic Companion', icon: 'compass', targetTab: 'services', subView: 'companion' },
    { id: 'nav-settings', label: 'Settings', icon: 'user', targetTab: 'profile' },
    { id: 'nav-help', label: 'Help & Support', icon: 'shield-check', targetTab: 'profile' }
  ];

  const handleItemClick = (item: typeof drawerItems[0]) => {
    onSelectTab(item.targetTab, item.subView);
    onClose();
    triggerToast(`Navigated to ${item.label}`, 'info');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50"
          />

          {/* Sliding Left Drawer Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed top-0 bottom-0 left-0 w-[300px] max-w-[85%] bg-white z-50 shadow-2xl flex flex-col overflow-hidden select-none"
          >
            {/* Drawer Header Hero */}
            <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white p-5 relative flex flex-col gap-2 shrink-0">
              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <svg width="100%" height="100%">
                  <pattern id="drawerPattern" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 15,0 L 30,15 L 15,30 L 0,15 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#drawerPattern)" />
                </svg>
              </div>

              <div className="flex items-center justify-between z-10">
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 p-1 flex items-center justify-center shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo.png" alt="Anjuman Seal" className="w-9 h-9 object-contain" />
                </div>
                <button 
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xs font-bold transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col z-10 mt-1">
                <h3 className="text-base font-extrabold text-white tracking-wide leading-tight">Anjuman-e-Sharie Shian</h3>
                <span className="text-[9.5px] text-amber-300 font-medium">Serving Faith • Education • Community</span>
              </div>
            </div>

            {/* Scrollable Navigation List */}
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1 no-scrollbar">
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest px-3 py-1">Ecosystem Navigation</span>
              {drawerItems.map((item) => {
                const isActive = currentTab === item.targetTab;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                      isActive 
                        ? 'bg-emerald-50 text-primary border border-emerald-200/60 shadow-sm font-black' 
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <AnimatedIcon name={item.icon} size={18} className={isActive ? 'text-primary' : 'text-slate-400'} />
                    <span className="flex-1 truncate">{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                  </button>
                );
              })}
            </div>

            {/* Drawer Footer */}
            <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[9px] font-bold text-slate-400 shrink-0">
              <span>Anjuman Mobile App v2.4</span>
              <span className="text-emerald-700 font-extrabold">Est. 1918</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
