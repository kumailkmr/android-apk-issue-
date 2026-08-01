"use client";

import React, { useState } from 'react';
import { VolunteerModule } from '@/components/volunteer/VolunteerModule';
import { PremiumDonationExperience } from '@/components/donation/PremiumDonationExperience';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { 
  IoNotificationsOutline,
  IoSearchOutline,
  IoChevronBackOutline,
  IoBookmarkOutline,
  IoBookmark,
  IoCalendarOutline,
  IoLocationOutline,
  IoTimeOutline,
  IoPeopleOutline,
  IoHeartOutline,
  IoSendOutline,
  IoPlayCircleOutline,
  IoImagesOutline,
  IoSchoolOutline,
  IoCallOutline,
  IoRibbonOutline,
  IoWaterOutline,
  IoStatsChartOutline,
  IoCheckmarkCircle,
  IoShareSocialOutline
} from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

interface CommunityModuleProps {
  triggerToast: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  triggerAlert: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
  isGuest?: boolean;
  openAuthDialog?: () => void;
}

export const CommunityModule: React.FC<CommunityModuleProps> = ({ triggerToast, triggerAlert, isGuest, openAuthDialog }) => {
  // Navigation State Machine
  const [commView, setCommView] = useState<string>('dashboard');
  const [viewHistory, setViewHistory] = useState<string[]>(['dashboard']);

  // Selection states
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [selectedDonation, setSelectedDonation] = useState<any>(null);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [newsCategory, setNewsCategory] = useState('All');
  const [eventFilter, setEventFilter] = useState('Upcoming'); // Upcoming, Today, Past
  const [calendarView, setCalendarView] = useState('List'); // Monthly, Weekly, List

  // Active Poll state
  const [pollVoted, setPollVoted] = useState(false);
  const [pollSelection, setPollSelection] = useState<number | null>(null);

  // Welfare submission states
  const [welfareSubmitted, setWelfareSubmitted] = useState(false);
  const [welfareForm, setWelfareForm] = useState({ name: '', type: 'Medical Assistance', details: '' });

  // Blood donor states
  const [bloodGroupSearch, setBloodGroupSearch] = useState('O+');
  const [donorRegistered, setDonorRegistered] = useState(false);
  const [donorForm, setDonorForm] = useState({ name: '', group: 'A+', contact: '' });

  // Live chat state
  const [chatMessage, setChatMessage] = useState('');
  const [chatFeed, setChatFeed] = useState([
    { user: 'Syed Mohsin', msg: 'Assalamu Alaikum' },
    { user: 'Ahmad Safvi', msg: 'Aga Syed Hassan Moosvi is speaking now' }
  ]);

  // Navigate helper
  const navigateTo = (view: string) => {
    setViewHistory([...viewHistory, view]);
    setCommView(view);
  };

  const navigateBack = () => {
    if (viewHistory.length > 1) {
      const updatedHistory = [...viewHistory];
      updatedHistory.pop();
      setViewHistory(updatedHistory);
      setCommView(updatedHistory[updatedHistory.length - 1]);
    }
  };

  // Mock Database
  const mockNews = [
    { id: 'n1', title: 'Central Shariat House Blood Donation Drive Scheduled', author: 'Anjuman Welfare', date: 'July 30, 2026', readTime: '3 mins', category: 'Welfare', article: 'In coordination with local medical agencies, the welfare division of Anjuman-e-Sharie Shian is hosting a central blood donation camp at the Budgam headquarters. Members are requested to pre-register online.' },
    { id: 'n2', title: 'Admissions Open: Central Maktab Term 1448', author: 'Education Board', date: 'July 28, 2026', readTime: '5 mins', category: 'Education', article: 'Traditional Quranic learning curriculum registrations are open for children aged 6 to 14. Scholarships are available for deserving applicants under welfare quotas.' }
  ];

  const mockEvents = [
    { id: 'e1', title: 'Arbaeen Hussaini Commemoration Seminar', date: 'Aug 12, 2026', time: '10:00 AM', venue: 'Imambara Budgam', speaker: 'Aga Syed Hassan Moosvi', category: 'Religious' },
    { id: 'e2', title: 'Youth Workshop: Moral Values in Modern Era', date: 'Aug 18, 2026', time: '02:00 PM', venue: 'Central Library Hall', speaker: 'Aga Syed Hadi Moosvi', category: 'Youth' }
  ];

  const mockDonations = [
    { id: 'd1', title: 'Budgam Maktab School Renovation', raised: 142000, goal: 300000, category: 'Education' },
    { id: 'd2', title: 'Medical Assistance Relief Fund', raised: 89000, goal: 200000, category: 'Medical Aid' }
  ];

  const mockGallery = [
    { id: 'a1', title: 'Arbaeen Assembly 1447 AH', description: 'Photo coverage of the annual Majalis assembly at Budgam.', cover: '📸', photos: ['Photo 1', 'Photo 2', 'Photo 3'] },
    { id: 'a2', title: 'Flood Relief Srinagar 2025', description: 'Deployment moments of Anjuman volunteer squads.', cover: '📦', photos: ['Moment 1', 'Moment 2'] }
  ];

  const mockDirectory = [
    { name: 'Aga Syed Hassan Moosvi', role: 'President / Scholar', contact: '+91-1951-XXXXXX', dept: 'Scholars' },
    { name: 'Maulana Syed Mohammad', role: 'Maktab Teacher', contact: '+91-9906-XXXXXX', dept: 'Teachers' },
    { name: 'Syed Mohsin Ali', role: 'Relief Coordinator', contact: '+91-9876-XXXXXX', dept: 'Volunteers' }
  ];

  const mockDonors = [
    { name: 'Zahid Hussain', group: 'O+', contact: '+91-9419-XXXXXX' },
    { name: 'Sajad Ahmad', group: 'O+', contact: '+91-9906-XXXXXX' },
    { name: 'Shabir Safvi', group: 'A-', contact: '+91-7006-XXXXXX' }
  ];

  // Header breadcrumb metadata helper
  const getHeaderMeta = () => {
    switch (commView) {
      case 'volunteer-hub':
        return { breadcrumbs: ['Home', 'Volunteer', 'My Journey'], title: 'Volunteer Central', desc: 'Track your Husseini Guard hours, duty badges & active assignments.' };
      case 'membership-hub':
        return { breadcrumbs: ['Home', 'Membership', 'Digital ID'], title: 'Membership Core', desc: 'Access NFC digital member cards & community benefits.' };
      case 'news':
        return { breadcrumbs: ['Home', 'News', 'Announcements'], title: 'News & Bulletins', desc: 'Official updates from Anjuman-e-Sharie Shian Secretariat.' };
      case 'news-details':
        return { breadcrumbs: ['Home', 'News', 'Bulletin Details'], title: 'Official Bulletin Briefing', desc: 'Full text and attachments from Anjuman Secretariat.' };
      case 'events':
        return { breadcrumbs: ['Home', 'Media', 'Events'], title: 'Events Directory', desc: 'Upcoming majalis, seminars and religious gatherings.' };
      case 'event-details':
        return { breadcrumbs: ['Home', 'Media', 'Event Details'], title: 'Event Briefing', desc: 'Location, schedule, speakers, and venue guidelines.' };
      case 'live-stream':
        return { breadcrumbs: ['Home', 'Live', 'Live Majlis'], title: 'Live Broadcasting', desc: 'Watch Abu Turab TV live majalis and sermons.' };
      case 'gallery':
        return { breadcrumbs: ['Home', 'Media', 'Gallery'], title: 'Community Media Gallery', desc: 'Historical photos, Ashura processions, and event albums.' };
      case 'calendar':
        return { breadcrumbs: ['Home', 'Media', 'Calendar'], title: 'Community Calendar', desc: 'Islamic dates, Wiladat, and Shahadat commemorations.' };
      case 'donations':
        return { breadcrumbs: ['Home', 'Donations', 'Education Fund'], title: 'Welfare Relief Campaigns', desc: 'Support education, medical, and community welfare funds.' };
      case 'polls':
        return { breadcrumbs: ['Home', 'Community', 'Polls'], title: 'Polls & Feedback', desc: 'Voice your opinion on community initiatives.' };
      case 'welfare':
        return { breadcrumbs: ['Home', 'Community', 'Welfare'], title: 'Welfare Assistance', desc: 'Apply for financial, education, or emergency medical aid.' };
      case 'blood-donation':
        return { breadcrumbs: ['Home', 'Community', 'Blood Registry'], title: 'Blood Donors Registry', desc: 'Connect with registered emergency blood donors in Kashmir.' };
      default:
        return { breadcrumbs: ['Home', 'Community', commView], title: commView.replace('-', ' ').toUpperCase(), desc: 'Explore community services and updates.' };
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col min-h-0 bg-surface">
      
      {/* ----------------------------------------------------
          SUB-ROUTING VIEW HEADER WITH BREADCRUMBS
          ---------------------------------------------------- */}
      {commView !== 'dashboard' && (
        <PageHeader 
          breadcrumbs={getHeaderMeta().breadcrumbs}
          title={getHeaderMeta().title}
          description={getHeaderMeta().desc}
          onBack={navigateBack}
        />
      )}

      {/* ----------------------------------------------------
          ACTIVE VIEW RENDERING BLOCK
          ---------------------------------------------------- */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-5">
        
        {/* ====================================================
            VIEW 1: COMMUNITY DASHBOARD
            ==================================================== */}
        {commView === 'dashboard' && (
          <>
            {/* Welfare Banner Alert */}
            <Card className="bg-gradient-to-br from-primary to-primary-dark text-white p-5 relative overflow-hidden shadow-medium border-emerald-950/20 select-none">
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0">
                <svg width="100%" height="100%">
                  <pattern id="comm-star" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 15,0 L 30,15 L 15,30 L 0,15 Z" fill="none" stroke="currentColor" strokeWidth="0.7" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#comm-star)" />
                </svg>
              </div>

              <div className="flex flex-col gap-1.5 z-10 relative">
                <Badge variant="accent" className="w-fit text-[8px] uppercase tracking-wider">Emergency Appeal</Badge>
                <h3 className="text-sm font-extrabold text-white leading-snug">Flood Relief Jammu & Kashmir</h3>
                <p className="text-[10px] text-emerald-100 leading-relaxed max-w-[240px] mt-1 font-medium">
                  Relief squads are actively distributing rations in Srinagar. Join volunteers or donate now.
                </p>
              </div>
            </Card>

            {/* Quick action grid (12 buttons) */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Community Services</span>
              <div className="grid grid-cols-4 gap-3 bg-white p-4 rounded-3xl border border-slate-50 shadow-soft select-none">
                {[
                  { label: 'News Alerts', icon: '📰', view: 'news' },
                  { label: 'Events', icon: '🗓️', view: 'events' },
                  { label: 'Live Stream', icon: '🎥', view: 'live-stream' },
                  { label: 'Gallery', icon: '📸', view: 'gallery' },
                  { label: 'Calendar', icon: '📆', view: 'calendar' },
                  { label: 'Donations', icon: '💳', view: 'donations' },
                  { label: 'Volunteer Hub', icon: '🤝', view: 'volunteer-hub' },
                  { label: 'Blood Hub', icon: '🩸', view: 'blood-donation' },
                  { label: 'Polls & Vote', icon: '🗳️', view: 'polls' },
                  { label: 'Directory', icon: '📞', view: 'directory' },
                  { label: 'Statistics', icon: '📈', view: 'statistics' },
                  { label: 'Membership Hub', icon: '🪪', view: 'membership-hub' }
                ].map((act, i) => (
                  <button
                    key={i}
                    onClick={() => navigateTo(act.view)}
                    className="flex flex-col items-center justify-center gap-1.5 p-1 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer select-none"
                  >
                    <span className="text-xl flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 border border-slate-100 shadow-sm">{act.icon}</span>
                    <span className="text-[9px] font-bold text-slate-600 tracking-wide text-center leading-tight truncate w-full">{act.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Gallery highlight */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center px-0.5 select-none">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Featured moments gallery</span>
                <button onClick={() => navigateTo('gallery')} className="text-[10px] font-bold text-accent uppercase hover:underline">Browse albums</button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {mockGallery.map((album) => (
                  <Card 
                    key={album.id}
                    onClick={() => { setSelectedAlbum(album); navigateTo('gallery-details'); }}
                    className="p-4 flex flex-col justify-between h-28 bg-white border border-slate-50 hover:border-slate-100 cursor-pointer select-none"
                  >
                    <span className="text-2xl">{album.cover}</span>
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-800 leading-snug truncate">{album.title}</h4>
                      <span className="text-[8.5px] text-slate-400 font-semibold block mt-1">{album.photos.length} photos</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Infographics summary widget */}
            <div className="bg-white rounded-3xl p-4.5 border border-slate-50 shadow-soft select-none cursor-pointer" onClick={() => navigateTo('statistics')}>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3.5">Community Metrics</span>
              <div className="flex justify-around items-center">
                <div className="flex flex-col items-center">
                  <span className="text-lg font-black text-slate-800">4,500+</span>
                  <span className="text-[8.5px] text-slate-400 font-bold uppercase mt-0.5">Active Members</span>
                </div>
                <div className="w-[1px] h-8 bg-slate-100" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-black text-primary">120+</span>
                  <span className="text-[8.5px] text-slate-400 font-bold uppercase mt-0.5">Welfare Projects</span>
                </div>
                <div className="w-[1px] h-8 bg-slate-100" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-black text-slate-800">₹14 Lakhs</span>
                  <span className="text-[8.5px] text-slate-400 font-bold uppercase mt-0.5">Welfare Disbursed</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ====================================================
            VIEW 2: NEWS & ANNOUNCEMENTS
            ==================================================== */}
        {commView === 'news' && (
          <>
            {/* Category horizontal filters */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 select-none">
              {['All', 'Welfare', 'Education'].map((cat) => (
                <Badge 
                  key={cat}
                  variant={newsCategory === cat ? 'accent' : 'neutral'}
                  className="cursor-pointer px-3 py-1 font-bold"
                  onClick={() => setNewsCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>

            {/* News Lists */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Official Bulletins</span>
              <div className="grid grid-cols-1 gap-4">
                {mockNews.filter(n => newsCategory === 'All' || n.category === newsCategory).map((item) => (
                  <Card 
                    key={item.id}
                    onClick={() => { setSelectedNews(item); navigateTo('news-details'); }}
                    className="flex flex-col gap-3.5 hover:border-emerald-100 cursor-pointer select-none"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex flex-col">
                        <Badge variant="accent" className="w-fit text-[8px] uppercase tracking-wider mb-1.5">{item.category}</Badge>
                        <h4 className="text-xs font-extrabold text-slate-800 leading-snug">{item.title}</h4>
                      </div>
                      <span className="text-2xl shrink-0">📰</span>
                    </div>

                    <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 border-t border-slate-50 pt-2.5 mt-1">
                      <span>{item.date}</span>
                      <span>{item.readTime} read</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ====================================================
            VIEW 3: NEWS DETAILS
            ==================================================== */}
        {commView === 'news-details' && selectedNews && (
          <div className="flex flex-col gap-5 select-none">
            {/* Header metadata */}
            <div className="flex flex-col gap-1.5">
              <Badge variant="accent" className="w-fit text-[8px] uppercase tracking-wider">{selectedNews.category}</Badge>
              <h3 className="text-sm font-black text-slate-800 leading-snug mt-1">{selectedNews.title}</h3>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold mt-1">
                <span>By: {selectedNews.author}</span>
                <span>{selectedNews.date} • {selectedNews.readTime}</span>
              </div>
            </div>

            {/* Article Text */}
            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-soft">
              <p className="text-xs text-slate-600 leading-loose font-semibold">
                {selectedNews.article}
              </p>
            </div>

            {/* Actions share */}
            <div className="flex gap-3 mt-2">
              <Button variant="outline" className="flex-1" onClick={() => triggerToast("Article bookmarked in member profile", "success")}>
                <IoBookmarkOutline className="mr-1.5 text-base" /> <span>Bookmark</span>
              </Button>
              <Button variant="primary" className="flex-1" onClick={() => triggerToast("Sharing link copied to clipboard", "success")}>
                <IoShareSocialOutline className="mr-1.5 text-base" /> <span>Share Bulletin</span>
              </Button>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 4: EVENTS
            ==================================================== */}
        {commView === 'events' && (
          <>
            {/* Calendar list switch toggle */}
            <div className="flex justify-between items-center select-none bg-slate-50 p-2 border border-slate-100 rounded-2xl gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide px-1">Organization Assemblies</span>
              <button 
                onClick={() => navigateTo('calendar')}
                className="text-[10px] font-bold text-accent bg-white border border-slate-200/50 px-3 py-1.5 rounded-xl hover:bg-slate-50"
              >
                📅 Calendar View
              </button>
            </div>

            {/* Events registry */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Upcoming programs</span>
              <div className="grid grid-cols-1 gap-4">
                {mockEvents.map((evt) => (
                  <Card 
                    key={evt.id}
                    onClick={() => { setSelectedEvent(evt); navigateTo('event-details'); }}
                    className="flex flex-col gap-3.5 hover:border-emerald-100 cursor-pointer select-none"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex flex-col">
                        <Badge variant="primary" className="w-fit text-[8px] uppercase tracking-wider mb-1.5">{evt.category}</Badge>
                        <h4 className="text-xs font-extrabold text-slate-800 leading-snug">{evt.title}</h4>
                      </div>
                      <span className="text-2xl shrink-0">🗓️</span>
                    </div>

                    <div className="flex flex-col gap-1.5 text-[10px] text-slate-500 font-semibold border-t border-slate-50 pt-2.5 mt-1">
                      <span className="flex items-center gap-1.5"><IoCalendarOutline className="text-accent" /> {evt.date} | {evt.time}</span>
                      <span className="flex items-center gap-1.5"><IoLocationOutline className="text-accent" /> {evt.venue}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ====================================================
            VIEW 5: EVENT DETAILS
            ==================================================== */}
        {commView === 'event-details' && selectedEvent && (
          <div className="flex flex-col gap-5 select-none">
            <div className="flex flex-col gap-1.5">
              <Badge variant="primary" className="w-fit text-[8px] uppercase tracking-wider">{selectedEvent.category}</Badge>
              <h3 className="text-sm font-black text-slate-800 leading-snug mt-1">{selectedEvent.title}</h3>
            </div>

            {/* Schedule details */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4 flex flex-col gap-2.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide px-0.5">Program Details</span>
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-2"><IoCalendarOutline className="text-accent" /> Date: {selectedEvent.date}</span>
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-2"><IoTimeOutline className="text-accent" /> Time: {selectedEvent.time}</span>
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-2"><IoLocationOutline className="text-accent" /> Venue: {selectedEvent.venue}</span>
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-2"><IoPeopleOutline className="text-accent" /> Speaker: {selectedEvent.speaker}</span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              This religious assembly is hosted under central jurisprudential directives. Attendants are requested to pre-register digital alert cards.
            </p>

            {/* RSVP Mock trigger */}
            <Button variant="accent" fullWidth onClick={() => triggerToast("Registration ticket generated successfully!", "success")}>
              <span>RSVP Register Alert</span>
            </Button>
          </div>
        )}

        {/* ====================================================
            VIEW 6: MY REGISTRATIONS
            ==================================================== */}
        {commView === 'my-registrations' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Active Event Tickets</span>
            
            <div className="grid grid-cols-1 gap-4">
              <Card className="flex flex-col gap-4 select-none">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <Badge variant="success" className="text-[8px] uppercase mb-1.5">Confirmed</Badge>
                    <h4 className="text-xs font-extrabold text-slate-800 leading-snug">Arbaeen Hussaini Seminar</h4>
                    <span className="text-[9.5px] text-slate-400 font-semibold block mt-1">Imambara Budgam | Aug 12</span>
                  </div>
                  <span className="text-3xl shrink-0">🎟️</span>
                </div>

                {/* QR ticket visual */}
                <div className="flex gap-4 items-center bg-slate-50 border border-slate-100 rounded-2xl p-3">
                  <div className="w-12 h-12 bg-white flex items-center justify-center border border-slate-100 shrink-0 font-mono text-[6px] text-center font-bold shadow-sm p-1 select-none">
                    [TICKET QR]
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[8px] text-slate-400 font-bold uppercase block">Ticket ID Pass</span>
                    <span className="text-[10px] font-mono text-slate-600 block mt-0.5 truncate font-bold">ticket:arbaeen-1448-98124</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 7: LIVE STREAMING LIST
            ==================================================== */}
        {commView === 'live-stream' && (
          <>
            {/* Live Indicator banner */}
            <div 
              onClick={() => navigateTo('live-player')}
              className="bg-red-600 text-white rounded-3xl p-5 border border-red-700/20 shadow-soft select-none flex justify-between items-center cursor-pointer active:scale-95 transition-transform"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-wider">LIVE NOW</span>
                </div>
                <h4 className="text-sm font-extrabold text-white mt-1">Arbaeen Majalis Live Feed</h4>
                <span className="text-[9.5px] text-red-100 mt-1 block">Speaker: Aga Syed Hassan Moosvi</span>
              </div>
              <IoPlayCircleOutline className="text-4xl text-white/90 shrink-0" />
            </div>

            {/* Upcoming live calendar */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Upcoming Live Broadcasts</span>
              <div className="grid grid-cols-1 gap-4">
                <Card className="flex gap-4 items-center select-none">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg">🎥</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 leading-snug truncate">Friday Congregational Khutbah</h4>
                    <span className="text-[9px] text-slate-400 font-semibold block mt-1">Srinagar | Aug 14, 12:30 PM</span>
                  </div>
                </Card>
              </div>
            </div>
          </>
        )}

        {/* ====================================================
            VIEW 8: LIVE PLAYER (Video stream with chat)
            ==================================================== */}
        {commView === 'live-player' && (
          <div className="flex flex-col gap-5">
            {/* Live stream monitor */}
            <div className="w-full h-44 rounded-3xl bg-slate-950 flex flex-col justify-between p-4 relative overflow-hidden select-none border border-slate-900/10">
              <div className="absolute inset-0 bg-slate-950/20" />
              
              <div className="flex justify-between items-start z-15">
                <Badge variant="error" className="text-[8px] uppercase tracking-wider flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Live Broadcast
                </Badge>
                <span className="text-[9px] text-white/70 font-semibold bg-black/40 px-2 py-0.5 rounded font-mono">1.2K watching</span>
              </div>

              {/* simulated player play/pause */}
              <div className="flex justify-center items-center z-15">
                <span className="text-white text-xs font-bold bg-black/60 px-3 py-1.5 rounded-full">Reciting Quranic Tafseer...</span>
              </div>

              <div className="h-4" />
            </div>

            {/* Chat feed list */}
            <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-soft flex flex-col gap-3.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Live Discussion Chat</span>
              
              <div className="flex flex-col gap-3 max-h-[160px] overflow-y-auto no-scrollbar">
                {chatFeed.map((msg, i) => (
                  <div key={i} className="text-xs leading-relaxed font-semibold">
                    <span className="text-primary font-bold mr-1.5">{msg.user}:</span>
                    <span className="text-slate-600">{msg.msg}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex gap-2 border-t border-slate-50 pt-3">
                <input 
                  type="text" 
                  placeholder="Say something in live discussion..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-primary"
                />
                <button 
                  onClick={() => {
                    if (chatMessage.trim()) {
                      setChatFeed([...chatFeed, { user: 'Syed Mohsin', msg: chatMessage }]);
                      setChatMessage('');
                      triggerToast("Message sent to live feed", "success");
                    }
                  }}
                  className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center hover:bg-primary-dark cursor-pointer active:scale-95 transition-all"
                >
                  <IoSendOutline className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 9: MEDIA GALLERY
            ==================================================== */}
        {commView === 'gallery' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Media Albums</span>
            
            <div className="grid grid-cols-1 gap-4">
              {mockGallery.map((album) => (
                <Card 
                  key={album.id}
                  onClick={() => { setSelectedAlbum(album); navigateTo('gallery-details'); }}
                  className="flex gap-4 cursor-pointer hover:border-emerald-100 select-none"
                >
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0">
                    {album.cover}
                  </div>
                  <div className="flex-1 min-w-0 py-0.5">
                    <h4 className="text-xs font-bold text-slate-800 truncate leading-snug">{album.title}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-1">{album.description}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 10: GALLERY DETAILS (Album Grid)
            ==================================================== */}
        {commView === 'gallery-details' && selectedAlbum && (
          <div className="flex flex-col gap-4 select-none">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Photo Album</span>
              <h3 className="text-base font-black text-slate-800 mt-0.5">{selectedAlbum.title}</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">{selectedAlbum.description}</p>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {selectedAlbum.photos.map((ph: string, i: number) => (
                <div 
                  key={i} 
                  onClick={() => triggerAlert("Gallery Zoom", `Simulating full-screen zoom preview for high-definition album asset "${ph}".`, "info")}
                  className="aspect-square bg-slate-100 border border-slate-200/50 rounded-2xl flex items-center justify-center text-[10px] font-bold text-slate-400 hover:border-accent cursor-pointer active:scale-95 transition-all"
                >
                  {ph}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 11: COMMUNITY CALENDAR
            ==================================================== */}
        {commView === 'calendar' && (
          <>
            {/* Calendar weekly block */}
            <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft select-none flex flex-col gap-3.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">August 2026</span>
              <div className="flex justify-between items-center gap-1.5">
                {[
                  { day: 'Mon', date: '10' },
                  { day: 'Tue', date: '11' },
                  { day: 'Wed', date: '12', active: true },
                  { day: 'Thu', date: '13' },
                  { day: 'Fri', date: '14' },
                  { day: 'Sat', date: '15' },
                  { day: 'Sun', date: '16' }
                ].map((dt) => (
                  <div 
                    key={dt.date} 
                    className={`flex flex-col items-center p-2 rounded-xl flex-1 border transition-all ${
                      dt.active 
                        ? 'bg-primary border-primary text-white shadow-md' 
                        : 'bg-slate-50 border-transparent text-slate-600'
                    }`}
                  >
                    <span className="text-[8px] font-bold uppercase opacity-80">{dt.day}</span>
                    <span className="text-xs font-black mt-1">{dt.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Events listed on that date */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Events on Wednesday, Aug 12</span>
              {mockEvents.map((evt) => (
                <Card 
                  key={evt.id}
                  onClick={() => { setSelectedEvent(evt); navigateTo('event-details'); }}
                  className="flex gap-4 items-center cursor-pointer select-none hover:border-emerald-100"
                >
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">🗓️</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 leading-snug truncate">{evt.title}</h4>
                    <span className="text-[9px] text-slate-400 font-semibold block mt-1">{evt.venue} | {evt.time}</span>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* ====================================================
            VIEW 12: DONATIONS
            ==================================================== */}
        {commView === 'donations' && (
          <PremiumDonationExperience 
            triggerToast={triggerToast} 
            openAuthDialog={openAuthDialog} 
            isGuest={isGuest} 
          />
        )}

        {/* ====================================================
            VIEW 13: DONATION DETAILS
            ==================================================== */}
        {commView === 'donation-details' && selectedDonation && (
          <div className="flex flex-col gap-5 select-none">
            <div className="flex flex-col gap-1.5">
              <Badge variant="success" className="w-fit text-[8px] uppercase tracking-wider">{selectedDonation.category}</Badge>
              <h3 className="text-sm font-black text-slate-800 leading-snug mt-1">{selectedDonation.title}</h3>
            </div>

            {/* Goal Progress bar metrics */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4.5 flex flex-col gap-3">
              <div className="flex justify-between text-xs font-extrabold text-slate-700">
                <span>Raised: ₹{selectedDonation.raised.toLocaleString()}</span>
                <span>Goal: ₹{selectedDonation.goal.toLocaleString()}</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200/50 border border-slate-200/20 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${Math.round((selectedDonation.raised / selectedDonation.goal) * 100)}%` }} />
              </div>
              <span className="text-[10px] text-slate-400 font-bold block mt-0.5 text-center uppercase tracking-wide">
                Campaign is {Math.round((selectedDonation.raised / selectedDonation.goal) * 100)}% funded
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              Donations are tax-exempted under Section 80G provisions of organization audit directives. Simulated payment receipt generated on transfer.
            </p>

            <Button variant="accent" fullWidth onClick={() => triggerToast("Simulated ₹5,000 contribution generated!", "success")}>
              <span>Contribute ₹5,000</span>
            </Button>
          </div>
        )}

        {/* ====================================================
            VIEW 14: COMMUNITY POLLS (Voting)
            ==================================================== */}
        {commView === 'polls' && (
          <div className="flex flex-col gap-5 select-none">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-sans">Active Poll</span>
              <h3 className="text-base font-black text-slate-800 mt-0.5">Welfare Priorities Q3 1448</h3>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-soft flex flex-col gap-4">
              <span className="text-xs font-bold text-slate-700 leading-snug">
                Which section of community relief requires the highest resource allocation this month?
              </span>

              {pollVoted ? (
                /* Poll Results */
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Scholarships for Students', percent: 65, active: pollSelection === 0 },
                    { label: 'Medical Assistance Relief', percent: 25, active: pollSelection === 1 },
                    { label: 'Orphan Support Ledger', percent: 10, active: pollSelection === 2 }
                  ].map((res, i) => (
                    <div key={i} className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
                      <div className="flex justify-between items-center">
                        <span className={res.active ? 'text-primary' : ''}>{res.label}</span>
                        <span>{res.percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                        <div 
                          className={`h-full rounded-full ${res.active ? 'bg-primary' : 'bg-slate-300'}`} 
                          style={{ width: `${res.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Poll Selections */
                <div className="flex flex-col gap-3">
                  {[
                    'Scholarships for Students',
                    'Medical Assistance Relief',
                    'Orphan Support Ledger'
                  ].map((choice, idx) => (
                    <button 
                      key={idx}
                      onClick={() => {
                        setPollSelection(idx);
                        setPollVoted(true);
                        triggerToast("Your vote has been recorded anonymously", "success");
                      }}
                      className="py-3 px-4.5 border border-slate-100 hover:border-primary bg-slate-50 hover:bg-white rounded-2xl text-xs font-bold text-slate-800 text-left active:scale-95 transition-transform cursor-pointer"
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 15: SOCIAL WELFARE APPLICATIONS
            ==================================================== */}
        {commView === 'welfare' && (
          <div className="flex flex-col gap-5 select-none">
            {welfareSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mb-4 animate-bounce">
                  <IoCheckmarkCircle />
                </div>
                <h3 className="text-base font-black text-slate-800 tracking-wide uppercase">Application Submitted</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1 max-w-[240px] leading-relaxed mx-auto">
                  Your welfare application has been logged under docket <span className="font-mono text-slate-700 font-bold">WEL-1448-8742</span>. Review progress in your timeline notifications.
                </p>
                <Button variant="outline" className="mt-6" onClick={() => setWelfareSubmitted(false)}>
                  Submit Another Form
                </Button>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Relief Services</span>
                  <h3 className="text-base font-black text-slate-800 mt-0.5">Submit Welfare Application</h3>
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (welfareForm.name.trim() && welfareForm.details.trim()) {
                      setWelfareSubmitted(true);
                      triggerToast("Welfare request logged in digital vault", "success");
                    } else {
                      triggerToast("Fill out all mandatory text fields", "error");
                    }
                  }}
                  className="flex flex-col gap-4 mt-2"
                >
                  <Input 
                    placeholder="Full Name of applicant" 
                    value={welfareForm.name}
                    onChange={(e) => setWelfareForm({ ...welfareForm, name: e.target.value })}
                  />

                  <div className="flex flex-col gap-1 px-0.5 text-xs font-bold text-slate-700">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mb-1">Relief category</span>
                    <select 
                      value={welfareForm.type}
                      onChange={(e) => setWelfareForm({ ...welfareForm, type: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-2xl text-xs focus:outline-none"
                    >
                      {['Medical Assistance', 'Scholarship Fund', 'Disaster Relief'].map(typ => (
                        <option key={typ} value={typ}>{typ}</option>
                      ))}
                    </select>
                  </div>

                  <Input 
                    placeholder="Case justification details..." 
                    value={welfareForm.details}
                    onChange={(e) => setWelfareForm({ ...welfareForm, details: e.target.value })}
                  />

                  <Button type="submit" variant="primary" fullWidth className="mt-2">
                    <span>Submit Relief Request</span>
                  </Button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ====================================================
            VIEW 16: BLOOD DONATION PORTAL
            ==================================================== */}
        {commView === 'blood-donation' && (
          <div className="flex flex-col gap-5 select-none">
            {/* Search donor by group */}
            <div className="bg-white rounded-3xl p-4 border border-slate-50 shadow-soft flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Emergency Blood Donors</span>
              <div className="flex gap-2">
                <select 
                  value={bloodGroupSearch}
                  onChange={(e) => setBloodGroupSearch(e.target.value)}
                  className="px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none"
                >
                  {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(grp => (
                    <option key={grp} value={grp}>{grp}</option>
                  ))}
                </select>
                <div className="flex-1 text-xs font-semibold text-slate-500 flex items-center px-1">
                  Locating verified active donors in Budgam/Srinagar.
                </div>
              </div>
            </div>

            {/* List matched donors */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Matched Group {bloodGroupSearch} Donors</span>
              
              {mockDonors.filter(d => d.group === bloodGroupSearch).length > 0 ? (
                mockDonors.filter(d => d.group === bloodGroupSearch).map((donor, idx) => (
                  <Card key={idx} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8.5 h-8.5 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs">
                        🩸
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-xs font-bold text-slate-800">{donor.name}</h4>
                        <span className="text-[9px] text-slate-400 font-bold block mt-0.5">Group {donor.group}</span>
                      </div>
                    </div>
                    
                    <a 
                      href={`tel:${donor.contact}`}
                      onClick={(e) => { e.preventDefault(); triggerToast(`Calling donor ${donor.name}...`, 'info'); }}
                      className="p-2 rounded-full bg-slate-50 border border-slate-100 hover:bg-slate-100 text-slate-600 active:scale-95 transition-transform"
                    >
                      <IoCallOutline className="text-sm" />
                    </a>
                  </Card>
                ))
              ) : (
                <EmptyState title="No donors found" description="Adjust group criteria or check offline registers." icon="🩸" />
              )}
            </div>

            <hr className="border-slate-100" />

            {/* Become Donor Form */}
            {donorRegistered ? (
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-3xl text-center">
                <span className="text-2xl block mb-1">🤝</span>
                <span className="text-xs font-bold text-emerald-800">You are registered as an active blood donor!</span>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Register as Blood Donor</span>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (donorForm.name.trim() && donorForm.contact.trim()) {
                      setDonorRegistered(true);
                      triggerToast("Registered in active blood matrix", "success");
                    } else {
                      triggerToast("Please fill out name and contact inputs", "error");
                    }
                  }}
                  className="flex flex-col gap-3 bg-white border border-slate-50 shadow-soft p-4.5 rounded-3xl"
                >
                  <Input 
                    placeholder="Donor Full Name"
                    value={donorForm.name}
                    onChange={(e) => setDonorForm({ ...donorForm, name: e.target.value })}
                  />

                  <div className="flex gap-3">
                    <select 
                      value={donorForm.group}
                      onChange={(e) => setDonorForm({ ...donorForm, group: e.target.value })}
                      className="px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none"
                    >
                      {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(grp => (
                        <option key={grp} value={grp}>{grp}</option>
                      ))}
                    </select>
                    
                    <input 
                      type="tel"
                      placeholder="Contact number"
                      value={donorForm.contact}
                      onChange={(e) => setDonorForm({ ...donorForm, contact: e.target.value })}
                      className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none"
                    />
                  </div>

                  <Button type="submit" variant="primary" fullWidth className="mt-1">
                    <span>Register Donor Matrix</span>
                  </Button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ====================================================
            VIEW 17: COMMUNITY DIRECTORY
            ==================================================== */}
        {commView === 'directory' && (
          <div className="flex flex-col gap-4 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Organization Directories</span>
            
            <div className="flex flex-col gap-3">
              {mockDirectory.map((contact, idx) => (
                <Card key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8.5 h-8.5 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-xs">
                      👤
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-xs font-bold text-slate-800">{contact.name}</h4>
                      <span className="text-[9.5px] text-slate-400 font-semibold block mt-0.5">{contact.role}</span>
                    </div>
                  </div>

                  <a 
                    href={`tel:${contact.contact}`}
                    onClick={(e) => { e.preventDefault(); triggerToast(`Calling ${contact.name}...`, 'info'); }}
                    className="p-2 rounded-full bg-slate-50 border border-slate-100 hover:bg-slate-100 text-slate-600 active:scale-95 transition-transform"
                  >
                    <IoCallOutline className="text-sm" />
                  </a>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 18: NOTIFICATIONS (Community alerts)
            ==================================================== */}
        {commView === 'notifications' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Recent Bulletins alerts</span>
            
            <div className="grid grid-cols-1 gap-4">
              <Card className="flex flex-col gap-2.5 select-none">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <Badge variant="accent" className="text-[8px] uppercase mb-1.5">Alert</Badge>
                    <h4 className="text-xs font-extrabold text-slate-800 leading-snug">Emergency flood assistance deployed</h4>
                    <p className="text-[10px] text-slate-400 mt-1 font-semibold leading-relaxed">
                      Srinagar volunteer squad assembly called at 4:00 PM.
                    </p>
                  </div>
                  <span className="text-2xl shrink-0">🔔</span>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 19: SEARCH Everything
            ==================================================== */}
        {commView === 'search' && (
          <div className="flex flex-col gap-4">
            <Input 
              placeholder="Search news, events, donors..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<IoSearchOutline />}
            />

            {searchQuery.trim() === '' ? (
              <div className="flex flex-col gap-4 select-none mt-1">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Popular Searches</span>
                  <div className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
                    <div className="py-2.5 px-3 bg-slate-50 rounded-xl hover:bg-slate-100/50 cursor-pointer">Arbaeen seminar tickets</div>
                    <div className="py-2.5 px-3 bg-slate-50 rounded-xl hover:bg-slate-100/50 cursor-pointer">Emergency blood O+ donors</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Matched results</span>
                {mockEvents.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                  mockEvents.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase())).map(e => (
                    <div 
                      key={e.id}
                      onClick={() => { setSelectedEvent(e); navigateTo('event-details'); }}
                      className="p-3 border border-slate-50 bg-white rounded-2xl hover:bg-slate-50 cursor-pointer"
                    >
                      <h4 className="text-xs font-bold text-slate-800 truncate">{e.title}</h4>
                      <span className="text-[9px] text-slate-400 font-bold block mt-0.5">{e.venue}</span>
                    </div>
                  ))
                ) : (
                  <EmptyState title="No results found" description="Adjust search filters and query parameters." icon="🔍" />
                )}
              </div>
            )}
          </div>
        )}

        {/* ====================================================
            VIEW 20: PLATFORM ANALYTICS
            ==================================================== */}
        {commView === 'statistics' && (
          <div className="flex flex-col gap-5 select-none">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="flex flex-col p-3 bg-white border border-slate-50 rounded-3xl shadow-soft">
                <span className="text-lg font-black text-slate-800">120+</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 leading-snug">Welfare Projects</span>
              </div>
              <div className="flex flex-col p-3 bg-white border border-slate-50 rounded-3xl shadow-soft">
                <span className="text-lg font-black text-slate-800">2,480+</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 leading-snug">Volunteers Registered</span>
              </div>
              <div className="flex flex-col p-3 bg-white border border-slate-50 rounded-3xl shadow-soft">
                <span className="text-lg font-black text-slate-800">14 Lakhs</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 leading-snug">Welfare Disbursed</span>
              </div>
              <div className="flex flex-col p-3 bg-white border border-slate-50 rounded-3xl shadow-soft">
                <span className="text-lg font-black text-slate-800">24</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 leading-snug">Mosques Sponsored</span>
              </div>
            </div>

            {/* Infographics */}
            <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft flex flex-col gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Donation disbursement metrics</span>
              
              {[
                { category: 'Education & Maktab support', progress: 45, val: '₹6.3 Lakhs' },
                { category: 'Medical emergency aids', progress: 30, val: '₹4.2 Lakhs' },
                { category: 'Disaster emergency relief', progress: 25, val: '₹3.5 Lakhs' }
              ].map((dis, i) => (
                <div key={i} className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
                  <div className="flex justify-between items-center">
                    <span>{dis.category}</span>
                    <span>{dis.val}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${dis.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3.1: VOLUNTEER HUB */}
        {commView === 'volunteer-hub' && (
          <VolunteerModule 
            initialTab="volunteer"
            triggerToast={triggerToast} 
            triggerAlert={triggerAlert} 
            navigateBackToCommunity={() => setCommView('dashboard')}
          />
        )}

        {/* TAB 3.2: MEMBERSHIP HUB */}
        {commView === 'membership-hub' && (
          <VolunteerModule 
            initialTab="member"
            triggerToast={triggerToast} 
            triggerAlert={triggerAlert} 
            navigateBackToCommunity={() => setCommView('dashboard')}
          />
        )}

      </div>
    </div>
  );
};
export default CommunityModule;
