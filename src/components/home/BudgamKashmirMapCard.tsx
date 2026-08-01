"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AnimatedIcon } from '@/components/ui/icons';

interface MapCardProps {
  triggerToast: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
}

export const BudgamKashmirMapCard: React.FC<MapCardProps> = ({ triggerToast }) => {
  const [activePin, setActivePin] = useState<number>(0);

  const landmarks = [
    {
      id: 'imambara',
      name: 'Central Imambara Budgam',
      type: 'Headquarters & Friday Venue',
      coords: '34.0159° N, 74.7203° E',
      desc: 'The iconic central venue for Friday prayers, Ashura processions, and major community assemblies.',
      image: '/kashmir_majlis.jpg'
    },
    {
      id: 'shrine_iraqi',
      name: 'Mir Shams-ud-Din Iraqi (R.A) Shrine',
      type: 'Spiritual Heritage Site',
      coords: '33.9512° N, 74.7981° E • Chadoora',
      desc: '15th-century historic shrine of the saint who established Shia Islam in the Kashmir valley.',
      image: '/shrine_iraqi_hd.jpg'
    },
    {
      id: 'secretariat',
      name: 'Anjuman Central Secretariat',
      type: 'Administration & Archives',
      coords: 'Central Complex, Budgam',
      desc: 'Executive offices, Central Jurisprudential Board, and Hawza manuscript digital archive.',
      image: '/logo.png'
    },
    {
      id: 'maktab_board',
      name: 'Central Maktab Board Office',
      type: '150+ Regional Centers',
      coords: 'Budgam Main Complex',
      desc: 'Curriculum development, teacher training, and annual examinations for 4,500+ students.',
      image: '/mourning_shrine.jpg'
    }
  ];

  return (
    <Card className="p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white border border-emerald-900/40 shadow-xl flex flex-col gap-3.5 select-none relative overflow-hidden">
      {/* Background Islamic Map Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="mapPatternGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24,0 L 0,24 M 0,0 L 24,24" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#mapPatternGrid)" />
        </svg>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start z-10">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Badge variant="accent" className="text-[7.5px] uppercase tracking-widest py-0.5 px-2 bg-accent text-slate-950 font-black">
              Jammu & Kashmir
            </Badge>
          </div>
          <h3 className="text-sm font-black text-white tracking-wide">Budgam Regional Headquarters & Map</h3>
          <span className="text-[9.5px] text-emerald-300 font-medium">34.0159° N, 74.7203° E • Kashmir Valley</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm shrink-0 shadow-md">
          📍
        </div>
      </div>

      {/* Stylized Interactive Map Container */}
      <div className="relative w-full h-44 rounded-2xl bg-slate-900/80 border border-white/10 overflow-hidden z-10 flex flex-col justify-between p-3">
        {/* Map Vector Graphic Backdrop */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/arbaeen_walk.jpg" 
          alt="Budgam Map Backdrop" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 filter brightness-75"
        />

        {/* Pulse Map Pins Overlay */}
        <div className="absolute inset-0 z-10 p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <button 
              onClick={() => { setActivePin(0); triggerToast("Selected Central Imambara Budgam", "info"); }}
              className={`px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider transition-all flex items-center gap-1 shadow-lg ${
                activePin === 0 ? 'bg-amber-400 text-slate-950 scale-105 border-2 border-white' : 'bg-slate-900/80 text-white border border-white/20'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span>Imambara Budgam</span>
            </button>

            <button 
              onClick={() => { setActivePin(1); triggerToast("Selected Shrine of Mir Shams-ud-Din Iraqi", "info"); }}
              className={`px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider transition-all flex items-center gap-1 shadow-lg ${
                activePin === 1 ? 'bg-amber-400 text-slate-950 scale-105 border-2 border-white' : 'bg-slate-900/80 text-white border border-white/20'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Chadoora Shrine</span>
            </button>
          </div>

          <div className="flex justify-between items-end">
            <button 
              onClick={() => { setActivePin(2); triggerToast("Selected Anjuman Secretariat", "info"); }}
              className={`px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider transition-all flex items-center gap-1 shadow-lg ${
                activePin === 2 ? 'bg-amber-400 text-slate-950 scale-105 border-2 border-white' : 'bg-slate-900/80 text-white border border-white/20'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>Secretariat</span>
            </button>

            <button 
              onClick={() => { setActivePin(3); triggerToast("Selected Maktab Board Office", "info"); }}
              className={`px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider transition-all flex items-center gap-1 shadow-lg ${
                activePin === 3 ? 'bg-amber-400 text-slate-950 scale-105 border-2 border-white' : 'bg-slate-900/80 text-white border border-white/20'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>Maktab Board</span>
            </button>
          </div>
        </div>

        {/* Map Watermark Badge */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-950/80 backdrop-blur-md px-3 py-0.5 rounded-full border border-white/20 text-[8px] font-extrabold text-amber-300 uppercase tracking-widest z-20">
          Budgam District • J&K
        </div>
      </div>

      {/* Selected Landmark Detail Card */}
      <motion.div key={activePin} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="z-10">
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-black text-white">{landmarks[activePin].name}</h4>
            <Badge variant="accent" className="text-[7.5px] uppercase font-bold py-0.5 px-2 bg-accent text-slate-950">
              {landmarks[activePin].type}
            </Badge>
          </div>
          <span className="text-[9px] text-emerald-300 font-bold">{landmarks[activePin].coords}</span>
          <p className="text-[10px] text-slate-300 font-medium leading-relaxed">
            {landmarks[activePin].desc}
          </p>
        </div>
      </motion.div>

      {/* Map Action Buttons */}
      <div className="grid grid-cols-2 gap-2 z-10 pt-1">
        <button 
          onClick={() => triggerToast("Opening Interactive Budgam District Map...", "success")}
          className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-[10px] uppercase tracking-wider border border-white/20 shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer select-none"
        >
          <span className="text-xs">🗺️</span>
          <span>Explore Map</span>
        </button>
        <button 
          onClick={() => triggerToast("GPS Directions to Central Imambara Budgam generated!", "success")}
          className="py-3 px-3 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer border border-emerald-200 select-none"
        >
          <span className="text-xs">📍</span>
          <span>Get Directions</span>
        </button>
      </div>
    </Card>
  );
};
