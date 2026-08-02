"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { mockMember } from '@/data/mockData';
import { AnimatedIcon } from '@/components/ui/icons';

export const DigitalID: React.FC = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-4 py-2">
      {/* Interactive Flipped Card with Framer Motion */}
      <div 
        onClick={() => setFlipped(!flipped)}
        className="relative w-full max-w-[340px] h-[215px] cursor-pointer preserve-3d perspective-[1000px] select-none"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 w-full h-full rounded-2xl shadow-[0_15px_40px_rgba(6,78,59,0.3)] border border-emerald-500/30 text-white transform-style-3d"
        >
          {/* FRONT OF THE CARD */}
          <div className="absolute inset-0 w-full h-full rounded-2xl p-5 flex flex-col justify-between backface-hidden overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 shadow-inner">
            {/* Holographic / Texture Overlays */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] mix-blend-overlay pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-amber-300/20 to-transparent blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-gradient-to-br from-emerald-400/20 to-transparent blur-2xl pointer-events-none" />
            
            {/* Glare effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 transform -skew-x-12 translate-x-1/2 pointer-events-none" />

            {/* Card Header */}
            <div className="flex justify-between items-start z-10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center p-0.5 shadow-md border border-amber-300/50">
                  <span className="text-[8px] text-emerald-950 font-black font-urdu">شرعی</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black tracking-widest text-amber-500 uppercase drop-shadow-sm leading-tight">Anjuman Shari e Shian</span>
                  <span className="text-[8px] text-emerald-100/70 tracking-widest uppercase font-semibold leading-tight">Digital Membership Pass</span>
                </div>
              </div>
              <span className="text-[8px] bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 px-2.5 py-1 rounded-sm font-black uppercase tracking-widest shadow-sm">
                {mockMember.memberType}
              </span>
            </div>

            {/* Smart Chip Mockup */}
            <div className="absolute top-14 left-5 w-8 h-6 rounded bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-700/50 opacity-90 z-10 flex flex-col justify-between overflow-hidden opacity-80">
                <div className="w-full h-px bg-amber-700/30 mt-1" />
                <div className="w-full h-px bg-amber-700/30" />
                <div className="w-full h-px bg-amber-700/30 mb-1" />
                <div className="absolute inset-y-0 left-2 w-px bg-amber-700/30" />
                <div className="absolute inset-y-0 right-2 w-px bg-amber-700/30" />
            </div>

            {/* Card Body */}
            <div className="flex items-end justify-between z-10 mt-6">
              {/* Fields */}
              <div className="flex flex-col gap-0.5 mt-2 overflow-hidden">
                <span className="text-[8px] text-emerald-200/60 uppercase tracking-widest font-semibold">Cardholder Name</span>
                <h4 className="text-sm font-black text-white tracking-widest uppercase truncate drop-shadow-md">
                  {mockMember.name}
                </h4>
                
                <div className="flex gap-4 mt-2">
                    <div className="flex flex-col">
                        <span className="text-[7px] text-emerald-200/60 uppercase tracking-widest font-semibold">Parentage</span>
                        <span className="text-[9px] text-emerald-50 font-bold uppercase tracking-wider">{mockMember.parentage}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[7px] text-emerald-200/60 uppercase tracking-widest font-semibold">District</span>
                        <span className="text-[9px] text-emerald-50 font-bold uppercase tracking-wider">{mockMember.district}</span>
                    </div>
                </div>
              </div>

              {/* Photo placeholder */}
              <div className="w-16 h-18 rounded-lg bg-emerald-950/50 border border-emerald-400/30 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md shadow-inner shrink-0 p-1">
                <div className="w-full h-full rounded flex items-center justify-center overflow-hidden bg-slate-800">
                  <img src="https://www.knskashmir.com/userfiles/image/639043840499919898_IMG-20260119-WA0026.jpg" alt="Member Photo" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="flex justify-between items-end z-10 mt-2">
              <div className="flex flex-col">
                <span className="text-[7px] text-emerald-200/60 uppercase tracking-widest font-semibold">Membership Number</span>
                <span className="font-mono text-sm text-amber-400 font-bold tracking-[0.2em] drop-shadow-sm">{mockMember.cardNumber}</span>
              </div>
              
              <div className="flex gap-4 text-right">
                <div className="flex flex-col">
                  <span className="text-[7px] text-emerald-200/60 uppercase tracking-widest font-semibold">Valid Thru</span>
                  <span className="text-[10px] font-black text-white tracking-widest font-mono">{mockMember.expiryDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* BACK OF THE CARD (QR & Verification) */}
          <div className="absolute inset-0 w-full h-full rounded-2xl p-0 flex flex-col justify-between backface-hidden [transform:rotateY(180deg)] overflow-hidden bg-slate-900 border border-slate-700">
            {/* Magnetic Stripe Mockup */}
            <div className="w-full h-10 bg-black/90 mt-4" />
            
            <div className="p-4 flex-1 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start border-b border-white/10 pb-2">
                  <span className="text-[9px] font-black text-amber-500 tracking-widest uppercase">Authorized Verification</span>
                  <span className="text-[7px] text-white/40 tracking-widest uppercase">Tap to flip back</span>
                </div>

                <div className="flex items-center justify-between gap-4 py-2">
                  {/* Fake QR code SVG */}
                  <div className="w-20 h-20 bg-white rounded-xl p-1.5 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)] shrink-0 relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                      {/* Outer square */}
                      <rect x="5" y="5" width="25" height="25" fill="currentColor" />
                      <rect x="9" y="9" width="17" height="17" fill="white" />
                      <rect x="13" y="13" width="9" height="9" fill="currentColor" />

                      <rect x="70" y="5" width="25" height="25" fill="currentColor" />
                      <rect x="74" y="9" width="17" height="17" fill="white" />
                      <rect x="78" y="13" width="9" height="9" fill="currentColor" />

                      <rect x="5" y="70" width="25" height="25" fill="currentColor" />
                      <rect x="9" y="74" width="17" height="17" fill="white" />
                      <rect x="13" y="78" width="9" height="9" fill="currentColor" />

                      {/* Noise cells */}
                      <rect x="40" y="15" width="10" height="10" fill="currentColor" />
                      <rect x="50" y="5" width="5" height="10" fill="currentColor" />
                      <rect x="60" y="20" width="8" height="8" fill="currentColor" />
                      
                      <rect x="40" y="40" width="15" height="15" fill="currentColor" />
                      <rect x="45" y="45" width="5" height="5" fill="white" />
                      
                      <rect x="10" y="45" width="12" height="6" fill="currentColor" />
                      <rect x="80" y="45" width="10" height="15" fill="currentColor" />
                      
                      <rect x="40" y="70" width="10" height="10" fill="currentColor" />
                      <rect x="55" y="80" width="20" height="10" fill="currentColor" />
                      <rect x="80" y="75" width="12" height="12" fill="currentColor" />
                      <rect x="84" y="79" width="4" height="4" fill="white" />
                    </svg>
                    
                    {/* Scanning laser line animation */}
                    <motion.div 
                        animate={{ y: [0, 68, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute top-1.5 left-1.5 right-1.5 h-0.5 bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,1)] z-20"
                    />
                  </div>

                  {/* QR Details */}
                  <div className="flex-1 flex flex-col gap-1 text-white">
                    <div className="flex gap-4 pb-1.5 border-b border-white/10 mb-1">
                      <div className="flex flex-col">
                        <span className="text-[6px] text-white/50 uppercase tracking-widest">Role</span>
                        <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider">{mockMember.memberType}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[6px] text-white/50 uppercase tracking-widest">Status</span>
                        <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1"><AnimatedIcon name="shield-check" size={10} animation="pulse" /> Active</span>
                      </div>
                    </div>
                    <p className="text-[7px] text-white/60 leading-relaxed text-justify mt-0.5">
                      This digital pass is the property of Anjuman Shari e Shian. It must be presented upon request at any official office or Maktab center.
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-[7px] font-mono text-emerald-400 bg-emerald-950/50 p-1 rounded border border-emerald-500/20 w-max">
                      <AnimatedIcon name="crypto-node" size={10} animation="spin" />
                      <span>SECURE CRYPTO-VERIFIED</span>
                    </div>
                  </div>
                </div>
                
                <div className="w-full bg-white/10 p-2 rounded flex flex-col items-center">
                   <p className="text-[6px] text-white/40 tracking-widest text-center uppercase">If found, please return to central office</p>
                   <span className="font-mono text-[8px] text-white/50 mt-0.5">ID: {mockMember.id}</span>
                </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold bg-white rounded-full px-3 py-1 shadow-sm border border-slate-100">
        <AnimatedIcon name="qr" size={12} animation="scale" />
        <span>Tap card to flip to QR Code</span>
      </div>
    </div>
  );
};
export default DigitalID;
