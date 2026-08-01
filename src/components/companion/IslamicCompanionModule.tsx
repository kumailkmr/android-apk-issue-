"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { Stepper, LinearProgress, CircularProgress } from '@/components/ui/status/Status';
import { 
  IoChevronBackOutline, 
  IoCheckmarkCircle, 
  IoTimeOutline, 
  IoLocationOutline, 
  IoCompassOutline,
  IoCalendarOutline,
  IoBookmarkOutline,
  IoBookmark,
  IoPlayOutline,
  IoPauseOutline,
  IoSearchOutline,
  IoNotificationsOutline,
  IoTrashOutline,
  IoShareSocialOutline,
  IoHeartOutline,
  IoHeart,
  IoSettingsOutline,
  IoAddOutline,
  IoRefreshOutline,
  IoVolumeHighOutline,
  IoArrowForwardOutline,
  IoBookOutline
} from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedIcon, IconName } from '@/components/ui/icons';
import { PageHeader } from '@/components/ui/PageHeader';

interface IslamicCompanionModuleProps {
  initialView?: string; // e.g. 'dashboard', 'prayer-times', 'qibla'
  triggerToast: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  triggerAlert: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
  navigateBackToServices: () => void;
}

export const IslamicCompanionModule: React.FC<IslamicCompanionModuleProps> = ({ 
  initialView = 'dashboard', 
  triggerToast, 
  triggerAlert,
  navigateBackToServices 
}) => {
  // Navigation State Machine
  const [compView, setCompView] = useState<string>(initialView);
  const [viewHistory, setViewHistory] = useState<string[]>([initialView]);

  // Tasbih Counter State
  const [tasbihCount, setTasbihCount] = useState(0);
  const [tasbihGoal, setTasbihGoal] = useState(33);
  const [tasbihDhikr, setTasbihDhikr] = useState('SubhanAllah');

  // Goals completion percent
  const [goals, setGoals] = useState({
    prayers: 5,
    quran: 10, // pages
    dhikr: 100 // count
  });

  // Daily bookmarks & favorites simulated state
  const [favorites, setFavorites] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>(['verse-1']);

  // Compass calibration mockup state
  const [compassHeading, setCompassHeading] = useState(45);
  const [calibrationDone, setCalibrationDone] = useState(false);

  // Month navigation state for Hijri calendar
  const [currentHijriMonth, setCurrentHijriMonth] = useState('Loading...');
  const [currentHijriYear, setCurrentHijriYear] = useState('1448 AH');

  useEffect(() => {
    try {
      const today = new Date();
      const hijriMonthStr = new Intl.DateTimeFormat('en-US-u-ca-islamic', { month: 'long' }).format(today);
      const hijriYearStr = new Intl.DateTimeFormat('en-US-u-ca-islamic', { year: 'numeric' }).format(today);
      setCurrentHijriMonth(hijriMonthStr);
      setCurrentHijriYear(hijriYearStr + " AH");
    } catch (e) {
      setCurrentHijriMonth('Safar');
      setCurrentHijriYear('1448 AH');
    }
  }, []);

  // Search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // Settings mock state
  const [settings, setSettings] = useState({
    calcMethod: 'Shia Ithna Ashari (Leva Institute)',
    arabicSize: 'Medium',
    language: 'English'
  });

  const navigateTo = (view: string) => {
    setViewHistory([...viewHistory, view]);
    setCompView(view);
  };

  const navigateBack = () => {
    if (viewHistory.length > 1) {
      const updatedHistory = [...viewHistory];
      updatedHistory.pop();
      setViewHistory(updatedHistory);
      setCompView(updatedHistory[updatedHistory.length - 1]);
    } else {
      navigateBackToServices();
    }
  };

  const handleToggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(x => x !== id));
      triggerToast("Removed from favorites", "info");
    } else {
      setFavorites([...favorites, id]);
      triggerToast("Added to favorites", "success");
    }
  };

  const handleToggleBookmark = (id: string) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(x => x !== id));
      triggerToast("Removed bookmark", "info");
    } else {
      setBookmarks([...bookmarks, id]);
      triggerToast("Bookmarked successfully", "success");
    }
  };

  // Simulated GPS Calibration
  useEffect(() => {
    if (compView === 'qibla') {
      const timer = setTimeout(() => {
        setCalibrationDone(true);
        setCompassHeading(223); // Standard Qibla angle for J&K region (around 223° Southwest)
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [compView]);

  // Header breadcrumb metadata helper
  const getCompanionHeaderMeta = () => {
    switch (compView) {
      case 'prayer-times':
      case 'prayer-details':
        return { breadcrumbs: ['Home', 'Islamic Companion', 'Prayer Times'], title: 'Today\'s Prayer Timings', desc: 'Fajr, Dhuhr, Asr, Maghrib, Isha timings with Shia Ithna Ashari calculations.' };
      case 'qibla':
        return { breadcrumbs: ['Home', 'Islamic Companion', 'Qibla Finder'], title: 'Real-Time Qibla Compass', desc: 'Accurate Kaaba direction using GPS & magnetometer.' };
      case 'hijri-calendar':
      case 'events-calendar':
        return { breadcrumbs: ['Home', 'Islamic Companion', 'Calendar'], title: 'Islamic Hijri Calendar', desc: 'Hijri dates, Wiladat, and Shahadat commemorations.' };
      case 'tasbih':
      case 'dhikr':
        return { breadcrumbs: ['Home', 'Islamic Companion', 'Tasbih'], title: 'Digital Tasbih Counter', desc: 'Tasbih Fatimah Zahra (S.A) and custom dhikr counter.' };
      default:
        return { breadcrumbs: ['Home', 'Islamic Companion', compView], title: compView.replace('-', ' ').toUpperCase(), desc: 'Daily worship utilities and spiritual tools.' };
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col min-h-0 bg-surface">
      
      {/* SUB-ROUTING VIEW HEADER WITH BREADCRUMBS */}
      {compView !== 'dashboard' && (
        <PageHeader 
          breadcrumbs={getCompanionHeaderMeta().breadcrumbs}
          title={getCompanionHeaderMeta().title}
          description={getCompanionHeaderMeta().desc}
          onBack={navigateBack}
        />
      )}

      {/* ----------------------------------------------------
          ACTIVE VIEW SCROLLER
          ---------------------------------------------------- */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-5">
        
        {/* ====================================================
            VIEW 1: Companion Dashboard
            ==================================================== */}
        {compView === 'dashboard' && (
          <>
            {/* Hijri Banner */}
            <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-5 border border-emerald-900/10 shadow-soft select-none flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] text-accent-light uppercase tracking-widest font-extrabold">Hijri Calendar</span>
                <h4 className="text-sm font-black text-white">17 Safar 1448 AH</h4>
                <p className="text-[10px] text-emerald-100 mt-1 max-w-[200px] leading-relaxed">
                  Month of Safar. 3 days remaining before Arbaeen (20 Safar).
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-accent text-sm font-bold shrink-0">
                🌙 Safar
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-4 gap-3 bg-white p-4 rounded-3xl border border-slate-50 shadow-soft select-none text-center">
              {[
                { label: 'Prayers', icon: 'mosque' as IconName, view: 'prayer-times' },
                { label: 'Qibla', icon: 'kaaba' as IconName, view: 'qibla' },
                { label: 'Calendar', icon: 'islamic-calendar' as IconName, view: 'hijri-calendar' },
                { label: 'Tasbih', icon: 'tasbih' as IconName, view: 'tasbih' },
                { label: 'Dua list', icon: 'prayer-hands' as IconName, view: 'daily-dua' },
                { label: 'Dhikr', icon: 'star' as IconName, view: 'dhikr' },
                { label: 'Ramadan', icon: 'ramadan' as IconName, view: 'ramadan' },
                { label: 'Muharram', icon: 'muharram' as IconName, view: 'muharram' },
                { label: 'Arbaeen', icon: 'arbaeen' as IconName, view: 'arbaeen' },
                { label: 'Ziyarat', icon: 'shrine' as IconName, view: 'ziyarat' },
                { label: 'Worship Goals', icon: 'calligraphy-frame' as IconName, view: 'goals' },
                { label: 'Daily Verse', icon: 'open-quran' as IconName, view: 'daily-verse' }
              ].map((act, i) => (
                <button
                  key={i}
                  onClick={() => navigateTo(act.view)}
                  className="flex flex-col items-center justify-center gap-1.5 p-1 hover:bg-emerald-50/50 rounded-xl transition-colors cursor-pointer group"
                >
                  <span className="text-xl flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 border border-slate-100 shadow-sm text-primary group-hover:text-accent group-hover:border-accent/30 transition-colors">
                    <AnimatedIcon name={act.icon} size={20} animation="scale" />
                  </span>
                  <span className="text-[9px] font-bold text-slate-600 tracking-wide text-center leading-tight truncate w-full">{act.label}</span>
                </button>
              ))}
            </div>

            {/* Prayer times countdown card */}
            <Card className="bg-slate-900 border border-slate-800 text-white p-5 flex flex-col gap-4 shadow-medium select-none cursor-pointer" onClick={() => navigateTo('prayer-times')}>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-accent-light uppercase tracking-widest">Next Prayer</span>
                  <h4 className="text-xs font-black text-white/95 mt-0.5">Asr is next</h4>
                </div>
                <span className="text-[10px] text-accent-light font-extrabold bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md">
                  In 1h 15m
                </span>
              </div>
            </Card>

            {/* Daily verse segment */}
            <Card className="flex flex-col gap-3 select-none cursor-pointer" onClick={() => navigateTo('daily-verse')}>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Verse of the day</span>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                "Indeed, Allah commands justice, grace, and generosity to relatives."
              </p>
              <span className="text-[9px] text-accent font-bold mt-1">Surah An-Nahl 16:90 →</span>
            </Card>
          </>
        )}

        {/* ====================================================
            VIEW 2: Prayer Times Timeline Schedule
            ==================================================== */}
        {compView === 'prayer-times' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Srinagar, J&K timings</span>

            <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft flex flex-col gap-4.5 select-none">
              {[
                { name: 'Fajr', time: '04:12 AM', desc: 'Dawn prayer', active: false },
                { name: 'Sunrise', time: '05:48 AM', desc: 'Ishraq calculations', inactive: true },
                { name: 'Dhuhr', time: '12:35 PM', desc: 'Noon prayer', active: false },
                { name: 'Asr', time: '04:10 PM', desc: 'Afternoon prayer', active: true },
                { name: 'Maghrib', time: '07:22 PM', desc: 'Dusk prayer', active: false },
                { name: 'Isha', time: '08:50 PM', desc: 'Night prayer', active: false }
              ].map((pr, i) => (
                <div 
                  key={pr.name}
                  onClick={() => navigateTo('prayer-details')}
                  className={`flex justify-between items-center p-3 rounded-2xl border transition-all cursor-pointer ${
                    pr.active 
                      ? 'bg-accent/5 border-accent text-slate-800 font-bold scale-102' 
                      : pr.inactive 
                        ? 'bg-slate-50 border-transparent opacity-50' 
                        : 'bg-slate-50 border-transparent hover:border-slate-100'
                  }`}
                >
                  <div className="flex gap-3.5 items-center">
                    <span className="text-xl">🕌</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800">{pr.name}</span>
                      <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">{pr.desc}</span>
                    </div>
                  </div>

                  <span className="text-xs font-black text-slate-800 font-mono">{pr.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 3: Prayer Details
            ==================================================== */}
        {compView === 'prayer-details' && (
          <div className="flex flex-col gap-5 select-none">
            <div className="flex flex-col gap-1.5">
              <Badge variant="accent" className="w-fit text-[8px] uppercase tracking-wider">Virtues</Badge>
              <h3 className="text-sm font-black text-slate-800 mt-1">Asr Prayer virtues</h3>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-soft">
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Performing the middle prayer (Asr) holds great rewards. Prophet (PBUH) said: "He who prays the two cool prayers (Fajr and Asr) will enter Paradise."
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4 flex gap-3 text-slate-600 mt-1">
              <IoTimeOutline className="text-xl shrink-0 mt-0.5 text-accent" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wide">Preparation check</span>
                <p className="text-[9px] text-slate-400 leading-relaxed font-semibold">
                  Make sure Wudu is valid. Best timing is right at the start of Asr.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 4: Qibla Finder Compass
            ==================================================== */}
        {compView === 'qibla' && (
          <div className="flex flex-col items-center gap-6 select-none text-center">
            <div className="flex flex-col self-start text-left">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Compass locator</span>
              <h3 className="text-base font-black text-slate-800 mt-0.5">Qibla Direction</h3>
            </div>

            {/* Compass Disc */}
            <div className="relative w-48 h-48 rounded-full border-4 border-slate-100 bg-white flex items-center justify-center shadow-lg mt-4 select-none">
              {/* Dial indicator ring */}
              <div className="absolute inset-2 rounded-full border border-slate-50/50" />
              
              {/* Compass needle */}
              <motion.div 
                animate={{ rotate: compassHeading }}
                transition={{ type: 'spring', damping: 15 }}
                className="w-1.5 h-32 bg-gradient-to-b from-accent via-accent to-slate-200 rounded-full relative"
              >
                {/* Arrow head */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-accent rotate-45 rounded-sm" />
              </motion.div>

              <div className="absolute bottom-4 text-[9px] font-bold text-slate-400 uppercase">
                {calibrationDone ? 'Aligned Southwest' : 'Calibrating compass...'}
              </div>
            </div>

            <p className="text-xs text-slate-400 font-semibold leading-relaxed max-w-[240px]">
              Qibla is at 223.4° Southwest from Srinagar. Keep device flat for alignment calibration.
            </p>
          </div>
        )}

        {/* ====================================================
            VIEW 5: Hijri Calendar navigation
            ==================================================== */}
        {compView === 'hijri-calendar' && (
          <>
            <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft select-none flex justify-between items-center">
              <button 
                onClick={() => {
                  setCurrentHijriMonth(currentHijriMonth === 'Safar' ? 'Muharram' : 'Safar');
                  triggerToast("Switched calendar month", "info");
                }}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ◀
              </button>
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">{currentHijriMonth} {currentHijriYear}</h4>
              <button 
                onClick={() => {
                  setCurrentHijriMonth(currentHijriMonth === 'Safar' ? 'Rabi Al-Awwal' : 'Safar');
                  triggerToast("Switched calendar month", "info");
                }}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ▶
              </button>
            </div>

            {/* Islamic dates calendar grid */}
            <div className="bg-white rounded-3xl p-4.5 border border-slate-50 shadow-soft select-none flex flex-col gap-3">
              <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold text-slate-600">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i} className="text-slate-400 font-extrabold text-[9px] uppercase">{d}</span>)}
                {[...Array(14)].map((_, i) => {
                  const eventDate = i === 9 || i === 19;
                  return (
                    <span 
                      key={i} 
                      onClick={() => navigateTo('events-calendar')}
                      className={`py-2 rounded-xl text-[10px] font-black border cursor-pointer ${
                        eventDate 
                          ? 'bg-amber-50 border-amber-200 text-amber-700 font-bold' 
                          : 'bg-slate-50 border-transparent text-slate-500'
                      }`}
                    >
                      {i + 1}
                    </span>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ====================================================
            VIEW 6: Islamic Events Calendar Details
            ==================================================== */}
        {compView === 'events-calendar' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Safar important anniversaries</span>
            
            <div className="flex flex-col gap-3.5">
              {[
                { title: 'Arbaeen of Imam Hussain (AS)', date: '20 Safar 1448 AH', desc: 'Marking the 40th day after the martyrdom of Imam Hussain (AS) in Karbala.' },
                { title: 'Demise of Prophet Muhammad (PBUH)', date: '28 Safar 1448 AH', desc: 'Martyrdom anniversary of the Holy Prophet (PBUH) commemorated central assemblies.' }
              ].map((ev, i) => (
                <Card key={i} className="flex flex-col gap-2 select-none">
                  <Badge variant="warning" className="w-fit text-[8px] uppercase tracking-wider">{ev.date}</Badge>
                  <h4 className="text-xs font-extrabold text-slate-800 leading-snug mt-1">{ev.title}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed mt-1">{ev.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 7: Daily Quran Verse Details
            ==================================================== */}
        {compView === 'daily-verse' && (
          <div className="flex flex-col gap-5 select-none">
            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-soft flex flex-col items-center text-center gap-4">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Surah An-Nahl 16:90</span>
              
              {/* Arabic typography */}
              <p className="text-lg font-bold font-arabic leading-loose text-slate-800 my-4 direction-rtl">
                إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَىٰ
              </p>

              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                "Indeed, Allah commands justice, grace, and generosity to relatives."
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleToggleBookmark('verse-1')}
                leftIcon={bookmarks.includes('verse-1') ? <IoBookmark className="text-accent" /> : <IoBookmarkOutline />}
              >
                <span>{bookmarks.includes('verse-1') ? 'Bookmarked' : 'Bookmark'}</span>
              </Button>

              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  handleToggleFavorite('verse-1');
                }}
                leftIcon={favorites.includes('verse-1') ? <IoHeart className="text-red-500" /> : <IoHeartOutline />}
              >
                <span>{favorites.includes('verse-1') ? 'Favorited' : 'Favorite'}</span>
              </Button>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 8: Daily Hadith Explanation
            ==================================================== */}
        {compView === 'daily-hadith' && (
          <div className="flex flex-col gap-5 select-none">
            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-soft flex flex-col gap-4">
              <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase">
                <span>Hadith Daily</span>
                <span>Bihar Al-Anwar</span>
              </div>

              <p className="text-base font-bold font-arabic leading-loose text-slate-800 text-center my-3 direction-rtl">
                عَلَيْكُمْ بِالْعِلْمِ فَإِنَّ طَلَبَهُ فَرِيضَةٌ
              </p>

              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                "Acquire knowledge, for indeed seeking it is an obligatory duty."
              </p>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 9: Daily Dua Supplications
            ==================================================== */}
        {compView === 'daily-dua' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Daily Supplications</span>

            <Card className="flex flex-col gap-3.5 select-none">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <Badge variant="primary" className="text-[8px] uppercase tracking-wider mb-1.5">Recommended Daily</Badge>
                  <h4 className="text-xs font-extrabold text-slate-800 leading-snug">Dua Al-Ahad</h4>
                  <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">Pledge allegiance to Imam Mahdi (ATFS)</span>
                </div>
                <span className="text-2xl">🤲</span>
              </div>

              <div className="flex gap-3 justify-end pt-1 border-t border-slate-50 mt-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => triggerToast("Simulating playing audio recitation", "success")}
                  leftIcon={<IoPlayOutline />}
                >
                  <span>Play recitation audio</span>
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* ====================================================
            VIEW 10: Tasbih Digital Counter
            ==================================================== */}
        {compView === 'tasbih' && (
          <div className="flex flex-col items-center gap-6 select-none text-center">
            {/* Tasbih dhikr horizontal selection */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 self-start">
              {['SubhanAllah', 'Alhamdulillah', 'AllahuAkbar'].map(dh => (
                <Badge 
                  key={dh}
                  variant={tasbihDhikr === dh ? 'accent' : 'neutral'}
                  className="cursor-pointer px-3 py-1 font-bold"
                  onClick={() => {
                    setTasbihDhikr(dh);
                    setTasbihCount(0);
                    setTasbihGoal(dh === 'AllahuAkbar' ? 34 : 33);
                  }}
                >
                  {dh}
                </Badge>
              ))}
            </div>

            {/* Circular Counter button */}
            <div 
              onClick={() => {
                if (tasbihCount < tasbihGoal) {
                  setTasbihCount(tasbihCount + 1);
                  if (tasbihCount + 1 === tasbihGoal) {
                    triggerToast(`${tasbihDhikr} completion achieved!`, "success");
                  }
                }
              }}
              className="w-44 h-44 rounded-full border-4 border-emerald-800/10 bg-white flex flex-col items-center justify-center shadow-lg mt-4 cursor-pointer hover:bg-emerald-50/10 active:scale-95 transition-all select-none"
            >
              <span className="text-3xl font-black text-slate-800 font-mono">{tasbihCount}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Goal: {tasbihGoal}</span>
            </div>

            <div className="flex gap-3 justify-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setTasbihCount(0)}
                leftIcon={<IoRefreshOutline />}
              >
                <span>Reset Count</span>
              </Button>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 11: Daily Dhikr morning/evening
            ==================================================== */}
        {compView === 'dhikr' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Morning & Evening Dhikr</span>
            
            <div className="flex flex-col gap-3.5">
              {[
                { title: 'Morning: Tasbih of Fatima Zahra (SA)', count: '100 times', desc: '34 Allahu Akbar, 33 Alhamdulillah, 33 SubhanAllah' },
                { title: 'Evening: Salawat on Prophet & Ahlul Bayt', count: '100 times', desc: 'Sending blessings upon the Holy Household.' }
              ].map((dh, i) => (
                <Card key={i} className="flex justify-between items-center select-none">
                  <div className="flex flex-col">
                    <h4 className="text-xs font-bold text-slate-800 leading-snug">{dh.title}</h4>
                    <span className="text-[9px] text-slate-400 font-semibold block mt-1">{dh.desc}</span>
                  </div>

                  <Badge variant="primary" className="text-[8px] uppercase tracking-wider shrink-0">{dh.count}</Badge>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 13: Ramadan Companion
            ==================================================== */}
        {compView === 'ramadan' && (
          <div className="flex flex-col gap-5 select-none text-center items-center">
            {/* Ramadan graphic header */}
            <div className="w-full bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-5 border border-emerald-900/10 shadow-soft text-left">
              <span className="text-[8px] text-accent-light uppercase tracking-widest font-extrabold">Ramadan Companion</span>
              <h4 className="text-sm font-black text-white mt-1">220 Days until Ramadan 1448 AH</h4>
              <p className="text-[10px] text-emerald-100 mt-1 max-w-[200px] leading-relaxed">
                Suhoor: 04:12 AM • Iftar: 07:22 PM (based on Kashmir local Shia calculations)
              </p>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 14: Muharram Companion
            ==================================================== */}
        {compView === 'muharram' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Muharram Majlis programs</span>
            
            <div className="bg-slate-950 text-white border border-slate-900 rounded-3xl p-4.5 shadow-medium flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <div className="flex flex-col">
                  <span className="text-[8px] text-amber-500 font-bold uppercase tracking-wider">Live Broadcast</span>
                  <h4 className="text-xs font-extrabold text-white mt-0.5">Srinagar Central Imambara Majlis</h4>
                </div>
                <Badge variant="error" className="text-[8px] uppercase tracking-wider animate-pulse">Live</Badge>
              </div>

              <div className="flex flex-col gap-1.5 text-[9px] text-slate-400 font-semibold select-none">
                <span className="flex items-center gap-1.5"><IoTimeOutline /> Time: 09:00 PM - 11:30 PM</span>
                <span className="flex items-center gap-1.5"><IoLocationOutline /> Reciter: Maulana Syed Mohammad</span>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 15: Arbaeen Companion
            ==================================================== */}
        {compView === 'arbaeen' && (
          <div className="flex flex-col gap-5 select-none">
            <div className="bg-gradient-to-br from-amber-600 to-amber-800 text-white rounded-3xl p-5 shadow-soft">
              <span className="text-[8px] text-white/80 uppercase tracking-widest font-extrabold">Arbaeen Pilgrimage Guide</span>
              <h4 className="text-sm font-black text-white mt-1">5 Days remaining before Arbaeen Walk</h4>
              <p className="text-[10px] text-amber-100 mt-1 leading-relaxed">
                Walking progress from Najaf to Karbala (Pole 1 to 1452).
              </p>
            </div>

            <Card className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Daily Ziyarat reading</span>
              <h4 className="text-xs font-extrabold text-slate-800 leading-snug">Ziyarat Arbaeen</h4>
              <p className="text-[10px] text-slate-400 font-semibold block">Recited on the day of Arbaeen (20 Safar) for rewards.</p>
              
              <div className="flex justify-end pt-1 mt-1 border-t border-slate-50">
                <Button variant="outline" size="sm" onClick={() => navigateTo('ziyarat')}>
                  <span>Open Ziyarat Book</span>
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* ====================================================
            VIEW 16: Ziyarat Book List
            ==================================================== */}
        {compView === 'ziyarat' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Ziyarat Directory</span>
            
            <div className="flex flex-col gap-3.5">
              {['Ziyarat Ashura', 'Ziyarat Waritha', 'Ziyarat Amin Allah'].map((ziy) => (
                <Card 
                  key={ziy}
                  className="flex justify-between items-center hover:border-emerald-100 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📜</span>
                    <h4 className="text-xs font-bold text-slate-800">{ziy}</h4>
                  </div>
                  <IoChevronBackOutline className="rotate-180 text-slate-400 text-xs" />
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 17: Worship Goals
            ==================================================== */}
        {compView === 'goals' && (
          <div className="flex flex-col gap-5 select-none">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="flex flex-col p-3 bg-white border border-slate-50 rounded-3xl shadow-soft">
                <span className="text-lg font-black text-slate-800">5 / 5</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 leading-snug">Prayers prayed</span>
              </div>
              <div className="flex flex-col p-3 bg-white border border-slate-50 rounded-3xl shadow-soft">
                <span className="text-lg font-black text-primary">10 pages</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 leading-snug">Quran read</span>
              </div>
            </div>

            {/* Worship goals details progress */}
            <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft flex flex-col gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Daily Worship Goals</span>
              
              {[
                { label: 'Obligatory Daily Prayers', val: '5/5 prayed', percent: 100 },
                { label: 'Quran Recitation pages', val: '10/15 pages', percent: 66 },
                { label: 'Daily Dhikr Fatima Zahra (SA)', val: '100/100 times', percent: 100 }
              ].map((gl, i) => (
                <div key={i} className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
                  <div className="flex justify-between items-center">
                    <span>{gl.label}</span>
                    <span className="text-accent">{gl.val}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${gl.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 18: Notification reminders preview
            ==================================================== */}
        {compView === 'notifications' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Recent Islamic alerts</span>
            
            <div className="grid grid-cols-1 gap-4">
              <Card className="flex gap-3.5 items-start select-none">
                <span className="text-xl">🕌</span>
                <div>
                  <Badge variant="primary" className="text-[8px] uppercase tracking-wider mb-1">Athan</Badge>
                  <h4 className="text-xs font-extrabold text-slate-800 leading-snug">Time for Asr Prayer in Srinagar</h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed mt-1">
                    Athan calculations scheduled for 04:10 PM local Kashmir timezone.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 19: Global Search
            ==================================================== */}
        {compView === 'search' && (
          <div className="flex flex-col gap-4">
            <Input 
              placeholder="Search verses, dua or islamic events..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<IoSearchOutline />}
            />

            {searchQuery.trim() === '' ? (
              <div className="text-center text-[10px] text-slate-400 italic py-6 select-none">
                Type queries to search Bihar Al-Anwar or Quran verses.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search Matches</span>
                {['Surah An-Nahl Verse 90'].filter(v => v.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                  <div 
                    onClick={() => navigateTo('daily-verse')}
                    className="p-3 border border-slate-50 bg-white rounded-2xl cursor-pointer hover:bg-slate-50"
                  >
                    <h4 className="text-xs font-bold text-slate-800 truncate">Surah An-Nahl 16:90</h4>
                    <span className="text-[9px] text-slate-400 font-bold block mt-0.5">"Indeed, Allah commands justice..."</span>
                  </div>
                ) : (
                  <EmptyState title="No matched references" description="Refine search keywords." icon="🔍" />
                )}
              </div>
            )}
          </div>
        )}

        {/* ====================================================
            VIEW 20: Settings View
            ==================================================== */}
        {compView === 'settings' && (
          <div className="flex flex-col gap-4 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Islamic settings</span>
            
            <div className="bg-white border border-slate-100 rounded-3xl p-4.5 shadow-soft flex flex-col gap-4 text-xs font-bold text-slate-700">
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] text-slate-400 uppercase font-bold">Calculation method</span>
                <select 
                  value={settings.calcMethod}
                  onChange={(e) => setSettings({ ...settings, calcMethod: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none"
                >
                  {['Shia Ithna Ashari (Leva Institute)', 'Islamic Society of North America'].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <hr className="border-slate-50" />

              <div className="flex justify-between items-center">
                <span>Arabic font scale size</span>
                <Badge variant="neutral" className="text-[9px] font-bold">Medium scale</Badge>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 21: EMPTY STATES (Bookmarks zero state)
            ==================================================== */}
        {compView === 'empty-states' && (
          <div className="flex flex-col gap-4 items-center justify-center py-6 select-none">
            <EmptyState 
              title="No Favorites Saved" 
              description="Dua or Quranic chapters favorited will display here for offline access."
              icon="💖"
            />
          </div>
        )}

      </div>
    </div>
  );
};
export default IslamicCompanionModule;
