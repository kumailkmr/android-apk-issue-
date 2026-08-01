"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/Button';
import { 
  TextField, 
  PasswordField, 
  SearchField, 
  PhoneInput, 
  OTPInput, 
  Dropdown, 
  Checkbox, 
  RadioButton, 
  ToggleSwitch, 
  Slider, 
  DatePicker, 
  TimePicker, 
  FileUpload, 
  ImagePicker, 
  TextArea 
} from '@/components/ui/InputFields';
import { 
  LectureCard, 
  BookCard, 
  CourseCard, 
  DonationCampaignCard, 
  VolunteerCard, 
  EventCard, 
  StatCard, 
  CertificateCard, 
  StudentCard 
} from '@/components/ui/cards/Cards';
import { SimpleListItem, AvatarListItem, ExpandableListItem, SelectableList } from '@/components/ui/lists/Lists';
import { Chip, LinearProgress, CircularProgress, Stepper, Timeline, CountdownTimer } from '@/components/ui/status/Status';
import { Toast, OfflineState } from '@/components/ui/feedback/Feedback';
import { Dialog } from '@/components/ui/Dialog';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Carousel, PDFPreviewCard, AudioPlayer } from '@/components/ui/media/Media';
import { Avatar, CoverBanner, QRCard, AchievementCard } from '@/components/ui/profile/Profile';
import { PrayerTimeCard, HijriDateCard, DailyQuranCard, TasbihCounter, QiblaShortcutCard } from '@/components/islamic/Islamic';
import { StudentAttendanceTile, MaktabFeeCard, HomeworkCard, ResultCard, TimetableCard } from '@/components/maktab/Maktab';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoArrowBackOutline, 
  IoColorPaletteOutline, 
  IoHammerOutline, 
  IoLayersOutline, 
  IoLibraryOutline, 
  IoSchoolOutline,
  IoMoonOutline
} from 'react-icons/io5';
import Link from 'next/link';

