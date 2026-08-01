"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoPlay, 
  IoPause, 
  IoPlaySkipBack, 
  IoPlaySkipForward, 
  IoClose, 
  IoDocumentTextOutline, 
  IoDownloadOutline,
  IoExpandOutline
} from 'react-icons/io5';

// ----------------------------------------------------
// 1. CAROUSEL & GALLERY
// ----------------------------------------------------
interface Announcement {
  tag: string;
  title: string;
  imageUrl: string;
}

interface CarouselProps {
  items: Announcement[];
}

export const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="relative w-full h-[150px] rounded-3xl overflow-hidden shadow-soft select-none bg-slate-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-slate-900 flex items-center justify-center"
        >
          <div className={`w-full h-full bg-gradient-to-tr from-primary to-slate-900 flex flex-col justify-end p-5 text-white relative`}>
            <div className="absolute inset-0 z-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={items[activeIdx].imageUrl} alt="Announcement" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>
            <div className="z-10 flex flex-col">
              <span className="text-[10px] font-bold text-accent-light uppercase tracking-wider">{items[activeIdx].tag}</span>
              <h3 className="text-xs font-bold mt-1 max-w-[220px]">{items[activeIdx].title}</h3>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="absolute bottom-3 left-4 flex gap-1.5 z-10">
        {items.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIdx === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 2. AUDIO PLAYERS (MINI AND FULL WAVEFORM MOCK)
// ----------------------------------------------------
interface AudioPlayerProps {
  title: string;
  speaker: string;
  duration: string; // e.g. "45:00"
  isOpen: boolean;
  onClose: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title,
  speaker,
  duration,
  isOpen,
  onClose
}) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(15); // mock percent

  useEffect(() => {
    let timer: any;
    if (playing) {
      timer = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 0.5));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [playing]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 320 }}
          className="absolute bottom-0 inset-x-0 bg-slate-950 text-white rounded-t-[36px] shadow-2xl z-50 flex flex-col p-6 border-t border-white/5"
        >
          {/* Close button & header */}
          <div className="flex justify-between items-center select-none">
            <span className="text-[9px] font-bold text-accent-light uppercase tracking-widest">Now Streaming Audio</span>
            <button 
              onClick={onClose}
              className="p-1 bg-white/5 text-white/70 hover:text-white rounded-full transition-colors cursor-pointer"
            >
              <IoClose className="text-lg" />
            </button>
          </div>

          {/* Disk cover / Calligraphy mock */}
          <div className="flex flex-col items-center py-6 select-none">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-accent to-accent-dark border-4 border-white/10 flex items-center justify-center shadow-lg relative animate-spin [animation-duration:15s] paused" style={{ animationPlayState: playing ? 'running' : 'paused' }}>
              <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center border-2 border-white/5" />
            </div>

            <h3 className="text-sm font-extrabold mt-4 text-center leading-snug tracking-wide max-w-[240px]">
              {title}
            </h3>
            <span className="text-[10px] text-white/50 font-bold mt-1">{speaker}</span>
          </div>

          {/* Slider seeker */}
          <div className="flex flex-col gap-1.5 select-none">
            <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between text-[9px] font-bold text-white/40">
              <span>{Math.round((progress/100)*10)}:00</span>
              <span>{duration}</span>
            </div>
          </div>

          {/* Audio controls */}
          <div className="flex justify-center items-center gap-6 py-4 select-none">
            <button className="text-white/60 hover:text-white text-xl active:scale-90 transition-transform cursor-pointer">
              <IoPlaySkipBack />
            </button>
            <button 
              onClick={() => setPlaying(!playing)}
              className="w-12 h-12 bg-white text-slate-950 rounded-full flex items-center justify-center shadow active:scale-95 transition-transform cursor-pointer"
            >
              {playing ? <IoPause className="text-xl" /> : <IoPlay className="text-xl translate-x-[1px]" />}
            </button>
            <button className="text-white/60 hover:text-white text-xl active:scale-90 transition-transform cursor-pointer">
              <IoPlaySkipForward />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ----------------------------------------------------
// 3. PDF PREVIEW CARD
// ----------------------------------------------------
interface PDFProps {
  title: string;
  fileSize: string;
  onView?: () => void;
  onDownload?: () => void;
}

export const PDFPreviewCard: React.FC<PDFProps> = ({ title, fileSize, onView, onDownload }) => {
  return (
    <div className="flex items-center gap-3.5 p-4 bg-white rounded-2xl border border-slate-50 shadow-soft">
      <div className="w-11 h-11 bg-red-50 text-red-600 rounded-xl border border-red-100/50 flex items-center justify-center text-lg shrink-0">
        <IoDocumentTextOutline />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-slate-800 truncate leading-tight">{title}</h4>
        <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">{fileSize} • PDF Doc</span>
      </div>
      <div className="flex gap-2 shrink-0">
        <button 
          onClick={onView}
          className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer select-none"
        >
          <IoExpandOutline />
        </button>
        <button 
          onClick={onDownload}
          className="w-8 h-8 rounded-lg bg-primary text-white hover:bg-primary-light flex items-center justify-center transition-colors cursor-pointer select-none"
        >
          <IoDownloadOutline />
        </button>
      </div>
    </div>
  );
};
