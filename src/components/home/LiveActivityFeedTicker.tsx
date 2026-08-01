"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface LiveActivityFeedProps {
  triggerToast: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
}

export const LiveActivityFeedTicker: React.FC<LiveActivityFeedProps> = ({ triggerToast }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const activities = [
    {
      id: 1,
      icon: '💚',
      user: 'Syed Mohsin (Budgam)',
      action: 'donated ₹500 to Education & Maktab Fund',
      time: '2 mins ago'
    },
    {
      id: 2,
      icon: '📚',
      user: 'Anjuman Digital Library',
      action: 'published new book: "Al-Mizan Tafseer Vol 4"',
      time: '12 mins ago'
    },
    {
      id: 3,
      icon: '🎖️',
      user: 'Ahmad Safvi (Srinagar)',
      action: 'completed 15 Hours Husseini Guard Volunteer Duty',
      time: '25 mins ago'
    },
    {
      id: 4,
      icon: '🎙️',
      user: 'Abu Turab TV',
      action: 'uploaded Majlis E Aza by Aga Syed Hassan Moosvi',
      time: '40 mins ago'
    },
    {
      id: 5,
      icon: '🏫',
      user: 'Central Maktab Board',
      action: 'enrolled 45 new students in Class 1 Tawheed',
      time: '1 hour ago'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % activities.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [activities.length]);

  const currentAct = activities[activeIdx];

  return (
    <Card 
      onClick={() => triggerToast(`Viewing live update: ${currentAct.action}`, 'info')}
      className="p-3 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white border border-emerald-900/40 shadow-medium flex items-center justify-between gap-3 select-none cursor-pointer hover:border-emerald-500/40 transition-all overflow-hidden"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-sm shrink-0">
          {currentAct.icon}
        </span>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="text-[8px] font-black text-amber-300 uppercase tracking-widest truncate">Live Activity Feed</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAct.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-[10px] font-bold text-slate-200 truncate leading-snug"
            >
              <span className="text-white font-extrabold">{currentAct.user}</span> {currentAct.action}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Badge variant="accent" className="text-[7.5px] uppercase font-bold py-0.5 px-2 bg-accent text-slate-950 shrink-0">
        {currentAct.time}
      </Badge>
    </Card>
  );
};
