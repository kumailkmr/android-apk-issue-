"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { AboutAnjumanStorytelling } from '@/components/about/AboutAnjumanStorytelling';
import { PageHeader } from '@/components/ui/PageHeader';
import { NativeDeviceHub } from '@/components/ui/NativeDeviceHub';
import { 
  IoChevronBackOutline, 
  IoCheckmarkCircle, 
  IoTimeOutline, 
  IoLocationOutline, 
  IoChevronForwardOutline,
  IoBookmarkOutline,
  IoBookmark,
  IoSearchOutline,
  IoNotificationsOutline,
  IoHeartOutline,
  IoHeart,
  IoSettingsOutline,
  IoRibbonOutline,
  IoLockClosedOutline,
  IoDownloadOutline,
  IoShareSocialOutline,
  IoCallOutline,
  IoShieldCheckmarkOutline,
  IoLogOutOutline,
  IoCalendarOutline,
  IoBookOutline,
  IoHelpCircleOutline,
  IoLanguageOutline,
  IoAccessibilityOutline,
  IoBulbOutline
} from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { mockMember } from '@/data/mockData';

interface ProfileModuleProps {
  isGuest: boolean;
  triggerToast: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  triggerAlert: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
  onLogout: () => void;
  onLoginRedirect?: () => void;
  initialView?: string;
}

