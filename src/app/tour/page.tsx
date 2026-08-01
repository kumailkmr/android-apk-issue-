"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  IoBookOutline, 
  IoLibraryOutline, 
  IoRibbonOutline, 
  IoCheckmarkCircle, 
  IoChevronBackOutline, 
  IoChevronForwardOutline 
} from 'react-icons/io5';

interface SlideData {
  title: string;
  desc: string;
  illustration: React.ReactNode;
  tags: string[];
}

export default function TourOnboarding() {
  const router = useRouter();
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNext = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      router.push('/login');
    }
  };

  const handleBack = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  };

  const handleSkip = () => {
    router.push('/login');
  };

  const slides: SlideData[] = [
    {
      title: "Islamic Learning",
      desc: "Deepen your theological understanding with our verified digital library. Access translations of the Quran, Nahjul Balagha, supplications, and video lectures.",
      tags: ["Quranic Tafseer", "Hadith Books", "Sermons", "E-Books"],
      illustration: (
        <svg viewBox="0 0 160 120" className="w-full h-full text-primary" fill="currentColor">
          {/* Circular pattern */}
          <circle cx="80" cy="60" r="45" className="opacity-[0.03]" />
          {/* Rehal (Book Stand) */}
          <path d="M40 85 L120 85 L105 100 L55 100 Z" fill="currentColor" className="opacity-70" />
          <path d="M50 85 L80 50 L110 85" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="opacity-90" />
          <path d="M45 40 L78 68 L115 40" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
          {/* Holy book pages */}
          <path d="M48 38 L80 66 C85 62 105 44 112 38" fill="none" stroke="#d4af37" strokeWidth="4" strokeLinecap="round" />
          <circle cx="80" cy="30" r="12" fill="#d4af37" className="opacity-15 animate-pulse" />
        </svg>
      )
    },
    {
      title: "Community Network",
      desc: "Contribute to welfare operations and sign up for volunteer drives. Receive real-time announcements, coordinate relief funds, and access your Digital Member ID.",
      tags: ["Relief Funds", "Welfare Actions", "Announcements", "Volunteer IDs"],
      illustration: (
        <svg viewBox="0 0 160 120" className="w-full h-full text-primary" fill="currentColor">
          <circle cx="80" cy="60" r="45" className="opacity-[0.03]" />
          {/* Interlocking community links */}
          <circle cx="55" cy="65" r="22" fill="none" stroke="currentColor" strokeWidth="4" className="opacity-40" />
          <circle cx="105" cy="65" r="22" fill="none" stroke="currentColor" strokeWidth="4" className="opacity-40" />
          <circle cx="80" cy="48" r="24" fill="none" stroke="#d4af37" strokeWidth="5" />
          {/* Star nodes */}
          <circle cx="80" cy="24" r="5" fill="currentColor" />
          <circle cx="33" cy="65" r="5" fill="currentColor" />
          <circle cx="127" cy="65" r="5" fill="currentColor" />
        </svg>
      )
    },
    {
      title: "Maktab Administration",
      desc: "Empower local traditional religious education. A dedicated portal for parents, teachers, and student registries to check timetables, homework and fee receipts.",
      tags: ["Attendance Logs", "Student Grades", "Timetables", "Receipt bills"],
      illustration: (
        <svg viewBox="0 0 160 120" className="w-full h-full text-primary" fill="currentColor">
          <circle cx="80" cy="60" r="45" className="opacity-[0.03]" />
          {/* Certificate banner & clipboards */}
          <rect x="50" y="30" width="60" height="70" rx="6" fill="none" stroke="currentColor" strokeWidth="4" className="opacity-70" />
          <line x1="62" y1="48" x2="98" y2="48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-90" />
          <line x1="62" y1="64" x2="98" y2="64" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-90" />
          <line x1="62" y1="80" x2="84" y2="80" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" />
          <path d="M72 20 L88 20 L84 32 L76 32 Z" fill="#d4af37" />
        </svg>
      )
    },
    {
      title: "Digital Companion",
      desc: "Synchronize your religious routines with precision. Track prayer time highlights, direct Qibla compass coordinates, and get daily Hadith and Dua reminders.",
      tags: ["Prayer Tickers", "Qibla Compass", "Hijri Calendar", "Dhikr Counters"],
      illustration: (
        <svg viewBox="0 0 160 120" className="w-full h-full text-primary" fill="currentColor">
          <circle cx="80" cy="60" r="45" className="opacity-[0.03]" />
          {/* Compass Dial dial and moon crescent */}
          <circle cx="80" cy="60" r="32" fill="none" stroke="currentColor" strokeWidth="4" className="opacity-70" />
          <path d="M80 34 L88 60 L80 66 L72 60 Z" fill="#d4af37" />
          <path d="M80 60 L88 60 L80 86 L72 60 Z" fill="currentColor" className="opacity-40" />
          {/* Crescent moon phase */}
          <path d="M110 32 C115 32 122 36 122 44 C122 38 116 35 110 35 C102 35 98 42 98 48 C98 40 104 32 110 32 Z" fill="#d4af37" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-full flex-1 flex flex-col justify-between bg-white text-slate-800 p-6 relative overflow-hidden select-none">
      
      {/* Top Header Controls: Back & Skip */}
      <div className="flex justify-between items-center z-10 select-none shrink-0 h-10">
        {activeSlide > 0 ? (
          <button 
            onClick={handleBack}
            className="flex items-center gap-1 text-slate-400 text-xs font-bold hover:text-slate-700 transition-colors cursor-pointer select-none"
          >
            <IoChevronBackOutline />
            <span>Back</span>
          </button>
        ) : (
          <div className="w-10" />
        )}

        <button 
          onClick={handleSkip}
          className="text-xs font-extrabold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer select-none"
        >
          Skip
        </button>
      </div>

      {/* Slide Illustration and Description Container */}
      <div className="flex-1 flex flex-col justify-center items-center py-4 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full flex flex-col items-center"
          >
            {/* Vector graphics */}
            <div className="w-full max-w-[200px] h-[140px] flex items-center justify-center">
              {slides[activeSlide].illustration}
            </div>

            {/* Title & Desc */}
            <div className="text-center mt-6 flex flex-col gap-2">
              <h3 className="text-base font-black text-slate-800 tracking-wide uppercase leading-tight font-sans">
                {slides[activeSlide].title}
              </h3>
              <p className="text-xs text-slate-400 max-w-[270px] mx-auto leading-relaxed font-semibold">
                {slides[activeSlide].desc}
              </p>
            </div>

            {/* Tag pills */}
            <div className="flex flex-wrap justify-center gap-1.5 mt-5 max-w-[280px]">
              {slides[activeSlide].tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-2.5 py-0.5 bg-slate-50 border border-slate-100 text-slate-500 rounded-full text-[9px] font-bold uppercase tracking-wider select-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer controls: Slide Dots & Continue */}
      <div className="flex flex-col gap-5 z-10 pb-4 shrink-0">
        {/* Slide Indicator Dots */}
        <div className="flex justify-center gap-1.5 select-none">
          {slides.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeSlide === idx ? 'w-5 bg-primary' : 'w-1.5 bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <Button 
          variant={activeSlide === slides.length - 1 ? 'accent' : 'primary'}
          fullWidth 
          onClick={handleNext}
          rightIcon={<IoChevronForwardOutline />}
        >
          <span className="text-xs uppercase tracking-wider font-extrabold">
            {activeSlide === slides.length - 1 ? 'Finish' : 'Next'}
          </span>
        </Button>
      </div>
    </div>
  );
}
