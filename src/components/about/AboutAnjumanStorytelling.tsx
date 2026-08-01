"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AnimatedIcon } from '@/components/ui/icons';

interface AboutProps {
  triggerToast: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  openAuthDialog?: () => void;
  isGuest?: boolean;
}

export const AboutAnjumanStorytelling: React.FC<AboutProps> = ({ triggerToast, openAuthDialog, isGuest }) => {
  const [activeMilestone, setActiveMilestone] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'story' | 'values' | 'departments' | 'impact' | 'roadmap'>('story');

  const values = [
    { title: "Faith (Iman)", icon: "open-quran", desc: "Unwavering commitment to Islamic teachings & Ahlulbayt jurisprudence." },
    { title: "Knowledge (Ilm)", icon: "rehal", desc: "Spreading Quranic education & high-level Hawza academic research." },
    { title: "Unity (Wahdah)", icon: "mosque", desc: "Promoting Islamic brotherhood & social harmony across communities." },
    { title: "Service (Khadam)", icon: "shield-check", desc: "Selfless volunteerism & emergency relief for underprivileged families." },
    { title: "Compassion (Rahmah)", icon: "sparkles", desc: "Supporting orphans, widows, students, and patients with dignity." },
    { title: "Integrity (Amanah)", icon: "crypto-node", desc: "Transparent organizational governance & financial accountability." }
  ];

  const milestones = [
    { year: "1918", title: "Historic Foundation", detail: "Ayatullah Aga Syed Yusuf Al-Moosavi established Anjuman-e-Sharie Shian to preserve Shia heritage, Islamic jurisprudence, and social welfare in Jammu & Kashmir." },
    { year: "1947", title: "Central Imambara Budgam", detail: "Construction of the iconic Central Imambara Budgam, serving as the central venue for Friday prayers, Ashura processions, and major religious assemblies." },
    { year: "1975", title: "Regional Maktab Expansion", detail: "Standardized rural religious education, establishing 150+ village Maktabs providing Quranic and ethical studies to thousands of youth." },
    { year: "2002", title: "Central Fatwa & Fiqh Board", detail: "Formalization of the Central Jurisprudential Council for answering daily religious queries and preserving Shariat laws." },
    { year: "2024", title: "Digital Super App Era", detail: "Pioneering the digital transformation with online Maktab portals, 3D holographic digital IDs, live broadcasts, and scholar directories." },
    { year: "2028", title: "Global Digital Ecosystem", detail: "Future roadmap including AI Fatwa assistants, smart Maktab IoT classrooms, and international pilgrimage assistance." }
  ];

  const departments = [
    { name: "Education & Maktab Board", desc: "Manages 150+ Maktab centers, curriculum design & annual examinations.", icon: "rehal" },
    { name: "Media & Broadcasting Wing", desc: "Operates Sawt al-Anjuman radio, live HD YouTube streams & video archives.", icon: "play" },
    { name: "Research & Publications", desc: "Publishes Hawza research papers, monthly periodicals & Shia Fiqh books.", icon: "open-quran" },
    { name: "Youth & Sports Council", desc: "Organizes youth ethics circles, leadership camps & community volunteer drives.", icon: "sparkles" },
    { name: "Women's Welfare Wing", desc: "Spearheads women's Islamic lectures, skill workshops & family counseling.", icon: "user" },
    { name: "Relief & Healthcare Board", desc: "Runs emergency blood donation banks, medical camps & orphan education funds.", icon: "shield-check" }
  ];

  const impactStats = [
    { label: "Active Members", val: "100K+", desc: "Registered community members across J&K" },
    { label: "Active Volunteers", val: "2,500+", desc: "Husseini Guard security & relief volunteers" },
    { label: "Maktab Students", val: "4,500+", desc: "Enrolled in daily Quran & Aqaid classes" },
    { label: "Scholarships Granted", val: "1,200+", desc: "Funded higher education for needy students" }
  ];

  return (
    <div className="flex flex-col gap-5 select-none w-full pb-6">
      
      {/* 1. PREMIUM HERO SECTION */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-6 shadow-xl border border-emerald-900/40">
        {/* Geometric Star Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="aboutStarPatt" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 20,0 L 40,20 L 20,40 L 0,20 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#aboutStarPatt)" />
          </svg>
        </div>

        <div className="flex flex-col items-center text-center relative z-10">
          {/* Logo Seal */}
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 p-1 mb-3 flex items-center justify-center shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Anjuman Seal" className="w-12 h-12 object-contain" />
          </div>

          <Badge variant="accent" className="text-[8.5px] uppercase font-black tracking-widest py-0.5 px-2.5 mb-2 bg-accent text-slate-950 border-none">
            Est. 1918 • 106 Years of Service
          </Badge>

          <h1 className="text-xl font-extrabold text-white tracking-wide font-sans leading-tight">
            Anjuman-e-Sharie Shian
          </h1>

          <p className="text-xs text-amber-300 font-serif font-bold mt-1" dir="rtl">
            انجمن شرعی شیعیان جموں و کشمیر
          </p>

          <p className="text-[11px] text-emerald-100/90 font-medium leading-relaxed max-w-[320px] mt-2">
            Serving Faith, Education, Community Welfare & Spiritual Enlightenment across Jammu & Kashmir for over a century.
          </p>

          <div className="flex gap-2.5 mt-4">
            <Button 
              size="sm" 
              variant="accent" 
              onClick={() => {
                const el = document.getElementById('aboutStorySection');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[9.5px] font-black uppercase tracking-wider px-4"
            >
              Explore Our Journey
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => triggerToast("Connecting to Anjuman Central Secretariat...", "info")}
              className="text-[9.5px] font-bold uppercase tracking-wider text-white border-white/20 hover:bg-white/10"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      {/* 2. MISSION & VISION SPLIT CARDS */}
      <div className="grid grid-cols-2 gap-3.5">
        <Card className="p-4 bg-white border border-slate-100 shadow-soft flex flex-col gap-2 relative overflow-hidden">
          <div className="flex items-center gap-2">
            <AnimatedIcon name="open-quran" size={18} className="text-primary" />
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Our Mission</h3>
          </div>
          <p className="text-[10px] text-slate-600 font-medium leading-relaxed">
            To preserve and propagate authentic Islamic jurisprudence, foster Quranic education through Maktabs, and provide relief to orphans, students, and families in need.
          </p>
        </Card>

        <Card className="p-4 bg-white border border-slate-100 shadow-soft flex flex-col gap-2 relative overflow-hidden">
          <div className="flex items-center gap-2">
            <AnimatedIcon name="sparkles" size={18} className="text-accent" />
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Our Vision</h3>
          </div>
          <p className="text-[10px] text-slate-600 font-medium leading-relaxed">
            To build a unified, educated, and ethically empowered community grounded in the teachings of the Holy Prophet (PBUH) and Ahlulbayt (A.S).
          </p>
        </Card>
      </div>

      {/* 3. INTERACTIVE STORY & TIMELINE NAVIGATION */}
      <div id="aboutStorySection" className="flex flex-col gap-3">
        <div className="flex justify-between items-center px-0.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Heritage & Historical Milestones</span>
          <span className="text-[9px] font-bold text-primary">1918 — Present</span>
        </div>

        {/* Horizontal Timeline Scroll */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
          {milestones.map((m, idx) => (
            <Card 
              key={idx}
              onClick={() => setActiveMilestone(idx)}
              className={`p-3.5 shrink-0 w-44 cursor-pointer transition-all flex flex-col justify-between h-28 border ${
                activeMilestone === idx 
                  ? 'bg-gradient-to-br from-emerald-950 to-slate-900 text-white border-accent shadow-md scale-105' 
                  : 'bg-white text-slate-800 border-slate-100 hover:border-emerald-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                  activeMilestone === idx ? 'bg-accent text-slate-950 font-black' : 'bg-slate-100 text-slate-600'
                }`}>
                  {m.year}
                </span>
                {activeMilestone === idx && <AnimatedIcon name="sparkles" size={12} className="text-accent" />}
              </div>
              <div className="flex flex-col">
                <h4 className="text-xs font-extrabold leading-tight line-clamp-2">{m.title}</h4>
              </div>
            </Card>
          ))}
        </div>

        {/* Selected Milestone Detail Card */}
        {activeMilestone !== null && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={activeMilestone}>
            <Card className="p-4 bg-emerald-50/80 border border-emerald-200/60 shadow-soft flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="accent" className="text-[8px] uppercase font-bold py-0.5 px-2">
                  {milestones[activeMilestone].year} Milestone Detail
                </Badge>
                <h4 className="text-xs font-black text-slate-900">{milestones[activeMilestone].title}</h4>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {milestones[activeMilestone].detail}
              </p>
            </Card>
          </motion.div>
        )}
      </div>

      {/* 4. OUR CORE VALUES */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Pillars of Our Foundation</span>
        <div className="grid grid-cols-2 gap-3">
          {values.map((v, idx) => (
            <Card key={idx} className="p-3.5 bg-white border border-slate-100 shadow-soft flex flex-col gap-1.5 hover:border-emerald-200 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-50 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                  <AnimatedIcon name={v.icon as any} size={14} />
                </div>
                <h4 className="text-xs font-extrabold text-slate-800">{v.title}</h4>
              </div>
              <p className="text-[9.5px] text-slate-500 font-medium leading-relaxed">{v.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* 5. ORGANIZATIONAL DEPARTMENTS */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Departments & Wings</span>
        <div className="grid grid-cols-2 gap-3">
          {departments.map((d, idx) => (
            <Card 
              key={idx}
              onClick={() => triggerToast(`Exploring ${d.name}...`, 'info')}
              className="p-3.5 bg-slate-50/80 border border-slate-100 shadow-soft flex flex-col gap-1 cursor-pointer hover:bg-white hover:border-emerald-200 transition-all group"
            >
              <div className="flex items-center gap-2">
                <AnimatedIcon name={d.icon as any} size={14} className="text-primary group-hover:text-accent transition-colors" />
                <h4 className="text-[10.5px] font-black text-slate-900 leading-tight group-hover:text-primary transition-colors">{d.name}</h4>
              </div>
              <p className="text-[9px] text-slate-500 font-medium leading-snug line-clamp-2 mt-0.5">{d.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* 6. PLATFORM IMPACT STATS */}
      <Card className="p-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white border border-emerald-900/40 shadow-soft flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[8.5px] text-accent font-extrabold uppercase tracking-wider">Quantifiable Service</span>
            <h3 className="text-sm font-black text-white">Our Community Impact</h3>
          </div>
          <AnimatedIcon name="crypto-node" size={20} className="text-accent" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {impactStats.map((st, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-0.5">
              <span className="text-base font-black text-accent">{st.val}</span>
              <span className="text-[10px] font-bold text-white leading-tight">{st.label}</span>
              <span className="text-[8px] text-emerald-200/70 font-medium leading-tight">{st.desc}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 7. FOOTER CONTACT & HEADQUARTERS */}
      <Card className="p-4 bg-white border border-slate-100 shadow-soft flex flex-col gap-3">
        <span className="text-[9.5px] font-extrabold text-slate-400 uppercase tracking-widest">Central Secretariat</span>
        <div className="flex flex-col gap-1.5 text-xs text-slate-700 font-medium">
          <div><span className="font-bold text-slate-900">Address:</span> Central Imambara Complex, Budgam, Jammu & Kashmir</div>
          <div><span className="font-bold text-slate-900">Email:</span> contact@anjumansharieshian.org</div>
          <div><span className="font-bold text-slate-900">Helpline:</span> +91 1951-255XXX</div>
          <div><span className="font-bold text-slate-900">Office Hours:</span> Saturday – Thursday (9:00 AM – 5:00 PM)</div>
        </div>

        <div className="flex gap-2 mt-2 pt-2 border-t border-slate-100">
          <Button 
            size="sm" 
            className="w-full"
            onClick={() => {
              if (isGuest && openAuthDialog) {
                openAuthDialog();
              } else {
                triggerToast("Opening Membership Application Form...", "success");
              }
            }}
          >
            Become a Member
          </Button>
        </div>
      </Card>

    </div>
  );
};
