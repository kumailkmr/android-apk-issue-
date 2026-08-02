"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { AnimatedIcon, IconName } from '@/components/ui/icons';

interface BottomNavProps {
  currentTab: string;
  onChangeTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onChangeTab }) => {
  const { t } = useLanguage();

  // 5 Tabs: Home, Discover, Learn, Services, Profile
  const navItems: { id: string; label: string; icon: IconName }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'discover', label: 'Discover', icon: 'islamic-geometry' },
    { id: 'learn', label: 'Learn', icon: 'open-quran' },
    { id: 'services', label: 'Services', icon: 'mosque' },
    { id: 'profile', label: 'Profile', icon: 'user' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full h-[64px] bg-white/95 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-around px-2 pb-safe shrink-0 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] select-none">
      {navItems.map((item) => {
        const isActive = currentTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onChangeTab(item.id)}
            className="flex flex-col items-center justify-center py-2 px-2 relative cursor-pointer focus:outline-none select-none flex-1 group"
          >
            {/* Active circular backdrop indicator or accent scaling */}
            <motion.div
              animate={{ 
                scale: isActive ? 1.1 : 1,
                color: isActive ? "#064e3b" : "#64748b" // Highlight active with Deep Emerald Green
              }}
              transition={{ duration: 0.2 }}
              className="text-[20px] relative flex items-center justify-center"
            >
              <AnimatedIcon 
                name={item.icon} 
                size={22} 
                animation={isActive ? 'pulse' : 'scale'}
                strokeWidth={isActive ? 2 : 1.5}
              />
              
              {/* Subtle top indicator dot */}
              {isActive && (
                <motion.div 
                  layoutId="bottomTabIndicatorDot"
                  className="absolute -top-1.5 w-1 h-1 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </motion.div>

            <span 
              className={`text-[9.5px] font-bold tracking-tight mt-1 transition-colors ${
                isActive ? 'text-primary' : 'text-slate-500'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
