"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { 
  IoBookOutline, 
  IoSchoolOutline, 
  IoPlayCircleOutline, 
  IoCalendarOutline, 
  IoPeopleOutline, 
  IoChevronForwardOutline, 
  IoPersonOutline, 
  IoHeartOutline, 
  IoCheckmarkCircle, 
  IoSearchOutline,
  IoBookmarkOutline,
  IoBookmark
} from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { CommunityModule } from '@/components/community/CommunityModule';
import { mockShrines } from '@/data/mockData';
import { ScholarsDirectory } from './ScholarsDirectory';
import { PageHeader } from '@/components/ui/PageHeader';

interface DiscoverModuleProps {
  isGuest: boolean;
  triggerToast: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  triggerAlert: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
  openAuthDialog: () => void;
  redirectToServices?: (view?: 'launcher' | 'companion' | 'maktab') => void;
}

export const DiscoverModule: React.FC<DiscoverModuleProps> = ({ 
  isGuest, 
  triggerToast, 
  triggerAlert, 
  openAuthDialog,
  redirectToServices
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'scholars' | 'books' | 'courses' | 'lectures' | 'community'>('all');
  const [communityOpen, setCommunityOpen] = useState(false);

  // Mock Book bookmarks
  const [savedBooks, setSavedBooks] = useState<string[]>([]);
  const [activeBookPdf, setActiveBookPdf] = useState<string | null>(null);

  const mockScholars = [
    { name: 'Aga Syed Hassan', title: 'President, Anjuman Sharie Shian', photo: '👳' },
    { name: 'Maulana Syed Mohammad', title: 'Senior Scholar, Budgam', photo: '👳' }
  ];

  const mockPublicBooks = [
    { id: 'b1', title: 'Nahjul Balagha', category: 'Sermons', author: 'Imam Ali (AS)' },
    { id: 'b2', title: 'Sahifa Sajjadiya', category: 'Duas', author: 'Imam Sajjad (AS)' }
  ];

  const mockPublicLectures = [
    { id: 'l1', title: 'Wilayah & Leadership', speaker: 'Aga Syed Hassan', duration: '45 min' },
    { id: 'l2', title: 'Philosophy of Karbala', speaker: 'Maulana Syed Mohammad', duration: '30 min' }
  ];

  const handleToggleBook = (id: string) => {
    if (savedBooks.includes(id)) {
      setSavedBooks(savedBooks.filter(b => b !== id));
      triggerToast("Removed book from local shelf", "info");
    } else {
      setSavedBooks([...savedBooks, id]);
      triggerToast("Book saved to offline shelf", "success");
    }
  };

  if (communityOpen) {
    return (
      <CommunityModule 
        triggerToast={triggerToast} 
        triggerAlert={triggerAlert} 
      />
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col min-h-0 bg-surface select-none">
      
      {activeTab !== 'all' && (
        <PageHeader 
          breadcrumbs={['Home', 'Discover', activeTab === 'scholars' ? 'Scholars' : activeTab === 'books' ? 'Books' : activeTab === 'courses' ? 'Courses' : 'Lectures']}
          title={activeTab === 'scholars' ? 'Scholars Directory' : activeTab === 'books' ? 'Digital Library & Islamic Books' : activeTab === 'courses' ? 'Hawza & Online Courses' : 'Video Sermons & Lectures'}
          description="Explore authentic Islamic knowledge, rulings, and educational resources."
          onBack={() => setActiveTab('all')}
        />
      )}

      {/* Search Header public */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 flex flex-col gap-3 shrink-0 shadow-[0_2px_10px_rgba(0,0,0,0.01)] select-none">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-black text-slate-800 tracking-wide uppercase select-none">Explore Discover</h3>
          {isGuest && <Badge variant="neutral" className="text-[8px] uppercase select-none">Guest Mode</Badge>}
        </div>

        {/* Tab buttons */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'all', label: 'All Discovery' },
            { id: 'scholars', label: 'Scholars Directory' },
            { id: 'books', label: 'Books' },
            { id: 'courses', label: 'Courses' },
            { id: 'lectures', label: 'Lectures' },
            { id: 'community', label: 'Community Hub' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'community') {
                  setCommunityOpen(true);
                } else {
                  setActiveTab(tab.id as any);
                }
              }}
              className={`px-3 py-1 text-[10px] font-bold rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id ? 'bg-primary border-primary text-white' : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main scroller */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-5">

        {/* PDF PREVIEW BOX */}
        {activeBookPdf && (
          <Card className="bg-slate-900 border border-slate-800 text-white p-4 flex flex-col gap-3 relative select-none">
            <div className="flex justify-between items-center select-none">
              <span className="text-[9px] text-accent-light uppercase tracking-widest font-extrabold">E-Book Reader Preview</span>
              <button onClick={() => setActiveBookPdf(null)} className="text-[10px] text-slate-400 font-bold hover:text-white">Close Reader</button>
            </div>
            <div className="w-full h-44 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center text-center p-4 select-none">
              <span className="text-2xl mb-2">📖</span>
              <h4 className="text-xs font-bold text-white/90">{activeBookPdf}</h4>
              <p className="text-[9px] text-white/40 leading-relaxed max-w-[200px] mt-1">
                [Simulated PDF Document View - Scroll down to read pages 1 of 400]
              </p>
            </div>
          </Card>
        )}
        
        {/* ==========================
            A. ALL DISCOVERY / NEWS FEED
            ========================== */}
        {activeTab === 'all' && (
          <>
            {/* Quick Gateways to Volunteer/Member Portal */}
            <div className="grid grid-cols-2 gap-4">
              {/* Member Card */}
              <Card 
                onClick={() => {
                  if (isGuest) {
                    openAuthDialog();
                  } else {
                    setCommunityOpen(true);
                  }
                }}
                className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-4 cursor-pointer select-none hover:border-accent/40 shadow-soft"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] text-accent-light font-bold uppercase tracking-wide">Register Account</span>
                  <h4 className="text-xs font-extrabold">Become a Member</h4>
                  <p className="text-[9px] text-emerald-200 mt-1 leading-snug">Access child Maktab files & direct Shia Fiqh board directives.</p>
                </div>
              </Card>

              {/* Volunteer Card */}
              <Card 
                onClick={() => {
                  if (isGuest) {
                    openAuthDialog();
                  } else {
                    setCommunityOpen(true);
                  }
                }}
                className="bg-white border border-slate-100 p-4 cursor-pointer select-none hover:border-emerald-100 shadow-soft"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] text-primary font-bold uppercase tracking-wide font-sans">Relief Drives</span>
                  <h4 className="text-xs font-extrabold text-slate-800">Become a Volunteer</h4>
                  <p className="text-[9px] text-slate-400 mt-1 leading-snug">Register for emergency blood networks & ration logistics drives.</p>
                </div>
              </Card>
            </div>

            {/* Shrines circle scrolling */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Explore Holy Shrines</span>
              <div className="flex gap-4 overflow-x-auto no-scrollbar py-1">
                {mockShrines.map((sh) => (
                  <div 
                    key={sh.id} 
                    onClick={() => triggerToast(`Exploring ${sh.name.en}...`, 'info')}
                    className="flex flex-col items-center justify-center gap-1.5 shrink-0 select-none cursor-pointer group w-16"
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500/30 p-0.5 shadow-md group-hover:scale-105 group-hover:border-accent transition-all bg-slate-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={sh.imageUrl || '/mourning_shrine.jpg'} 
                        alt={sh.name.en} 
                        className="w-full h-full object-cover rounded-full" 
                      />
                    </div>
                    <span className="text-[8.5px] font-bold text-slate-700 tracking-wide text-center leading-tight line-clamp-2 w-full">{sh.name.en}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scholars directory section */}
            <ScholarsDirectory triggerToast={triggerToast} />
          </>
        )}

        {/* Dedicated Scholars Tab */}
        {activeTab === 'scholars' && (
          <ScholarsDirectory triggerToast={triggerToast} />
        )}

        {/* ==========================
            B. BOOKS SEGMENT
            ========================== */}
        {activeTab === 'books' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Public Books Library</span>
            
            <div className="flex flex-col gap-3">
              {mockPublicBooks.map(bk => {
                const bookSaved = savedBooks.includes(bk.id);
                return (
                  <Card key={bk.id} className="flex justify-between items-center bg-white border border-slate-50 hover:border-slate-100 select-none">
                    <div 
                      onClick={() => setActiveBookPdf(bk.title)}
                      className="flex items-center gap-3 cursor-pointer flex-1 min-w-0 pr-2"
                    >
                      <span className="text-xl shrink-0">📖</span>
                      <div className="flex flex-col min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 leading-snug truncate">{bk.title}</h4>
                        <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">{bk.author} • {bk.category}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleToggleBook(bk.id)}
                      className="text-slate-400 hover:text-primary p-1.5 cursor-pointer shrink-0"
                    >
                      {bookSaved ? <IoBookmark className="text-primary text-base" /> : <IoBookmarkOutline className="text-base" />}
                    </button>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ==========================
            C. COURSES SEGMENT
            ========================= */}
        {activeTab === 'courses' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Islamic courses</span>
            
            <Card className="flex flex-col gap-3.5 select-none bg-white border border-slate-50">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <Badge variant="primary" className="text-[8px] uppercase tracking-wider mb-1.5">Free preview</Badge>
                  <h4 className="text-xs font-extrabold text-slate-800 leading-snug">Basic Islamic Beliefs Aqa'id</h4>
                  <p className="text-[9.5px] text-slate-400 leading-relaxed font-semibold mt-1">
                    Introduction to Theology, Prophethood, and Imamate. Includes video lessons preview.
                  </p>
                </div>
                <span className="text-2xl shrink-0">🎓</span>
              </div>
              <div className="flex justify-end pt-1 mt-1 border-t border-slate-50">
                <Button variant="outline" size="sm" onClick={() => triggerToast("Launching sample video preview...", "success")}>
                  <span>Watch Sample Video</span>
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* ==========================
            D. LECTURES SEGMENT
            ========================= */}
        {activeTab === 'lectures' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Video Lectures Series</span>
            
            <div className="flex flex-col gap-3">
              {mockPublicLectures.map((lec) => (
                <Card 
                  key={lec.id}
                  onClick={() => triggerToast(`Streaming lecture video: ${lec.title}...`, 'success')}
                  className="flex justify-between items-center cursor-pointer hover:border-emerald-100 select-none bg-white"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl text-primary shrink-0"><IoPlayCircleOutline /></span>
                    <div className="flex flex-col">
                      <h4 className="text-xs font-bold text-slate-800 leading-snug">{lec.title}</h4>
                      <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">{lec.speaker} • {lec.duration}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
export default DiscoverModule;
