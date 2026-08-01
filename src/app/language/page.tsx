"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useLanguage } from '@/context/LanguageContext';
import { mockLanguages } from '@/data/mockData';
import { motion } from 'framer-motion';
import { IoGlobeOutline, IoCheckmarkCircle } from 'react-icons/io5';

type LanguageCode = 'en' | 'ur' | 'ps' | 'ks';

export default function LanguageSelectScreen() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [selected, setSelected] = useState<LanguageCode>(language);

  const handleContinue = () => {
    setLanguage(selected);
    router.push('/tour');
  };

  const nativeNames = {
    en: { name: 'English', desc: 'Standard App Layout' },
    ur: { name: 'اردو', desc: 'راست سے بائیں تحریر' },
    ps: { name: 'فارسی', desc: 'زبان فارسی دری' },
    ks: { name: 'كأشُر', desc: 'کٲشُر زبان (بہت جلد)' }
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between bg-white text-slate-800 p-6 relative overflow-hidden select-none">
      
      {/* Top Header */}
      <div className="flex flex-col pt-4 select-none">
        <span className="text-[9px] font-bold text-accent uppercase tracking-widest flex items-center gap-1.5">
          <IoGlobeOutline />
          Preferences
        </span>
        <h2 className="text-base font-black text-slate-800 tracking-wide mt-1">Select Language / زبان منتخب کریں</h2>
        <p className="text-[11px] text-slate-400 font-semibold mt-1 leading-normal">
          Pick your preferred language to read religious guides, news bulletins, and manage Maktab records.
        </p>
      </div>

      {/* Language Selection Grid */}
      <div className="flex-1 flex flex-col justify-center gap-4.5 py-6">
        {mockLanguages.map((lang, idx) => {
          const code = lang.code as LanguageCode;
          const isSelected = selected === code;
          const isKashmiri = code === 'ks';
          const info = nativeNames[code];

          return (
            <motion.div
              key={code}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card
                onClick={() => {
                  if (!isKashmiri) setSelected(code);
                }}
                className={`flex items-center justify-between p-4.5 border transition-all ${
                  isKashmiri 
                    ? 'opacity-65 bg-slate-50 border-slate-100 cursor-not-allowed' 
                    : isSelected 
                      ? 'bg-primary/5 border-primary shadow-[0_4px_20px_rgba(6,78,59,0.02)]' 
                      : 'bg-white border-slate-50 shadow-soft hover:bg-slate-50 cursor-pointer'
                }`}
              >
                <div className="flex flex-col min-w-0 pr-4">
                  <h4 className={`text-sm tracking-wide leading-none ${
                    isSelected ? 'font-extrabold text-primary' : 'font-bold text-slate-800'
                  }`}>
                    {info.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-semibold mt-1.5 block">
                    {info.desc}
                  </span>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {isKashmiri ? (
                    <Badge variant="accent" className="text-[7.5px] uppercase tracking-wider font-bold">Coming Soon</Badge>
                  ) : isSelected ? (
                    <IoCheckmarkCircle className="text-primary text-xl" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-slate-200" />
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="pb-4"
      >
        <Button 
          variant="primary" 
          fullWidth 
          onClick={handleContinue}
        >
          <span className="text-xs uppercase tracking-wider font-extrabold">Save & Continue</span>
        </Button>
      </motion.div>
    </div>
  );
}
