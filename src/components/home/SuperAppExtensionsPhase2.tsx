"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AnimatedIcon } from '@/components/ui/icons';

interface ExtensionProps {
  triggerToast: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
}

// 9. QURAN EXPERIENCE
export const QuranExperienceTracker: React.FC<ExtensionProps> = ({ triggerToast }) => {
  return (
    <Card className="p-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white border border-emerald-900/40 shadow-soft flex flex-col gap-3.5 select-none">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[8.5px] text-accent font-black uppercase tracking-wider">Quranic Recitation</span>
          <h3 className="text-sm font-black text-white">Daily Quran Tracker</h3>
        </div>
        <AnimatedIcon name="open-quran" size={20} className="text-accent" />
      </div>

      <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10">
        <div className="relative w-14 h-14 rounded-full bg-emerald-500/20 border-4 border-accent flex items-center justify-center font-black text-xs text-accent">
          68%
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-black text-white">Juz 18 • Surah Al-Kahf</span>
          <span className="text-[9.5px] text-emerald-300 font-medium">Daily Goal: 2 Pages • Streak: 12 Days 🔥</span>
        </div>
      </div>
    </Card>
  );
};

// 10. COMMUNITY POLLS
export const CommunityPolls: React.FC<ExtensionProps> = ({ triggerToast }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const options = [
    { text: 'Expanded Friday Youth Ethics Circles', votes: '54%' },
    { text: 'Online Quran Tajweed Certification', votes: '32%' },
    { text: 'Digital Hawza Evening Classes', votes: '14%' }
  ];

  return (
    <Card className="p-5 bg-white border border-slate-100 shadow-soft flex flex-col gap-3.5 select-none">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[8.5px] text-slate-400 font-bold uppercase tracking-wider">Community Voice</span>
          <h3 className="text-sm font-black text-slate-800">Monthly Community Poll</h3>
        </div>
        <Badge variant="accent" className="text-[7.5px] uppercase">Active Poll</Badge>
      </div>

      <p className="text-xs text-slate-700 font-bold leading-snug">
        Which educational initiative should Anjuman prioritize for winter 2026?
      </p>

      <div className="flex flex-col gap-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => {
              setSelectedOption(i);
              triggerToast(`Vote recorded for "${opt.text}"`, 'success');
            }}
            className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all flex justify-between items-center cursor-pointer ${
              selectedOption === i 
                ? 'bg-emerald-50 border-emerald-300 text-primary font-black' 
                : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>{opt.text}</span>
            {selectedOption !== null && <span className="text-[10px] text-slate-400 font-extrabold">{opt.votes}</span>}
          </button>
        ))}
      </div>
    </Card>
  );
};

// 11. ZIYARAT GUIDE
export const ZiyaratGuide: React.FC<ExtensionProps> = ({ triggerToast }) => {
  const shrines = [
    { title: 'Shrine of Imam Hussain (A.S)', loc: 'Karbala, Iraq', icon: 'karbala' },
    { title: 'Shrine of Imam Ali (A.S)', loc: 'Najaf, Iraq', icon: 'najaf' },
    { title: 'Shrine of Imam Reza (A.S)', loc: 'Mashhad, Iran', icon: 'mashhad' },
    { title: 'Mir Shams-ud-Din Iraqi (R.A)', loc: 'Chadoora, Kashmir', icon: 'shrine' }
  ];

  return (
    <Card className="p-5 bg-white border border-slate-100 shadow-soft flex flex-col gap-3.5 select-none">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[8.5px] text-primary font-bold uppercase tracking-wider">Holy Pilgrimage</span>
          <h3 className="text-sm font-black text-slate-800">Ziyarat Travel & Duas Guide</h3>
        </div>
        <AnimatedIcon name="karbala" size={18} className="text-primary" />
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {shrines.map((s, i) => (
          <div key={i} onClick={() => triggerToast(`Opening Ziyarat Guide for ${s.title}...`, 'info')} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors cursor-pointer flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <AnimatedIcon name={s.icon as any} size={14} className="text-primary" />
              <h4 className="text-[10.5px] font-black text-slate-800 leading-tight truncate">{s.title}</h4>
            </div>
            <span className="text-[8.5px] text-slate-400 font-bold">{s.loc}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

// 12. KASHMIR COMMUNITY MAP
export const KashmirCommunityMap: React.FC<ExtensionProps> = ({ triggerToast }) => {
  const districts = [
    { name: 'Budgam Central', centers: '42 Maktabs • Central Imambara' },
    { name: 'Srinagar District', centers: '18 Maktabs • Media Secretariat' },
    { name: 'Baramulla / North', centers: '28 Maktabs • Regional Relief' },
    { name: 'Kargil & Ladakh', centers: '15 Maktabs • Youth Wing' }
  ];

  return (
    <Card className="p-5 bg-gradient-to-br from-slate-900 to-emerald-950 text-white border border-emerald-900/40 shadow-soft flex flex-col gap-3.5 select-none">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[8.5px] text-accent font-black uppercase tracking-wider">Regional Coverage</span>
          <h3 className="text-sm font-black text-white">Kashmir Community Map</h3>
        </div>
        <AnimatedIcon name="compass" size={18} className="text-accent" />
      </div>

      <div className="flex flex-col gap-2">
        {districts.map((d, i) => (
          <div key={i} onClick={() => triggerToast(`Filtering Map to ${d.name}...`, 'info')} className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer flex justify-between items-center">
            <div className="flex flex-col">
              <h4 className="text-xs font-black text-white">{d.name}</h4>
              <span className="text-[9px] text-emerald-300 font-medium">{d.centers}</span>
            </div>
            <span className="text-xs text-accent">📍</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

// 13. DIGITAL TROPHY ROOM & BADGES
export const DigitalTrophyRoom: React.FC<ExtensionProps> = ({ triggerToast }) => {
  const badges = [
    { title: 'Quran Reciter', icon: 'open-quran', desc: 'Completed 100+ Quranic pages' },
    { title: 'Husseini Guard', icon: 'shield-check', desc: 'Logged 25+ Volunteer Hours' },
    { title: 'Scholar Student', icon: 'rehal', desc: 'Passed Tajweed Exam v1' }
  ];

  return (
    <Card className="p-5 bg-white border border-slate-100 shadow-soft flex flex-col gap-3.5 select-none">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[8.5px] text-amber-500 font-bold uppercase tracking-wider">Achievements</span>
          <h3 className="text-sm font-black text-slate-800">Digital Trophy Room</h3>
        </div>
        <AnimatedIcon name="sparkles" size={18} className="text-amber-500" />
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {badges.map((b, i) => (
          <div key={i} onClick={() => triggerToast(`Badge: ${b.title} - ${b.desc}`, 'info')} className="p-2.5 rounded-2xl bg-amber-50/80 border border-amber-200/60 flex flex-col items-center gap-1 cursor-pointer">
            <AnimatedIcon name={b.icon as any} size={16} className="text-amber-600" />
            <span className="text-[9.5px] font-black text-slate-800 leading-tight">{b.title}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
