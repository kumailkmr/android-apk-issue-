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

// 1. ORGANIZATION STRUCTURE
export const OrganizationHierarchy: React.FC<ExtensionProps> = ({ triggerToast }) => {
  const [selectedNode, setSelectedNode] = useState<string>('presidency');

  const hierarchy = [
    { id: 'presidency', title: 'Presidency', role: 'Aga Syed Hassan Al-Moosavi Al-Safavi', desc: 'Central Leadership & Theological Authority since 2002', tenure: '22+ Years' },
    { id: 'vice_presidency', title: 'Vice Presidency', role: 'Aga Syed Mujtaba Al-Moosavi', desc: 'Administrative Coordination & Educational Affairs', tenure: '18+ Years' },
    { id: 'sec_gen', title: 'General Secretariat', role: 'Syed Ashraf', desc: 'Organizational Execution & Communications', tenure: '14+ Years' },
    { id: 'exec_comm', title: 'Executive Council', role: 'Central Board of 24 Scholars', desc: 'Policy formulation and quarterly administrative reviews', tenure: 'Standing' },
    { id: 'dept_heads', title: 'Department Heads', role: '10 Specialized Wings', desc: 'Education, Media, Research, Relief, Youth, Women', tenure: 'Active' },
    { id: 'district_units', title: 'District Committees', role: '12 J&K District Bodies', desc: 'Budgam, Srinagar, Baramulla, Anantnag, Pulwama, Kargil', tenure: 'Regional' }
  ];

  return (
    <Card className="p-5 bg-white border border-slate-100 shadow-soft flex flex-col gap-3.5 select-none">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[8.5px] text-primary font-bold uppercase tracking-wider">Governance</span>
          <h3 className="text-sm font-black text-slate-800">Organization Hierarchy</h3>
        </div>
        <AnimatedIcon name="crypto-node" size={18} className="text-primary" />
      </div>

      {/* Hierarchy Selector Tree Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {hierarchy.map((node) => (
          <button
            key={node.id}
            onClick={() => setSelectedNode(node.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
              selectedNode === node.id 
                ? 'bg-primary text-white shadow-md font-black' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {node.title}
          </button>
        ))}
      </div>

      {/* Selected Node Details Card */}
      {hierarchy.find(n => n.id === selectedNode) && (
        <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-black text-slate-900">{hierarchy.find(n => n.id === selectedNode)?.role}</h4>
            <Badge variant="accent" className="text-[8px] uppercase py-0.5 px-2">{hierarchy.find(n => n.id === selectedNode)?.tenure}</Badge>
          </div>
          <p className="text-[10.5px] text-slate-600 font-medium leading-relaxed">
            {hierarchy.find(n => n.id === selectedNode)?.desc}
          </p>
          <Button size="sm" variant="outline" className="text-[9px] font-extrabold uppercase mt-1 w-fit" onClick={() => triggerToast(`Viewing ${hierarchy.find(n => n.id === selectedNode)?.title} profile...`, 'info')}>
            View Full Profile
          </Button>
        </div>
      )}
    </Card>
  );
};

// 2. DIGITAL ANNUAL REPORT
export const DigitalAnnualReport: React.FC<ExtensionProps> = ({ triggerToast }) => {
  return (
    <Card className="p-5 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white border border-emerald-900/40 shadow-soft flex flex-col gap-4 select-none">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <Badge variant="accent" className="text-[8px] uppercase tracking-widest py-0.5 px-2 mb-1 w-fit bg-accent text-slate-950">
            2025 – 2026 Audit
          </Badge>
          <h3 className="text-sm font-black text-white">Digital Annual Report</h3>
        </div>
        <AnimatedIcon name="open-quran" size={20} className="text-amber-300" />
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-0.5">
          <span className="text-base font-black text-amber-300">150+</span>
          <span className="text-[10px] font-bold text-white">Maktab Centers</span>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-0.5">
          <span className="text-base font-black text-emerald-400">4,500+</span>
          <span className="text-[10px] font-bold text-white">Enrolled Students</span>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-0.5">
          <span className="text-base font-black text-amber-300">1,200+</span>
          <span className="text-[10px] font-bold text-white">Scholarships</span>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-0.5">
          <span className="text-base font-black text-emerald-400">2.5M+</span>
          <span className="text-[10px] font-bold text-white">Broadcast Reach</span>
        </div>
      </div>

      <Button size="sm" variant="accent" onClick={() => triggerToast("Downloading 2025-2026 Anjuman Annual Report PDF (~12.4 MB)...", "success")} className="text-[9.5px] font-black uppercase tracking-wider w-full">
        📄 Download Annual Report PDF
      </Button>
    </Card>
  );
};

