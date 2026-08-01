"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { IoShieldCheckmark, IoBookmarkOutline, IoRibbonOutline } from 'react-icons/io5';

// ----------------------------------------------------
// 1. AVATAR
// ----------------------------------------------------
interface AvatarProps {
  initials: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  initials,
  imageUrl,
  size = 'md',
  border = false
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-[10px]',
    md: 'w-11 h-11 text-xs',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl'
  };

  return (
    <div className={`rounded-full flex items-center justify-center font-bold overflow-hidden select-none shrink-0 ${
      border ? 'border-2 border-white shadow-sm' : ''
    } ${sizes[size]} ${
      imageUrl ? 'bg-slate-100' : 'bg-gradient-to-tr from-accent to-accent-light text-white'
    }`}>
      {imageUrl ? (
        <img src={imageUrl} alt="Avatar profile" className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

// ----------------------------------------------------
// 2. COVER BANNER
// ----------------------------------------------------
interface CoverBannerProps {
  backgroundImage?: string;
  children?: React.ReactNode;
}

export const CoverBanner: React.FC<CoverBannerProps> = ({ backgroundImage, children }) => {
  return (
    <div className="relative w-full h-[130px] bg-gradient-to-br from-primary to-primary-dark select-none flex flex-col justify-end overflow-hidden pb-4">
      {/* Background artwork */}
      <div className="absolute right-0 bottom-0 w-36 h-36 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute left-0 top-0 w-24 h-24 bg-accent/10 rounded-full blur-xl" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

      {backgroundImage && (
        <img src={backgroundImage} alt="Cover layout" className="absolute inset-0 w-full h-full object-cover z-0" />
      )}

      <div className="px-5 z-10 w-full flex items-end justify-between">
        {children}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 3. QR CARD PRESENTATION
// ----------------------------------------------------
interface QRCardProps {
  name: string;
  cardNumber: string;
  qrValue: string;
}

export const QRCard: React.FC<QRCardProps> = ({ name, cardNumber, qrValue }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-50 shadow-medium text-center max-w-[280px] mx-auto select-none">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Membership Scan Pass</span>
      
      {/* Dynamic vector SVG mock of QR */}
      <div className="w-36 h-36 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
          <rect x="5" y="5" width="22" height="22" fill="currentColor" />
          <rect x="9" y="9" width="14" height="14" fill="white" />
          <rect x="12" y="12" width="8" height="8" fill="currentColor" />

          <rect x="73" y="5" width="22" height="22" fill="currentColor" />
          <rect x="77" y="9" width="14" height="14" fill="white" />
          <rect x="80" y="12" width="8" height="8" fill="currentColor" />

          <rect x="5" y="73" width="22" height="22" fill="currentColor" />
          <rect x="9" y="77" width="14" height="14" fill="white" />
          <rect x="12" y="80" width="8" height="8" fill="currentColor" />

          <rect x="36" y="12" width="8" height="12" fill="currentColor" />
          <rect x="48" y="6" width="10" height="6" fill="currentColor" />
          <rect x="38" y="38" width="16" height="16" fill="currentColor" />
          <rect x="42" y="42" width="8" height="8" fill="white" />
          
          <rect x="12" y="38" width="10" height="6" fill="currentColor" />
          <rect x="78" y="38" width="12" height="12" fill="currentColor" />
          
          <rect x="38" y="76" width="10" height="10" fill="currentColor" />
          <rect x="58" y="82" width="12" height="6" fill="currentColor" />
          <rect x="78" y="72" width="14" height="14" fill="currentColor" />
        </svg>
      </div>

      <h4 className="text-xs font-bold text-slate-800 tracking-wide mt-4">{name}</h4>
      <span className="text-[10px] text-accent font-bold mt-0.5 tracking-wider font-mono">{cardNumber}</span>
      
      <div className="flex items-center gap-1 text-[9px] text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full mt-3 border border-emerald-100/50">
        <IoShieldCheckmark />
        <span>Cryptographically Verified</span>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 4. ACHIEVEMENT / REWARD CARD
// ----------------------------------------------------
interface AchievementProps {
  title: string;
  points: number;
  unlockedDate: string;
  badgeEmoji?: string;
}

export const AchievementCard: React.FC<AchievementProps> = ({
  title,
  points,
  unlockedDate,
  badgeEmoji = '⭐'
}) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-50 shadow-soft">
      <div className="w-11 h-11 bg-amber-50 border border-amber-100 rounded-xl text-lg flex items-center justify-center shrink-0">
        {badgeEmoji}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-extrabold text-slate-800 leading-snug">{title}</h4>
        <span className="text-[9px] text-slate-400 font-bold block mt-0.5">Unlocked on {unlockedDate}</span>
      </div>
      <div className="flex flex-col items-end shrink-0">
        <span className="text-xs font-black text-accent">+{points}</span>
        <span className="text-[7px] text-slate-400 uppercase tracking-widest font-bold">Reward pts</span>
      </div>
    </div>
  );
};
