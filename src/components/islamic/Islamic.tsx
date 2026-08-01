"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoCompassOutline, IoVolumeHighOutline, IoReloadOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

// ----------------------------------------------------
// 1. PRAYER TIME CARD (Highlight Next Prayer)
// ----------------------------------------------------
interface PrayerTime {
  name: string;
  time: string;
  isActive: boolean;
}

export const PrayerTimeCard: React.FC = () => {
  const prayers: PrayerTime[] = [
    { name: 'Fajr', time: '04:12 AM', isActive: false },
    { name: 'Dhuhr', time: '12:35 PM', isActive: false },
    { name: 'Asr', time: '04:10 PM', isActive: true }, // next/active prayer
    { name: 'Maghrib', time: '07:22 PM', isActive: false },
    { name: 'Isha', time: '08:50 PM', isActive: false }
  ];

  return (
    <Card className="bg-slate-900 border border-slate-800 text-white p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center select-none">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-accent-light uppercase tracking-widest">Srinagar, J&K</span>
          <h4 className="text-xs font-black text-white/90 mt-0.5">Prayer Timings</h4>
        </div>
        <span className="text-[10px] text-accent-light font-extrabold bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
          Asr in 1h 15m
        </span>
      </div>

      {/* Row list of timings */}
      <div className="flex justify-between items-center gap-1 select-none">
        {prayers.map((pr) => (
          <div 
            key={pr.name}
            className={`flex flex-col items-center p-2 rounded-xl border transition-all ${
              pr.isActive 
                ? 'bg-accent/20 border-accent text-accent-light shadow-sm shadow-accent/10 scale-105' 
                : 'bg-white/5 border-transparent text-white/70'
            }`}
          >
            <span className="text-[9px] font-bold uppercase tracking-wider">{pr.name}</span>
            <span className="text-[10px] font-black font-mono mt-1">{pr.time.split(' ')[0]}</span>
            <span className="text-[7px] font-semibold text-white/40 leading-none mt-0.5">{pr.time.split(' ')[1]}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ----------------------------------------------------
// 2. HIJRI DATE CARD
// ----------------------------------------------------
export const HijriDateCard: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4.5 bg-white rounded-2xl border border-slate-50 shadow-soft select-none">
      <div className="flex flex-col">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Islamic Calendar</span>
        <h3 className="text-xs font-black text-slate-800 leading-tight mt-0.5">17 Safar 1448 AH</h3>
        <span className="text-[10px] text-slate-400 font-semibold mt-1">Friday, July 31, 2026</span>
      </div>
      <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center text-lg border border-amber-100/50">
        🌙
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 3. DAILY HADITH / DUA / QURAN CARDS
// ----------------------------------------------------
interface DailyAyahProps {
  arabic: string;
  translation: string;
  source: string;
  title: string;
}

export const DailyQuranCard: React.FC<DailyAyahProps> = ({ arabic, translation, source, title }) => {
  return (
    <Card className="flex flex-col gap-4 border border-emerald-50 bg-gradient-to-br from-white to-emerald-50/10">
      <div className="flex justify-between items-center select-none">
        <Badge variant="primary" className="text-[8px] uppercase tracking-wider">{title}</Badge>
        <button className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer">
          <IoVolumeHighOutline className="text-base" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {/* Arabic scripture with Noto Urdu or standard font */}
        <p className="text-base text-right leading-loose font-bold text-primary font-urdu pr-1">
          {arabic}
        </p>
        <p className="text-xs text-slate-500 leading-relaxed font-semibold">
          "{translation}"
        </p>
      </div>

      <div className="flex justify-between items-center border-t border-slate-100 pt-3 select-none">
        <span className="text-[10px] font-bold text-slate-400 font-mono">{source}</span>
        <span className="text-[9px] text-primary font-bold uppercase tracking-wider flex items-center gap-0.5 hover:underline cursor-pointer">
          Read Surah <IoChevronForwardOutline />
        </span>
      </div>
    </Card>
  );
};

// ----------------------------------------------------
// 4. TASBIH COUNTER (Interactive touch counter)
// ----------------------------------------------------
export const TasbihCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);

  const handleIncrement = () => {
    setCount(c => (c >= target ? 1 : c + 1));
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCount(0);
  };

  const toggleTarget = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTarget(t => (t === 33 ? 100 : 33));
    setCount(0);
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-3xl p-5 border border-slate-50 shadow-medium w-full text-center max-w-[280px] mx-auto select-none">
      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Dhikr Counter</span>
      
      {/* Target indicator */}
      <button 
        onClick={toggleTarget}
        className="text-[10px] text-accent font-bold px-2 py-0.5 bg-amber-50 rounded-full border border-amber-100/50 hover:bg-amber-100 transition-colors mb-4 cursor-pointer"
      >
        Target: {target}
      </button>

      {/* Large increment tap target circular dial */}
      <motion.div
        whileTap={{ scale: 0.94 }}
        onClick={handleIncrement}
        className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary to-primary-dark text-white border-[6px] border-emerald-50/80 shadow-lg flex flex-col items-center justify-center cursor-pointer select-none"
      >
        <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-wider">Count</span>
        <span className="text-3xl font-black font-mono leading-none mt-1">{count}</span>
        <span className="text-[8px] text-white/50 font-bold mt-1 uppercase tracking-widest">{target === 33 ? 'Tasbih' : 'Dhikr'}</span>
      </motion.div>

      {/* Reset button */}
      <div className="flex justify-center items-center mt-4">
        <button 
          onClick={handleReset}
          className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 transition-colors cursor-pointer"
        >
          <IoReloadOutline />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 5. QIBLA SHORTCUT CARD
// ----------------------------------------------------
export const QiblaShortcutCard: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4.5 bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl border border-emerald-950/20 shadow-soft select-none">
      <div className="flex flex-col">
        <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-wider">Compass Direction</span>
        <h3 className="text-xs font-black text-white mt-0.5">Qibla Locator</h3>
        <span className="text-[9px] text-emerald-300/80 font-bold mt-1">262° West from Srinagar</span>
      </div>
      <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-xl text-accent-light border border-white/5 animate-pulse">
        <IoCompassOutline />
      </div>
    </div>
  );
};
