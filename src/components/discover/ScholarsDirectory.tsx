"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockScholarsList, Scholar } from '@/data/mockScholarsData';
import { ScholarProfileModal } from './ScholarProfileModal';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AnimatedIcon } from '@/components/ui/icons';

interface ScholarsDirectoryProps {
  triggerToast: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
}

export const ScholarsDirectory: React.FC<ScholarsDirectoryProps> = ({ triggerToast }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedScholar, setSelectedScholar] = useState<Scholar | null>(null);

  const categories = [
    'All',
    'Leadership',
    'Senior',
    'Research',
    'Teachers',
    'Youth',
    'Womens',
    'Guest'
  ];

  const filteredScholars = useMemo(() => {
    return mockScholarsList.filter((sch) => {
      const matchesCategory = selectedCategory === 'All' || sch.category === selectedCategory;
      const matchesSearch = 
        sch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sch.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sch.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sch.languages.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col gap-4 select-none">
      {/* Header Bar */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Religious Leadership & Scholars</span>
          <span className="text-[9px] font-extrabold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
            {filteredScholars.length} Verified Scholars
          </span>
        </div>
        <h3 className="text-base font-black text-slate-800 leading-tight">Featured Scholars Directory</h3>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Input 
          placeholder="Search by Scholar name, subject, or language..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<AnimatedIcon name="search" size={16} className="text-slate-400" />}
          className="bg-white border-slate-200 text-xs py-2.5 rounded-2xl shadow-soft"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter Category Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-bold shrink-0 transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-primary text-white shadow-sm font-black'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'All' ? 'All Categories' : cat}
          </button>
        ))}
      </div>

      {/* Scholars Grid List */}
      <div className="flex flex-col gap-3.5 mt-1">
        {filteredScholars.map((sch) => (
          <motion.div
            key={sch.id}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Card 
              onClick={() => setSelectedScholar(sch)}
              className="p-4 bg-white border border-slate-100 shadow-soft hover:border-emerald-200 transition-all cursor-pointer flex flex-col gap-3 relative overflow-hidden group"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start gap-3.5">
                {/* Circular Profile Avatar Image */}
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500/30 p-0.5 shadow-md bg-slate-900 group-hover:border-accent transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={sch.photoUrl} 
                      alt={sch.name} 
                      className="w-full h-full object-cover rounded-full" 
                    />
                  </div>
                  {sch.isVerified && (
                    <div className="absolute -bottom-0.5 -right-0.5 bg-accent text-slate-950 p-0.5 rounded-full border-2 border-white shadow-sm">
                      <AnimatedIcon name="shield-check" size={12} />
                    </div>
                  )}
                </div>

                {/* Scholar Details */}
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-sm font-extrabold text-slate-900 leading-tight group-hover:text-primary transition-colors truncate">
                      {sch.name}
                    </h4>
                    {sch.isFeatured && (
                      <Badge variant="accent" className="text-[7.5px] uppercase font-bold py-0.5 px-1.5 shrink-0">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <span className="text-[10px] font-bold text-slate-500 mt-0.5 leading-snug line-clamp-1">
                    {sch.position}
                  </span>

                  <span className="text-[9.5px] font-semibold text-emerald-800 mt-1 flex items-center gap-1">
                    <AnimatedIcon name="open-quran" size={12} className="text-accent" />
                    <span className="truncate">{sch.specialization}</span>
                  </span>

                  {/* Metadata Row */}
                  <div className="flex items-center gap-3 text-[9px] font-bold text-slate-400 mt-2 border-t border-slate-50 pt-2">
                    <span>📍 {sch.location}</span>
                    <span>•</span>
                    <span>{sch.yearsOfService} Years Service</span>
                    <span>•</span>
                    <span>{sch.lectures.length} Lectures</span>
                  </div>
                </div>
              </div>

              {/* View Profile Action Bar */}
              <div className="flex items-center justify-between pt-1 text-[9.5px] font-extrabold text-primary group-hover:text-emerald-700">
                <span className="uppercase tracking-wider">Explore Profile & Works</span>
                <AnimatedIcon name="arrow-left" size={12} className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </motion.div>
        ))}

        {filteredScholars.length === 0 && (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-100 flex flex-col items-center gap-2">
            <AnimatedIcon name="search" size={28} className="text-slate-300" />
            <h4 className="text-xs font-bold text-slate-700">No Scholars Found</h4>
            <p className="text-[10px] text-slate-400">Try searching for a different name or specialization.</p>
          </div>
        )}
      </div>

      {/* Admin Panel Future-Ready CTA Banner */}
      <div 
        onClick={() => triggerToast("Admin Panel Ready: Unlimited scholars can be added seamlessly.", 'info')}
        className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/60 shadow-soft flex items-center justify-between cursor-pointer select-none mt-2"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
            ➕
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-extrabold text-slate-800">Admin Management Ready</span>
            <span className="text-[8.5px] text-slate-500 font-medium">Add unlimited scholars, lectures & books via backend</span>
          </div>
        </div>
        <AnimatedIcon name="arrow-left" size={14} className="rotate-180 text-emerald-700" />
      </div>

      {/* Full Scholar Profile Modal */}
      <ScholarProfileModal 
        scholar={selectedScholar}
        onClose={() => setSelectedScholar(null)}
        triggerToast={triggerToast}
      />
    </div>
  );
};
