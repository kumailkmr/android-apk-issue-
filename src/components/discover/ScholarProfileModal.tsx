"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scholar } from '@/data/mockScholarsData';
import { AnimatedIcon } from '@/components/ui/icons';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ScholarProfileModalProps {
  scholar: Scholar | null;
  onClose: () => void;
  triggerToast: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
}

export const ScholarProfileModal: React.FC<ScholarProfileModalProps> = ({
  scholar,
  onClose,
  triggerToast
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'lectures' | 'books' | 'articles' | 'research'>('about');
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!scholar) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      triggerToast(`Scholar profile link copied for ${scholar.name}`, 'success');
    } else {
      triggerToast(`Sharing ${scholar.name}'s profile...`, 'info');
    }
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    triggerToast(
      !isBookmarked ? `Saved ${scholar.name} to bookmarked scholars` : `Removed ${scholar.name} from bookmarks`,
      !isBookmarked ? 'success' : 'info'
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/60 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="bg-white w-full max-w-md mx-auto h-full flex flex-col shadow-2xl overflow-hidden"
        >
          {/* Top Bar Navigation */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white z-10 shrink-0">
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-full transition-colors"
            >
              <AnimatedIcon name="arrow-left" size={20} />
            </button>

            <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Scholar Profile</span>

            <div className="flex items-center gap-1">
              <button 
                onClick={handleBookmarkToggle}
                className="p-2 text-slate-500 hover:text-accent rounded-full transition-colors"
              >
                <AnimatedIcon name="bookmark" size={18} animation={isBookmarked ? 'pulse' : 'scale'} className={isBookmarked ? 'text-accent' : ''} />
              </button>
              <button 
                onClick={handleShare}
                className="p-2 text-slate-500 hover:text-primary rounded-full transition-colors"
              >
                <AnimatedIcon name="sparkles" size={18} animation="scale" />
              </button>
            </div>
          </div>

          {/* Profile Header Hero */}
          <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white p-5 flex flex-col items-center text-center relative overflow-hidden shrink-0">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
              <svg width="100%" height="100%">
                <pattern id="scholarHeaderPatt" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 15,0 L 30,15 L 15,30 L 0,15 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#scholarHeaderPatt)" />
              </svg>
            </div>

            {/* Profile Avatar Frame */}
            <div className="relative mb-3">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent p-0.5 shadow-xl bg-slate-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={scholar.photoUrl} 
                  alt={scholar.name} 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
              {scholar.isVerified && (
                <div className="absolute bottom-0 right-0 bg-accent text-slate-950 p-1 rounded-full border-2 border-emerald-900 shadow-md">
                  <AnimatedIcon name="shield-check" size={14} />
                </div>
              )}
            </div>

            <h2 className="text-base font-extrabold text-white tracking-wide">{scholar.name}</h2>
            <span className="text-xs font-serif text-amber-300/90 mt-0.5" dir="rtl">{scholar.nameUrdu}</span>
            <p className="text-[10px] text-emerald-200/90 font-semibold mt-1 max-w-[260px] leading-tight">{scholar.position}</p>

            {/* Quick Badges */}
            <div className="flex gap-2 mt-3 flex-wrap justify-center">
              <Badge variant="accent" className="text-[8px] uppercase tracking-wider py-0.5 px-2 bg-accent text-slate-950 border-none font-bold">
                {scholar.category}
              </Badge>
              <span className="text-[8px] font-bold text-emerald-100 bg-white/10 px-2 py-0.5 rounded-full border border-white/15">
                {scholar.yearsOfService} Years Service
              </span>
              <span className="text-[8px] font-bold text-emerald-100 bg-white/10 px-2 py-0.5 rounded-full border border-white/15">
                📍 {scholar.location}
              </span>
            </div>
          </div>

          {/* Profile Tabs Navigation */}
          <div className="flex border-b border-slate-100 bg-slate-50/80 px-2 shrink-0 overflow-x-auto no-scrollbar">
            {[
              { id: 'about', label: 'About' },
              { id: 'lectures', label: `Lectures (${scholar.lectures.length})` },
              { id: 'books', label: `Books (${scholar.books.length})` },
              { id: 'articles', label: `Articles (${scholar.articles.length})` },
              { id: 'research', label: 'Research' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2.5 px-3 text-xs font-bold shrink-0 transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary font-black'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Scrolling Body */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {activeTab === 'about' && (
              <>
                <Card className="p-4 bg-white border border-slate-100 shadow-soft flex flex-col gap-2">
                  <span className="text-[9.5px] font-extrabold text-slate-400 uppercase tracking-widest">Biography</span>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">{scholar.bio}</p>
                </Card>

                <Card className="p-4 bg-white border border-slate-100 shadow-soft flex flex-col gap-2">
                  <span className="text-[9.5px] font-extrabold text-slate-400 uppercase tracking-widest">Education & Hawza Degrees</span>
                  <ul className="flex flex-col gap-1.5 mt-1">
                    {scholar.education.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <span className="text-primary font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-4 bg-white border border-slate-100 shadow-soft flex flex-col gap-2">
                  <span className="text-[9.5px] font-extrabold text-slate-400 uppercase tracking-widest">Specializations & Department</span>
                  <div className="flex flex-col gap-1 text-xs font-medium text-slate-700 mt-1">
                    <div><span className="font-bold text-slate-900">Department:</span> {scholar.department}</div>
                    <div><span className="font-bold text-slate-900">Specialization:</span> {scholar.specialization}</div>
                    <div><span className="font-bold text-slate-900">Languages Spoken:</span> {scholar.languages.join(", ")}</div>
                  </div>
                </Card>
              </>
            )}

            {activeTab === 'lectures' && (
              <div className="flex flex-col gap-3">
                <span className="text-[9.5px] font-extrabold text-slate-400 uppercase tracking-widest">Lectures & Sermons ({scholar.lectures.length})</span>
                {scholar.lectures.map((lec) => (
                  <Card 
                    key={lec.id} 
                    onClick={() => triggerToast(`Playing lecture: ${lec.title}...`, 'success')}
                    className="p-3.5 bg-white border border-slate-100 shadow-soft flex items-center justify-between cursor-pointer hover:border-emerald-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                        <AnimatedIcon name="play" size={16} />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-xs font-bold text-slate-800 leading-tight">{lec.title}</h4>
                        <div className="flex gap-2 text-[9px] text-slate-400 font-semibold mt-0.5">
                          <span>{lec.category}</span>
                          <span>•</span>
                          <span>{lec.duration}</span>
                          <span>•</span>
                          <span>{lec.views} views</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'books' && (
              <div className="flex flex-col gap-3">
                <span className="text-[9.5px] font-extrabold text-slate-400 uppercase tracking-widest">Authored Books & Compendiums ({scholar.books.length})</span>
                {scholar.books.map((bk) => (
                  <Card 
                    key={bk.id}
                    onClick={() => triggerToast(`Opening book: ${bk.title}...`, 'success')}
                    className="p-3.5 bg-white border border-slate-100 shadow-soft flex items-center justify-between cursor-pointer hover:border-emerald-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 rounded-lg bg-gradient-to-br from-emerald-800 to-emerald-950 text-white flex items-center justify-center font-serif text-sm font-bold shadow-sm shrink-0">
                        📖
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-xs font-bold text-slate-800 leading-tight">{bk.title}</h4>
                        <span className="text-[9px] text-accent font-semibold mt-0.5">{bk.category} • Published {bk.year}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-[9px]">Read</Button>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'articles' && (
              <div className="flex flex-col gap-3">
                <span className="text-[9.5px] font-extrabold text-slate-400 uppercase tracking-widest">Articles & Publications</span>
                {scholar.articles.map((art) => (
                  <Card key={art.id} className="p-3.5 bg-white border border-slate-100 shadow-soft flex flex-col gap-1">
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">{art.title}</h4>
                    <span className="text-[9.5px] text-slate-400 font-semibold">{art.journal} • {art.year}</span>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'research' && (
              <Card className="p-4 bg-white border border-slate-100 shadow-soft flex flex-col gap-2">
                <span className="text-[9.5px] font-extrabold text-slate-400 uppercase tracking-widest">Primary Research Focus</span>
                <ul className="flex flex-col gap-2 mt-1">
                  {scholar.researchInterests.map((interest, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <AnimatedIcon name="sparkles" size={14} className="text-accent" />
                      <span>{interest}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          {/* Footer Contact Placeholder */}
          <div className="p-3 border-t border-slate-100 bg-slate-50 flex justify-between items-center shrink-0">
            <span className="text-[9px] text-slate-400 font-semibold">Official Office Contact Available</span>
            <Button size="sm" onClick={() => triggerToast(`Connecting to ${scholar.name}'s office...`, 'info')}>
              Contact Office
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
