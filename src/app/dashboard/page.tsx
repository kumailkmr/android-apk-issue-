"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { BottomNav } from '@/components/layout/BottomNav';
import { TopBar } from '@/components/layout/TopBar';
import { NavigationDrawer } from '@/components/layout/NavigationDrawer';
import { LearnModule } from '@/components/learn/LearnModule';
import { CommunityModule } from '@/components/community/CommunityModule';
import { MaktabModule } from '@/components/maktab/MaktabModule';
import { IslamicCompanionModule } from '@/components/companion/IslamicCompanionModule';
import { ProfileModule } from '@/components/profile/ProfileModule';
import { DiscoverModule } from '@/components/discover/DiscoverModule';
import { FeaturedContentCarousel } from '@/components/home/FeaturedContentCarousel';
import { AboutAnjumanStorytelling } from '@/components/about/AboutAnjumanStorytelling';
import { HistoryOfAnjuman, IslamicCountdowns, TodayAtAnjuman, DailyIslamicChallenges, AskTheScholarAI, ShortVideoFeed } from '@/components/home/SuperAppModules';
import { LeadershipDirectory, HallOfRecognition, MyIslamicJourney, AudioRadioPlayer } from '@/components/home/SuperAppModulesExtended';
import { OrganizationHierarchy, DigitalAnnualReport, DigitalVisionRoadmap, IslamicKnowledgeHub, AhlulBaytKnowledgeCenter, IslamicHistoryTimeline, SmartLearningDashboard, StudyPlanner } from '@/components/home/SuperAppExtensions';
import { QuranExperienceTracker, CommunityPolls, ZiyaratGuide, KashmirCommunityMap, DigitalTrophyRoom } from '@/components/home/SuperAppExtensionsPhase2';
import { BudgamKashmirMapCard } from '@/components/home/BudgamKashmirMapCard';
import { PremiumDonationExperience } from '@/components/donation/PremiumDonationExperience';
import { PageHeader } from '@/components/ui/PageHeader';
import { PremiumSplashScreen } from '@/components/ui/PremiumSplashScreen';
import { FloatingQuickActionButton } from '@/components/ui/FloatingQuickActionButton';
import { LiveActivityFeedTicker } from '@/components/home/LiveActivityFeedTicker';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';
import { OfflineStatusBanner } from '@/components/ui/OfflineStatusBanner';
import { 
  mockLectures, 
  mockShrines, 
  mockEvents, 
  mockBooks, 
  mockCourses, 
  mockMember, 
  mockDonations 
} from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DigitalID } from '@/components/ui/DigitalID';
import { LiveBroadcast } from '@/components/ui/LiveBroadcast';
import { AnimatedIcon, IconName } from '@/components/ui/icons';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';
import { Input } from '@/components/ui/Input';
import { Dialog } from '@/components/ui/Dialog';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { 
  BookCard, 
  CourseCard, 
  CertificateCard, 
  EventCard, 
  DonationCampaignCard 
} from '@/components/ui/cards/Cards';
import { TimetableCard, MaktabFeeCard } from '@/components/maktab/Maktab';
import { Carousel } from '@/components/ui/media/Media';
import { 
  LinearProgress, 
  CircularProgress, 
  CountdownTimer,
  Stepper 
} from '@/components/ui/status/Status';
import { Toast, OfflineState } from '@/components/ui/feedback/Feedback';
import { 
  IoNotificationsOutline, 
  IoSearchOutline, 
  IoCompassOutline,
  IoBookOutline,
  IoMoonOutline,
  IoCheckmarkCircle,
  IoLogOutOutline,
  IoMenuOutline,
  IoBookmarkOutline,
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoPlayCircleOutline,
  IoRibbonOutline,
  IoCalendarOutline,
  IoLocationOutline,
  IoReloadOutline,
  IoTimeOutline,
  IoPeopleOutline,
  IoSchoolOutline,
  IoSettingsOutline,
  IoHeartOutline,
  IoGridOutline,
  IoCloseOutline,
  IoClose
} from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

const ANJUMAN_GALLERY_IMAGES = [
  "https://img-cdn.publive.online/fit-in/640x480/filters:format(webp)/greater-kashmir/media/media_files/2026/06/01/screenshot-2026-06-01-055712-2026-06-01-06-01-44.jpg",
  "https://mir-s3-cdn-cf.behance.net/projects/404/71299b26483109.55603ea4548dc.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWqFgYviaXhti76LRXQQu0LCt46AmtBKEt_xJklUxIe-dgU_uGYh7gUfs&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgpNS2qe2jt7Gg2807V8oNFiAnCdQCEk8GqBRE9TTBLtgJi-OjRRqExc3k&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqiY-3ABRv-fUYVtaDq1U7bhnOHYmPhNkaq-qbNZaoD3ZrPrUxVUoxJGw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3RK2l9LlDRkSYxNIm4BbUBQoKEDe20JLwoeR82oSYjb3194NyxGim1Hpr&s=10",
  "https://media.abna24.com/d/2026/06/13/4/3183003.jpg?ts=1781339261000",
  "https://media.abna24.com/d/2026/06/13/3/3183010.jpg?ts=1781339261000",
];

