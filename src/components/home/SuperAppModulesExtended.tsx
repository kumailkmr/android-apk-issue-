"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AnimatedIcon } from '@/components/ui/icons';

interface ModuleProps {
  triggerToast: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
}

// ----------------------------------------------------
// 7. LEADERSHIP DIRECTORY
// ----------------------------------------------------
export const LeadershipDirectory: React.FC<ModuleProps> = ({ triggerToast }) => {
  const leaders = [
    { name: "Agha Syed Hassan Al-Moosavi Al-Safavi", position: "President", desc: "Central Religious Authority & Executive Head", photo: "/logo.png" },
    { name: "Aga Syed Mujtaba Al-Moosavi", position: "Vice President", desc: "Administrative Coordination & Educational Affairs", photo: "/logo.png" },
    { name: "Syed Ashraf", position: "General Secretary", desc: "Organizational Execution & Youth Affairs Coordinator", photo: "/logo.png" },
    { name: "Ali Rehmani", position: "Head of Institution Affairs", desc: "Institutional Administration & Educational Supervision", photo: "/logo.png" }
  ];

  return (
    <Card className="p-4 bg-white border border-slate-100 shadow-soft select-none flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Organizational Leadership</span>
          <h3 className="text-sm font-black text-slate-800">Executive Leadership Directory</h3>
        </div>
        <AnimatedIcon name="user" size={18} className="text-primary" />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-1">
        {leaders.map((l, idx) => (
          <div 
            key={idx}
            onClick={() => triggerToast(`Viewing leadership profile for ${l.name}`, 'info')}
            className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center cursor-pointer hover:border-emerald-200 transition-all group"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/30 p-0.5 shadow-sm bg-slate-900 group-hover:scale-105 transition-transform mb-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.photo} alt={l.name} className="w-full h-full object-cover rounded-full" />
            </div>
            <h4 className="text-[10.5px] font-extrabold text-slate-900 leading-tight group-hover:text-primary transition-colors line-clamp-1">{l.name}</h4>
            <Badge variant="accent" className="text-[7.5px] uppercase font-bold py-0.5 px-1.5 mt-1">{l.position}</Badge>
            <span className="text-[8.5px] text-slate-400 font-medium leading-tight mt-1 line-clamp-2">{l.desc}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ----------------------------------------------------
// 8. HALL OF RECOGNITION (Honors of the Month)
// ----------------------------------------------------
export const HallOfRecognition: React.FC<ModuleProps> = ({ triggerToast }) => {
  const honors = [
    { title: "Volunteer of the Month", name: "Sajjad Hussain Bhat", detail: "48 Duty Hours in Safar Jaloos Security", award: "🏅 Husseini Guard Honor" },
    { title: "Teacher of the Month", name: "Ustada Fatima Zahra", detail: "Excellence in Maktab Quranic Tajweed", award: "⭐ Master Teacher Award" },
    { title: "Student of the Month", name: "Ali Raza Mir", detail: "100% Score in Fiqh & Aqaid Annual Exam", award: "🎓 Maktab Gold Seal" }
  ];

  return (
    <Card className="p-4 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white border border-emerald-900/40 shadow-soft select-none flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] font-extrabold text-accent-light uppercase tracking-widest">Community Excellence</span>
          <h3 className="text-sm font-black text-white">Hall of Recognition</h3>
        </div>
        <AnimatedIcon name="sparkles" size={20} className="text-amber-300" />
      </div>

      <div className="flex flex-col gap-2.5">
        {honors.map((h, idx) => (
          <div 
            key={idx}
            onClick={() => triggerToast(`Recognition Certificate for ${h.name}`, 'success')}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[8.5px] text-accent font-extrabold uppercase tracking-wider">{h.title}</span>
              <h4 className="text-xs font-extrabold text-white">{h.name}</h4>
              <span className="text-[9px] text-emerald-200/80 font-medium">{h.detail}</span>
            </div>
            <Badge variant="accent" className="text-[8px] py-1 px-2 font-black shrink-0">{h.award}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ----------------------------------------------------
// 9. MY ISLAMIC JOURNEY (Dashboard Progress)
// ----------------------------------------------------
export const MyIslamicJourney: React.FC<ModuleProps> = ({ triggerToast }) => {
  return (
    <Card className="p-4 bg-white border border-slate-100 shadow-soft select-none flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Personal Analytics</span>
          <h3 className="text-sm font-black text-slate-800">My Islamic Journey</h3>
        </div>
        <AnimatedIcon name="book" size={18} className="text-primary" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div 
          onClick={() => triggerToast("Quran Reading Streak: 14 Consecutive Days", "success")}
          className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/60 flex flex-col gap-1 cursor-pointer"
        >
          <span className="text-[8.5px] text-amber-800 font-extrabold uppercase tracking-wider">Prayer & Quran Streak</span>
          <span className="text-base font-black text-amber-900">14 Days 🔥</span>
          <span className="text-[8.5px] text-amber-700 font-medium">Daily Surah Yaseen Complete</span>
        </div>

        <div 
          onClick={() => triggerToast("Course Progress: 75% Complete in Basic Aqaid", "info")}
          className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/60 flex flex-col gap-1 cursor-pointer"
        >
          <span className="text-[8.5px] text-emerald-800 font-extrabold uppercase tracking-wider">Aqaid Course</span>
          <span className="text-base font-black text-emerald-900">75% Done 📚</span>
          <span className="text-[8.5px] text-emerald-700 font-medium">9 of 12 Lessons Completed</span>
        </div>

        <div 
          onClick={() => triggerToast("Volunteer Service: 18 Hours Logged", "info")}
          className="p-3 rounded-2xl bg-teal-50/80 border border-teal-200/60 flex flex-col gap-1 cursor-pointer"
        >
          <span className="text-[8.5px] text-teal-800 font-extrabold uppercase tracking-wider">Volunteer Duty</span>
          <span className="text-base font-black text-teal-900">18 Hours 🛡️</span>
          <span className="text-[8.5px] text-teal-700 font-medium">Husseini Guard Active</span>
        </div>

        <div 
          onClick={() => triggerToast("Community Badges Earned: 5 Seals", "success")}
          className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-200/60 flex flex-col gap-1 cursor-pointer"
        >
          <span className="text-[8.5px] text-indigo-800 font-extrabold uppercase tracking-wider">Earned Seals</span>
          <span className="text-base font-black text-indigo-900">5 Badges 🏅</span>
          <span className="text-[8.5px] text-indigo-700 font-medium">Verified Active Member</span>
        </div>
      </div>
    </Card>
  );
};

// ----------------------------------------------------
// 10. AUDIO RADIO PLAYER (Shia Islamic Radio)
// ----------------------------------------------------
export const AudioRadioPlayer: React.FC<ModuleProps> = ({ triggerToast }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card className="p-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white border border-emerald-900/40 shadow-soft select-none flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-accent text-slate-950 flex items-center justify-center font-bold text-sm shadow-md">
            📻
          </div>
          <div className="flex flex-col">
            <span className="text-[8.5px] font-extrabold text-accent-light uppercase tracking-widest">Sawt al-Anjuman</span>
            <h3 className="text-xs font-black text-white">Live Islamic Radio Stream</h3>
          </div>
        </div>
        <Badge variant={isPlaying ? "accent" : "neutral"} className="text-[8px] uppercase font-bold py-0.5 px-2">
          {isPlaying ? "ON AIR 🟢" : "OFFLINE 🔴"}
        </Badge>
      </div>

      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-[8px] text-emerald-300 font-bold uppercase tracking-wider">Now Broadcasting</span>
          <h4 className="text-xs font-extrabold text-white">Recitation of Ziyarat Arbaeen & Nohajat</h4>
          <span className="text-[9px] text-slate-400 font-medium">Next: Evening Tafseer Lecture</span>
        </div>

        <button 
          onClick={() => {
            setIsPlaying(!isPlaying);
            triggerToast(isPlaying ? "Radio paused" : "Streaming Sawt al-Anjuman Live Audio...", "success");
          }}
          className="w-10 h-10 rounded-full bg-primary hover:bg-emerald-600 active:scale-95 text-white flex items-center justify-center font-bold shadow-lg transition-transform shrink-0"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
      </div>
    </Card>
  );
};
