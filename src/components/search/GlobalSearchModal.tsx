"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedIcon } from '@/components/ui/icons';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (title: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onSelectResult }) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const trendingSearches = [
    'Arbaeen 2026 Procession',
    'Nahjul Balagha Sermon 4',
    'Syed Arshad Hussain Lectures',
    'Maktab Fee Payment',
    'Blood Donation Camp',
    'Sabeel Volunteer Registration'
  ];

  const categories = ['All', 'Books', 'Lectures', 'Events', 'Scholars', 'Maktab', 'News'];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/40 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white w-full max-w-md mx-auto h-full flex flex-col shadow-2xl"
        >
          {/* Header search bar */}
          <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-white">
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-full transition-colors"
            >
              <AnimatedIcon name="arrow-left" size={20} />
            </button>
            <div className="flex-1 flex items-center gap-2 bg-slate-100/80 rounded-2xl px-3 py-2 border border-slate-200/50">
              <AnimatedIcon name="search" size={18} className="text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search lectures, books, events, scholars..."
                className="w-full bg-transparent text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                autoFocus
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600">
                  <AnimatedIcon name="close" size={16} />
                </button>
              )}
            </div>
            <button 
              onClick={() => alert("Voice Search placeholder active. Speak now...")}
              className="p-2 text-primary hover:text-accent rounded-full transition-colors bg-emerald-50 border border-emerald-100"
            >
              <AnimatedIcon name="sparkles" size={18} animation="pulse" />
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar p-3 border-b border-slate-50 bg-slate-50/50">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider shrink-0 transition-all ${
                  activeFilter === cat 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-white text-slate-600 border border-slate-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results / Suggestions */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
            {!query && (
              <>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trending Searches</span>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setQuery(term);
                          onSelectResult(term);
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-primary rounded-xl text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5"
                      >
                        <AnimatedIcon name="sparkles" size={12} className="text-accent" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Browse Categories</span>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: 'Holy Shrines', icon: 'shrine' },
                      { name: 'Digital Library', icon: 'rehal' },
                      { name: 'Video Sermons', icon: 'video' },
                      { name: 'Volunteer Drives', icon: 'prayer-hands' }
                    ].map((item, idx) => (
                      <div 
                        key={idx}
                        onClick={() => onSelectResult(item.name)}
                        className="p-3 bg-white border border-slate-100 shadow-soft rounded-2xl flex items-center gap-3 cursor-pointer hover:border-emerald-200 transition-all"
                      >
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-primary">
                          <AnimatedIcon name={item.icon as any} size={18} />
                        </div>
                        <span className="text-xs font-bold text-slate-800">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {query && (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Results for "{query}"</span>
                {[
                  { title: `${query} - Official Commemoration`, type: 'Event', date: '20 Safar' },
                  { title: `Tafseer & Lessons on ${query}`, type: 'Lecture Series', date: '12 Lessons' },
                  { title: `Guidebook on ${query}`, type: 'Digital Book', date: 'PDF Download' }
                ].map((res, i) => (
                  <div 
                    key={i}
                    onClick={() => {
                      onSelectResult(res.title);
                      onClose();
                    }}
                    className="p-3 bg-white border border-slate-100 shadow-soft rounded-2xl flex justify-between items-center cursor-pointer hover:border-emerald-200"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800">{res.title}</span>
                      <span className="text-[10px] text-accent font-semibold">{res.type}</span>
                    </div>
                    <AnimatedIcon name="chevron-right" size={16} className="text-slate-400" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
