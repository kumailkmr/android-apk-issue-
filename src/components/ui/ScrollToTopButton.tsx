"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronUpOutline } from 'react-icons/io5';

interface ScrollToTopProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export const ScrollToTopButton: React.FC<ScrollToTopProps> = ({ scrollContainerRef }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop > 350) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrollContainerRef]);

  const scrollToTop = () => {
    if (scrollContainerRef?.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          onClick={scrollToTop}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-20 left-5 z-40 px-3 py-2 rounded-full bg-slate-900/90 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-xl border border-white/20 flex items-center gap-1.5 backdrop-blur-md cursor-pointer select-none hover:bg-slate-800"
          aria-label="Back to Top"
        >
          <IoChevronUpOutline className="text-amber-400 font-black text-sm" />
          <span>Back to Top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
