"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AnimatedIcon } from '@/components/ui/icons';

interface SuperAppModulesProps {
  triggerToast: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  openAuthDialog?: () => void;
  isGuest?: boolean;
}

// ----------------------------------------------------
// 1. HISTORY OF ANJUMAN (Interactive Timeline)
// ----------------------------------------------------
export const HistoryOfAnjuman: React.FC<{ triggerToast: SuperAppModulesProps['triggerToast'] }> = ({ triggerToast }) => {
  const milestones = [
    { year: "1918", title: "Foundation of Anjuman-e-Sharie Shian", desc: "Established by Ayatullah Aga Syed Yusuf Al-Moosavi to unify religious education, social welfare, and community affairs in Kashmir." },
    { year: "1947", title: "Establishment of Central Imambara Budgam", desc: "Construction of the central congregation hall for Ashura processions and Friday assemblies." },
    { year: "1975", title: "Launch of Regional Maktab Network", desc: "Standardization of Quranic & Islamic education across 150+ rural village Maktabs." },
    { year: "2002", title: "Establishment of Sharie Shian Fatwa Board", desc: "Formation of the central jurisprudential advisory council for religious affairs." },
    { year: "2024", title: "Digital Super App Transformation", desc: "Launch of the futuristic digital platform connecting youth, scholars, Maktabs, and international pilgrims." }
  ];

  return (
    <Card className="p-4 bg-white border border-slate-100 shadow-soft select-none flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] font-extrabold text-accent-dark uppercase tracking-widest">Heritage & Legacy</span>
          <h3 className="text-sm font-black text-slate-800">History of Anjuman-e-Sharie Shian</h3>
        </div>
        <AnimatedIcon name="mosque" size={20} className="text-primary" />
      </div>

      <div className="flex flex-col gap-3 mt-1 relative pl-3 border-l-2 border-emerald-500/30">
        {milestones.map((m, idx) => (
          <div 
            key={idx} 
            onClick={() => triggerToast(`Milestone ${m.year}: ${m.title}`, 'info')}
            className="flex flex-col gap-0.5 relative group cursor-pointer"
          >
            <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-white group-hover:scale-125 transition-transform" />
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-accent bg-accent/10 px-2 py-0.5 rounded-md">{m.year}</span>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors">{m.title}</h4>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">{m.desc}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ----------------------------------------------------
// 2. ISLAMIC COUNTDOWNS (Ramadan, Muharram, Ashura, Arbaeen)
// ----------------------------------------------------
export const IslamicCountdowns: React.FC<{ triggerToast: SuperAppModulesProps['triggerToast'] }> = ({ triggerToast }) => {
  const events = [
    { title: "Arbaeen (20 Safar)", days: 3, date: "20 Safar 1448", icon: "mosque" },
    { title: "Demise of Prophet (PBUH)", days: 11, date: "28 Safar 1448", icon: "open-quran" },
    { title: "Milad-un-Nabi (PBUH)", days: 30, date: "17 Rabi al-Awwal", icon: "sparkles" },
    { title: "Holy Ramadan 1448", days: 195, date: "1 Ramadan 1448", icon: "crescent" }
  ];

  return (
    <div className="flex flex-col gap-2 select-none">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Upcoming Sacred Occasions</span>
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-0.5">
        {events.map((e, idx) => (
          <Card 
            key={idx}
            onClick={() => triggerToast(`${e.title} is in ${e.days} days`, 'info')}
            className="p-3 bg-gradient-to-br from-emerald-950 to-slate-900 text-white border border-emerald-900/40 shadow-soft shrink-0 w-36 flex flex-col justify-between h-24 cursor-pointer hover:border-accent/40 transition-all"
          >
            <div className="flex justify-between items-start">
              <span className="text-[8px] font-bold text-emerald-300 uppercase tracking-wider">{e.date}</span>
              <AnimatedIcon name={e.icon as any} size={14} className="text-accent" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-amber-300">{e.days} Days</span>
              <span className="text-[9.5px] font-bold text-slate-200 truncate">{e.title}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 3. TODAY AT ANJUMAN (Timeline of Daily Activities)
// ----------------------------------------------------
export const TodayAtAnjuman: React.FC<{ triggerToast: SuperAppModulesProps['triggerToast'] }> = ({ triggerToast }) => {
  const schedule = [
    { time: "05:00 AM", event: "Morning Fajr Assembly & Ziyarat Ashura", location: "Central Imambara", active: false },
    { time: "02:00 PM", event: "Live Arbaeen Majlis-e-Aza", location: "Budgam Imambara & Live Stream", active: true },
    { time: "05:30 PM", event: "Maktab Evening Quran Classes", location: "150+ Regional Centers", active: false },
    { time: "08:00 PM", event: "Youth Ethics Circle & Q&A", location: "Online & Central Library", active: false }
  ];

  return (
    <Card className="p-4 bg-white border border-slate-100 shadow-soft select-none flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Live Schedule</span>
          <h3 className="text-sm font-black text-slate-800">Today at Anjuman</h3>
        </div>
        <span className="text-[8px] bg-red-600 text-white font-black px-2 py-0.5 rounded-full animate-pulse">LIVE NOW</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {schedule.map((item, idx) => (
          <div 
            key={idx}
            onClick={() => triggerToast(`Scheduled: ${item.event} at ${item.time}`, 'info')}
            className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              item.active 
                ? 'bg-emerald-50/80 border-emerald-300 text-slate-900 shadow-sm' 
                : 'bg-slate-50/60 border-slate-100 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-bold ${item.active ? 'text-emerald-700' : 'text-slate-400'}`}>{item.time}</span>
                {item.active && <Badge variant="accent" className="text-[7px] py-0 px-1 font-bold">Ongoing</Badge>}
              </div>
              <h4 className="text-xs font-extrabold">{item.event}</h4>
              <span className="text-[8.5px] font-medium text-slate-400">📍 {item.location}</span>
            </div>
            <AnimatedIcon name="play" size={14} className={item.active ? 'text-primary' : 'text-slate-300'} />
          </div>
        ))}
      </div>
    </Card>
  );
};

// ----------------------------------------------------
// 4. DAILY ISLAMIC CHALLENGES
// ----------------------------------------------------
export const DailyIslamicChallenges: React.FC<{ triggerToast: SuperAppModulesProps['triggerToast'] }> = ({ triggerToast }) => {
  const [completed, setCompleted] = useState<number[]>([0]);

  const challenges = [
    { title: "Recite Surah Yaseen", points: "+50 Barakah", desc: "Recite Surah Yaseen after morning prayers" },
    { title: "Complete 100 Salawat", points: "+30 Barakah", desc: "Send blessings upon Prophet Muhammad & Ahlulbayt" },
    { title: "Listen to 15-min Sermon", points: "+40 Barakah", desc: "Watch Aga Syed Hassan's latest discourse" },
    { title: "Help a Community Member", points: "+60 Barakah", desc: "Participate in local relief or volunteer circle" }
  ];

  const toggleChallenge = (idx: number) => {
    if (completed.includes(idx)) {
      setCompleted(completed.filter(i => i !== idx));
      triggerToast(`Task unmarked`, 'info');
    } else {
      setCompleted([...completed, idx]);
      triggerToast(`Challenge completed! ${challenges[idx].points}`, 'success');
    }
  };

  return (
    <Card className="p-4 bg-white border border-slate-100 shadow-soft select-none flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] font-extrabold text-accent-dark uppercase tracking-widest">Spiritual Habit Builder</span>
          <h3 className="text-sm font-black text-slate-800">Daily Islamic Challenges</h3>
        </div>
        <span className="text-[9px] font-black text-primary bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
          {completed.length}/{challenges.length} Completed
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {challenges.map((c, idx) => {
          const isDone = completed.includes(idx);
          return (
            <div 
              key={idx}
              onClick={() => toggleChallenge(idx)}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                isDone 
                  ? 'bg-emerald-50 border-emerald-200 text-slate-700' 
                  : 'bg-white border-slate-100 text-slate-800 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  isDone ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {isDone ? '✓' : idx + 1}
                </div>
                <div className="flex flex-col">
                  <h4 className={`text-xs font-extrabold ${isDone ? 'line-through text-slate-400' : 'text-slate-800'}`}>{c.title}</h4>
                  <span className="text-[8.5px] font-medium text-slate-400">{c.desc}</span>
                </div>
              </div>
              <Badge variant={isDone ? 'accent' : 'neutral'} className="text-[8px] py-0.5 px-1.5 font-extrabold">
                {c.points}
              </Badge>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

// ----------------------------------------------------
// 5. ASK THE SCHOLAR (AI-Style Mock Interface)
// ----------------------------------------------------
export const AskTheScholarAI: React.FC<{ triggerToast: SuperAppModulesProps['triggerToast'] }> = ({ triggerToast }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'scholar', text: string }[]>([
    { sender: 'scholar', text: 'Salam Alaykum! I am the Anjuman Scholar Assistant. Ask any question regarding Shia Fiqh, Prayer Rules, Fasting, or Islamic History.' }
  ]);

  const suggestedQuestions = [
    "What are the recommended acts on the Day of Arbaeen?",
    "Rules for combining prayers during travel?",
    "How to calculate Khums on savings?"
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || query;
    if (!text.trim()) return;

    const newMsgs = [...messages, { sender: 'user' as const, text }];
    setMessages(newMsgs);
    setQuery('');

    // Mock Scholar AI response
    setTimeout(() => {
      setMessages([
        ...newMsgs,
        {
          sender: 'scholar',
          text: `According to Shia Jurisprudence (Fiqh), for "${text}": It is recommended to perform Ghusl, recite Ziyarat Arbaeen, and offer two Rakat prayers. For specific rulings, consult our Central Fatwa Board.`
        }
      ]);
      triggerToast('Scholar Fatwa Board answer generated', 'success');
    }, 800);
  };

  return (
    <Card className="p-4 bg-white border border-slate-100 shadow-soft select-none flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-800 to-emerald-950 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            ☪️
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Shia Fiqh Advisory</span>
            <h3 className="text-sm font-black text-slate-800">Ask the Scholar (AI Assistant)</h3>
          </div>
        </div>
        <Badge variant="accent" className="text-[8px] uppercase font-bold py-0.5 px-2">Instant Fiqh</Badge>
      </div>

      {/* Suggested Questions */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[9px] font-bold shrink-0 border border-emerald-200/50 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="bg-slate-50/80 rounded-2xl p-3 max-h-48 overflow-y-auto flex flex-col gap-2 border border-slate-100">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`p-2.5 rounded-2xl text-xs max-w-[85%] font-medium leading-relaxed ${
              m.sender === 'user' 
                ? 'bg-primary text-white rounded-br-none shadow-sm' 
                : 'bg-white text-slate-800 rounded-bl-none border border-slate-100 shadow-soft'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder="Ask a Fiqh question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-slate-50 text-slate-800 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:bg-white focus:border-primary font-medium"
        />
        <Button size="sm" onClick={() => handleSend()}>
          Send
        </Button>
      </div>
    </Card>
  );
};

// ----------------------------------------------------
// 6. SHORT VIDEO FEED (Reels Style Clips)
// ----------------------------------------------------
export const ShortVideoFeed: React.FC<{ triggerToast: SuperAppModulesProps['triggerToast'] }> = ({ triggerToast }) => {
  const shorts = [
    { title: "3 Keys to Spiritual Peace", speaker: "Aga Syed Hassan", views: "24.5K", thumb: "/arbaeen_walk.jpg" },
    { title: "Importance of Arbaeen Ziyarat", speaker: "Aga Syed Arshad", views: "19.2K", thumb: "/mourning_shrine.jpg" },
    { title: "Youth Ethics in Digital Era", speaker: "Aga Syed Mujtaba", views: "15.8K", thumb: "/kashmir_majlis.jpg" }
  ];

  return (
    <div className="flex flex-col gap-2 select-none">
      <div className="flex justify-between items-center px-0.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hussaini Shorts</span>
        <span className="text-[9.5px] font-extrabold text-primary cursor-pointer" onClick={() => triggerToast("Opening full shorts feed...", "info")}>
          View All Clips →
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar py-0.5">
        {shorts.map((s, idx) => (
          <div 
            key={idx}
            onClick={() => triggerToast(`Playing clip: ${s.title}`, 'success')}
            className="w-32 h-48 rounded-2xl overflow-hidden relative group cursor-pointer shrink-0 border border-slate-100 shadow-md bg-slate-950"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.thumb} alt={s.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-2.5 flex flex-col justify-between">
              <div className="flex justify-end">
                <span className="bg-black/60 backdrop-blur-md text-white text-[7.5px] font-extrabold px-1.5 py-0.5 rounded-full border border-white/20">
                  ▶ {s.views}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-[10px] font-extrabold text-white leading-tight line-clamp-2">{s.title}</h4>
                <span className="text-[8px] text-emerald-200 font-medium truncate">{s.speaker}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