export const ProfileModule: React.FC<ProfileModuleProps> = ({ 
  isGuest,
  triggerToast, 
  triggerAlert, 
  onLogout,
  onLoginRedirect,
  initialView
}) => {
  const { language, setLanguage } = useLanguage();

  // Sub-routing states
  const [profileView, setProfileView] = useState<string>(initialView || 'dashboard');
  const [viewHistory, setViewHistory] = useState<string[]>([initialView || 'dashboard']);

  React.useEffect(() => {
    if (initialView) {
      setProfileView(initialView);
    }
  }, [initialView]);

  // Flip state for Digital ID Card
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Edit Profile Form State
  const [editForm, setEditForm] = useState({
    name: mockMember.name,
    phone: '+91 9906XXXXXX',
    occupation: 'Software Engineer',
    district: 'Budgam',
    education: 'B.Tech Computer Science'
  });

  // Settings mock state
  const [accessibility, setAccessibility] = useState({
    textSize: 'Medium',
    reduceMotion: false,
    highContrast: false
  });

  // Global search mock engine
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(['Ashura timing', 'Sahifa Sajjadiya Duas', 'Welfare Budgam']);

  const navigateTo = (view: string) => {
    setViewHistory([...viewHistory, view]);
    setProfileView(view);
  };

  const navigateBack = () => {
    if (viewHistory.length > 1) {
      const updatedHistory = [...viewHistory];
      updatedHistory.pop();
      setViewHistory(updatedHistory);
      setProfileView(updatedHistory[updatedHistory.length - 1]);
    }
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast("Profile changes saved successfully", "success");
    navigateBack();
  };

  // Header breadcrumb metadata helper
  const getHeaderMeta = () => {
    switch (profileView) {
      case 'digital-id':
        return { breadcrumbs: ['Home', 'Membership', 'Digital ID'], title: 'Digital Membership Pass', desc: 'NFC & QR verified digital identity card for Anjuman members.' };
      case 'certificates':
        return { breadcrumbs: ['Home', 'Profile', 'Certificates'], title: 'Earned Credentials & Badges', desc: 'Verified Hawza course diplomas and volunteer achievement certificates.' };
      case 'settings':
        return { breadcrumbs: ['Home', 'Profile', 'Settings'], title: 'Account & Security Settings', desc: 'Manage notifications, language, security, and app preferences.' };
      case 'saved':
        return { breadcrumbs: ['Home', 'Profile', 'Saved'], title: 'Bookmarks & Saved Media', desc: 'Quick access to saved Quran verses, books, and majalis lectures.' };
      case 'activity':
        return { breadcrumbs: ['Home', 'Profile', 'Activity'], title: 'User Activity Logs', desc: 'Log of volunteer duty hours, donations, and learning progress.' };
      case 'help-center':
        return { breadcrumbs: ['Home', 'Profile', 'Help Center'], title: 'Help & Secretariat Support', desc: 'Contact Anjuman Secretariat, view FAQs, and submit inquiries.' };
      default:
        return { breadcrumbs: ['Home', 'Profile', profileView], title: profileView.replace('-', ' ').toUpperCase(), desc: 'Manage your profile and membership preferences.' };
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col min-h-0 bg-surface">
      
      {/* SUB-ROUTING VIEW HEADER WITH BREADCRUMBS */}
      {profileView !== 'dashboard' && (
        <PageHeader 
          breadcrumbs={getHeaderMeta().breadcrumbs}
          title={getHeaderMeta().title}
          description={getHeaderMeta().desc}
          onBack={navigateBack}
        />
      )}

      {/* ----------------------------------------------------
          ACTIVE VIEW SCROLLER
          ---------------------------------------------------- */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-5">
        
        {/* ====================================================
            VIEW 1: MY PROFILE DASHBOARD
            ==================================================== */}
        {profileView === 'dashboard' && (
          isGuest ? (
            <>
              {/* Guest Profile welcome */}
              <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft select-none flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center text-2xl mb-3 border border-slate-100">
                  👤
                </div>
                <h3 className="text-sm font-black text-slate-800 leading-none">Guest User</h3>
                <p className="text-[10px] text-slate-400 font-semibold max-w-[200px] mt-2 leading-relaxed">
                  Join the platform to unlock digital ID cards, volunteer shifts, and educational profiles.
                </p>

                <div className="flex gap-3 w-full mt-5">
                  <Button variant="primary" className="flex-1" onClick={onLoginRedirect}>
                    <span>Sign In / Create Account</span>
                  </Button>
                </div>
              </div>

              {/* Benefits of joining */}
              <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft select-none flex flex-col gap-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-0.5">Benefits of joining</span>
                <div className="flex flex-col gap-3">
                  {[
                    "Secure Digital Member ID Pass card",
                    "Active Volunteer registry shift rosters",
                    "Parent Maktab portals student reports",
                    "Charity Donation tax ledger receipts",
                    "Personal Progress & theological achievements"
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start text-xs font-semibold text-slate-600">
                      <IoCheckmarkCircle className="text-primary text-lg shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Settings access for guest */}
              <div className="flex justify-center select-none pt-1">
                <Button variant="outline" size="sm" onClick={() => navigateTo('settings')} leftIcon={<IoSettingsOutline />}>
                  <span>Open App Settings</span>
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Profile Premium Header */}
              <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft select-none flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-50 text-primary flex items-center justify-center text-2xl font-black font-urdu mb-3 border border-emerald-100">
                  SA
                </div>
                <h3 className="text-sm font-black text-slate-800 leading-none">{mockMember.name}</h3>
                <span className="text-[9px] text-slate-400 font-bold block mt-1">ID: {mockMember.cardNumber}</span>

                {/* Status badges */}
                <div className="flex gap-2 mt-3.5">
                  <Badge variant="primary" className="text-[8px] uppercase tracking-wider">Verified Member</Badge>
                  <Badge variant="accent" className="text-[8px] uppercase tracking-wider">Bronze Volunteer</Badge>
                </div>

                {/* District & Join date */}
                <div className="flex gap-4 text-[9px] font-bold text-slate-400 mt-4 pt-3 border-t border-slate-50 w-full justify-center">
                  <span>District: Budgam</span>
                  <span>•</span>
                  <span>Joined: July 2025</span>
                </div>
              </div>

              {/* Native Mobile Hardware Device Hub */}
              <NativeDeviceHub triggerToast={triggerToast} />

              {/* Quick action grid */}
              <div className="grid grid-cols-4 gap-3 bg-white p-4 rounded-3xl border border-slate-50 shadow-soft select-none text-center">
                {[
                  { label: 'Edit Profile', icon: '📝', view: 'edit-profile' },
                  { label: 'Digital ID', icon: '🪪', view: 'digital-id' },
                  { label: 'Rewards', icon: '🏆', view: 'rewards' },
                  { label: 'Certificates', icon: '📜', view: 'certificates' },
                  { label: 'Activity log', icon: '📊', view: 'activity' },
                  { label: 'Bookmarks', icon: '💖', view: 'saved' },
                  { label: 'Downloads', icon: '📥', view: 'downloads' },
                  { label: 'Empty check', icon: '🤷', view: 'empty-states' }
                ].map((act, i) => (
                  <button
                    key={i}
                    onClick={() => navigateTo(act.view)}
                    className="flex flex-col items-center justify-center gap-1.5 p-1 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <span className="text-xl flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 border border-slate-100 shadow-sm">{act.icon}</span>
                    <span className="text-[9px] font-bold text-slate-600 tracking-wide text-center leading-tight truncate w-full">{act.label}</span>
                  </button>
                ))}
              </div>

              {/* Quick statistics */}
              <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft select-none">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">My Dashboard activity</span>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-800">34 hrs</span>
                    <span className="text-[8.5px] text-slate-400 font-bold uppercase mt-0.5">Volunteered</span>
                  </div>
                  <div className="flex flex-col border-x border-slate-100">
                    <span className="text-sm font-black text-slate-800">5 books</span>
                    <span className="text-[8.5px] text-slate-400 font-bold uppercase mt-0.5">Books Read</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-800">2 courses</span>
                    <span className="text-[8.5px] text-slate-400 font-bold uppercase mt-0.5">Courses Done</span>
                  </div>
                </div>
              </div>

              {/* Logout button */}
              <div className="flex justify-center select-none pt-2">
                <Button variant="outline" size="sm" onClick={onLogout} leftIcon={<IoLogOutOutline />}>
                  <span>Sign Out of Profile</span>
                </Button>
              </div>
            </>
          )
        )}

        {/* ====================================================
            VIEW 2: EDIT PROFILE FORM
            ==================================================== */}
        {profileView === 'edit-profile' && (
          <div className="flex flex-col gap-4 select-none">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Settings</span>
              <h3 className="text-base font-black text-slate-800 mt-0.5">Edit Profile</h3>
            </div>

            <form onSubmit={handleSaveChanges} className="flex flex-col gap-4 mt-2">
              <Input 
                placeholder="Full Name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />

              <Input 
                placeholder="Contact Phone"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              />

              <Input 
                placeholder="Occupation"
                value={editForm.occupation}
                onChange={(e) => setEditForm({ ...editForm, occupation: e.target.value })}
              />

              <Input 
                placeholder="Education"
                value={editForm.education}
                onChange={(e) => setEditForm({ ...editForm, education: e.target.value })}
              />

              <Button type="submit" variant="primary" fullWidth className="mt-2">
                <span>Save Profile Changes</span>
              </Button>
            </form>
          </div>
        )}

        {/* ====================================================
            VIEW 3: DIGITAL IDENTITY CARD (FRONT BACK FLIP)
            ==================================================== */}
        {profileView === 'digital-id' && (
          <div className="flex flex-col items-center gap-5 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block self-start">Digital Passport Pass</span>

            {/* Flipping Digital ID Card */}
            <div 
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              className="w-full max-w-[280px] h-[380px] cursor-pointer relative preserve-3d transition-transform duration-500"
              style={{ transform: isCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
              {/* CARD FRONT SIDE */}
              <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-primary to-primary-dark rounded-[32px] border-2 border-accent/25 p-5 text-white flex flex-col justify-between shadow-xl">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-accent-light tracking-widest font-extrabold uppercase">Anjuman Platform</span>
                    <span className="text-[8px] text-emerald-300 font-bold block">Verified Member</span>
                  </div>
                  <IoShieldCheckmarkOutline className="text-accent text-2xl" />
                </div>

                <div className="flex flex-col items-center text-center my-6">
                  <div className="w-18 h-18 rounded-full bg-white flex items-center justify-center p-1 border-2 border-accent/20 mb-3 overflow-hidden shadow">
                    <span className="text-base text-primary font-black font-urdu">SA</span>
                  </div>
                  <h3 className="text-sm font-black tracking-wide leading-none">{mockMember.name}</h3>
                  <span className="text-[9px] text-emerald-300 mt-1 font-mono">{mockMember.cardNumber}</span>
                </div>

                <div className="border-t border-white/10 pt-3 flex justify-between text-[8px] font-bold text-emerald-200">
                  <div className="flex flex-col">
                    <span>District</span>
                    <span className="text-white mt-0.5 uppercase">Budgam</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span>Status</span>
                    <span className="text-accent-light mt-0.5 uppercase">ACTIVE</span>
                  </div>
                </div>
              </div>

              {/* CARD BACK SIDE */}
              <div 
                className="absolute inset-0 backface-hidden bg-white rounded-[32px] border border-slate-100 p-5 text-slate-800 flex flex-col justify-between shadow-xl"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <div className="flex justify-between items-center text-[9px] font-bold text-slate-400">
                  <span>Cryptographic QR code validation</span>
                  <span>Budgam Central</span>
                </div>

                <div className="flex justify-center my-6">
                  <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center font-mono text-[7px] text-center font-bold shadow-sm p-2">
                    [MEMBER QR]
                  </div>
                </div>

                <div className="border-t border-slate-50 pt-3 text-center text-[9px] font-bold text-slate-400">
                  <span>Expires: Dec 2026 • Tap card to flip</span>
                </div>
              </div>
            </div>

            <span className="text-[10px] text-slate-400 italic">Click card to check cryptographic verify QR details.</span>
          </div>
        )}

        {/* ====================================================
            VIEW 4: REWARDS & ACHIEVEMENTS
            ==================================================== */}
        {profileView === 'rewards' && (
          <div className="flex flex-col gap-4 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">My Achievements</span>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center flex flex-col items-center justify-between border border-slate-50 hover:border-slate-100 bg-white">
                <span className="text-3xl">🛡️</span>
                <div className="mt-3">
                  <h4 className="text-[11px] font-bold text-slate-800 leading-snug">Bronze Helper Shield</h4>
                  <span className="text-[8.5px] text-slate-400 font-semibold block mt-1">Unlocked: 30 volunteer hours</span>
                </div>
              </Card>

              <Card className="p-4 text-center flex flex-col items-center justify-between border border-slate-50 hover:border-slate-100 bg-white">
                <span className="text-3xl">📖</span>
                <div className="mt-3">
                  <h4 className="text-[11px] font-bold text-slate-800 leading-snug">Theological Reader Badge</h4>
                  <span className="text-[8.5px] text-slate-400 font-semibold block mt-1">Unlocked: 5 library books read</span>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 5: CERTIFICATES
            ==================================================== */}
        {profileView === 'certificates' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">My verified credentials</span>
            
            <Card className="flex flex-col gap-4 select-none">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <Badge variant="success" className="text-[8px] uppercase tracking-wider mb-1.5">Verified</Badge>
                  <h4 className="text-xs font-extrabold text-slate-800 leading-snug">Basic Islamic Beliefs Aqa'id</h4>
                  <span className="text-[10px] text-slate-400 font-semibold block mt-1">July 2026 | Anjuman Education Secretariat</span>
                </div>
                <span className="text-3xl shrink-0">📜</span>
              </div>

              <div className="flex gap-3 justify-end pt-1 border-t border-slate-50 mt-1">
                <Button variant="outline" size="sm" onClick={() => triggerToast("PDF certificate generated and downloading", "success")}>
                  <span>Download credential</span>
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* ====================================================
            VIEW 6: ACTIVITY TIMELINE
            ==================================================== */}
        {profileView === 'activity' && (
          <div className="flex flex-col gap-4 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Recent Activity logs</span>
            
            <div className="bg-white rounded-3xl p-4.5 border border-slate-50 shadow-soft flex flex-col gap-4">
              {[
                { activity: 'Completed course "Islamic Jurisprudence"', date: 'Today, 2:30 PM' },
                { activity: 'Logged 3 hours in Ration distribution volunteer duty', date: 'Yesterday, 6:00 PM' },
                { activity: 'Borrowed digital copy of "Sahifa Sajjadiya"', date: 'Aug 10, 2026' }
              ].map((act, idx) => (
                <div key={idx} className="flex gap-4 items-start border-b border-slate-50 last:border-0 pb-4 last:pb-0">
                  <span className="text-lg shrink-0">📊</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-700 leading-snug">{act.activity}</h4>
                    <span className="text-[9px] text-slate-400 font-semibold block mt-1">{act.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 7: SAVED CONTENT (Bookmarks)
            ==================================================== */}
        {profileView === 'saved' && (
          <div className="flex flex-col gap-4 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Saved & bookmarked items</span>
            
            <Card className="flex justify-between items-center cursor-pointer hover:border-emerald-100">
              <div className="flex items-center gap-3">
                <span className="text-xl">📖</span>
                <div className="flex flex-col">
                  <h4 className="text-xs font-bold text-slate-800 leading-none">Surah An-Nahl Verse 90</h4>
                  <span className="text-[9px] text-slate-400 font-semibold block mt-1">Bookmarked from Daily Ayat</span>
                </div>
              </div>
              <IoChevronForwardOutline className="text-slate-400 text-xs" />
            </Card>
          </div>
        )}

        {/* ====================================================
            VIEW 8: DOWNLOADS
            ==================================================== */}
        {profileView === 'downloads' && (
          <div className="flex flex-col gap-4 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Downloaded Books (Offline preview)</span>
            
            <Card className="flex justify-between items-center cursor-pointer hover:border-emerald-100">
              <div className="flex items-center gap-3">
                <span className="text-xl">📕</span>
                <div className="flex flex-col">
                  <h4 className="text-xs font-bold text-slate-800 leading-none">Nahjul Balagha (Sermons of Ali AS)</h4>
                  <span className="text-[9px] text-slate-400 font-semibold block mt-1">12.5 MB • PDF format</span>
                </div>
              </div>
              <IoDownloadOutline className="text-primary text-lg" />
            </Card>
          </div>
        )}

        {/* ====================================================
            VIEW 9: NOTIFICATIONS
            ==================================================== */}
        {profileView === 'notifications' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Recent system alerts</span>
            
            <div className="grid grid-cols-1 gap-4">
              <Card className="flex gap-3.5 items-start select-none">
                <span className="text-xl">🪪</span>
                <div>
                  <Badge variant="primary" className="text-[8px] uppercase tracking-wider mb-1">Update</Badge>
                  <h4 className="text-xs font-extrabold text-slate-800 leading-snug">Digital Membership Card Generated</h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed mt-1">
                    Your cryptographical QR verification code is synced in registry records.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 10: GLOBAL SEARCH
            ==================================================== */}
        {profileView === 'global-search' && (
          <div className="flex flex-col gap-4">
            <Input 
              placeholder="Search verses, hadith, books, directories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<IoSearchOutline />}
            />

            {searchQuery.trim() === '' ? (
              <div className="flex flex-col gap-4 select-none">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-0.5">Recent Searches</span>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map(term => (
                    <Badge 
                      key={term} 
                      variant="neutral" 
                      className="cursor-pointer"
                      onClick={() => setSearchQuery(term)}
                    >
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Matched results</span>
                {['Basic Islamic Beliefs Aqa\'id'].filter(c => c.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                  <div 
                    onClick={() => navigateTo('certificates')}
                    className="p-3 border border-slate-50 bg-white rounded-2xl cursor-pointer hover:bg-slate-50"
                  >
                    <h4 className="text-xs font-bold text-slate-800 truncate">Basic Islamic Beliefs Aqa'id</h4>
                    <span className="text-[9px] text-slate-400 font-bold block mt-0.5">Verified certificates credential</span>
                  </div>
                ) : (
                  <EmptyState title="No matched results" description="Refine search parameters." icon="🔍" />
                )}
              </div>
            )}
          </div>
        )}

        {/* ====================================================
            VIEW 11: SETTINGS
            ==================================================== */}
        {profileView === 'settings' && (
          <div className="flex flex-col gap-4 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Application Settings</span>
            
            <div className="bg-white rounded-3xl p-4 border border-slate-50 shadow-soft flex flex-col gap-1">
              {[
                { label: 'Language Selection', icon: <IoLanguageOutline />, view: 'language' },
                { label: 'Accessibility', icon: <IoAccessibilityOutline />, view: 'accessibility' },
                { label: 'Help & Support Center', icon: <IoHelpCircleOutline />, view: 'help-center' },
                { label: 'About Anjuman Secretariat', icon: <IoBulbOutline />, view: 'about' },
                { label: 'Privacy & Security', icon: <IoLockClosedOutline />, view: 'privacy' }
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => navigateTo(opt.view)}
                  className="flex justify-between items-center w-full py-3 px-2 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer select-none text-left"
                >
                  <div className="flex items-center gap-3 text-slate-700 text-xs font-bold">
                    <span className="text-lg text-slate-400">{opt.icon}</span>
                    <span>{opt.label}</span>
                  </div>
                  <IoChevronForwardOutline className="text-slate-400 text-xs" />
                </button>
              ))}
            </div>

            <div className="text-center text-[10px] text-slate-400 font-semibold mt-4">
              <span>Platform Version 1.0.0 (Demo Build)</span>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 12: LANGUAGE SELECTION
            ==================================================== */}
        {profileView === 'language' && (
          <div className="flex flex-col gap-4 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Select Language</span>
            
            <div className="grid grid-cols-1 gap-3">
              {[
                { code: 'en', label: 'English (Default)' },
                { code: 'ur', label: 'اردو (Urdu)' }
              ].map((lang) => (
                <Card 
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as any);
                    triggerToast(`Language switched to ${lang.label}`, "success");
                  }}
                  className={`flex justify-between items-center cursor-pointer transition-all ${
                    language === lang.code ? 'border-primary bg-emerald-50/10' : 'hover:border-slate-100'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-800">{lang.label}</span>
                  {language === lang.code && <IoCheckmarkCircle className="text-primary text-lg" />}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 13: ACCESSIBILITY
            ==================================================== */}
        {profileView === 'accessibility' && (
          <div className="flex flex-col gap-4 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Accessibility Preferences</span>
            
            <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft flex flex-col gap-4 text-xs font-bold text-slate-700">
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] text-slate-400 uppercase font-bold">Text Size</span>
                <select 
                  value={accessibility.textSize}
                  onChange={(e) => {
                    setAccessibility({ ...accessibility, textSize: e.target.value });
                    triggerToast(`Text size scaled to ${e.target.value}`, "info");
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none"
                >
                  {['Small', 'Medium', 'Large'].map(sz => (
                    <option key={sz} value={sz}>{sz} scale</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 14: HELP CENTER & FAQS
            ==================================================== */}
        {profileView === 'help-center' && (
          <div className="flex flex-col gap-4 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Frequently Asked Questions</span>
            
            <div className="flex flex-col gap-3.5">
              {[
                { q: 'How to verify digital membership pass?', a: 'Tap the Digital ID card in your profile dashboard to reveal the cryptographic validation QR code.' },
                { q: 'Where do I view Maktab student invoice receipts?', a: 'Under Tab 4 (Services) → Maktab Management Board → Fee balance dashboard.' }
              ].map((faq, i) => (
                <Card key={i} className="flex flex-col gap-2">
                  <h4 className="text-xs font-bold text-slate-800 leading-snug">{faq.q}</h4>
                  <p className="text-[10px] text-slate-500 font-semibold leading-relaxed mt-1">{faq.a}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 15: ABOUT ANJUMAN
            ==================================================== */}
        {profileView === 'about' && (
          <AboutAnjumanStorytelling 
            triggerToast={triggerToast} 
            openAuthDialog={onLoginRedirect} 
            isGuest={isGuest} 
          />
        )}

        {/* ====================================================
            VIEW 16: PRIVACY & SECURITY
            ==================================================== */}
        {profileView === 'privacy' && (
          <div className="flex flex-col gap-4 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Security Sessions history</span>
            
            <div className="bg-white rounded-3xl p-4.5 border border-slate-50 shadow-soft flex flex-col gap-4">
              {[
                { device: 'Android Phone (Local host preview)', time: 'Active Session' },
                { device: 'Vercel static build hosting server', time: 'Aug 10, 2026' }
              ].map((ses, idx) => (
                <div key={idx} className="flex gap-4 items-start border-b border-slate-50 last:border-0 pb-4 last:pb-0">
                  <span className="text-lg shrink-0">📱</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-700 leading-snug">{ses.device}</h4>
                    <span className="text-[9px] text-slate-400 font-semibold block mt-1">{ses.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 17: EMPTY STATES PREVIEWS (Zero-state logger)
            ==================================================== */}
        {profileView === 'empty-states' && (
          <div className="flex flex-col gap-4 justify-center items-center py-6 select-none">
            <EmptyState 
              title="No Offline Downloads Saved" 
              description="No theological handbook files downloaded. Save library PDF copies for offline access."
              icon="📥"
            />
          </div>
        )}

      </div>
    </div>
  );
};
export default ProfileModule;
