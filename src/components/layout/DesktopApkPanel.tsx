"use client";

import React from 'react';
import { motion } from 'framer-motion';

import { APP_CONFIG } from '@/config/appConfig';

interface DesktopApkPanelProps {
  onToast?: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
}

export const DesktopApkPanel: React.FC<DesktopApkPanelProps> = ({ onToast }) => {
  return (
    <div className="hidden lg:flex flex-col gap-4 w-[340px] shrink-0 select-none text-white">
      {/* Floating Action Panel Card */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-4 relative overflow-hidden"
      >
        {/* Subtle Background Glow Accent */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header with Android Logo & Badges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-slate-950 flex items-center justify-center text-2xl font-bold shadow-lg shadow-emerald-500/20">
              🤖
            </div>
            <div className="flex flex-col">
              <h3 className="text-base font-black text-white leading-tight">Android APK</h3>
              <span className="text-[10.5px] font-semibold text-emerald-400">Official Mobile Package</span>
            </div>
          </div>
          <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full">
            Ready
          </span>
        </div>

        <p className="text-xs text-slate-300 font-medium leading-relaxed">
          Experience the complete Anjuman-e-Sharie Shian mobile application directly on your Android smartphone.
        </p>

        {/* Reusable Download APK Button */}
        

        {/* Version & File Size Metadata */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold px-1">
          <span>Demo Version v{APP_CONFIG.version}</span>
          <span>Size: {APP_CONFIG.apkFileSize}</span>
        </div>

        {/* Additional Action Buttons */}
        <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
          <button 
            disabled 
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-400 text-xs font-bold flex items-center justify-between opacity-60 cursor-not-allowed"
          >
            <span>🍎 iOS Package</span>
            <span className="text-[9px] uppercase font-extrabold">Coming Soon</span>
          </button>

          <button 
            onClick={() => window.open('/dashboard', '_self')}
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
          >
            <span>🌐 Open Web Version</span>
            <span className="text-emerald-400">→</span>
          </button>
        </div>

        {/* Information Verification Checklist Card */}
        <div className="bg-slate-950/80 rounded-2xl p-3.5 border border-slate-800/80 flex flex-col gap-2 text-[10px] font-bold text-slate-300">
          <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-black">All Modules Bundled Inside APK:</span>
          <div className="grid grid-cols-2 gap-1.5 text-[9.5px]">
            <div className="flex items-center gap-1.5 text-emerald-300">
              <span>✓</span>
              <span>All 30 App Modules</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300">
              <span>✓</span>
              <span>Pay Donation & Sadqa</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300">
              <span>✓</span>
              <span>Budgam J&K Map</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300">
              <span>✓</span>
              <span>Maktab System</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300">
              <span>✓</span>
              <span>Prayer Times & Qibla</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300">
              <span>✓</span>
              <span>Offline Standalone</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
