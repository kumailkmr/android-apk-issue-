"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { LinearProgress, CircularProgress } from '@/components/ui/status/Status';
import { 
  IoBookOutline, 
  IoLibraryOutline, 
  IoPlayCircleOutline, 
  IoTimeOutline, 
  IoChevronBackOutline,
  IoBookmarkOutline,
  IoBookmark,
  IoSearchOutline,
  IoPlayOutline,
  IoPauseOutline,
  IoPlayBackOutline,
  IoPlayForwardOutline,
  IoCheckmarkCircle,
  IoTrashOutline,
  IoDownloadOutline,
  IoGlobeOutline,
  IoShareSocialOutline,
  IoChevronForwardOutline,
  IoStar,
  IoPulseOutline,
  IoRibbonOutline,
  IoTextOutline,
  IoSunnyOutline,
  IoMoonOutline
} from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '@/components/ui/PageHeader';

// Component props
interface LearnModuleProps {
  triggerToast: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  triggerAlert: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
}

export const LearnModule: React.FC<LearnModuleProps> = ({ triggerToast, triggerAlert }) => {
  // Navigation stack
  const [learnView, setLearnView] = useState<string>('dashboard');
  const [viewHistory, setViewHistory] = useState<string[]>(['dashboard']);

  // Selected item states
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [selectedLecture, setSelectedLecture] = useState<any>(null);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [activeLessonIdx, setActiveLessonIdx] = useState<number>(0);
  const [activeSurah, setActiveSurah] = useState<any>(null);

  // Audio Player states
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(35);
  const [audioSpeed, setAudioSpeed] = useState('1.0x');
  const [sleepTimer, setSleepTimer] = useState('Off');

  // Video Player states
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoSpeed, setVideoSpeed] = useState('1.0x');
  const [captionLanguage, setCaptionLanguage] = useState('English');

  // Quran Reader options
  const [quranFontSize, setQuranFontSize] = useState(24);
  const [quranTranslation, setQuranTranslation] = useState(true);

  // Book Reader options
  const [bookProgress, setBookProgress] = useState(42);
  const [bookNotes, setBookNotes] = useState<string[]>([]);
  const [newNoteText, setNewNoteText] = useState('');

  // Course progress trackers
  const [completedLessons, setCompletedLessons] = useState<number[]>([0, 1]);

  // Global search input
  const [searchQuery, setSearchQuery] = useState('');

  // Tab selections in Quran Companion / Library
  const [quranSearchQuery, setQuranSearchQuery] = useState('');
  const [libraryCategory, setLibraryCategory] = useState('All');

  // Favorites & Bookmarks states
  const [favorites, setFavorites] = useState<{
    books: string[];
    lectures: string[];
    courses: string[];
  }>({
    books: ['b1'],
    lectures: ['l1'],
    courses: []
  });

  const [downloads, setDownloads] = useState<string[]>(['b1', 'l1']);

  // View navigation helper
  const navigateTo = (view: string) => {
    setViewHistory([...viewHistory, view]);
    setLearnView(view);
  };

  const navigateBack = () => {
    if (viewHistory.length > 1) {
      const updatedHistory = [...viewHistory];
      updatedHistory.pop();
      setViewHistory(updatedHistory);
      setLearnView(updatedHistory[updatedHistory.length - 1]);
    }
  };

  // Toggle favorite helper
  const toggleFavorite = (type: 'books' | 'lectures' | 'courses', id: string) => {
    const list = favorites[type];
    const isFav = list.includes(id);
    const updated = isFav ? list.filter(item => item !== id) : [...list, id];
    setFavorites({ ...favorites, [type]: updated });
    triggerToast(isFav ? "Removed from Favorites" : "Saved to Favorites", "success");
  };

  const handleDownload = (id: string) => {
    if (downloads.includes(id)) {
      setDownloads(downloads.filter(item => item !== id));
      triggerToast("Deleted from local downloads", "info");
    } else {
      setDownloads([...downloads, id]);
      triggerToast("Saved to offline cache", "success");
    }
  };

  // Mock database datasets
  const mockQuranSurahs = [
    { id: 's1', number: 1, name: 'Al-Fatiha', translation: 'The Opening', verses: 7, juz: 1, type: 'Meccan' },
    { id: 's2', number: 2, name: 'Al-Baqarah', translation: 'The Cow', verses: 286, juz: 1, type: 'Medinan' },
    { id: 's3', number: 36, name: 'Ya-Seen', translation: 'Ya-Seen', verses: 83, juz: 22, type: 'Meccan' }
  ];

  const mockEbooks = [
    { id: 'b1', title: 'Nahjul Balagha (Peak of Eloquence)', author: 'Imam Ali ibn Abi Talib (A.S)', pages: 560, category: 'Fiqh & Hadith', rating: 4.9, desc: 'A compilation of sermons, letters, and sayings attributed to Imam Ali (A.S), demonstrating unprecedented literary eloquence.' },
    { id: 'b2', title: 'Sahifa Sajjadiya (Psalms of Islam)', author: 'Imam Sajjad (A.S)', pages: 320, category: 'Supplications', rating: 4.8, desc: 'A collection of supplications and whisperings of Imam Zayn al-Abidin (A.S), guiding the spiritual growth of the soul.' },
    { id: 'b3', title: 'Islamic Law & Shia Jurisprudence', author: 'Shariat Council Secretariat', pages: 180, category: 'Fiqh', rating: 4.7, desc: 'A modern translation of religious code guidelines for legal contracts, marriage, and ritual observances.' }
  ];

  const mockLecturesDb = [
    { id: 'l1', title: 'Wilayah & The Spiritual Covenant', speaker: 'Aga Syed Hassan Moosvi', duration: '42 mins', views: '2.4K', desc: 'An examination of the theological concept of Wilayah and the covenant established at Ghadir Khumm.' },
    { id: 'l2', title: 'Philosophical Insights of Ashura', speaker: 'Aga Syed Hadi Moosvi', duration: '58 mins', views: '1.8K', desc: 'Analyzing the moral and philosophical dimensions of Imam Hussain’s stand against tyranny.' }
  ];

  const mockCoursesDb = [
    { 
      id: 'c1', 
      title: 'Aqa\'id: Fundamentals of Shia Theology', 
      instructor: 'Aga Syed Hadi Al-Moosvi', 
      duration: '6 hrs (12 lessons)', 
      lessonsCount: 12,
      desc: 'Understand the primary pillars of Usul al-Din: Tawhid (Monotheism), Adlah (Justice), Nubuwwah (Propotheod), Imamah (Leadership), and Ma\'ad (Resurrection).',
      outcomes: ['Grasp logical proofs for the existence of God.', 'Explore the concept of divine justice.', 'Review succession guidelines post-prophethood.'],
      curriculum: [
        { title: 'Logical Proofs of Tawhid', duration: '30m' },
        { title: 'Divine Justice (Adl)', duration: '28m' },
        { title: 'The Purpose of Prophethood', duration: '32m' },
        { title: 'Imamah as a Divine Covenant', duration: '40m' }
      ]
    }
  ];

  // Header breadcrumb metadata helper
  const getLearnHeaderMeta = () => {
    switch (learnView) {
      case 'quran-companion':
      case 'quran-reader':
        return { breadcrumbs: ['Home', 'Learn', 'Quran'], title: 'Holy Quran Center', desc: 'Read 114 Surahs, audio recitations, Tafseer Al-Mizan & translation.' };
      case 'library':
      case 'book-details':
      case 'book-reader':
        return { breadcrumbs: ['Home', 'Learn', 'Books'], title: 'Digital Library', desc: 'Explore authentic Shia Islamic books, Nahjul Balagha & Sahifa Sajjadiya.' };
      case 'courses':
      case 'course-details':
      case 'lesson-screen':
        return { breadcrumbs: ['Home', 'Learn', 'Courses'], title: 'Hawza & Online Courses', desc: 'Structured learning modules on Aqaid, Fiqh, and Islamic History.' };
      case 'lectures':
      case 'lecture-details':
      case 'video-player':
      case 'audio-player':
        return { breadcrumbs: ['Home', 'Learn', 'Lectures'], title: 'Video Sermons & Lectures', desc: 'Watch Abu Turab TV majalis and lectures by senior Kashmiri scholars.' };
      case 'favorites':
        return { breadcrumbs: ['Home', 'Learn', 'Favorites'], title: 'Saved Bookmarks', desc: 'Quick access to your saved books, lectures, and Quran verses.' };
      default:
        return { breadcrumbs: ['Home', 'Learn', learnView], title: learnView.replace('-', ' ').toUpperCase(), desc: 'Explore Islamic educational resources.' };
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col min-h-0 bg-surface">
      
      {/* SUB-ROUTING VIEW HEADER WITH BREADCRUMBS */}
      {learnView !== 'dashboard' && (
        <PageHeader 
          breadcrumbs={getLearnHeaderMeta().breadcrumbs}
          title={getLearnHeaderMeta().title}
          description={getLearnHeaderMeta().desc}
          onBack={navigateBack}
        />
      )}

      {/* ----------------------------------------------------
          ACTIVE VIEW RENDERING BLOCK
          ---------------------------------------------------- */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-5">
        
        {/* ====================================================
            VIEW 1: LEARN DASHBOARD
            ==================================================== */}
        {learnView === 'dashboard' && (
          <>
            {/* Greeting & Streak header */}
            <div className="flex justify-between items-center bg-white p-4.5 rounded-3xl border border-slate-50 shadow-soft select-none">
              <div className="flex flex-col">
                <span className="text-[10px] text-accent uppercase font-bold tracking-wider">Islamic Academy</span>
                <h4 className="text-xs font-black text-slate-800 mt-0.5">Let's continue learning</h4>
              </div>
              <div 
                onClick={() => navigateTo('analytics')}
                className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-full text-xs font-bold text-amber-700 cursor-pointer active:scale-95 transition-transform"
              >
                <span>🔥 5-Day Streak</span>
              </div>
            </div>

            {/* Main grid selections */}
            <div className="grid grid-cols-2 gap-4 select-none">
              <Card 
                onClick={() => navigateTo('quran-companion')}
                className="p-5 flex flex-col justify-between h-36 bg-gradient-to-br from-emerald-800 to-emerald-950 text-white cursor-pointer hover:shadow-md border-emerald-900/10"
              >
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-lg">📖</div>
                <div>
                  <h4 className="text-xs font-bold tracking-wide leading-none">Quran Companion</h4>
                  <span className="text-[9px] text-emerald-300 font-semibold block mt-1.5">Daily goal: 15 verses</span>
                </div>
              </Card>

              <Card 
                onClick={() => navigateTo('library')}
                className="p-5 flex flex-col justify-between h-36 bg-gradient-to-br from-amber-600 to-amber-800 text-white cursor-pointer hover:shadow-md border-amber-700/10"
              >
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-lg">📚</div>
                <div>
                  <h4 className="text-xs font-bold tracking-wide leading-none">Digital Library</h4>
                  <span className="text-[9px] text-amber-200 font-semibold block mt-1.5">328 items indexed</span>
                </div>
              </Card>

              <Card 
                onClick={() => navigateTo('courses')}
                className="p-5 flex flex-col justify-between h-36 bg-gradient-to-br from-blue-700 to-blue-900 text-white cursor-pointer hover:shadow-md border-blue-800/10"
              >
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-lg">🎓</div>
                <div>
                  <h4 className="text-xs font-bold tracking-wide leading-none">Courses Registry</h4>
                  <span className="text-[9px] text-blue-200 font-semibold block mt-1.5">Enroll and earn credentials</span>
                </div>
              </Card>

              <Card 
                onClick={() => navigateTo('lectures')}
                className="p-5 flex flex-col justify-between h-36 bg-gradient-to-br from-purple-700 to-purple-900 text-white cursor-pointer hover:shadow-md border-purple-800/10"
              >
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-lg">🎙️</div>
                <div>
                  <h4 className="text-xs font-bold tracking-wide leading-none">Sermon Lectures</h4>
                  <span className="text-[9px] text-purple-200 font-semibold block mt-1.5">Featured Aga scholars</span>
                </div>
              </Card>
            </div>

            {/* Quick stats block */}
            <div className="bg-white rounded-3xl p-4.5 border border-slate-50 shadow-soft select-none">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Overall Progress Statistics</span>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col">
                  <span className="text-base font-black text-slate-800">4.5 hrs</span>
                  <span className="text-[8.5px] text-slate-400 font-semibold uppercase mt-0.5">Study Hours</span>
                </div>
                <div className="flex flex-col border-x border-slate-100">
                  <span className="text-base font-black text-primary">82%</span>
                  <span className="text-[8.5px] text-slate-400 font-semibold uppercase mt-0.5">Fiqh Score</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-black text-slate-800">1</span>
                  <span className="text-[8.5px] text-slate-400 font-semibold uppercase mt-0.5">Certificate</span>
                </div>
              </div>
            </div>

            {/* Learning sections shortcuts */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Recently Added Courses</span>
              {mockCoursesDb.map((course) => (
                <Card 
                  key={course.id}
                  onClick={() => { setSelectedCourse(course); navigateTo('course-details'); }}
                  className="flex gap-4 cursor-pointer hover:border-blue-100"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-xl font-bold">
                    📖
                  </div>
                  <div className="flex-1 min-w-0 py-0.5">
                    <h4 className="text-xs font-bold text-slate-800 truncate leading-snug">{course.title}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold mt-1 block">Instructor: {course.instructor}</span>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* ====================================================
            VIEW 2: QURAN COMPANION
            ==================================================== */}
        {learnView === 'quran-companion' && (
          <>
            {/* Companion stats welcome */}
            <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-5 border border-emerald-900/20 shadow-soft select-none flex justify-between items-center">
              <div className="flex flex-col gap-1.5">
                <span className="text-[8px] text-emerald-300 font-bold uppercase tracking-wider">Quran Progress</span>
                <h4 className="text-base font-black text-white">Juz 1 • 62% Read</h4>
                <p className="text-[10px] text-emerald-100 mt-1 max-w-[200px] leading-relaxed">
                  Last read: Surah Al-Baqarah, Ayah 125. Finish Juz 1 to complete goal!
                </p>
              </div>
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                <span className="text-sm font-black">62%</span>
              </div>
            </div>

            {/* Daily goal ticker */}
            <div className="bg-white rounded-3xl p-4 border border-slate-50 shadow-soft select-none flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 font-bold uppercase">Daily Goal Ticker</span>
                <span className="text-xs font-extrabold text-slate-700 mt-0.5">10 of 15 verses read today</span>
              </div>
              <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden w-20">
                <div className="h-full bg-primary" style={{ width: '66%' }} />
              </div>
            </div>

            {/* Surah List grid */}
            <div className="flex flex-col gap-3.5">
              <div className="flex justify-between items-center px-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Surah Index</span>
                <input 
                  type="text" 
                  placeholder="Filter Surah..."
                  value={quranSearchQuery}
                  onChange={(e) => setQuranSearchQuery(e.target.value)}
                  className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-bold text-slate-600 focus:outline-none focus:border-primary max-w-[120px]"
                />
              </div>

              <div className="flex flex-col gap-3">
                {mockQuranSurahs.filter(s => s.name.toLowerCase().includes(quranSearchQuery.toLowerCase())).map((surah) => (
                  <Card 
                    key={surah.id}
                    onClick={() => { setActiveSurah(surah); navigateTo('quran-reader'); }}
                    className="flex justify-between items-center cursor-pointer hover:border-emerald-100 select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-black text-slate-800">
                        {surah.number}
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-xs font-bold text-slate-800">{surah.name}</h4>
                        <span className="text-[9px] text-slate-400 font-semibold mt-0.5">{surah.translation} • {surah.verses} verses</span>
                      </div>
                    </div>
                    <Badge variant="neutral" className="text-[8px] uppercase tracking-wider">{surah.type}</Badge>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ====================================================
            VIEW 3: QURAN READING SCREEN (Surah Reader)
            ==================================================== */}
        {learnView === 'quran-reader' && (
          <div className="flex flex-col gap-5">
            {/* Header controls: Font Adjustment & translation */}
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-3xl flex justify-between items-center select-none gap-4">
              {/* Font settings */}
              <div className="flex items-center gap-2 flex-1">
                <IoTextOutline className="text-slate-400 text-base" />
                <input 
                  type="range" 
                  min={18} 
                  max={36} 
                  value={quranFontSize}
                  onChange={(e) => setQuranFontSize(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer h-1.5 rounded-full"
                />
                <span className="text-[10px] font-bold text-slate-500 font-mono">{quranFontSize}px</span>
              </div>

              {/* Translation Toggle */}
              <button 
                onClick={() => setQuranTranslation(!quranTranslation)}
                className={`px-3 py-1.5 rounded-full border text-[10px] font-bold transition-all cursor-pointer ${
                  quranTranslation ? 'bg-primary border-primary text-white' : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                Translation
              </button>
            </div>

            {/* Ayah reading panes */}
            <div className="flex flex-col gap-6 bg-white border border-slate-100 rounded-3xl p-5 shadow-soft">
              {[
                { num: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', trans: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.', tafsir: 'Al-Fatiha begins with the dedication of all acts to the Divine Mercy...' },
                { num: 2, arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', trans: '[All] praise is [due] to Allah, Lord of the worlds -', tafsir: 'Praise is reserved only for Allah, the Creator and Sustainer of the cosmos.' },
                { num: 3, arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', trans: 'The Entirely Merciful, the Especially Merciful,', tafsir: 'Highlighting the dual manifestation of Rahmah (general and specific grace).' }
              ].map((ayah) => (
                <div key={ayah.num} className="flex flex-col gap-3 pb-5 border-b border-slate-50 last:border-b-0">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold select-none">
                    <span>Ayah {ayah.num}</span>
                    <div className="flex gap-2.5">
                      <button onClick={() => triggerToast(`Ayah ${ayah.num} bookmarked`, 'success')} className="hover:text-primary"><IoBookmarkOutline className="text-sm" /></button>
                      <button onClick={() => triggerAlert(`Tafsir Ayah ${ayah.num}`, ayah.tafsir, 'info')} className="hover:text-primary"><IoLibraryOutline className="text-sm" /></button>
                    </div>
                  </div>

                  {/* Arabic Text with sizing state */}
                  <p 
                    dir="rtl" 
                    className="leading-loose font-bold text-primary font-urdu text-right select-all"
                    style={{ fontSize: `${quranFontSize}px` }}
                  >
                    {ayah.arabic}
                  </p>

                  {/* Conditional translations */}
                  {quranTranslation && (
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold pr-1">
                      {ayah.trans}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Audio playback companion controls */}
            <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-4.5 shadow-medium flex flex-col gap-3 select-none">
              <div className="flex justify-between items-center">
                <span className="text-[8px] text-accent-light uppercase tracking-widest font-extrabold">Audio Reciter</span>
                <span className="text-[10px] text-white/50 font-semibold">Sheikh Al-Minshawi</span>
              </div>

              <div className="flex justify-center items-center gap-6 py-1">
                <button className="text-white/60 hover:text-white"><IoPlayBackOutline className="text-lg" /></button>
                <button 
                  onClick={() => setAudioPlaying(!audioPlaying)}
                  className="w-10 h-10 rounded-full bg-accent text-slate-950 flex items-center justify-center shadow-md active:scale-95 transition-transform"
                >
                  {audioPlaying ? <IoPauseOutline className="text-lg" /> : <IoPlayOutline className="text-lg translate-x-[0.5px]" />}
                </button>
                <button className="text-white/60 hover:text-white"><IoPlayForwardOutline className="text-lg" /></button>
              </div>

              {/* Progress Slider */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[8px] font-mono text-white/40">01:12</span>
                <div className="flex-1 h-1 bg-white/10 rounded-full relative">
                  <div className="absolute top-0 bottom-0 bg-accent rounded-full" style={{ width: '45%' }} />
                </div>
                <span className="text-[8px] font-mono text-white/40">02:30</span>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 4: DIGITAL LIBRARY
            ==================================================== */}
        {learnView === 'library' && (
          <>
            {/* Category horizontal badges */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 select-none">
              {['All', 'Fiqh & Hadith', 'Supplications', 'Fiqh'].map((cat) => (
                <Badge
                  key={cat}
                  variant={libraryCategory === cat ? 'accent' : 'neutral'}
                  className="cursor-pointer px-3 py-1 font-bold"
                  onClick={() => setLibraryCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>

            {/* Books catalog layout */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">E-Books Index</span>
              <div className="grid grid-cols-1 gap-4">
                {mockEbooks.filter(b => libraryCategory === 'All' || b.category === libraryCategory).map((book) => (
                  <Card 
                    key={book.id}
                    onClick={() => { setSelectedBook(book); navigateTo('book-details'); }}
                    className="flex gap-4 cursor-pointer hover:border-amber-100 select-none"
                  >
                    {/* Fake book cover */}
                    <div className="w-14 h-20 bg-gradient-to-br from-amber-600 to-amber-900 rounded-xl flex flex-col justify-between p-2 text-white shrink-0 shadow-md">
                      <IoBookOutline className="text-white/60 text-xs" />
                      <span className="text-[8px] font-serif uppercase tracking-wider font-extrabold line-clamp-2 leading-tight text-center">{book.title.split(' ')[0]}</span>
                      <span className="text-[6px] text-white/40 text-center font-bold">E-Book</span>
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 leading-snug truncate">{book.title}</h4>
                        <span className="text-[9.5px] text-slate-400 font-semibold mt-1 block">Author: {book.author}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                        <span>{book.pages} pages</span>
                        <span className="text-accent">Read book</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ====================================================
            VIEW 5: BOOK DETAILS
            ==================================================== */}
        {learnView === 'book-details' && selectedBook && (
          <div className="flex flex-col gap-5 select-none">
            {/* Primary Details Row */}
            <div className="flex gap-5 items-start">
              {/* Big cover banner */}
              <div className="w-24 h-36 bg-gradient-to-br from-amber-600 to-amber-900 rounded-2xl flex flex-col justify-between p-3.5 text-white shrink-0 shadow-lg border border-amber-800/10">
                <IoBookOutline className="text-white/50 text-base" />
                <span className="text-[10px] font-serif font-extrabold uppercase tracking-widest text-center leading-normal">{selectedBook.title.split(' ')[0]}</span>
                <span className="text-[8px] text-white/40 text-center font-bold">E-Book</span>
              </div>

              <div className="flex-1 flex flex-col gap-2 pt-1">
                <Badge variant="accent" className="w-fit text-[8px] uppercase tracking-wider">{selectedBook.category}</Badge>
                <h3 className="text-sm font-black text-slate-800 leading-snug">{selectedBook.title}</h3>
                <span className="text-[11px] text-slate-500 font-semibold">Author: {selectedBook.author}</span>
                
                <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold mt-1">
                  <IoStar className="text-amber-400" />
                  <span>{selectedBook.rating} / 5.0</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4 flex flex-col gap-2 mt-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Synopsis Description</span>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                {selectedBook.desc}
              </p>
            </div>

            {/* Stat Row */}
            <div className="grid grid-cols-3 gap-3 text-center bg-white border border-slate-100 rounded-3xl p-3.5 shadow-soft">
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-800">English</span>
                <span className="text-[8.5px] text-slate-400 font-semibold uppercase mt-0.5">Language</span>
              </div>
              <div className="flex flex-col border-x border-slate-100">
                <span className="text-xs font-black text-slate-800">{selectedBook.pages}</span>
                <span className="text-[8.5px] text-slate-400 font-semibold uppercase mt-0.5">Total Pages</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-800">PDF</span>
                <span className="text-[8.5px] text-slate-400 font-semibold uppercase mt-0.5">Format</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 w-full mt-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleDownload(selectedBook.id)}
              >
                {downloads.includes(selectedBook.id) ? (
                  <span className="flex items-center justify-center gap-1.5"><IoTrashOutline className="text-red-500" /> <span>Delete Cache</span></span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5"><IoDownloadOutline /> <span>Save Offline</span></span>
                )}
              </Button>
              
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={() => navigateTo('book-reader')}
              >
                <span>Read Ebook</span>
              </Button>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 6: BOOK READER
            ==================================================== */}
        {learnView === 'book-reader' && selectedBook && (
          <div className="flex flex-col gap-5">
            {/* Reader state bars */}
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-3xl flex justify-between items-center select-none text-xs font-bold text-slate-500 gap-4">
              <span>Reading: {selectedBook.title.split(' ')[0]}</span>
              <span className="font-mono">Page 45 of {selectedBook.pages} ({bookProgress}%)</span>
            </div>

            {/* Book text frame */}
            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-soft flex flex-col gap-4">
              <h4 className="text-xs font-bold text-slate-800 leading-snug uppercase tracking-wide">Chapter II: Philosophical Virtues</h4>
              <p className="text-xs text-slate-600 leading-loose font-semibold">
                "The primary virtue of the human intellect is its capacity to verify metaphysical covenants. When truth is revealed through spiritual channels, the intellect acts as a recipient, aligning human aspirations with divine commands."
              </p>
              <p className="text-xs text-slate-600 leading-loose font-semibold mt-2">
                "Thus, the Peak of Eloquence (Nahjul Balagha) repeatedly asserts that rational sanity is synonymous with moral accountability. Those who lack ethical boundaries are considered intellectually compromised."
              </p>
            </div>

            {/* Highlights & notes widget */}
            <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-soft flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">My Highlights & Notes</span>
              
              {bookNotes.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {bookNotes.map((nt, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100/50 text-[11px] font-semibold text-slate-600">
                      {nt}
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-[10px] text-slate-400 italic px-0.5">No highlights added yet. Select text to highlight or add notes below.</span>
              )}

              {/* Add note form */}
              <div className="flex gap-2 mt-2">
                <input 
                  type="text" 
                  placeholder="Type notes on this page..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-primary"
                />
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => {
                    if (newNoteText.trim()) {
                      setBookNotes([...bookNotes, newNoteText]);
                      setNewNoteText('');
                      triggerToast("Note added to chapter catalog", "success");
                    }
                  }}
                >
                  <span>Save</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 7: LECTURES DIRECTORY
            ==================================================== */}
        {learnView === 'lectures' && (
          <>
            {/* Featured Scholar widget */}
            <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-5 shadow-soft select-none flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl shrink-0">👳</div>
              <div className="flex-1 min-w-0">
                <span className="text-[8px] text-accent-light uppercase tracking-widest font-extrabold">Featured Scholar</span>
                <h4 className="text-xs font-black text-white truncate mt-0.5">Aga Syed Hassan Moosvi</h4>
                <p className="text-[10px] text-white/50 font-semibold block mt-0.5">14 lectures published this term</p>
              </div>
            </div>

            {/* Lectures list */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Sermon Archives</span>
              <div className="grid grid-cols-1 gap-4">
                {mockLecturesDb.map((lecture) => (
                  <Card 
                    key={lecture.id}
                    onClick={() => { setSelectedLecture(lecture); navigateTo('lecture-details'); }}
                    className="flex gap-4 cursor-pointer hover:border-purple-100 select-none"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 text-xl font-bold">
                      <IoPlayCircleOutline className="text-2xl" />
                    </div>
                    <div className="flex-1 min-w-0 py-0.5 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 leading-snug truncate">{lecture.title}</h4>
                        <span className="text-[10px] text-slate-400 font-semibold block mt-1">Speaker: {lecture.speaker}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 mt-1">
                        <span>{lecture.duration}</span>
                        <span>{lecture.views} views</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ====================================================
            VIEW 8: LECTURE DETAILS
            ==================================================== */}
        {learnView === 'lecture-details' && selectedLecture && (
          <div className="flex flex-col gap-5 select-none">
            {/* Fake video thumbnail */}
            <div className="w-full h-44 rounded-3xl bg-slate-950 flex items-center justify-center relative overflow-hidden group border border-slate-900/10">
              <div className="absolute inset-0 bg-slate-900/40" />
              <IoPlayCircleOutline className="text-5xl text-white z-15 group-hover:scale-110 transition-transform cursor-pointer" onClick={() => navigateTo('video-player')} />
              <span className="absolute bottom-3 right-3 bg-black/60 text-[9px] text-white px-2 py-0.5 rounded font-mono font-bold">{selectedLecture.duration}</span>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-1.5">
              <Badge variant="accent" className="w-fit text-[8px] uppercase tracking-wider">Islamic Sermons</Badge>
              <h3 className="text-sm font-black text-slate-800 leading-snug mt-1">{selectedLecture.title}</h3>
              <span className="text-[11px] text-slate-500 font-semibold">Delivered by: {selectedLecture.speaker}</span>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4 flex flex-col gap-2 mt-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Lecture Summary</span>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                {selectedLecture.desc}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full mt-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleDownload(selectedLecture.id)}
              >
                {downloads.includes(selectedLecture.id) ? 'Saved Offline' : 'Save Lecture'}
              </Button>
              
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={() => navigateTo('video-player')}
              >
                <span>Stream Lecture</span>
              </Button>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 9: VIDEO PLAYER
            ==================================================== */}
        {learnView === 'video-player' && selectedLecture && (
          <div className="flex flex-col gap-5">
            {/* Screen Mock Player */}
            <div className="w-full h-44 rounded-3xl bg-slate-950 flex flex-col justify-between p-4 relative overflow-hidden select-none">
              <div className="absolute inset-0 bg-slate-950/20" />
              
              {/* Top details bar */}
              <div className="flex justify-between items-center z-15 text-[10px] text-white/70 font-semibold">
                <span className="truncate max-w-[180px]">{selectedLecture.title}</span>
                <span className="bg-black/40 px-2 py-0.5 rounded font-bold font-mono">1080p</span>
              </div>

              {/* Center Play pause */}
              <div className="flex justify-center items-center gap-6 z-15">
                <button 
                  onClick={() => setVideoPlaying(!videoPlaying)}
                  className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
                >
                  {videoPlaying ? <IoPauseOutline className="text-2xl" /> : <IoPlayOutline className="text-2xl translate-x-[0.5px]" />}
                </button>
              </div>

              {/* Progress timeline */}
              <div className="flex items-center gap-2 z-15">
                <span className="text-[8px] font-mono text-white/50">12:34</span>
                <div className="flex-1 h-1 bg-white/20 rounded-full relative">
                  <div className="absolute top-0 bottom-0 bg-accent rounded-full" style={{ width: '30%' }} />
                </div>
                <span className="text-[8px] font-mono text-white/50">{selectedLecture.duration}</span>
              </div>
            </div>

            {/* Video configuration controls */}
            <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-soft flex flex-col gap-3 select-none">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Stream Configuration</span>
              <div className="flex gap-3 justify-between items-center text-xs font-bold text-slate-700">
                <span>Playback Speed</span>
                <select 
                  value={videoSpeed}
                  onChange={(e) => setVideoSpeed(e.target.value)}
                  className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs focus:outline-none"
                >
                  {['0.75x', '1.0x', '1.25x', '1.5x'].map((sp) => (
                    <option key={sp} value={sp}>{sp}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 justify-between items-center text-xs font-bold text-slate-700 mt-2">
                <span>Interactive Subtitles</span>
                <select 
                  value={captionLanguage}
                  onChange={(e) => setCaptionLanguage(e.target.value)}
                  className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs focus:outline-none"
                >
                  {['English', 'Urdu', 'Persian'].map((cp) => (
                    <option key={cp} value={cp}>{cp}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 10: AUDIO PLAYER (Full screen panel)
            ==================================================== */}
        {learnView === 'audio-player' && (
          <div className="flex flex-col gap-5 select-none items-center text-center">
            {/* Big circular album artwork logo */}
            <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-primary to-primary-dark border-4 border-accent/20 flex items-center justify-center p-4 mt-6 shadow-xl animate-spin-slow">
              <div className="w-full h-full rounded-full border border-accent/35 border-dashed flex flex-col items-center justify-center text-white">
                <span className="text-xs font-urdu font-extrabold leading-none">تلاوت</span>
                <span className="text-[8px] text-accent leading-none mt-1 uppercase font-bold">Quran Reciter</span>
              </div>
            </div>

            {/* Recitation titles */}
            <div className="mt-4 flex flex-col gap-1.5">
              <Badge variant="accent" className="w-fit mx-auto text-[8px] uppercase tracking-wider">Quran Audio Reciter</Badge>
              <h3 className="text-base font-black text-slate-800 leading-snug">Surah Al-Baqarah (Juz 1)</h3>
              <span className="text-xs text-slate-400 font-semibold">Qari Sheikh Al-Minshawi</span>
            </div>

            {/* Timeline slider */}
            <div className="w-full flex items-center gap-3 mt-6">
              <span className="text-[9px] font-mono text-slate-400">04:30</span>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full relative cursor-pointer">
                <div className="absolute top-0 bottom-0 bg-primary rounded-full" style={{ width: '42%' }} />
                <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent border border-white shadow shadow-sm" style={{ left: '42%' }} />
              </div>
              <span className="text-[9px] font-mono text-slate-400">10:45</span>
            </div>

            {/* Player control grid */}
            <div className="flex justify-center items-center gap-8 mt-5 py-2">
              <button 
                onClick={() => setSleepTimer(sleepTimer === 'Off' ? '30m' : 'Off')}
                className={`p-2 rounded-xl text-xs font-bold transition-all ${
                  sleepTimer !== 'Off' ? 'bg-primary/5 text-primary border border-primary/10' : 'text-slate-400'
                }`}
              >
                ⏱️ {sleepTimer !== 'Off' ? `Timer: ${sleepTimer}` : 'Timer'}
              </button>

              <button 
                onClick={() => setAudioPlaying(!audioPlaying)}
                className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
              >
                {audioPlaying ? <IoPauseOutline className="text-2xl" /> : <IoPlayOutline className="text-2xl translate-x-[0.5px]" />}
              </button>

              <button 
                onClick={() => setAudioSpeed(audioSpeed === '1.0x' ? '1.25x' : audioSpeed === '1.25x' ? '1.5x' : '1.0x')}
                className="p-2 text-slate-400 text-xs font-bold"
              >
                Speed: {audioSpeed}
              </button>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 11: COURSES REGISTRY
            ==================================================== */}
        {learnView === 'courses' && (
          <>
            {/* Stats widget header */}
            <div className="bg-white rounded-3xl p-4.5 border border-slate-50 shadow-soft select-none flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 font-bold uppercase">Learning Path</span>
                <span className="text-xs font-extrabold text-slate-700 mt-0.5">1 active course enrollment</span>
              </div>
              <button 
                onClick={() => navigateTo('certificates')}
                className="flex items-center gap-1 text-[10px] font-extrabold text-accent bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-full"
              >
                <IoRibbonOutline />
                <span>My Certificates</span>
              </button>
            </div>

            {/* Courses Catalog list */}
            <div className="flex flex-col gap-4 mt-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Theological Classes</span>
              <div className="grid grid-cols-1 gap-4">
                {mockCoursesDb.map((course) => (
                  <Card 
                    key={course.id}
                    onClick={() => { setSelectedCourse(course); navigateTo('course-details'); }}
                    className="flex flex-col gap-3.5 hover:border-blue-100 cursor-pointer select-none"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <Badge variant="primary" className="text-[8px] uppercase tracking-wider mb-1.5">Shia Theology</Badge>
                        <h4 className="text-xs font-extrabold text-slate-800 leading-snug">{course.title}</h4>
                      </div>
                      <span className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold shrink-0">🎓</span>
                    </div>

                    <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-50 mt-1">
                      <div className="flex justify-between text-[9px] font-bold text-slate-400">
                        <span>Progress: 15%</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '15%' }} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ====================================================
            VIEW 12: COURSE DETAILS
            ==================================================== */}
        {learnView === 'course-details' && selectedCourse && (
          <div className="flex flex-col gap-5 select-none">
            {/* Header info */}
            <div className="flex flex-col gap-1.5">
              <Badge variant="primary" className="w-fit text-[8px] uppercase tracking-wider">Theology Department</Badge>
              <h3 className="text-sm font-black text-slate-800 leading-snug mt-1">{selectedCourse.title}</h3>
              <span className="text-[11px] text-slate-500 font-semibold">Instructor: {selectedCourse.instructor}</span>
              <span className="text-[10px] text-slate-400 font-bold block">{selectedCourse.duration}</span>
            </div>

            {/* Curriculum list tabs */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Course Syllabus Lessons</span>
              
              <div className="flex flex-col gap-2.5 bg-white border border-slate-50 shadow-soft p-4 rounded-3xl">
                {selectedCourse.curriculum.map((lesson: any, i: number) => {
                  const isCompleted = completedLessons.includes(i);
                  return (
                    <div 
                      key={i}
                      onClick={() => {
                        setActiveLessonIdx(i);
                        navigateTo('lesson-screen');
                      }}
                      className="flex justify-between items-center py-2 px-1 hover:bg-slate-50 rounded-xl cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                          isCompleted ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-400'
                        }`}>
                          {isCompleted ? '✓' : i + 1}
                        </div>
                        <span className="text-xs font-bold text-slate-700 truncate max-w-[180px]">{lesson.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold font-mono shrink-0 ml-2">{lesson.duration}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enroll action simulation */}
            <Button variant="primary" fullWidth onClick={() => triggerToast("You are already enrolled in this class", "info")}>
              <span>Enter Classroom</span>
            </Button>
          </div>
        )}

        {/* ====================================================
            VIEW 13: LESSON SCREEN
            ==================================================== */}
        {learnView === 'lesson-screen' && selectedCourse && (
          <div className="flex flex-col gap-5">
            {/* Fake video frame */}
            <div className="w-full h-44 rounded-3xl bg-slate-950 flex items-center justify-center relative overflow-hidden group select-none shadow-sm">
              <div className="absolute inset-0 bg-slate-950/20" />
              <IoPlayCircleOutline className="text-5xl text-white cursor-pointer active:scale-95 transition-transform" />
              <span className="absolute bottom-3 right-3 bg-black/60 text-[9px] text-white px-2 py-0.5 rounded font-mono font-bold">30 mins</span>
            </div>

            {/* Lesson details */}
            <div className="flex flex-col gap-1.5 select-none">
              <Badge variant="primary" className="w-fit text-[8px] uppercase tracking-wider">Lesson {activeLessonIdx + 1} of 12</Badge>
              <h3 className="text-sm font-black text-slate-800 leading-snug mt-1">
                {selectedCourse.curriculum[activeLessonIdx]?.title}
              </h3>
            </div>

            {/* Downloadable PDF notes */}
            <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-soft flex justify-between items-center select-none">
              <div className="flex items-center gap-3">
                <span className="text-xl">📄</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700 leading-none">Class Notes PDF</span>
                  <span className="text-[9px] text-slate-400 font-semibold mt-1">Syllabus summary & reference texts</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => triggerToast("Class notes saved to offline documents", "success")}
              >
                <span>Download</span>
              </Button>
            </div>

            {/* Complete lesson trigger */}
            <div className="mt-3 flex justify-between gap-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  if (activeLessonIdx > 0) {
                    setActiveLessonIdx(activeLessonIdx - 1);
                  }
                }}
              >
                <span>Previous</span>
              </Button>
              
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={() => {
                  if (!completedLessons.includes(activeLessonIdx)) {
                    setCompletedLessons([...completedLessons, activeLessonIdx]);
                    triggerToast("Lesson marked completed in registry", "success");
                  }
                  if (activeLessonIdx < selectedCourse.curriculum.length - 1) {
                    setActiveLessonIdx(activeLessonIdx + 1);
                  } else {
                    navigateTo('certificates'); // Completed course path
                  }
                }}
              >
                <span>Next Lesson</span>
              </Button>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 14: LEARNING PROGRESS (Analytics)
            ==================================================== */}
        {learnView === 'analytics' && (
          <>
            <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft select-none grid grid-cols-2 gap-4 text-center">
              <div className="flex flex-col p-2 bg-slate-50 border border-slate-100/50 rounded-2xl">
                <span className="text-lg font-black text-slate-800">4</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 leading-snug">Books Read</span>
              </div>
              <div className="flex flex-col p-2 bg-slate-50 border border-slate-100/50 rounded-2xl">
                <span className="text-lg font-black text-slate-800">1</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 leading-snug">Course Completed</span>
              </div>
              <div className="flex flex-col p-2 bg-slate-50 border border-slate-100/50 rounded-2xl">
                <span className="text-lg font-black text-slate-800">8.4 hrs</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 leading-snug">Study Hours</span>
              </div>
              <div className="flex flex-col p-2 bg-slate-50 border border-slate-100/50 rounded-2xl">
                <span className="text-lg font-black text-slate-800">5 days</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 leading-snug">Active Streak</span>
              </div>
            </div>

            {/* Streaks timeline */}
            <div className="bg-white rounded-3xl p-4.5 border border-slate-50 shadow-soft select-none flex flex-col gap-3 mt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Study Streak Timeline</span>
              <div className="flex justify-between items-center gap-1.5">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                  const active = idx < 5;
                  return (
                    <div 
                      key={day} 
                      className={`flex flex-col items-center p-2 rounded-xl flex-1 border transition-all ${
                        active ? 'bg-primary/5 border-primary text-primary' : 'bg-slate-50 border-transparent text-slate-300'
                      }`}
                    >
                      <span className="text-[8px] font-extrabold uppercase">{day}</span>
                      <span className="text-xs font-bold mt-1.5">{active ? '🔥' : '•'}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ====================================================
            VIEW 15: CERTIFICATES
            ==================================================== */}
        {learnView === 'certificates' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">My Earned Credentials</span>
            <div className="grid grid-cols-1 gap-4">
              <Card className="flex flex-col gap-4 select-none">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <Badge variant="success" className="text-[8px] uppercase tracking-wider mb-1.5">Verified</Badge>
                    <h4 className="text-xs font-extrabold text-slate-800 leading-snug">Fiqh Principles Level I</h4>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-1">Issued: July 28, 2026</span>
                  </div>
                  <span className="text-3xl">📜</span>
                </div>

                {/* QR scanning preview simulation */}
                <div className="flex gap-4 items-center bg-slate-50 border border-slate-100 rounded-2xl p-3">
                  <div className="w-12 h-12 bg-white flex items-center justify-center p-1 border border-slate-100 shrink-0 shadow-sm font-mono text-[6px] text-center font-bold">
                    [QR CODE]
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[8px] text-slate-400 font-bold uppercase block">Verification Hash</span>
                    <span className="text-[9.5px] font-mono text-slate-600 block mt-0.5 truncate font-semibold">shariat-verify:9812-7634-fiqh1</span>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-1 border-t border-slate-50 mt-1">
                  <Button variant="outline" size="sm" onClick={() => triggerToast("PDF certificate generated and downloading", "success")}>
                    <span>Download PDF</span>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 16: GLOBAL SEARCH
            ==================================================== */}
        {learnView === 'search' && (
          <div className="flex flex-col gap-4">
            <Input 
              placeholder="Search library, courses, fatwas..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<IoSearchOutline />}
            />

            {searchQuery.trim() === '' ? (
              <div className="flex flex-col gap-4 select-none mt-1">
                {/* Trending topics */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trending Theological Studies</span>
                  <div className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
                    <div className="py-2.5 px-3 bg-slate-50 rounded-xl hover:bg-slate-100/50 cursor-pointer">Rules of Salat guidelines</div>
                    <div className="py-2.5 px-3 bg-slate-50 rounded-xl hover:bg-slate-100/50 cursor-pointer">Ashura commemorations fatwas</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search Results</span>
                {mockEbooks.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                  mockEbooks.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase())).map(b => (
                    <div 
                      key={b.id} 
                      onClick={() => { setSelectedBook(b); navigateTo('book-details'); }}
                      className="p-3 border border-slate-50 bg-white rounded-2xl hover:bg-slate-50 cursor-pointer"
                    >
                      <h4 className="text-xs font-bold text-slate-800 truncate">{b.title}</h4>
                      <span className="text-[9px] text-slate-400 font-bold block mt-0.5">{b.author}</span>
                    </div>
                  ))
                ) : (
                  <EmptyState title="No results found" description="Adjust search query or try spelling checks." icon="🔍" />
                )}
              </div>
            )}
          </div>
        )}

        {/* ====================================================
            VIEW 17: FAVORITES / BOOKMARKS
            ==================================================== */}
        {learnView === 'favorites' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">My Saved Resources</span>
            <div className="grid grid-cols-1 gap-4">
              {mockEbooks.filter(b => favorites.books.includes(b.id)).map((book) => (
                <Card 
                  key={book.id}
                  onClick={() => { setSelectedBook(book); navigateTo('book-details'); }}
                  className="flex justify-between items-center cursor-pointer hover:border-amber-100 select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center text-lg font-bold">📚</div>
                    <div className="flex flex-col">
                      <h4 className="text-xs font-bold text-slate-800">{book.title.split(' ')[0]}</h4>
                      <span className="text-[9px] text-slate-400 font-semibold mt-0.5">{book.author}</span>
                    </div>
                  </div>
                  <IoBookmark className="text-primary text-lg" />
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 18: DOWNLOADS (Offline Hub)
            ==================================================== */}
        {learnView === 'downloads' && (
          <div className="flex flex-col gap-4">
            {/* offline warning */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4 flex gap-3 text-slate-600 select-none">
              <span className="text-lg">💾</span>
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold uppercase tracking-wide">Offline Hub Mode</span>
                <p className="text-[9px] text-slate-400 leading-relaxed font-semibold">
                  All items below are saved to your phone's memory and will compile without internet access.
                </p>
              </div>
            </div>

            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Offline Files</span>
            <div className="grid grid-cols-1 gap-4">
              {mockEbooks.filter(b => downloads.includes(b.id)).map((book) => (
                <Card 
                  key={book.id}
                  onClick={() => { setSelectedBook(book); navigateTo('book-details'); }}
                  className="flex justify-between items-center cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-500 flex items-center justify-center text-lg font-bold">📄</div>
                    <div className="flex flex-col">
                      <h4 className="text-xs font-bold text-slate-800">{book.title.split(' ')[0]}</h4>
                      <span className="text-[9px] text-slate-400 font-semibold mt-0.5">{book.pages} pages</span>
                    </div>
                  </div>
                  <Badge variant="primary" className="text-[8px] uppercase tracking-wider">Cached</Badge>
                </Card>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