export default function DesignSystemShowcase() {
  const { t, language } = useLanguage();
  const [activeSegment, setActiveSegment] = useState('buttons');
  
  // Interaction states for demonstration
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState<'success' | 'warning' | 'error' | 'info'>('info');
  
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);

  const [loadingBtn, setLoadingBtn] = useState(false);
  const [checkVal, setCheckVal] = useState(false);
  const [radioVal, setRadioVal] = useState(false);
  const [toggleVal, setToggleVal] = useState(true);
  const [sliderVal, setSliderVal] = useState(45);
  const [selectedListId, setSelectedListId] = useState('opt1');

  const triggerToast = (msg: string, type: 'success' | 'warning' | 'error' | 'info') => {
    setToastMsg(msg);
    setToastType(type);
    setToastOpen(true);
  };

  const segments = [
    { id: 'buttons', label: 'Inputs & BTNs', icon: IoHammerOutline },
    { id: 'cards', label: 'Cards & Lists', icon: IoLayersOutline },
    { id: 'status', label: 'Feedback & Stats', icon: IoColorPaletteOutline },
    { id: 'islamic', label: 'Islamic Core', icon: IoMoonOutline },
    { id: 'maktab', label: 'Maktab Board', icon: IoSchoolOutline }
  ];

  return (
    <div className="w-full flex-1 flex flex-col min-h-0 bg-surface relative">
      {/* Dynamic Header App Bar */}
      <div className="w-full bg-primary text-white shadow-md z-40 shrink-0 select-none">
        <div className="px-4 py-3 flex justify-between items-center">
          <Link href="/" className="p-1 rounded-full active:bg-white/20 transition-colors">
            <IoArrowBackOutline className="text-xl" />
          </Link>
          <div className="flex flex-col items-center">
            <span className="text-sm font-extrabold tracking-wide uppercase">Design Showcase</span>
            <span className="text-[9px] text-emerald-300 font-bold uppercase tracking-widest leading-none">Component Library</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center p-1 text-xs font-bold font-serif text-accent-light">
            ASS
          </div>
        </div>

        {/* Scrollable design sections selector */}
        <div className="w-full border-t border-white/5 overflow-x-auto no-scrollbar scroll-smooth flex">
          <div className="flex min-w-full px-2 gap-2 py-2">
            {segments.map((seg) => {
              const isActive = activeSegment === seg.id;
              const Icon = seg.icon;
              return (
                <button
                  key={seg.id}
                  onClick={() => setActiveSegment(seg.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-bold shrink-0 transition-all select-none cursor-pointer ${
                    isActive 
                      ? 'bg-accent text-white shadow shadow-accent/20' 
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Icon className="text-xs shrink-0" />
                  <span>{seg.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Showcase Panel Container */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-6 pb-24">
        
        {/* SEGMENT 1: BUTTONS AND INPUT FIELDS */}
        {activeSegment === 'buttons' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-5"
          >
            {/* Button matrix showcase */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Button Varieties</span>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="primary" onClick={() => triggerToast("Primary Button Triggered", "success")}>
                  Primary Button
                </Button>
                <Button variant="secondary" onClick={() => triggerToast("Secondary Button Triggered", "info")}>
                  Secondary Button
                </Button>
                <Button variant="accent" onClick={() => triggerToast("Accent Button Triggered", "warning")}>
                  Accent Button
                </Button>
                <Button variant="outline" onClick={() => triggerToast("Outline Button Triggered", "info")}>
                  Outline
                </Button>
                <Button variant="ghost" onClick={() => triggerToast("Ghost Button Triggered", "info")}>
                  Ghost
                </Button>
                <Button variant="danger" onClick={() => triggerToast("Danger action simulated", "error")}>
                  Danger Action
                </Button>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <Button 
                  variant="primary" 
                  fullWidth 
                  isLoading={loadingBtn} 
                  onClick={() => {
                    setLoadingBtn(true);
                    setTimeout(() => setLoadingBtn(false), 2000);
                  }}
                >
                  {loadingBtn ? 'Compiling' : 'Tap to test Loading State'}
                </Button>
                <Button variant="primary" disabled>
                  Disabled State Button
                </Button>
              </div>
            </div>

            {/* Input System matrix showcase */}
            <div className="flex flex-col gap-4.5 mt-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5 font-sans">Form Elements</span>
              
              <TextField label="Text Input Field" placeholder="Enter full name" />
              <PasswordField label="Secure Password Input" placeholder="Enter digit pin" />
              <SearchField placeholder="Search mosque, fiqh rulings..." />
              <PhoneInput label="Mobile Phone Number" placeholder="98765 43210" />
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide px-0.5">Verification Pin OTP</label>
                <OTPInput length={4} onChangeOTP={(otp) => {
                  if (otp.length === 4) triggerToast(`OTP Entered: ${otp}`, "success");
                }} />
              </div>

              <Dropdown 
                label="District Selector" 
                options={[
                  { value: 'budgam', label: 'Budgam District' },
                  { value: 'srinagar', label: 'Srinagar District' },
                  { value: 'baramulla', label: 'Baramulla District' }
                ]} 
              />

              <div className="flex flex-col gap-3 bg-white p-4.5 rounded-3xl border border-slate-50 shadow-soft">
                <Checkbox checked={checkVal} onChange={setCheckVal} label="I agree to follow welfare guidelines" />
                <hr className="border-slate-100" />
                <RadioButton checked={radioVal} onChange={setRadioVal} label="General membership tier" />
                <hr className="border-slate-100" />
                <ToggleSwitch checked={toggleVal} onChange={setToggleVal} label="Enable real-time Azan warnings" />
              </div>

              <Slider min={0} max={100} value={sliderVal} onChange={setSliderVal} label="Welfare Monthly donation multiplier" />
              <DatePicker label="Hijri Event Notification Date" />
              <TimePicker label="Prayer Time Alarm Set" />
              
              <div className="grid grid-cols-2 gap-3.5 items-end">
                <FileUpload label="Attach Digital Credentials" />
                <ImagePicker label="Update Member Photo" />
              </div>

              <TextArea label="Comments / Feedback notes for Shariat Council" placeholder="Type message..." />
            </div>
          </motion.div>
        )}

        {/* SEGMENT 2: CARDS AND LISTS */}
        {activeSegment === 'cards' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-5"
          >
            {/* Stat Cards list */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard title="Active Volunteers" value="2,480" trend="+14%" />
              <StatCard title="Maktab Centers" value="384" trend="+3.2%" />
            </div>

            {/* Main functional Card System showcase */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Reusable Cards</span>
              
              <LectureCard 
                title="Sermon on Wilayah & Islamic Leadership" 
                speaker="Aga Syed Hassan Al-Moosvi" 
                duration="45:00" 
                views="12K" 
                date="July 30, 2026" 
                category="Hadith & Wilayah"
                onPlay={() => triggerToast("Launching video lecture overlay player", "info")}
              />

              <BookCard 
                title="Nahjul Balagha (Peak of Eloquence)" 
                author="Imam Ali Ibn Abi Talib (A.S)" 
                pages={480} 
                category="Sermons"
                onRead={() => triggerToast("Loading Nahjul Balagha digital reader", "success")}
              />

              <CourseCard 
                title="Principles of Shia Jurisprudence (Fiqh)" 
                instructor="Aga Syed Hadi Al-Moosvi" 
                lessons={18} 
                progress={60}
                onStart={() => triggerToast("Continuing Shia Fiqh Course Module", "info")}
              />

              <DonationCampaignCard 
                title="Flood Relief Support Kashmir" 
                raised={1250000} 
                goal={2000000} 
                category="Welfare"
                onDonate={() => triggerToast("Launching tax-exempt donation calculator", "success")}
              />

              <VolunteerCard 
                taskTitle="Relief Ration Deployment Budgam" 
                location="Budgam Welfare Sector" 
                status="Active" 
                date="July 31, 2026"
                onAction={() => triggerToast("Volunteer mission details synced", "info")}
              />

              <EventCard 
                title="Arbaeen 1448 Commemoration Majlis Assembly" 
                date="Aug 18, 2026" 
                time="10:00 AM" 
                venue="Budgam Imambargah"
                onInteract={() => triggerToast("Added to Hijri calendar alerts", "success")}
              />

              <CertificateCard 
                courseTitle="Advanced Islamic Beliefs Aqa'id" 
                issueDate="July 28, 2026" 
                onDownload={() => triggerToast("Downloading cryptographic credential PDF", "success")}
              />

              <StudentCard 
                studentName="Syed Mohsin Ali Safvi" 
                rollNumber="Maktab-2026-904" 
                classNameGrade="Fiqh level III" 
                attendancePercent={86} 
              />
            </div>

            {/* List System showcase */}
            <div className="flex flex-col gap-4 mt-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Lists & Accordions</span>
              
              <div className="flex flex-col gap-2.5">
                <SimpleListItem 
                  title="Welfare Donation Receipts" 
                  subtitle="View tax deduction statements and ledger summaries"
                  onClick={() => triggerToast("Retrieving secure donation statement receipts", "info")}
                />
                
                <AvatarListItem 
                  avatarText="MA" 
                  title="Aga Syed Hassan Al-Moosvi" 
                  description="Pre-assembly alerts issued for upcoming Muharram gatherings in central Srinagar mosques." 
                  time="2 mins ago" 
                  unread
                />

                <ExpandableListItem title="About Anjuman-e-Sharie Shian">
                  Anjuman-e-Sharie Shian is an apex Shia organization in Jammu & Kashmir. Founded under historic scholars, it governs Islamic jurisprudence, operates Maktab schools, and manages welfares.
                </ExpandableListItem>

                <div className="flex flex-col gap-1.5 mt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Selectable Menu Picker</span>
                  <SelectableList 
                    options={[
                      { id: 'opt1', label: 'English Locale', description: 'Left to Right visual layouts' },
                      { id: 'opt2', label: 'Urdu Nastaliq Language', description: 'Right to Left alignment script' }
                    ]} 
                    selectedId={selectedListId} 
                    onSelect={(id) => {
                      setSelectedListId(id);
                      triggerToast(`Option modified: ${id}`, "info");
                    }} 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* SEGMENT 3: FEEDBACK, PROGRESS, NAVIGATION */}
        {activeSegment === 'status' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-5"
          >
            {/* Countdown timers */}
            <CountdownTimer label="Daily Iftar Timing Srinagar" targetSeconds={4320} />

            {/* Steppers and milestones */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Educational Course Stepper</span>
              <div className="bg-white rounded-3xl p-4.5 border border-slate-50 shadow-soft">
                <Stepper steps={['Aqa\'id', 'Fiqh', 'History', 'Final Exam']} currentStep={2} />
              </div>
            </div>

            {/* Milestones and Progress metrics */}
            <div className="flex flex-col gap-4 bg-white rounded-3xl p-5 border border-slate-50 shadow-soft">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Maktab Homework Completion</span>
                <LinearProgress value={75} color="bg-emerald-600" />
              </div>
              <hr className="border-slate-100" />
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600">Total Course Progress</span>
                <CircularProgress value={84} />
              </div>
            </div>

            {/* Offline warning panel */}
            <div className="flex flex-col gap-3 mt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Welfare Network Offline Guard</span>
              <OfflineState onRetry={() => triggerToast("Acquiring network telemetry indicators", "info")} />
            </div>

            {/* Overlays launcher triggers */}
            <div className="flex flex-col gap-3 mt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Overlay Alerts</span>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => setModalOpen(true)}>
                  Trigger Alert Dialog
                </Button>
                <Button variant="outline" onClick={() => setSheetOpen(true)}>
                  Trigger Bottom Sheet
                </Button>
                <Button variant="outline" onClick={() => setAudioOpen(true)}>
                  Trigger Audio Player
                </Button>
                <Button variant="outline" onClick={() => triggerToast("Success Toast Alert Activated!", "success")}>
                  Trigger Toast Success
                </Button>
              </div>
            </div>

            {/* Stepper history timeline list */}
            <div className="flex flex-col gap-3 mt-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Timeline Log</span>
              <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft">
                <Timeline 
                  items={[
                    { title: 'Volunteered for Relief ration drive', subtitle: 'July 30, 2026', description: 'Assisted in deploying 50 ration food packets in Budgam district central sector.', icon: '📦' },
                    { title: 'Completed Aqa\'id level III module', subtitle: 'July 28, 2026', description: 'Scored 92% on basic theological principles assessment exam.', icon: '📖' }
                  ]}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* SEGMENT 4: ISLAMIC CORE COMPONENTS */}
        {activeSegment === 'islamic' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-5"
          >
            <HijriDateCard />
            <QiblaShortcutCard />
            <PrayerTimeCard />
            
            <DailyQuranCard 
              title="Daily Quranic Verse" 
              arabic="إِنَّ اللَّهَ مَعَ الصَّابِرِينَ" 
              translation="Indeed, Allah is with the patient." 
              source="Surah Al-Baqarah 2:153" 
            />

            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Dhikr Simulator</span>
              <TasbihCounter />
            </div>
          </motion.div>
        )}

        {/* SEGMENT 5: MAKTAB SCHOOL AND SERVICES */}
        {activeSegment === 'maktab' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Maktab Administration</span>
              <p className="text-xs text-slate-400 font-semibold mt-0.5 px-0.5">Verify grading sheets, fee status bills, and roster sheets.</p>
            </div>

            <StudentAttendanceTile studentName="Syed Mohsin Ali Safvi" rollNumber="M-8941" />
            
            <MaktabFeeCard 
              invoiceNo="INV-2026-081" 
              month="August 2026" 
              amount={1200} 
              dueDate="Aug 10, 2026" 
              status="Unpaid"
              onPaySim={() => triggerToast("Processing payment gateway simulation...", "success")}
            />

            <HomeworkCard 
              subject="Fiqh (Jurisprudence)" 
              assignmentTitle="Draft thesis notes on Salat-ul-Jumu'ah rules" 
              dueDate="Aug 05, 2026" 
              isSubmitted={false}
              onToggleSubmission={() => triggerToast("Homework status updated in educational roster", "success")}
            />

            <ResultCard 
              examName="Mid-Term Fiqh Assessment" 
              gradeItems={[
                { subject: 'Aqa\'id (Theology)', marksScored: 46, totalMarks: 50 },
                { subject: 'Fiqh (Jurisprudence)', marksScored: 48, totalMarks: 50 },
                { subject: 'History (Tareekh)', marksScored: 42, totalMarks: 50 }
              ]} 
              percentage={90.6} 
              finalGrade="A+" 
            />

            <TimetableCard 
              dayName="Saturday" 
              schedule={[
                { period: '1', time: '09:00 AM - 10:00 AM', subject: 'Quran Tafseer', teacher: 'Maulana Syed Mohammad' },
                { period: '2', time: '10:00 AM - 11:00 AM', subject: 'Fiqh Principles', teacher: 'Aga Syed Hadi' }
              ]} 
            />
          </motion.div>
        )}

      </div>

      {/* DIALOG POPUP DISPLAY MODAL */}
      <Dialog 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title="Interactive Alert Dialog"
        type="info"
        confirmLabel="Proceed action"
        onConfirm={() => {
          setModalOpen(false);
          triggerToast("Action approved in simulated dashboard!", "success");
        }}
      >
        This dialog represents a modal overlay. It features a center layout, clean margins, and transitions utilizing framer-motion.
      </Dialog>

      {/* BOTTOM DRAWER SHEET MODAL */}
      <BottomSheet 
        isOpen={sheetOpen} 
        onClose={() => setSheetOpen(false)} 
        title="Showcase Bottom Drawer"
      >
        <div className="flex flex-col gap-4">
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            This bottom sheet slides up smoothly from the bottom. Touch margins are fully accessible as per Android Material Design.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setSheetOpen(false)} className="flex-1">
              Dismiss Drawer
            </Button>
            <Button variant="accent" onClick={() => { setSheetOpen(false); triggerToast("Selection completed", "success"); }} className="flex-1">
              Save Action
            </Button>
          </div>
        </div>
      </BottomSheet>

      {/* AUDIO TRACK PLAYER MODAL */}
      <AudioPlayer 
        title="Recitation of Supplication Dua Kumayl" 
        speaker="Maulana Syed Mohammad Hadi" 
        duration="15:30" 
        isOpen={audioOpen} 
        onClose={() => setAudioOpen(false)} 
      />

      {/* FLOATING TOAST NOTIFICATION ALERTS */}
      <Toast 
        isOpen={toastOpen} 
        message={toastMsg} 
        type={toastType} 
        onClose={() => setToastOpen(false)} 
      />
    </div>
  );
}