// 3. DIGITAL VISION ROADMAP
export const DigitalVisionRoadmap: React.FC<ExtensionProps> = ({ triggerToast }) => {
  const roadmap = [
    { year: 'Q3 2026', title: 'AI Scholar & Fatwa Assistant', desc: 'Instant Islamic jurisprudence answers trained on authentic Shia Fiqh.' },
    { year: 'Q4 2026', title: 'Smart Maktab IoT Classrooms', desc: 'RFID digital attendance, live parent progress feeds, and interactive Quran tablets.' },
    { year: 'Q1 2027', title: 'Global Digital Library & Archive', desc: 'Digitized rare Kashmiri Islamic manuscripts, Hawza research, and audio recordings.' }
  ];

  return (
    <Card className="p-5 bg-white border border-slate-100 shadow-soft flex flex-col gap-3.5 select-none">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[8.5px] text-accent font-black uppercase tracking-wider">Technology Roadmap</span>
          <h3 className="text-sm font-black text-slate-800">Digital Transformation Vision</h3>
        </div>
        <AnimatedIcon name="sparkles" size={18} className="text-accent" />
      </div>

      <div className="flex flex-col gap-3">
        {roadmap.map((item, idx) => (
          <div key={idx} className="flex gap-3 items-start border-l-2 border-emerald-500 pl-3 py-0.5">
            <div className="flex flex-col">
              <span className="text-[9px] font-extrabold text-primary uppercase">{item.year}</span>
              <h4 className="text-xs font-black text-slate-900 leading-tight">{item.title}</h4>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// 4. ISLAMIC KNOWLEDGE HUB (ENCYCLOPEDIA)
export const IslamicKnowledgeHub: React.FC<ExtensionProps> = ({ triggerToast }) => {
  const categories = [
    { name: 'Prophets (A.S)', count: '25 Articles', icon: 'open-quran' },
    { name: 'Ahlul Bayt (A.S)', count: '14 Infallibles', icon: 'mosque' },
    { name: 'Companions', count: '40+ Biographies', icon: 'user' },
    { name: 'Islamic Terms', count: '500+ Definitions', icon: 'book' }
  ];

  return (
    <Card className="p-5 bg-white border border-slate-100 shadow-soft flex flex-col gap-3.5 select-none">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[8.5px] text-slate-400 font-bold uppercase tracking-wider">Encyclopedia</span>
          <h3 className="text-sm font-black text-slate-800">Islamic Knowledge Hub</h3>
        </div>
        <AnimatedIcon name="book" size={18} className="text-primary" />
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {categories.map((c, i) => (
          <div key={i} onClick={() => triggerToast(`Opening ${c.name} Encyclopedia...`, 'info')} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors cursor-pointer flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <AnimatedIcon name={c.icon as any} size={14} className="text-primary" />
              <h4 className="text-[11px] font-black text-slate-800 leading-tight">{c.name}</h4>
            </div>
            <span className="text-[8.5px] text-slate-400 font-bold">{c.count}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

// 5. AHLUL BAYT KNOWLEDGE CENTER
export const AhlulBaytKnowledgeCenter: React.FC<ExtensionProps> = ({ triggerToast }) => {
  const infallibles = [
    { name: 'Holy Prophet Muhammad (PBUH)', era: '570 - 632 CE', title: 'Seal of the Prophets' },
    { name: 'Imam Ali ibn Abi Talib (A.S)', era: '600 - 661 CE', title: 'Amir al-Mu\'minin' },
    { name: 'Bibi Fatima al-Zahra (S.A)', era: '605 - 632 CE', title: 'Sayyidat Nisa al-Alamin' },
    { name: 'Imam Hussain ibn Ali (A.S)', era: '626 - 680 CE', title: 'Sayyid al-Shuhada' }
  ];

  return (
    <Card className="p-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white border border-emerald-900/40 shadow-soft flex flex-col gap-3.5 select-none">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[8.5px] text-accent font-black uppercase tracking-wider">The 14 Infallibles</span>
          <h3 className="text-sm font-black text-white">Ahlul Bayt (A.S) Knowledge Center</h3>
        </div>
        <AnimatedIcon name="karbala" size={20} className="text-accent" />
      </div>

      <div className="flex flex-col gap-2">
        {infallibles.map((item, idx) => (
          <div key={idx} onClick={() => triggerToast(`Opening Biography of ${item.name}...`, 'info')} className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer flex justify-between items-center">
            <div className="flex flex-col">
              <h4 className="text-xs font-black text-white">{item.name}</h4>
              <span className="text-[9px] text-emerald-300 font-medium">{item.title} • {item.era}</span>
            </div>
            <span className="text-xs text-accent">→</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

// 6. ISLAMIC HISTORY TIMELINE
export const IslamicHistoryTimeline: React.FC<ExtensionProps> = ({ triggerToast }) => {
  const events = [
    { year: '1 AH (622 CE)', title: 'The Hijrah to Medina', desc: 'Establishment of the first Islamic state.' },
    { year: '10 AH (632 CE)', title: 'Event of Ghadir Khumm', desc: 'Declaration of Imam Ali\'s wilayat by the Holy Prophet (PBUH).' },
    { year: '61 AH (680 CE)', title: 'Event of Karbala (Ashura)', desc: 'Supreme martyrdom of Imam Hussain (A.S) and 72 loyal companions.' }
  ];

  return (
    <Card className="p-5 bg-white border border-slate-100 shadow-soft flex flex-col gap-3.5 select-none">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[8.5px] text-slate-400 font-bold uppercase tracking-wider">Chronology</span>
          <h3 className="text-sm font-black text-slate-800">Islamic History Timeline</h3>
        </div>
        <AnimatedIcon name="islamic-calendar" size={18} className="text-primary" />
      </div>

      <div className="flex flex-col gap-3">
        {events.map((e, idx) => (
          <div key={idx} className="flex gap-3 items-start border-l-2 border-accent pl-3 py-0.5">
            <div className="flex flex-col">
              <span className="text-[9px] font-extrabold text-accent uppercase">{e.year}</span>
              <h4 className="text-xs font-black text-slate-900 leading-tight">{e.title}</h4>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// 7. SMART LEARNING DASHBOARD
export const SmartLearningDashboard: React.FC<ExtensionProps> = ({ triggerToast }) => {
  return (
    <Card className="p-5 bg-white border border-slate-100 shadow-soft flex flex-col gap-4 select-none">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[8.5px] text-primary font-bold uppercase tracking-wider">Personal Progress</span>
          <h3 className="text-sm font-black text-slate-800">Smart Learning Dashboard</h3>
        </div>
        <AnimatedIcon name="rehal" size={18} className="text-primary" />
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col items-center">
          <span className="text-base font-black text-primary">24.5h</span>
          <span className="text-[8.5px] font-bold text-slate-600">Reading Time</span>
        </div>
        <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-100 flex flex-col items-center">
          <span className="text-base font-black text-amber-700">8</span>
          <span className="text-[8.5px] font-bold text-slate-600">Books Finished</span>
        </div>
        <div className="p-2.5 rounded-2xl bg-blue-50 border border-blue-100 flex flex-col items-center">
          <span className="text-base font-black text-blue-700">3</span>
          <span className="text-[8.5px] font-bold text-slate-600">Certificates</span>
        </div>
      </div>
    </Card>
  );
};

// 8. STUDY PLANNER
export const StudyPlanner: React.FC<ExtensionProps> = ({ triggerToast }) => {
  return (
    <Card className="p-5 bg-slate-50/80 border border-slate-100 shadow-soft flex flex-col gap-3 select-none">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[8.5px] text-slate-400 font-bold uppercase tracking-wider">Schedule</span>
          <h3 className="text-sm font-black text-slate-800">Islamic Study Planner</h3>
        </div>
        <Button size="sm" variant="accent" className="text-[8.5px] py-1 px-2.5" onClick={() => triggerToast("Added new study task to planner", "success")}>+ Add Task</Button>
      </div>

      <div className="flex flex-col gap-2">
        <div className="p-2.5 rounded-xl bg-white border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded text-primary focus:ring-0" />
            <span className="text-xs font-bold text-slate-700 line-through">Read Surah Yaseen after Fajr</span>
          </div>
          <Badge variant="accent" className="text-[7.5px] py-0.5">Completed</Badge>
        </div>
        <div className="p-2.5 rounded-xl bg-white border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded text-primary focus:ring-0" />
            <span className="text-xs font-bold text-slate-800">Watch Lecture: Fiqh of Fasting (30 mins)</span>
          </div>
          <Badge variant="neutral" className="text-[7.5px] py-0.5">Pending</Badge>
        </div>
      </div>
    </Card>
  );
};
