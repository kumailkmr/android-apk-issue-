"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { 
  IoArrowBackOutline, 
  IoCheckmarkCircle, 
  IoLockClosedOutline,
  IoInformationCircleOutline 
} from 'react-icons/io5';

export default function GuestAccessScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  const publicFeatures = [
    "Read Holy Quran & Translations",
    "Read Supplications & Islamic Books",
    "Stream General Video Sermons & Clips",
    "View Public Announcements & Events",
    "Check Prayer Times & Qibla Compass",
    "Inspect Hijri Calendar"
  ];

  const lockedFeatures = [
    "Secure Digital Membership ID Card",
    "Charity Ledger & Tax-exempt Donations",
    "Active Volunteer Registries & Shifts",
    "Maktab School Parent/Student Portal",
    "Direct Q&A with Shariat Jurisprudence Council"
  ];

  return (
    <div className="w-full flex-1 flex flex-col justify-between bg-white text-slate-800 p-6 relative overflow-hidden select-none">
      
      {/* Top bar back button */}
      <div className="flex justify-between items-center h-10 select-none shrink-0">
        <button 
          onClick={() => router.push('/login')}
          className="p-1 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer select-none"
        >
          <IoArrowBackOutline className="text-xl" />
        </button>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Guest Access</span>
      </div>

      {/* Main Details */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-4 pr-1">
        {/* Header Title */}
        <div className="flex flex-col mb-5 select-none">
          <h2 className="text-lg font-black text-slate-800 tracking-wide uppercase leading-tight">Continue as Guest</h2>
          <p className="text-xs text-slate-400 font-semibold mt-1">
            Access general Islamic resources anonymously. Create a digital account later to unlock member privileges.
          </p>
        </div>

        {/* Feature Lists */}
        <div className="flex flex-col gap-5">
          {/* Public features (Allowed) */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider px-1">Available Resources (Free)</span>
            <div className="flex flex-col gap-2">
              {publicFeatures.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start text-xs font-semibold text-slate-700">
                  <IoCheckmarkCircle className="text-emerald-500 text-lg shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Locked features (Require account) */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[9px] font-bold text-red-500 uppercase tracking-wider px-1">Requires Registration</span>
            <div className="flex flex-col gap-2">
              {lockedFeatures.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start text-xs font-semibold text-slate-400">
                  <IoLockClosedOutline className="text-red-400/80 text-base shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Warning info note */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3 text-amber-800 mt-2 select-none">
            <IoInformationCircleOutline className="text-xl shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wide">Account Creation is Free</span>
              <p className="text-[9px] text-amber-800/80 leading-relaxed font-semibold">
                Creating an account takes less than a minute and helps the organization verify member grids and issue official receipts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action triggers */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col gap-3.5 z-10 pb-4 mt-2 shrink-0 border-t border-slate-50 pt-3"
      >
        <Button 
          variant="primary" 
          fullWidth 
          onClick={() => {
            if (typeof window !== 'undefined') {
              localStorage.setItem('userMode', 'guest');
            }
            router.push('/dashboard');
          }}
        >
          <span className="text-xs uppercase tracking-wider font-extrabold">Continue to Dashboard</span>
        </Button>
      </motion.div>
    </div>
  );
}
