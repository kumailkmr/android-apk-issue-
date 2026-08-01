"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FeaturedItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface FeaturedContentCarouselProps {
  isGuest?: boolean;
  openAuthDialog?: () => void;
  triggerToast?: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
}

export const FeaturedContentCarousel: React.FC<FeaturedContentCarouselProps> = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoSlideTimer = useRef<NodeJS.Timeout | null>(null);

  // Full set of Holy Shrine Banners
  const featuredItems: FeaturedItem[] = [
    {
      id: 'f1',
      title: 'Arbaeen Walk to Karbala',
      description: 'Devotees carrying flags of Imam Hussain (A.S) walking towards the Holy City of Karbala',
      imageUrl: '/arbaeen_walk.jpg'
    },
    {
      id: 'f2',
      title: 'Shrine of Imam Hussain (A.S)',
      description: 'Mourners gathered in reverence at the Holy Shrine of Imam Hussain in Karbala',
      imageUrl: '/mourning_shrine.jpg'
    },
    {
      id: 'f3',
      title: 'Kashmir Majlis e Aza',
      description: 'Traditional Majlis e Aza assembly in Budgam, Kashmir',
      imageUrl: '/kashmir_majlis.jpg'
    },
    {
      id: 'f4',
      title: 'Shrine of Hazrat Abbas (A.S)',
      description: 'The illuminated Holy Shrine of Hazrat Abul Fazl al-Abbas (A.S) in Karbala',
      imageUrl: '/shrine_abbas.jpg'
    },
    {
      id: 'f5',
      title: 'Shrine of Imam Musa Kazim (A.S)',
      description: 'The twin golden domes of Imam Musa al-Kadhim (A.S) in Kadhimayn',
      imageUrl: '/shrine_kadhimayn.jpg'
    },
    {
      id: 'f6',
      title: 'Shrine of Imam Reza (A.S)',
      description: 'The majestic golden dome of the Holy Shrine of Imam Ali al-Reza (A.S) in Mashhad',
      imageUrl: '/shrine_reza.jpg'
    },
    {
      id: 'f7',
      title: 'Shrine of Bibi Masooma Qom (S.A)',
      description: 'The golden sanctuary of Lady Fatima Masooma (S.A) in Qom',
      imageUrl: '/shrine_masooma.jpg'
    },
    {
      id: 'f8',
      title: 'Shrine of Imam Hassan Askari (A.S)',
      description: 'The Holy Shrine of Al-Askariyya in Samarra',
      imageUrl: '/shrine_askari.jpg'
    },
    {
      id: 'f9',
      title: 'Shrine of Mir Shams-ud-Din Iraqi',
      description: 'Historic Tomb and Shrine of Mir Shams-ud-Din Iraqi at Chadoora, Budgam, Kashmir',
      imageUrl: '/shrine_iraqi_hd.jpg'
    },
    {
      id: 'f10',
      title: 'Shrine of Imam Ali (A.S)',
      description: 'The Holy Sanctuary of Amir al-Mu\'minin Imam Ali (A.S) in Najaf',
      imageUrl: '/shrine_imam_ali.jpg'
    }
  ];

  // Auto slide management
  useEffect(() => {
    if (!isPaused) {
      autoSlideTimer.current = setInterval(() => {
        setActiveIdx((prev) => (prev === featuredItems.length - 1 ? 0 : prev + 1));
      }, 4500);
    }
    return () => {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }
    };
  }, [isPaused, featuredItems.length]);

  const activeItem = featuredItems[activeIdx];

  return (
    <div 
      className="relative w-full rounded-[24px] overflow-hidden shadow-medium select-none border border-slate-100 shrink-0 aspect-[16/9] bg-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full relative"
        >
          {/* Full background image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={activeItem.imageUrl} 
            alt={activeItem.title} 
            className="w-full h-full object-cover" 
          />
          
          {/* Soft gradient mask for bottom text description */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4" />

          {/* Image Description Text */}
          <div className="absolute bottom-3 left-4 right-4 z-10 flex flex-col gap-0.5">
            <h3 className="text-white font-extrabold text-sm tracking-wide leading-tight drop-shadow-md">
              {activeItem.title}
            </h3>
            <p className="text-emerald-100/90 text-[10.5px] font-medium leading-snug drop-shadow-sm line-clamp-1">
              {activeItem.description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute top-3 right-4 z-20 flex gap-1 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10 max-w-[150px] overflow-x-auto no-scrollbar">
        {featuredItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 shrink-0 ${
              activeIdx === idx ? 'w-4 bg-accent' : 'w-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