export default function HomeDashboard() {
  const router = useRouter();
  const { t, language, dir } = useLanguage();
  
  // Tab controller state: 'home', 'learn', 'discover', 'services', 'profile'
  const [currentTab, setCurrentTab] = useState('home');

  const [isGuest, setIsGuest] = useState(true);
  const [userRole, setUserRole] = useState('coordinator');
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mode = localStorage.getItem('userMode');
      const role = localStorage.getItem('userRole');
      if (mode === 'authenticated') {
        setIsGuest(false);
      } else {
        setIsGuest(true);
        localStorage.setItem('userMode', 'guest');
      }
      if (role) {
        setUserRole(role);
      }
    }
  }, []);
  
  // Services sub-routing states
  const [servicesView, setServicesView] = useState<'launcher' | 'maktab' | 'companion' | 'donation'>('launcher');
  const [companionInitialView, setCompanionInitialView] = useState('dashboard');
  
  // Interactive overlays
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [widgetManagerOpen, setWidgetManagerOpen] = useState(false);
  const [profileView, setProfileView] = useState<string>('dashboard');
  
  // Clicked details sheets
  const [activeLecture, setActiveLecture] = useState<any>(null);
  const [activeDonation, setActiveDonation] = useState<any>(null);
  const [activeEvent, setActiveEvent] = useState<any>(null);
  
  const [showGallery, setShowGallery] = useState(false);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [splashDone, setSplashDone] = useState(false);
  const mainScrollRef = React.useRef<HTMLDivElement>(null);

  // Dynamic Current Date
  const [currentDate, setCurrentDate] = useState({ gregorian: 'Loading...', hijri: 'Loading...' });

  useEffect(() => {
    const today = new Date();
    try {
      const gDate = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(today);
      let hDate = '';
      try {
        hDate = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', { day: 'numeric', month: 'long', year: 'numeric' }).format(today) + " AH";
      } catch {
        hDate = new Intl.DateTimeFormat('en-US-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(today) + " AH";
      }
      setCurrentDate({
        gregorian: gDate,
        hijri: hDate
      });
    } catch (e) {
      setCurrentDate({ gregorian: 'Friday, July 31, 2026', hijri: '17 Safar 1448 AH' });
    }
  }, []);

  // Search query
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(['Ashura 1448', 'Nahjul Balagha Fiqh', 'Aga Syed Hassan sermons']);

  // Pull to refresh simulation
  const [refreshing, setRefreshing] = useState(false);
  const [pullProgress, setPullProgress] = useState(0);

  // Home widgets visibility configuration
  const [widgets, setWidgets] = useState({
    welcomeCard: true,
    quickActions: true,
    prayerTimes: true,
    islamicSection: true,
    continueLearning: true,
    volunteerCard: true,
    membershipCard: true,
    announcements: true,
    digitalLibrary: true,
    videoGallery: true,
    upcomingEvents: true,
    donationGoals: true,
    communityStats: true
  });

  // Dynamic notification read states
  const [notifications, setNotifications] = useState([
    { id: 'n1', title: 'New Sermon Added', desc: 'Watch "Wilayah & Leadership" by Aga Syed Hassan.', time: '10m ago', unread: true },
    { id: 'n2', title: 'Maktab Term Fee Generated', desc: 'August 2026 term fee receipt is ready to view.', time: '2h ago', unread: true },
    { id: 'n3', title: 'Volunteer Ration Duty Srinagar', desc: 'Ration deployment assembly starts at 4:00 PM today.', time: '4h ago', unread: false }
  ]);

  // Alert Dialog simulator
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertData, setAlertData] = useState({ title: '', message: '', type: 'info' as any });

  const triggerAlert = (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') => {
    setAlertData({ title, message, type });
    setAlertOpen(true);
  };

  // Toast state simulator
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState<'success' | 'warning' | 'error' | 'info'>('info');

  const triggerToast = (msg: string, type: 'success' | 'warning' | 'error' | 'info') => {
    setToastMsg(msg);
    setToastType(type);
    setToastOpen(true);
  };

  // Pull to refresh gesture simulation (trigger reset on pull down)
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollTop === 0) {
      // Allow pull simulation
    }
  };

  const simulateRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      triggerAlert("Dashboard Synced", "All schedules, prayer times, and member ledgers have been updated from offline cache.", "success");
    }, 1800);
  };

  // Task / Homework updates
  const [hasCompletedTask, setHasCompletedTask] = useState(false);

  return (
    <div className="relative w-full h-[892px] max-h-screen sm:max-h-[892px] bg-surface flex flex-col font-sans overflow-hidden border-0 sm:border border-slate-200 sm:rounded-[36px] shadow-2xl">
      <OfflineStatusBanner />
      {!splashDone && <PremiumSplashScreen onFinish={() => setSplashDone(true)} />}
      
      {/* ----------------------------------------------------
          1. STICKY GLASSMORPHIC TOP APP BAR & NAVIGATION DRAWER
          ---------------------------------------------------- */}
      <TopBar 
        activeTab={currentTab}
        setActiveTab={(t) => setCurrentTab(t as any)}
        onMenuClick={() => setDrawerOpen(true)}
        onSearchClick={() => setSearchOpen(true)}
        onNotificationClick={() => setNotifOpen(true)}
      />

      <NavigationDrawer 
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentTab={currentTab}
        onSelectTab={(tab, subView) => {
          setCurrentTab(tab as any);
          if (subView) {
            setProfileView(subView);
            setServicesView(subView as any);
          }
        }}
        triggerToast={triggerToast}
      />

      {/* ----------------------------------------------------
          2. SCROLLABLE VIEWS CONTAINER WITH PULL TO REFRESH
          ---------------------------------------------------- */}
      <div 
        ref={mainScrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto no-scrollbar pb-16 relative"
      >

        {/* TAB 1: DASHBOARD CORE (Home Tab) */}
        {currentTab === 'home' && (
          <div className="flex flex-col gap-5 p-4 pt-1">
            
            {/* FEATURED CONTENT SPOTLIGHT CAROUSEL */}
            <FeaturedContentCarousel 
              isGuest={isGuest}
              openAuthDialog={() => setShowAuthDialog(true)}
              triggerToast={triggerToast}
            />

            {/* LIVE REAL-TIME COMMUNITY ACTIVITY TICKER */}
            <LiveActivityFeedTicker triggerToast={triggerToast} />

            {/* WELCOME CARD WITH ISLAMIC GEOMETRIC BACKDROP */}
            {widgets.welcomeCard && (
              <Card className="bg-gradient-to-br from-primary to-primary-dark text-white p-5 relative overflow-hidden shadow-medium border-emerald-950/20 select-none">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0">
                  <svg width="100%" height="100%">
                    <pattern id="star-patt" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 15,0 L 30,15 L 15,30 L 0,15 Z" fill="none" stroke="currentColor" strokeWidth="0.7" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#star-patt)" />
                  </svg>
                </div>
                
                <div className="flex flex-col gap-1 z-10 relative">
                  <span className="text-[10px] text-accent-light tracking-widest uppercase font-extrabold">Hijri Calendar</span>
                  <h3 className="text-base font-extrabold text-white leading-tight">{currentDate.hijri}</h3>
                  <span className="text-[10px] text-emerald-300 font-bold block">{currentDate.gregorian}</span>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 z-10 relative flex flex-col">
                  <span className="text-[8px] font-extrabold text-accent-light uppercase tracking-widest leading-none">Today's Quote</span>
                  <p className="text-[10.5px] leading-relaxed italic text-emerald-100 font-medium mt-1">
                    "Indeed, Allah commands justice, grace, and generosity to relatives." - Surah An-Nahl 16:90
                  </p>
                </div>
              </Card>
            )}

            {/* PRAYER TIMES CARD TIMELINES */}
            {widgets.prayerTimes && (
              <Card className="bg-slate-900 border border-slate-800 text-white p-5 flex flex-col gap-4 shadow-medium">
                <div className="flex justify-between items-center select-none">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-accent-light uppercase tracking-widest">Srinagar, Kashmir</span>
                    <h4 className="text-xs font-black text-white/95 mt-0.5">Today's Prayer Timings</h4>
                  </div>
                  <span className="text-[10px] text-accent-light font-extrabold bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md">
                    Asr starts in 1h 15m
                  </span>
                </div>

                <div className="flex justify-between items-center gap-1.5 select-none">
                  {[
                    { name: 'Fajr', time: '04:12 AM', pass: true },
                    { name: 'Dhuhr', time: '12:35 PM', pass: true },
                    { name: 'Asr', time: '04:10 PM', active: true },
                    { name: 'Maghrib', time: '07:22 PM' },
                    { name: 'Isha', time: '08:50 PM' }
                  ].map((pr) => (
                    <div 
                      key={pr.name}
                      className={`flex flex-col items-center p-2 rounded-xl border transition-all flex-1 ${
                        pr.active 
                          ? 'bg-accent/20 border-accent text-accent-light shadow-sm shadow-accent/10 scale-105' 
                          : pr.pass
                            ? 'bg-white/5 border-transparent text-white/40'
                            : 'bg-white/5 border-transparent text-white/70'
                      }`}
                    >
                      <span className="text-[9px] font-bold uppercase tracking-wider">{pr.name}</span>
                      <span className="text-[10px] font-black font-mono mt-1">{pr.time.split(' ')[0]}</span>
                      <span className="text-[7px] font-bold text-white/30 leading-none mt-0.5">{pr.time.split(' ')[1]}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}



            {/* PRAYER TIMES & HIJRI CALENDAR */}
            {widgets.prayerTimes && (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Prayer Times & Date</span>
                <div className="bg-gradient-to-br from-primary to-emerald-900 rounded-3xl p-5 shadow-soft text-white flex flex-col gap-4 relative overflow-hidden">
                  {/* Decorative background element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3" />
                  
                  <div className="flex justify-between items-center z-10">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{currentDate.hijri}</span>
                      <span className="text-[10px] text-accent-light">{currentDate.gregorian}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-medium text-white/80 uppercase">Next: Maghrib</span>
                      <span className="text-sm font-bold text-accent">in 2h 15m</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2 z-10 pt-2 border-t border-white/20 text-center">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] text-white/70 uppercase font-semibold">Fajr</span>
                      <span className="text-xs font-bold">4:30</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] text-white/70 uppercase font-semibold">Dhuhr</span>
                      <span className="text-xs font-bold">12:15</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] text-white/70 uppercase font-semibold">Asr</span>
                      <span className="text-xs font-bold">3:45</span>
                    </div>
                    <div className="flex flex-col gap-1 bg-white/20 rounded-lg py-1 px-0.5 -mx-1 border border-accent/30 shadow-inner">
                      <span className="text-[9px] text-accent-light uppercase font-bold">Maghrib</span>
                      <span className="text-xs font-black text-white">6:45</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] text-white/70 uppercase font-semibold">Isha</span>
                      <span className="text-xs font-bold">8:00</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BUDGAM JAMMU & KASHMIR REGIONAL MAP SHOWCASE */}
            <BudgamKashmirMapCard triggerToast={triggerToast} />

            {/* LIVE BROADCAST */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center px-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  Live Broadcast
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                </span>
                <span className="text-[9px] font-bold text-red-500 uppercase tracking-wider bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">Now Live</span>
              </div>
              <LiveBroadcast 
                videoId="lnsMv1-vnZE" 
                title="Majlis E Aza (02 Safar) | Aga Syed Mujtaba Abbas Mosavi" 
                author="ABU TURAB TV" 
              />
            </div>

            {/* ANJUMAN SHARIE SHIAN GALLERY */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center px-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Anjuman Photo Gallery</span>
                <button className="text-[10px] font-bold text-accent uppercase tracking-wider hover:underline" onClick={() => { setActiveGalleryIdx(0); setShowGallery(true); }}>View All</button>
              </div>
              <div className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth px-0.5">
                {ANJUMAN_GALLERY_IMAGES.map((imgSrc, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => { setActiveGalleryIdx(idx); setShowGallery(true); }}
                    className="min-w-[120px] max-w-[120px] shrink-0 h-[85px] rounded-xl overflow-hidden shadow-soft cursor-pointer relative group border border-slate-50 bg-slate-100"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgSrc} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* TODAY'S ISLAMIC SECTION CAROUSEL */}
            {widgets.islamicSection && (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Today's Islamic Guidance</span>
                <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth px-0.5">
                  <DailyQuranCard 
                    title="Verse of the Day" 
                    arabic="إِنَّ اللَّهَ مَعَ الصَّابِرِينَ" 
                    translation="Indeed, Allah is with the patient." 
                    source="Surah Al-Baqarah 2:153" 
                  />
                  <DailyQuranCard 
                    title="Hadith of the Day" 
                    arabic="خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ" 
                    translation="The best of you are those who learn the Quran and teach it." 
                    source="Sahih Al-Bukhari" 
                  />
                </div>
              </div>
            )}

            {/* CONTINUE LEARNING PROGRESS */}
            {!isGuest && widgets.continueLearning && (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Continue Learning</span>
                <div className="bg-white rounded-3xl p-4.5 border border-slate-50 shadow-soft flex flex-col gap-4">
                  {[
                    { title: 'Surah Al-Baqarah Tafseer', desc: 'Ayah 120-134', progress: 62 },
                    { title: 'Nahjul Balagha Lect. Series', desc: 'Sermon 4: Philosophy', progress: 15 },
                    { title: 'Shia Jurisprudence Level II', desc: 'Fiqh: rules of fasting', progress: 80 }
                  ].map((learn, idx) => (
                    <div key={idx} className="flex flex-col gap-1.5 select-none">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                        <span className="truncate max-w-[200px]">{learn.title}</span>
                        <span className="text-[10px] text-accent">{learn.progress}%</span>
                      </div>
                      <LinearProgress value={learn.progress} color="bg-primary" />
                      <span className="text-[8.5px] text-slate-400 font-semibold">{learn.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VOLUNTEER HOURS CARD */}
            {!isGuest && widgets.volunteerCard && (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Volunteer Duty</span>
                <Card className="flex flex-col gap-3">
                  <div className="flex justify-between items-start select-none">
                    <div>
                      <Badge variant="primary" className="text-[8px] uppercase tracking-wider mb-1">Active assignment</Badge>
                      <h4 className="text-xs font-extrabold text-slate-800 leading-snug">Jaloos Security & Sabeel</h4>
                    </div>
                    <Badge variant="accent" className="text-[8px] px-2 font-mono">Husseini Guard</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-100/50 rounded-2xl p-3 text-center mt-1 select-none">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-slate-400 font-bold uppercase">Duty Log</span>
                      <span className="text-sm font-black text-slate-800 mt-0.5">14 hrs</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] text-slate-400 font-bold uppercase">Impact</span>
                      <span className="text-sm font-black text-slate-800 mt-0.5">5k+ Azadars</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] text-slate-400 font-bold uppercase">Date Due</span>
                      <span className="text-sm font-black text-slate-800 mt-0.5">20 Safar</span>
                    </div>
                  </div>
                  <div className="flex justify-end pt-1 border-t border-slate-50 mt-1">
                    <Button variant="outline" size="sm" onClick={() => triggerAlert("Volunteer Briefing", "Please assemble at Astan Budgam at 8:00 AM sharp. Bring your digital ID badge.", "info")}>
                      <span className="text-[10px] font-bold uppercase">Duty Briefing</span>
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {/* MEMBERSHIP DIGITAL ID CARD PREVIEW */}
            {!isGuest && widgets.membershipCard && (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Digital Membership ID</span>
                <div className="bg-white rounded-3xl p-4 border border-slate-50 shadow-soft">
                  <DigitalID />
                </div>
              </div>
            )}

            {/* ANNOUNCEMENTS SLIDER */}
            {widgets.announcements && (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Latest Announcements</span>
                <Carousel items={[
                  { tag: "Spotlight News", title: "Arbaeen Hussaini Commemoration Assembly Announced", imageUrl: "/arbaeen_banner.jpg" },
                  { tag: "Latest Programs", title: "Muharram Sermon Series with Top Scholars", imageUrl: "https://pbs.twimg.com/media/GhUt481a8AAweRc.jpg" },
                  { tag: "Community Initiatives", title: "Annual Orphan & Education Fund Campaign", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6OBt69XtAubr0_ST4XQqeykku_BSUaj6VYoxNAJETLQ&s" }
                ]} />
              </div>
            )}


            {/* DIGITAL LIBRARY & FEATURED BOOKS */}
            {widgets.digitalLibrary && (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center px-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Digital Library</span>
                  <button className="text-[10px] font-bold text-accent uppercase tracking-wider hover:underline" onClick={() => triggerToast("Opening full library...", "info")}>View All</button>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth px-0.5">
                  {[
                    { title: 'Nahjul Balagha', author: 'Imam Ali (as)', color: 'from-blue-600 to-blue-900' },
                    { title: 'Sahifa Sajjadiyya', author: 'Imam Zain-ul-Abideen', color: 'from-emerald-600 to-emerald-900' },
                    { title: 'Al-Kafi', author: 'Sheikh Kulayni', color: 'from-amber-700 to-amber-900' },
                    { title: 'Tafsir al-Mizan', author: 'Allamah Tabatabai', color: 'from-indigo-600 to-indigo-900' },
                    { title: 'Mafatih al-Jinan', author: 'Sheikh Abbas Qumi', color: 'from-teal-600 to-teal-900' },
                    { title: 'Kitab al-Irshad', author: 'Sheikh al-Mufid', color: 'from-rose-700 to-rose-900' },
                    { title: 'Bahar al-Anwar', author: 'Allamah Majlisi', color: 'from-sky-600 to-sky-900' },
                    { title: 'Kamil al-Ziyarat', author: 'Ibn Qulawayh', color: 'from-violet-600 to-violet-900' }
                  ].map((book, idx) => (
                    <div key={idx} className="min-w-[140px] max-w-[140px] shrink-0 flex flex-col gap-2 group cursor-pointer" onClick={() => triggerToast(`Opening ${book.title}...`, "success")}>
                      <div className={`w-full aspect-[2/3] rounded-2xl bg-gradient-to-br ${book.color} shadow-md flex items-center justify-center p-3 relative overflow-hidden group-hover:-translate-y-1 transition-transform duration-300`}>
                        <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                        <div className="absolute left-3 top-0 bottom-0 w-px bg-white/20 shadow-[1px_0_2px_rgba(0,0,0,0.2)]" />
                        <div className="z-10 text-center flex flex-col items-center gap-2">
                           <span className="text-white/50 border border-white/50 rounded-full p-2"><IoBookOutline className="text-xl" /></span>
                           <h4 className="text-white font-bold text-sm leading-tight font-serif drop-shadow-md">{book.title}</h4>
                        </div>
                      </div>
                      <div className="flex flex-col px-1">
                        <span className="text-xs font-bold text-slate-800 truncate">{book.title}</span>
                        <span className="text-[10px] text-slate-500 font-semibold">{book.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIDEO GALLERY & SHORT CLIPS */}
            {widgets.videoGallery && (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center px-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Featured Shorts</span>
                  <button className="text-[10px] font-bold text-accent uppercase tracking-wider hover:underline" onClick={() => triggerToast("Opening video gallery...", "info")}>Watch More</button>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth px-0.5">
                  {[
                    { title: 'MAJLIS-E-AZA | KHATEEB: AGA SYED MUJTABA ABBAS AL-MOUSAVI AL-SAFAVI | VENUE MOMINABAD SRINAGAR', duration: 'Short', views: 'YouTube', img: 'https://i.ytimg.com/vi/YbapdVcweI8/hqdefault.jpg', id: 'YbapdVcweI8' },
                    { title: 'Battle of doctrins // Syed Arshad Hussain Mosavi', duration: 'Short', views: 'YouTube', img: 'https://i.ytimg.com/vi/zpsTYN_yL1M/hqdefault.jpg', id: 'zpsTYN_yL1M' },
                    { title: 'Subhey Ashura Mirgund | Aga Syed Hassan Mousvi | Majlis Ashura | 10th Muharram 1446 \\ 2024-25', duration: 'Short', views: 'YouTube', img: 'https://i.ytimg.com/vi/xi9l-i7-vQI/hqdefault.jpg', id: 'xi9l-i7-vQI' },
                  ].map((video, idx) => (
                    <div key={idx} className="min-w-[200px] max-w-[200px] shrink-0 flex flex-col gap-2 group cursor-pointer" onClick={() => triggerToast(`Playing ${video.title}...`, "success")}>
                      <div className="w-full aspect-video rounded-2xl bg-slate-200 overflow-hidden relative shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={video.img} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/50">
                            <IoPlayCircleOutline className="text-2xl ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-md">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex flex-col px-1">
                        <span className="text-xs font-bold text-slate-800 leading-snug line-clamp-2">{video.title}</span>
                        <span className="text-[10px] text-slate-400 font-semibold mt-0.5">{video.views} views</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* UPCOMING EVENTS */}
            {widgets.upcomingEvents && (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center px-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upcoming Events</span>
                  <button className="text-[10px] font-bold text-accent uppercase tracking-wider hover:underline">View All</button>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth px-0.5">
                  {mockEvents.map((evt) => (
                    <div key={evt.id} className="min-w-[280px] max-w-[280px] shrink-0">
                      <EventCard 
                        title={evt.title['en']} 
                        date={evt.date} 
                        time={evt.time} 
                        venue={evt.venue['en']}
                        onInteract={() => {
                          if (isGuest) {
                            setShowAuthDialog(true);
                          } else {
                            setActiveEvent(evt);
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DONATIONS SECTOR */}
            {widgets.donationGoals && (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center px-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Welfare Donation Goals</span>
                  <button className="text-[10px] font-bold text-accent uppercase tracking-wider hover:underline">View All</button>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth px-0.5">
                  {mockDonations.map((dn) => (
                    <div key={dn.id} className="min-w-[280px] max-w-[280px] shrink-0">
                      <DonationCampaignCard 
                        title={dn.title['en']} 
                        raised={dn.raised} 
                        goal={dn.goal} 
                        category={dn.category}
                        onDonate={() => {
                          if (isGuest) {
                            setShowAuthDialog(true);
                          } else {
                            setActiveDonation(dn);
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ISLAMIC COUNTDOWNS */}
            <IslamicCountdowns triggerToast={triggerToast} />

            {/* TODAY AT ANJUMAN */}
            <TodayAtAnjuman triggerToast={triggerToast} />

            {/* SHORT VIDEO FEED */}
            <ShortVideoFeed triggerToast={triggerToast} />

            {/* DAILY ISLAMIC CHALLENGES */}
            <DailyIslamicChallenges triggerToast={triggerToast} />

            {/* MY ISLAMIC JOURNEY */}
            <MyIslamicJourney triggerToast={triggerToast} />

            {/* LEADERSHIP DIRECTORY */}
            <LeadershipDirectory triggerToast={triggerToast} />

            {/* HISTORY OF ANJUMAN */}
            <HistoryOfAnjuman triggerToast={triggerToast} />

            {/* HALL OF RECOGNITION */}
            <HallOfRecognition triggerToast={triggerToast} />

            {/* AUDIO RADIO PLAYER */}
            <AudioRadioPlayer triggerToast={triggerToast} />

            {/* ASK THE SCHOLAR AI */}
            <AskTheScholarAI triggerToast={triggerToast} />

            {/* COMMUNITY IMPACT METRICS */}
            {widgets.communityStats && (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Platform Impact Statistics</span>
                <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft grid grid-cols-2 gap-4 text-center select-none">
                  {[
                    { label: 'Mosques established', val: '24' },
                    { label: 'Orphans supported', val: '120' },
                    { label: 'Active Volunteers', val: '2,480' },
                    { label: 'Maktab students', val: '4,500' }
                  ].map((stat, idx) => (
                    <div key={idx} className="flex flex-col p-2 border border-slate-50 bg-slate-50/20 rounded-2xl">
                      <span className="text-lg font-black text-primary leading-none">{stat.val}</span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 leading-snug">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <hr className="border-slate-100 my-1" />



            {/* 2. Photo & Video Procession Gallery */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center px-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Procession Galleries</span>
                <button className="text-[10px] font-bold text-accent uppercase tracking-wider hover:underline" onClick={() => triggerToast("Launching Galleries module...", "info")}>View All</button>
              </div>
              
              <div className="flex gap-3.5 overflow-x-auto no-scrollbar scroll-smooth px-0.5">
                {[
                  { name: 'Arbaeen Procession Budgam', icon: 'arbaeen' as IconName },
                  { name: 'Ashura Assembly Srinagar', icon: 'ashura' as IconName },
                  { name: 'Holy Relics Pilgrimage', icon: 'shrine' as IconName }
                ].map((gal, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => triggerToast(`Opening gallery: ${gal.name}...`, "success")}
                    className="min-w-[150px] max-w-[150px] shrink-0 bg-white border border-slate-50 shadow-soft p-3 rounded-2xl flex flex-col justify-between h-24 cursor-pointer hover:border-emerald-100 select-none group"
                  >
                    <span className="text-xl text-primary group-hover:text-accent transition-colors">
                      <AnimatedIcon name={gal.icon} size={22} animation="scale" />
                    </span>
                    <span className="text-[9px] font-bold text-slate-700 leading-snug line-clamp-2 mt-2">{gal.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Youth, Women, & Children Corners */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Community Corners</span>
              <div className="grid grid-cols-3 gap-3 text-center select-none">
                {[
                  { title: "Youth Wing", desc: "Leadership Drive", icon: "prayer-hands" as IconName },
                  { title: "Women's Corner", desc: "Islamic Circles", icon: "islamic-arch" as IconName },
                  { title: "Children's Corner", desc: "Quran Recitation", icon: "rehal" as IconName }
                ].map((item, idx) => (
                  <Card 
                    key={idx}
                    onClick={() => triggerToast(`Launching ${item.title} section...`, "success")}
                    className="bg-white border border-slate-50 shadow-soft p-3 cursor-pointer hover:border-emerald-100 flex flex-col items-center justify-center gap-1.5 group"
                  >
                    <span className="text-xl text-primary group-hover:text-accent transition-colors">
                      <AnimatedIcon name={item.icon} size={20} animation="scale" />
                    </span>
                    <h4 className="text-[9.5px] font-black text-slate-800 leading-none">{item.title}</h4>
                    <span className="text-[8px] text-slate-400 leading-none font-semibold truncate w-full">{item.desc}</span>
                  </Card>
                ))}
              </div>
            </div>

            {/* SUPER-APP EXTENSIONS: GOVERNANCE & EDUCATION */}
            <OrganizationHierarchy triggerToast={triggerToast} />
            <DigitalAnnualReport triggerToast={triggerToast} />
            <DigitalVisionRoadmap triggerToast={triggerToast} />
            <IslamicKnowledgeHub triggerToast={triggerToast} />
            <AhlulBaytKnowledgeCenter triggerToast={triggerToast} />
            <IslamicHistoryTimeline triggerToast={triggerToast} />
            <SmartLearningDashboard triggerToast={triggerToast} />
            <StudyPlanner triggerToast={triggerToast} />

            {/* SUPER-APP EXTENSIONS: RECITATION, POLLS & HERITAGE */}
            <QuranExperienceTracker triggerToast={triggerToast} />
            <CommunityPolls triggerToast={triggerToast} />
            <ZiyaratGuide triggerToast={triggerToast} />
            <KashmirCommunityMap triggerToast={triggerToast} />
            <DigitalTrophyRoom triggerToast={triggerToast} />

            {/* About organization storytelling showcase */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">About Anjuman-e-Sharie Shian</span>
              <AboutAnjumanStorytelling 
                triggerToast={triggerToast} 
                openAuthDialog={() => setShowAuthDialog(true)} 
                isGuest={isGuest} 
              />
            </div>

            {/* PAY DONATION & SADQA JARIYA SHOWCASE */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Pay Donation & Sadqa Jariya</span>
              <PremiumDonationExperience 
                triggerToast={triggerToast} 
                openAuthDialog={() => setShowAuthDialog(true)} 
                isGuest={isGuest} 
              />
            </div>

            {/* Customize widgets shortcut */}
            <div className="flex justify-center py-2 select-none">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setWidgetManagerOpen(true)}
                leftIcon={<IoSettingsOutline />}
              >
                <span>Customize Dashboard Cards</span>
              </Button>
            </div>

          </div>
        )}

        {/* TAB 2: LEARN MODULE */}
        {currentTab === 'learn' && (
          <LearnModule triggerToast={triggerToast} triggerAlert={triggerAlert} />
        )}

        {/* TAB 3: DISCOVER MODULE */}
        {currentTab === 'discover' && (
          <DiscoverModule 
            isGuest={isGuest} 
            triggerToast={triggerToast} 
            triggerAlert={triggerAlert}
            openAuthDialog={() => setShowAuthDialog(true)}
            redirectToServices={(view) => {
              setCurrentTab('services');
              setServicesView(view || 'launcher');
            }}
          />
        )}

        {/* TAB 4: PLATFORM SERVICES */}
        {currentTab === 'services' && (
          <>
            {servicesView === 'launcher' && (
              <div className="p-4 flex flex-col gap-5">
                <div className="flex flex-col select-none">
                  <span className="text-[9px] font-bold text-accent uppercase tracking-widest font-extrabold">Platform Services</span>
                  <h3 className="text-base font-black text-slate-800 mt-0.5">Explore Programs</h3>
                </div>

                {/* QUICK ACTIONS GRID (12 categories) */}
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Quick Actions</span>
                  <div className="grid grid-cols-4 gap-3 bg-white p-4 rounded-3xl border border-slate-50 shadow-soft">
                    {[
                      { label: 'Prayers', icon: 'mosque' as IconName, tab: 'services' },
                      { label: 'Qibla', icon: 'kaaba' as IconName, tab: 'services' },
                      { label: 'Quran', icon: 'open-quran' as IconName, tab: 'learn' },
                      { label: 'Books', icon: 'rehal' as IconName, tab: 'learn' },
                      { label: 'Courses', icon: 'islamic-library' as IconName, tab: 'learn' },
                      { label: 'Events', icon: 'islamic-calendar' as IconName, tab: 'services' },
                      { label: 'Donations', icon: 'charity-hands' as IconName, tab: 'services' },
                      { label: 'Volunteer', icon: 'prayer-hands' as IconName, tab: 'services' },
                      { label: 'Maktab', icon: 'maktab' as IconName, tab: 'services' },
                      { label: 'Digital ID', icon: 'digital-id' as IconName, tab: 'profile' },
                      { label: 'Calendar', icon: 'islamic-calendar' as IconName, tab: 'services' },
                      { label: 'Certificates', icon: 'certificate' as IconName, tab: 'profile' }
                    ].map((act, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          const guestLocked = ['Donations', 'Volunteer', 'Maktab', 'Digital ID', 'Certificates'];
                          if (isGuest && guestLocked.includes(act.label)) {
                            setShowAuthDialog(true);
                            return;
                          }

                          if (act.label === 'Prayers') {
                            setCurrentTab('services');
                            setServicesView('companion');
                            setCompanionInitialView('prayer-times');
                          } else if (act.label === 'Qibla') {
                            setCurrentTab('services');
                            setServicesView('companion');
                            setCompanionInitialView('qibla');
                          } else if (act.label === 'Calendar') {
                            setCurrentTab('services');
                            setServicesView('companion');
                            setCompanionInitialView('hijri-calendar');
                          } else if (act.label === 'Maktab') {
                            setCurrentTab('services');
                            setServicesView('maktab');
                          } else if (act.label === 'Donations') {
                            setCurrentTab('services');
                            setServicesView('donation');
                          } else {
                            setCurrentTab(act.tab);
                          }
                          triggerToast(`Loading ${act.label} dashboard module...`, 'info');
                        }}
                        className="flex flex-col items-center justify-center gap-1.5 p-1 select-none hover:bg-emerald-50/50 rounded-xl transition-colors cursor-pointer group"
                      >
                        <span className="text-xl flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 border border-slate-100 shadow-sm text-primary group-hover:text-accent group-hover:border-accent/30 transition-colors">
                          <AnimatedIcon name={act.icon} size={20} animation="scale" />
                        </span>
                        <span className="text-[9px] font-bold text-slate-600 tracking-wide text-center leading-tight truncate w-full">{act.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-1">
                  {/* Card 1: Islamic Companion */}
                  <Card 
                    onClick={() => {
                      setServicesView('companion');
                      setCompanionInitialView('dashboard');
                    }}
                    className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-5 cursor-pointer hover:border-accent/40 select-none relative overflow-hidden shadow-medium border-emerald-950/20"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="accent" className="text-[8px] uppercase tracking-wider mb-2">Daily Practice</Badge>
                        <h4 className="text-sm font-black text-white">Islamic Daily Companion</h4>
                        <p className="text-[10px] text-emerald-200 mt-1 max-w-[220px] leading-relaxed font-semibold">
                          Access daily prayers countdown, Hijri calendar events, Tasbih counters, and Qibla compasses.
                        </p>
                      </div>
                      <span className="text-3xl shrink-0">🕌</span>
                    </div>
                  </Card>

                  {/* Card 2: Maktab Management */}
                  <Card 
                    onClick={() => {
                      if (isGuest) {
                        setShowAuthDialog(true);
                      } else {
                        setServicesView('maktab');
                      }
                    }}
                    className="bg-white border border-slate-100 p-5 cursor-pointer hover:border-emerald-100 select-none shadow-soft"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="primary" className="text-[8px] uppercase tracking-wider mb-2">Education</Badge>
                        <h4 className="text-sm font-black text-slate-800">Maktab Management System</h4>
                        <p className="text-[10px] text-slate-400 mt-1 max-w-[220px] leading-relaxed font-semibold">
                          View student directories, monitor timetables, track tuition invoices, and log attendance check-ins.
                        </p>
                      </div>
                      <span className="text-3xl shrink-0">🏫</span>
                    </div>
                  </Card>

                  {/* Card 3: Pay Donation & Sadqa Jariya */}
                  <Card 
                    onClick={() => {
                      if (isGuest) {
                        setShowAuthDialog(true);
                      } else {
                        setServicesView('donation');
                      }
                    }}
                    className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white p-5 cursor-pointer hover:border-accent/40 select-none relative overflow-hidden shadow-medium border-emerald-950/20"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="accent" className="text-[8px] uppercase tracking-wider mb-2">Fintech Portal</Badge>
                        <h4 className="text-sm font-black text-white">Pay Donation & Sadqa Jariya</h4>
                        <p className="text-[10px] text-emerald-200 mt-1 max-w-[220px] leading-relaxed font-semibold">
                          Contribute to welfare relief campaigns, Maktab development, student scholarships, and Sadaqah Jariyah.
                        </p>
                      </div>
                      <span className="text-3xl shrink-0">💳</span>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {servicesView === 'donation' && (
              <div className="flex flex-col">
                <PageHeader 
                  breadcrumbs={['Home', 'Services', 'Donations']}
                  title="Pay Donation & Sadqa Jariya"
                  description="Support education, Maktab development, medical relief & Sadaqah Jariyah."
                  onBack={() => setServicesView('launcher')}
                />
                <div className="p-4">
                  <PremiumDonationExperience 
                    triggerToast={triggerToast} 
                    openAuthDialog={() => setShowAuthDialog(true)} 
                    isGuest={isGuest} 
                  />
                </div>
              </div>
            )}

            {servicesView === 'maktab' && (
              <MaktabModule 
                triggerToast={triggerToast} 
                triggerAlert={triggerAlert} 
                navigateBackToServices={() => setServicesView('launcher')}
              />
            )}

            {servicesView === 'companion' && (
              <IslamicCompanionModule 
                initialView={companionInitialView}
                triggerToast={triggerToast} 
                triggerAlert={triggerAlert} 
                navigateBackToServices={() => setServicesView('launcher')}
              />
            )}
          </>
        )}

        {/* TAB 5: PROFILE MODULE */}
        {currentTab === 'profile' && (
          <ProfileModule 
            isGuest={isGuest}
            triggerToast={triggerToast} 
            triggerAlert={triggerAlert} 
            onLogout={() => {
              if (typeof window !== 'undefined') {
                localStorage.setItem('userMode', 'guest');
              }
              setIsGuest(true);
              router.push('/login');
            }}
            onLoginRedirect={() => router.push('/login')}
            initialView={profileView}
          />
        )}

      </div>

      {/* ----------------------------------------------------
          3. FIXED BOTTOM NAVIGATION TABS (5 Tabs)
          ---------------------------------------------------- */}
      <BottomNav 
        currentTab={currentTab} 
        onChangeTab={(tab) => {
          setCurrentTab(tab);
        }} 
      />

      {/* SCROLL TO TOP FAB */}
      <ScrollToTopButton scrollContainerRef={mainScrollRef} />

      {/* FLOATING QUICK ACTION BUTTON (SPEED DIAL) */}
      <FloatingQuickActionButton 
        onOpenDonate={() => {
          setCurrentTab('services');
          setServicesView('donation');
        }}
        onOpenPrayerTimes={() => {
          setCurrentTab('services');
          setServicesView('companion');
          setCompanionInitialView('prayer-times');
        }}
        onOpenLive={() => {
          setCurrentTab('community');
        }}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenEmergency={() => triggerAlert("Secretariat Emergency Helpline", "Anjuman Central Secretariat Helpline: +91-1951-255XXX. Available 24/7 for urgent community assistance.", "info")}
      />

      {/* ----------------------------------------------------
          4. OVERLAYS & SHEETS (Search, Notification, Dialogs)
          ---------------------------------------------------- */}
      
      {/* SEARCH SYSTEM OVERLAY */}
      <BottomSheet 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)}
        title="Search platform"
      >
        <div className="flex flex-col gap-4">
          <Input 
            placeholder="Search Quran, lectures, fatwas..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<IoSearchOutline />}
          />

          {searchQuery.trim() === '' ? (
            <div className="flex flex-col gap-4 select-none">
              {/* Recent searches */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recent Searches</span>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <span 
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-100 hover:bg-slate-100 rounded-full text-xs font-semibold text-slate-600 cursor-pointer transition-colors"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trending topics */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trending Rulings</span>
                <div className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
                  <div className="py-2.5 px-3 bg-slate-50 rounded-xl hover:bg-slate-100/50 cursor-pointer">Rules of Zakat-ul-Fitr 1448</div>
                  <div className="py-2.5 px-3 bg-slate-50 rounded-xl hover:bg-slate-100/50 cursor-pointer">Sermons on Arbaeen Hussaini</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search Results</span>
              {mockLectures.filter(l => l.title['en'].toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                mockLectures.filter(l => l.title['en'].toLowerCase().includes(searchQuery.toLowerCase())).map(l => (
                  <div 
                    key={l.id} 
                    onClick={() => { setSearchOpen(false); setActiveLecture(l); }}
                    className="p-3 border border-slate-50 rounded-2xl hover:bg-slate-50 cursor-pointer"
                  >
                    <h4 className="text-xs font-bold text-slate-800 truncate">{l.title['en']}</h4>
                    <span className="text-[9px] text-slate-400 font-bold block mt-0.5">{l.speaker['en']}</span>
                  </div>
                ))
              ) : (
                <EmptyState title="No results found" description="Adjust search spelling and query options." icon="🔍" />
              )}
            </div>
          )}
        </div>
      </BottomSheet>

      {/* NOTIFICATIONS CENTER SHEETS */}
      <BottomSheet 
        isOpen={notifOpen} 
        onClose={() => setNotifOpen(false)}
        title="Notifications Center"
      >
        <div className="flex flex-col gap-3.5">
          {notifications.map((notif) => (
            <div 
              key={notif.id}
              onClick={() => {
                // Mark as read in simulated dashboard
                setNotifications(notifications.map(n => n.id === notif.id ? { ...n, unread: false } : n));
                triggerAlert(notif.title, notif.desc, 'info');
              }}
              className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                notif.unread 
                  ? 'bg-primary/5 border-primary/20 shadow-sm' 
                  : 'bg-white border-slate-50 shadow-soft hover:bg-slate-50'
              }`}
            >
              <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center text-xs shrink-0 ${
                notif.unread ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                🔔
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className={`text-xs truncate ${notif.unread ? 'font-extrabold text-slate-900' : 'font-bold text-slate-700'}`}>
                    {notif.title}
                  </h4>
                  <span className="text-[8px] text-slate-400 font-bold shrink-0 ml-2 mt-0.5">{notif.time}</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-1">{notif.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </BottomSheet>

      {/* WIDGET CUSTOMIZER CONTROLLER */}
      <BottomSheet 
        isOpen={widgetManagerOpen} 
        onClose={() => setWidgetManagerOpen(false)}
        title="Dashboard Customizer"
      >
        <div className="flex flex-col gap-4 select-none">
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
            Toggle which modular widget cards display on your central home dashboard screen:
          </p>

          <div className="flex flex-col gap-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            {[
              { id: 'welcomeCard', label: 'Welcome Hijri Banner' },
              { id: 'prayerTimes', label: 'Next Prayer times' },
              { id: 'quickActions', label: '12 Quick Actions grid' },
              { id: 'islamicSection', label: 'Hadith & Quran verses' },
              { id: 'continueLearning', label: 'Learning progress bars' },
              { id: 'volunteerCard', label: 'Volunteer duties summary' },
              { id: 'membershipCard', label: 'Flipping Digital Member ID' }
            ].map((wd) => (
              <div key={wd.id} className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>{wd.label}</span>
                <input 
                  type="checkbox"
                  checked={widgets[wd.id as keyof typeof widgets]}
                  onChange={() => {
                    setWidgets({
                      ...widgets,
                      [wd.id]: !widgets[wd.id as keyof typeof widgets]
                    });
                  }}
                  className="accent-primary"
                />
              </div>
            ))}
          </div>

          <Button variant="accent" fullWidth onClick={() => setWidgetManagerOpen(false)} className="mt-2">
            <span>Apply Configurations</span>
          </Button>
        </div>
      </BottomSheet>

      {/* SIDEBAR NAVIGATION DRAWERS */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 bg-black z-48 rounded-[32px]"
            />
            {/* Left slide drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              className="absolute inset-y-0 left-0 w-[290px] bg-white z-49 rounded-l-[32px] rounded-r-3xl shadow-2xl flex flex-col"
            >
              <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 flex flex-col gap-4 relative overflow-hidden shrink-0">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full blur-lg" />
                <button 
                  onClick={() => setDrawerOpen(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <IoCloseOutline className="text-lg" />
                </button>
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-1 text-primary font-bold text-lg font-urdu shadow-md mt-2">
                  شرعی
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white/70 leading-none font-sans">As-Salamu Alaykum,</h4>
                  <p className="text-sm font-extrabold text-white mt-1 tracking-wide font-sans">{mockMember.name}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar py-4 px-3 flex flex-col gap-1.5 bg-surface">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
                  digital membership
                </div>
                
                {/* ID inside drawer */}
                <div className="px-3 py-1 bg-white rounded-3xl border border-slate-100 shadow-sm mx-1.5 mb-2">
                  <DigitalID />
                </div>

                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
                  App Actions
                </div>
                
                <button 
                  onClick={() => { setDrawerOpen(false); setCurrentTab('services'); }}
                  className="flex items-center gap-3.5 px-4 py-3 rounded-2xl hover:bg-slate-50 text-slate-700 text-xs font-bold cursor-pointer text-left w-full"
                >
                  <IoGridOutline className="text-lg text-emerald-600" />
                  <span>Administrative Services</span>
                </button>

                <button 
                  onClick={() => { setDrawerOpen(false); setWidgetManagerOpen(true); }}
                  className="flex items-center gap-3.5 px-4 py-3 rounded-2xl hover:bg-slate-50 text-slate-700 text-xs font-bold cursor-pointer text-left w-full"
                >
                  <IoSettingsOutline className="text-lg text-blue-600" />
                  <span>Configure Dashboard</span>
                </button>

                <Link 
                  href="/design-system"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3.5 px-4 py-3 rounded-2xl hover:bg-slate-50 text-slate-700 text-xs font-bold cursor-pointer text-left w-full"
                >
                  <span className="text-lg">🎨</span>
                  <span>Component Library</span>
                </Link>
              </div>

              <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white text-[9px] font-bold text-slate-400 uppercase tracking-wider shrink-0 rounded-b-[32px]">
                <span>Version 1.0.0 (Beta)</span>
                <span>Anjuman Digital</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* DETAILED CARDS OVERLAYS DETAILS SHEET */}
      <BottomSheet isOpen={activeEvent !== null} onClose={() => setActiveEvent(null)} title="Event Details">
        {activeEvent && (
          <div className="flex flex-col gap-4">
            <Badge variant="accent" className="w-fit text-[8px] uppercase">{activeEvent.date}</Badge>
            <h3 className="text-sm font-extrabold text-slate-800 leading-snug">{activeEvent.title['en']}</h3>
            
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Timings & Venue</span>
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"><IoTimeOutline className="text-accent" /> Time: {activeEvent.time}</span>
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"><IoLocationOutline className="text-accent" /> Location: {activeEvent.venue['en']}</span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              This assembly is organized under the spiritual patronage of the Shariat Council. Attendants are requested to maintain solemn discipline.
            </p>

            <Button variant="accent" fullWidth onClick={() => { setActiveEvent(null); triggerToast("Event registration recorded in member timeline", "success"); }}>
              <span>Register Attendance Alert</span>
            </Button>
          </div>
        )}
      </BottomSheet>

      {/* DONATION DETAILS */}
      <BottomSheet isOpen={activeDonation !== null} onClose={() => setActiveDonation(null)} title="Contribute Donation">
        {activeDonation && (
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-extrabold text-slate-800 leading-snug">{activeDonation.title['en']}</h3>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">
              {activeDonation.description ? activeDonation.description['en'] : 'Contribute general charities to fund regional education and welfare relief across Srinagar.'}
            </p>

            <div className="grid grid-cols-3 gap-3">
              {['₹2,000', '₹5,000', '₹10,000'].map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setActiveDonation(null);
                    triggerAlert("Generosity Recorded", `Thank you for contributing ${amt} to "${activeDonation.title['en']}" campaign.`, "success");
                  }}
                  className="py-3 border border-slate-100 hover:border-accent bg-slate-50 hover:bg-white rounded-2xl text-xs font-bold text-slate-800 active:scale-95 transition-all text-center cursor-pointer"
                >
                  {amt}
                </button>
              ))}
            </div>
          </div>
        )}
      </BottomSheet>

      {/* DIALOG POPUPS */}
      <Dialog 
        isOpen={alertOpen} 
        onClose={() => setAlertOpen(false)} 
        title={alertData.title}
        type={alertData.type}
      >
        {alertData.message}
      </Dialog>

      {/* AUTHENTICATION REQUIRED DIALOG OVERLAY */}
      <AnimatePresence>
        {showAuthDialog && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer select-none"
              onClick={() => setShowAuthDialog(false)}
            />
            
            {/* Dialog Panel */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[340px] bg-white rounded-[32px] p-6 shadow-2xl border border-slate-100 z-55 select-none"
            >
              <div className="flex flex-col items-center text-center select-none">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-primary border border-emerald-100 flex items-center justify-center text-2xl mb-4">
                  🪪
                </div>
                <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase leading-tight">Account Required</h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-2 leading-relaxed">
                  Join the Anjuman community to register for events, log volunteer shifts, make donations, or view Maktab school reports.
                </p>

                <div className="flex flex-col gap-2.5 w-full mt-6">
                  <Button variant="primary" fullWidth onClick={() => { setShowAuthDialog(false); router.push('/login'); }}>
                    <span>Sign In</span>
                  </Button>
                  <Button variant="outline" fullWidth onClick={() => { setShowAuthDialog(false); router.push('/register'); }}>
                    <span className="text-slate-700 font-bold">Create Account</span>
                  </Button>
                  <button 
                    onClick={() => setShowAuthDialog(false)}
                    className="text-[9px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest mt-2 cursor-pointer"
                  >
                    Continue as Guest
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* GALLERY FULL SCREEN OVERLAY */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          >
            <div className="absolute top-6 right-6 z-[110]">
              <button 
                onClick={() => setShowGallery(false)}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <IoClose className="text-2xl" />
              </button>
            </div>
            
            <div className="w-full h-full flex flex-col gap-6 justify-center max-w-lg relative mt-10">
              {/* Main Image */}
              <div className="w-full aspect-[4/3] relative rounded-3xl overflow-hidden shadow-2xl bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={ANJUMAN_GALLERY_IMAGES[activeGalleryIdx]} 
                  alt="Gallery full view" 
                  className="w-full h-full object-contain"
                />
                
                {/* Controls */}
                <div className="absolute inset-y-0 left-0 flex items-center p-2">
                  <button 
                    onClick={() => setActiveGalleryIdx(prev => prev > 0 ? prev - 1 : ANJUMAN_GALLERY_IMAGES.length - 1)}
                    className="w-10 h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
                  >
                    <span className="text-xl">←</span>
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center p-2">
                  <button 
                    onClick={() => setActiveGalleryIdx(prev => prev < ANJUMAN_GALLERY_IMAGES.length - 1 ? prev + 1 : 0)}
                    className="w-10 h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
                  >
                    <span className="text-xl">→</span>
                  </button>
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 justify-start">
                {ANJUMAN_GALLERY_IMAGES.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveGalleryIdx(idx)}
                    className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 border-2 cursor-pointer ${activeGalleryIdx === idx ? 'border-accent scale-105' : 'border-transparent opacity-50 hover:opacity-80'}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST SYSTEM WIDGET */}
      <Toast 
        isOpen={toastOpen} 
        message={toastMsg} 
        type={toastType} 
        onClose={() => setToastOpen(false)} 
      />

    </div>
  );
}

// ----------------------------------------------------
// 5. LOCAL SUBCOMPONENT FOR DAILY CARDS
// ----------------------------------------------------
interface DailyAyahProps {
  arabic: string;
  translation: string;
  source: string;
  title: string;
}

const DailyQuranCard: React.FC<DailyAyahProps> = ({ arabic, translation, source, title }) => {
  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft min-w-[280px] max-w-[280px] flex flex-col justify-between gap-4 select-none shrink-0">
      <div className="flex justify-between items-center">
        <Badge variant="primary" className="text-[8px] uppercase tracking-wider">{title}</Badge>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-base text-right leading-loose font-bold text-primary font-urdu pr-1">
          {arabic}
        </p>
        <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
          "{translation}"
        </p>
      </div>

      <div className="flex justify-between items-center border-t border-slate-50 pt-3 text-[10px] font-bold text-slate-400">
        <span>{source}</span>
      </div>
    </div>
  );
};
