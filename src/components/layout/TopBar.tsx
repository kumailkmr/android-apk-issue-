"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { mockLanguages } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedIcon } from '@/components/ui/icons';

interface TopBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onMenuClick?: () => void;
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onMenuClick,
  onSearchClick,
  onNotificationClick
}) => {
  const { t, language, setLanguage, dir } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  return (
    <div className="w-full bg-slate-900/90 backdrop-blur-md text-white border-b border-white/10 shadow-lg z-40 shrink-0 sticky top-0">
      <div className="px-4 py-3 flex justify-between items-center relative select-none">
        
        {/* Left Side: Native Hamburger Menu Icon */}
        <div className="flex items-center gap-2">
          <button 
            onClick={onMenuClick}
            className="p-2 rounded-full hover:bg-white/10 active:scale-90 transition-all cursor-pointer text-white"
            aria-label="Open Navigation Menu"
          >
            <AnimatedIcon name="menu" size={22} animation="rotate" />
          </button>
        </div>

        {/* Center: Mobile App Title & Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setLangMenuOpen(!langMenuOpen)}>
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center p-0.5 border border-white/40 shadow-sm shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Anjuman Seal" className="w-6 h-6 object-contain" />
          </div>
          <span className="text-sm font-black tracking-wide leading-tight text-white font-sans">
            Anjuman-e-Sharie Shian
          </span>
          <AnimatedIcon name="chevron-down" size={12} className="text-emerald-300" />
        </div>

        {/* Right Side: Search Icon & Notification Icon */}
        <div className="flex items-center gap-1">
          <button 
            onClick={onSearchClick}
            className="p-2 rounded-full hover:bg-white/10 active:scale-90 transition-all cursor-pointer text-white"
            aria-label="Global Search"
          >
            <AnimatedIcon name="search" size={20} animation="scale" />
          </button>
          
          <button 
            onClick={onNotificationClick}
            className="p-2 rounded-full hover:bg-white/10 active:scale-90 transition-all cursor-pointer text-white relative"
            aria-label="Notifications"
          >
            <AnimatedIcon name="notifications" size={20} animation="pulse" badge={2} />
          </button>
        </div>

        {/* Language Selection Dropdown Overlay */}
        <AnimatePresence>
          {langMenuOpen && (
            <>
              <div 
                className="fixed inset-0 z-45" 
                onClick={() => setLangMenuOpen(false)}
              />
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-12 left-1/2 -translate-x-1/2 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 min-w-[160px]"
              >
                <div className="text-[10px] font-extrabold text-slate-400 px-3 py-1 uppercase tracking-wider">
                  Select Language
                </div>
                {mockLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as any);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl flex items-center justify-between transition-colors ${
                      language === lang.code ? 'bg-emerald-50 text-primary' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{lang.name}</span>
                    {language === lang.code && <span className="text-primary font-black">✓</span>}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
