"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { IoArrowBackOutline, IoChevronForward, IoHomeOutline } from 'react-icons/io5';

interface PageHeaderProps {
  breadcrumbs: string[]; // e.g. ["Home", "Discover", "Scholars"]
  title: string; // e.g. "Featured Scholars"
  description?: string; // e.g. "Explore books, lectures and Islamic resources."
  onBack: () => void;
  onHome?: () => void;
  actionButton?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbs,
  title,
  description,
  onBack,
  onHome,
  actionButton
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -6 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="flex flex-col gap-2 p-3.5 px-4 bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 shadow-xs select-none"
    >
      {/* Top Navigation Row: Back Button, Home Shortcut & Breadcrumb Path */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar min-w-0">
          <button
            onClick={onBack}
            className="flex items-center gap-1 px-2 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 text-[10.5px] font-extrabold transition-all active:scale-95 cursor-pointer shrink-0 border border-slate-200/80 shadow-2xs"
            aria-label="Go Back"
          >
            <IoArrowBackOutline size={13} className="text-emerald-700 font-bold shrink-0" />
            <span>Back</span>
          </button>

          {onHome && (
            <button
              onClick={onHome}
              className="flex items-center gap-1 px-2 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 text-emerald-900 text-[10.5px] font-black transition-all active:scale-95 cursor-pointer shrink-0 border border-emerald-200/80 shadow-2xs"
              aria-label="Return Home"
            >
              <IoHomeOutline size={12} className="text-emerald-700 shrink-0" />
              <span>Home</span>
            </button>
          )}

          {/* Breadcrumb Path */}
          <div className="flex items-center gap-1 text-[9.5px] font-bold text-slate-400 truncate ml-0.5">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <IoChevronForward size={9} className="text-slate-300 shrink-0" />}
                <button 
                  onClick={() => {
                    if (idx === 0 && onHome) onHome();
                    else if (idx < breadcrumbs.length - 1) onBack();
                  }}
                  className={idx === breadcrumbs.length - 1 ? "text-emerald-800 font-black truncate cursor-default" : "hover:text-slate-700 underline-offset-2 hover:underline truncate cursor-pointer"}
                >
                  {crumb}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        {actionButton && <div className="shrink-0">{actionButton}</div>}
      </div>

      {/* Large Page Title & Subtitle */}
      <div className="flex flex-col gap-0.5 pt-0.5">
        <h1 className="text-base font-black text-slate-900 tracking-tight leading-snug">{title}</h1>
        {description && (
          <p className="text-[10.5px] font-medium text-slate-500 leading-normal line-clamp-1">{description}</p>
        )}
      </div>
    </motion.div>
  );
};
