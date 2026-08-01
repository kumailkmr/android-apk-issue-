"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { Stepper, LinearProgress, CircularProgress } from '@/components/ui/status/Status';
import { 
  IoChevronBackOutline, 
  IoChevronForwardOutline,
  IoCheckmarkCircle, 
  IoTimeOutline, 
  IoLocationOutline, 
  IoPeopleOutline, 
  IoCallOutline, 
  IoSchoolOutline,
  IoCalendarOutline,
  IoQrCodeOutline,
  IoBookOutline,
  IoRibbonOutline,
  IoSearchOutline,
  IoNotificationsOutline,
  IoCardOutline,
  IoSendOutline,
  IoChatbubbleEllipsesOutline,
  IoArrowDownOutline,
  IoHelpCircleOutline
} from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '@/components/ui/PageHeader';

interface MaktabModuleProps {
  triggerToast: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  triggerAlert: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
  navigateBackToServices?: () => void;
}

export const MaktabModule: React.FC<MaktabModuleProps> = ({ triggerToast, triggerAlert, navigateBackToServices }) => {
  // Primary sub-routing state
  const [maktabView, setMaktabView] = useState<string>('dashboard');
  const [viewHistory, setViewHistory] = useState<string[]>(['dashboard']);

  // Role selector state: 'coordinator', 'student', 'parent', 'teacher'
  const [userRole, setUserRole] = useState<string>('coordinator');

  // Directory selected item states
  const [selectedSchool, setSelectedSchool] = useState<any>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [selectedHomework, setSelectedHomework] = useState<any>(null);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');
  const [directoryDistrict, setDirectoryDistrict] = useState('All');
  const [timetableTab, setTimetableTab] = useState('Student'); // Student, Teacher

  // Interactive mock states
  const [feePaid, setFeePaid] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatFeed, setChatFeed] = useState([
    { sender: 'Maulana Syed Mohammad', msg: 'Assalamu Alaikum. Mohsin had excellent recitation today.' },
    { sender: 'Parent (Mohsin\'s father)', msg: 'Wa Alaikum Assalam. Thank you, Maulana. We are practicing daily.' }
  ]);

  const [attendanceMarked, setAttendanceMarked] = useState<string[]>([]);
  const [scannedAttendanceSuccess, setScannedAttendanceSuccess] = useState(false);

  const navigateTo = (view: string) => {
    setViewHistory([...viewHistory, view]);
    setMaktabView(view);
  };

  const navigateBack = () => {
    if (viewHistory.length > 1) {
      const updatedHistory = [...viewHistory];
      updatedHistory.pop();
      setViewHistory(updatedHistory);
      setMaktabView(updatedHistory[updatedHistory.length - 1]);
    } else {
      if (navigateBackToServices) {
        navigateBackToServices();
      }
    }
  };

  const handlePayTuition = () => {
    setFeePaid(true);
    triggerAlert("Payment Success", "Simulated tuition payment of ₹1,200 has been recorded in the school registry.", "success");
  };

  // Mock Database
  const mockSchools = [
    { id: 'sc1', name: 'Al-Huda Central Maktab', district: 'Budgam', location: 'Budgam Town', students: 145, teachers: 8, principal: 'Maulana Syed Mohammad' },
    { id: 'sc2', name: 'Imam Hussain Memorial Maktab', district: 'Srinagar', location: 'Zadibal', students: 90, teachers: 5, principal: 'Aga Syed Hadi' }
  ];

  const mockStudents = [
    { id: 'st1', name: 'Syed Mohsin Ali', class: 'Class 4', roll: 12, attendance: '95%', parents: 'Syed Yousuf Ali', blood: 'O+', joined: 'April 2025' }
  ];

  const mockTeachers = [
    { id: 't1', name: 'Maulana Syed Mohammad', subjects: ['Quran Tafseer', 'Islamic Jurisprudence'], qualification: 'Fazil (Najaf Al-Ashraf)', experience: '12 years' }
  ];

  const mockHomeworks = [
    { id: 'hw1', title: 'Memorize Surah Al-Fatiha Tafseer', due: 'Aug 10, 2026', desc: 'Read first three pages of Al-Mizan Tafseer guidelines.', teacher: 'Maulana Syed Mohammad' },
    { id: 'hw2', title: 'Fiqh: Rules of Fasting notes', due: 'Aug 14, 2026', desc: 'Summarize standard conditions that invalidate fasts.', teacher: 'Aga Syed Hadi' }
  ];

  // Header breadcrumb metadata helper
  const getMaktabHeaderMeta = () => {
    switch (maktabView) {
      case 'directory':
        return { breadcrumbs: ['Home', 'Maktab', 'Directory'], title: 'Maktab Schools Directory', desc: 'Explore 150+ village Maktabs across Kashmir valley.' };
      case 'students':
      case 'student-dashboard':
      case 'student-profile':
        return { breadcrumbs: ['Home', 'Maktab', 'Students'], title: 'Student Management Panel', desc: 'Track enrollment, academic performance, and attendance records.' };
      case 'attendance':
      case 'qr-attendance':
        return { breadcrumbs: ['Home', 'Maktab', 'Attendance'], title: 'Attendance Check-in Portal', desc: 'Daily attendance logs, QR scanner, and monthly reports.' };
      case 'timetable':
        return { breadcrumbs: ['Home', 'Maktab', 'Timetable'], title: 'School Class Timetable', desc: 'Subject schedules, period timings, and teacher assignments.' };
      case 'fees':
      case 'fee-details':
        return { breadcrumbs: ['Home', 'Maktab', 'Fees'], title: 'Tuition & Fees Registry', desc: 'Monitor tuition fee status, invoice receipts, and sponsorships.' };
      case 'homework':
      case 'assignments':
        return { breadcrumbs: ['Home', 'Maktab', 'Assignments'], title: 'Homework & Assignments', desc: 'Daily Quran reading tasks and Islamic jurisprudence homework.' };
      default:
        return { breadcrumbs: ['Home', 'Maktab', maktabView], title: maktabView.replace('-', ' ').toUpperCase(), desc: 'Centralized Maktab management and educational tools.' };
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col min-h-0 bg-surface">
      
      {/* SUB-ROUTING VIEW HEADER WITH BREADCRUMBS */}
      {maktabView !== 'dashboard' && (
        <PageHeader 
          breadcrumbs={getMaktabHeaderMeta().breadcrumbs}
          title={getMaktabHeaderMeta().title}
          description={getMaktabHeaderMeta().desc}
          onBack={navigateBack}
        />
      )}

      {/* ----------------------------------------------------
          ACTIVE VIEW SCROLLER
          ---------------------------------------------------- */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-5">
        
        {/* ====================================================
            VIEW 1: MAKTAB DASHBOARD (With Role Selector)
            ==================================================== */}
        {maktabView === 'dashboard' && (
          <>
            {/* Premium Role Selector dropdown */}
            <div className="bg-white p-4 rounded-3xl border border-slate-50 shadow-soft flex justify-between items-center select-none gap-4">
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 font-bold uppercase">Role-based dashboard</span>
                <span className="text-xs font-black text-slate-800 mt-0.5">Select view perspective</span>
              </div>
              <select 
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="px-3.5 py-2 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none"
              >
                {['coordinator', 'student', 'parent', 'teacher'].map(role => (
                  <option key={role} value={role}>{role.toUpperCase()}</option>
                ))}
              </select>
            </div>

            {/* Render Dashboard based on Role selection */}

            {/* A. COORDINATOR DASHBOARD */}
            {userRole === 'coordinator' && (
              <>
                {/* School metrics highlights */}
                <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-3xl p-5 border border-emerald-950/20 shadow-soft select-none flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] text-accent-light uppercase tracking-widest font-extrabold">Coordinator Summary</span>
                    <h4 className="text-sm font-black text-white">450 Central Maktab Students</h4>
                    <p className="text-[10px] text-emerald-100 mt-1 max-w-[200px] leading-relaxed">
                      Across 24 districts centers. 96% attendance recorded today.
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-accent text-sm font-bold shrink-0">
                    🏫 24
                  </div>
                </div>

                {/* Quick actions Coordinator */}
                <div className="grid grid-cols-4 gap-3 bg-white p-4 rounded-3xl border border-slate-50 shadow-soft select-none text-center">
                  {[
                    { label: 'Maktabs', icon: '🏫', view: 'directory' },
                    { label: 'Calendar', icon: '📆', view: 'calendar' },
                    { label: 'Analytics', icon: '📈', view: 'analytics' },
                    { label: 'Notices', icon: '🔔', view: 'notices' }
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
              </>
            )}

            {/* B. STUDENT DASHBOARD */}
            {userRole === 'student' && (
              <>
                <div className="bg-white rounded-3xl p-4.5 border border-slate-50 shadow-soft flex gap-4 items-center cursor-pointer select-none" onClick={() => navigateTo('student-profile')}>
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-black text-slate-800">SA</div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[8px] text-slate-400 font-bold uppercase">Class 4 Student</span>
                    <h4 className="text-xs font-extrabold text-slate-800 truncate">Syed Mohsin Ali</h4>
                  </div>
                  <IoChevronForwardOutline className="text-slate-400" />
                </div>

                <div className="grid grid-cols-4 gap-3 bg-white p-4 rounded-3xl border border-slate-50 shadow-soft select-none text-center">
                  {[
                    { label: 'Timetable', icon: '🗓️', view: 'timetable' },
                    { label: 'Homework', icon: '📚', view: 'homework' },
                    { label: 'Results', icon: '📊', view: 'results' },
                    { label: 'Quran log', icon: '📖', view: 'quran-progress' },
                    { label: 'Certificates', icon: '📜', view: 'certificates' },
                    { label: 'Library', icon: '📕', view: 'library' }
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
              </>
            )}

            {/* C. PARENT DASHBOARD */}
            {userRole === 'parent' && (
              <>
                <div className="bg-white rounded-3xl p-4.5 border border-slate-50 shadow-soft flex gap-4 items-center select-none">
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-lg">👦</div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[8px] text-slate-400 font-bold uppercase">Children Registered</span>
                    <h4 className="text-xs font-extrabold text-slate-800 truncate">Syed Mohsin Ali (Class 4)</h4>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 bg-white p-4 rounded-3xl border border-slate-50 shadow-soft select-none text-center">
                  {[
                    { label: 'Attendance', icon: '📆', view: 'student-attendance' },
                    { label: 'Homework', icon: '📚', view: 'homework' },
                    { label: 'Fees Due', icon: '💳', view: 'fees' },
                    { label: 'Report Card', icon: '📊', view: 'results' },
                    { label: 'Messages', icon: '💬', view: 'communication' },
                    { label: 'Empty test', icon: '🤷', view: 'empty-states' }
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
              </>
            )}

            {/* D. TEACHER DASHBOARD */}
            {userRole === 'teacher' && (
              <>
                <div className="bg-white rounded-3xl p-4.5 border border-slate-50 shadow-soft flex gap-4 items-center cursor-pointer select-none" onClick={() => navigateTo('teacher-profile')}>
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-lg">👳</div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[8px] text-slate-400 font-bold uppercase">Maktab Scholar Teacher</span>
                    <h4 className="text-xs font-extrabold text-slate-800 truncate">Maulana Syed Mohammad</h4>
                  </div>
                  <IoChevronForwardOutline className="text-slate-400" />
                </div>

                <div className="grid grid-cols-4 gap-3 bg-white p-4 rounded-3xl border border-slate-50 shadow-soft select-none text-center">
                  {[
                    { label: 'Timetable', icon: '🗓️', view: 'timetable' },
                    { label: 'Attendance', icon: '📆', view: 'attendance' },
                    { label: 'Homework', icon: '📚', view: 'homework' },
                    { label: 'Messages', icon: '💬', view: 'communication' },
                    { label: 'Attendance QR', icon: '🤳', view: 'qr-attendance' }
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
              </>
            )}
          </>
        )}

        {/* ====================================================
            VIEW 2: MAKTAB DIRECTORY
            ==================================================== */}
        {maktabView === 'directory' && (
          <>
            {/* District horizontal selection filter */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 select-none">
              {['All', 'Budgam', 'Srinagar'].map(dist => (
                <Badge 
                  key={dist}
                  variant={directoryDistrict === dist ? 'accent' : 'neutral'}
                  className="cursor-pointer px-3 py-1 font-bold"
                  onClick={() => setDirectoryDistrict(dist)}
                >
                  {dist}
                </Badge>
              ))}
            </div>

            {/* School card list */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">School Directories</span>
              <div className="grid grid-cols-1 gap-4">
                {mockSchools.filter(s => directoryDistrict === 'All' || s.district === directoryDistrict).map((school) => (
                  <Card 
                    key={school.id}
                    onClick={() => { setSelectedSchool(school); navigateTo('details'); }}
                    className="flex justify-between items-center cursor-pointer hover:border-emerald-100 select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">🏫</div>
                      <div className="flex flex-col">
                        <h4 className="text-xs font-bold text-slate-800 leading-snug">{school.name}</h4>
                        <span className="text-[9px] text-slate-400 font-semibold block mt-1">{school.district} • {school.students} students</span>
                      </div>
                    </div>
                    <IoChevronForwardOutline className="text-slate-400 text-xs" />
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ====================================================
            VIEW 3: MAKTAB DETAILS
            ==================================================== */}
        {maktabView === 'details' && selectedSchool && (
          <div className="flex flex-col gap-5 select-none">
            <div className="flex flex-col gap-1.5">
              <Badge variant="primary" className="w-fit text-[8px] uppercase tracking-wider">{selectedSchool.district} Division</Badge>
              <h3 className="text-sm font-black text-slate-800 leading-snug mt-1">{selectedSchool.name}</h3>
              <span className="text-[11px] text-slate-500 font-semibold">Location: {selectedSchool.location}</span>
            </div>

            {/* Metrics cards grid */}
            <div className="grid grid-cols-3 gap-3 text-center bg-white border border-slate-100 rounded-3xl p-3.5 shadow-soft">
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-800">{selectedSchool.students}</span>
                <span className="text-[8.5px] text-slate-400 font-semibold uppercase mt-0.5">Students</span>
              </div>
              <div className="flex flex-col border-x border-slate-100">
                <span className="text-xs font-black text-slate-800">{selectedSchool.teachers}</span>
                <span className="text-[8.5px] text-slate-400 font-semibold uppercase mt-0.5">Teachers</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-800">Primary</span>
                <span className="text-[8.5px] text-slate-400 font-semibold uppercase mt-0.5">Level</span>
              </div>
            </div>

            {/* Admin roster info */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4 flex flex-col gap-2">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide px-0.5">Principal / Administrator</span>
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-2"><IoSchoolOutline className="text-accent text-base" /> Principal: {selectedSchool.principal}</span>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 5: STUDENT PROFILE
            ==================================================== */}
        {maktabView === 'student-profile' && (
          <div className="flex flex-col items-center gap-5 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block self-start">Student Credentials Card</span>

            {/* student ID details */}
            <div className="w-full max-w-[280px] bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-3xl border border-emerald-900/10 p-5 text-white flex flex-col justify-between shadow-xl min-h-[340px]">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-[9px] text-accent-light tracking-widest font-extrabold uppercase">Al-Huda Central Maktab</span>
                  <span className="text-[8px] text-emerald-300 font-bold block mt-0.5">Verified Student</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-0.5 text-primary text-[8px] font-urdu font-bold shadow-sm">
                  شرعی
                </div>
              </div>

              {/* Avatar detail */}
              <div className="flex flex-col items-center text-center my-6">
                <div className="w-18 h-18 rounded-full bg-white text-primary flex items-center justify-center text-sm font-black font-urdu shadow-md mb-3 border-2 border-accent/20">
                  SA
                </div>
                <h3 className="text-xs font-black tracking-wide leading-none">Syed Mohsin Ali</h3>
                <span className="text-[9px] text-emerald-300 font-mono mt-1">Roll No: 12 • Class 4</span>
              </div>

              <div className="border-t border-white/10 pt-3 flex justify-between text-[7px] font-bold text-emerald-300">
                <div className="flex flex-col">
                  <span>Parent</span>
                  <span className="text-white mt-0.5 uppercase">Syed Yousuf Ali</span>
                </div>
                <div className="flex flex-col text-right">
                  <span>Joined Date</span>
                  <span className="text-white mt-0.5 uppercase">April 2025</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 8: TEACHER PROFILE
            ==================================================== */}
        {maktabView === 'teacher-profile' && (
          <div className="flex flex-col items-center gap-5 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block self-start">Teacher Credentials Card</span>

            {/* teacher ID details */}
            <div className="w-full max-w-[280px] bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border border-slate-800 p-5 text-white flex flex-col justify-between shadow-xl min-h-[340px]">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-[9px] text-accent-light tracking-widest font-extrabold uppercase">Al-Huda Central Maktab</span>
                  <span className="text-[8px] text-accent-light font-bold block mt-0.5">Faculty Teacher</span>
                </div>
                <span className="text-xl">👳</span>
              </div>

              {/* Avatar details */}
              <div className="flex flex-col items-center text-center my-6">
                <div className="w-18 h-18 rounded-full bg-white text-slate-900 flex items-center justify-center text-sm font-black font-urdu shadow-md mb-3 border-2 border-accent/20">
                  MS
                </div>
                <h3 className="text-xs font-black tracking-wide leading-none">Maulana Syed Mohammad</h3>
                <span className="text-[9px] text-accent-light font-mono mt-1">ID: T-1448-081</span>
              </div>

              <div className="border-t border-white/10 pt-3 flex justify-between text-[7px] font-bold text-slate-400">
                <div className="flex flex-col">
                  <span>Qualify</span>
                  <span className="text-white mt-0.5 uppercase">Fazil (Najaf)</span>
                </div>
                <div className="flex flex-col text-right">
                  <span>Experience</span>
                  <span className="text-white mt-0.5 uppercase">12 years</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 9: ATTENDANCE MANAGEMENT (Teacher View)
            ==================================================== */}
        {maktabView === 'attendance' && (
          <div className="flex flex-col gap-4 select-none">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Today's Class Roster</span>
              <button 
                onClick={() => {
                  setAttendanceMarked(['st1']);
                  triggerToast("Attendance synced to coordinator dashboard", "success");
                }}
                className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full hover:bg-primary-dark cursor-pointer active:scale-95 transition-all"
              >
                Submit logs
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {mockStudents.map((stud) => {
                const marked = attendanceMarked.includes(stud.id);
                return (
                  <Card key={stud.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8.5 h-8.5 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-xs">👦</div>
                      <div className="flex flex-col">
                        <h4 className="text-xs font-bold text-slate-800">{stud.name}</h4>
                        <span className="text-[9px] text-slate-400 font-bold block mt-0.5">Roll: {stud.roll}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        if (marked) {
                          setAttendanceMarked(attendanceMarked.filter(id => id !== stud.id));
                        } else {
                          setAttendanceMarked([...attendanceMarked, stud.id]);
                        }
                      }}
                      className={`px-3 py-1 text-[10px] font-bold rounded-full border transition-all cursor-pointer ${
                        marked ? 'bg-emerald-50 border-emerald-200 text-emerald-600 font-bold' : 'bg-slate-50 border-slate-100 text-slate-500'
                      }`}
                    >
                      {marked ? 'Present' : 'Absent'}
                    </button>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 10: STUDENT ATTENDANCE DETAILS (Parent View)
            ==================================================== */}
        {maktabView === 'student-attendance' && (
          <>
            {/* stats card */}
            <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft select-none text-center grid grid-cols-2 gap-4">
              <div className="flex flex-col p-2 bg-slate-50 border border-slate-100/50 rounded-2xl">
                <span className="text-lg font-black text-slate-800">18 days</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 leading-snug">Present Days</span>
              </div>
              <div className="flex flex-col p-2 bg-slate-50 border border-slate-100/50 rounded-2xl">
                <span className="text-lg font-black text-primary">95%</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 leading-snug">Attendance Ratio</span>
              </div>
            </div>

            {/* Attendance weekly logs calendar */}
            <div className="bg-white rounded-3xl p-4.5 border border-slate-50 shadow-soft select-none flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Wednesday, Aug 12 logs</span>
              <div className="flex justify-between items-center gap-1.5 text-center text-xs font-bold text-slate-600">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                  const present = idx !== 4; // Mock Friday holiday or absent
                  return (
                    <div 
                      key={idx} 
                      className={`flex flex-col items-center p-2 rounded-xl flex-1 border transition-all ${
                        present ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'
                      }`}
                    >
                      <span className="text-[8px] font-bold uppercase opacity-80">{day}</span>
                      <span className="text-xs font-black mt-1.5">{present ? 'P' : 'A'}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ====================================================
            VIEW 11: QR ATTENDANCE SCANNER
            ==================================================== */}
        {maktabView === 'qr-attendance' && (
          <div className="flex flex-col items-center gap-5 select-none text-center">
            {scannedAttendanceSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mb-4 animate-bounce">
                  <IoCheckmarkCircle />
                </div>
                <h3 className="text-base font-black text-slate-800 tracking-wide uppercase">Attendance Recorded</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">Student has been verified at Al-Huda central checkpoint!</p>
                <Button variant="outline" className="mt-6" onClick={() => setScannedAttendanceSuccess(false)}>
                  Scan Next Student
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="flex flex-col self-start text-left">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">QR Check-in scanner</span>
                  <h3 className="text-base font-black text-slate-800 mt-0.5">Faculty Terminal Scan</h3>
                  <p className="text-xs text-slate-400 font-semibold mt-1">Scan student ID card barcode pass at school checkpost.</p>
                </div>

                <div className="relative w-48 h-48 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50/50 mt-4 overflow-hidden group">
                  <IoQrCodeOutline className="text-5xl text-slate-400 group-hover:scale-105 transition-transform" />
                  <div className="absolute left-0 right-0 h-[1.5px] bg-accent/70 top-0 bottom-0 top-1/2 -translate-y-1/2 animate-pulse" />
                </div>

                <Button 
                  variant="primary" 
                  fullWidth 
                  className="mt-6"
                  onClick={() => {
                    setScannedAttendanceSuccess(true);
                    triggerToast("Student roll 12 verified successfully", "success");
                  }}
                >
                  <span>Simulate scanning student ID</span>
                </Button>
              </>
            )}
          </div>
        )}

        {/* ====================================================
            VIEW 12: HOMEWORK LISTING
            ==================================================== */}
        {maktabView === 'homework' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Homework assignments due</span>
            
            <div className="grid grid-cols-1 gap-4">
              {mockHomeworks.map((hw) => (
                <Card 
                  key={hw.id}
                  onClick={() => { setSelectedHomework(hw); navigateTo('assignments'); }}
                  className="flex flex-col gap-3.5 hover:border-emerald-100 cursor-pointer select-none"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <Badge variant="primary" className="text-[8px] uppercase tracking-wider mb-1.5">Due: {hw.due}</Badge>
                      <h4 className="text-xs font-extrabold text-slate-800 leading-snug">{hw.title}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-1 block truncate max-w-[240px]">{hw.desc}</p>
                    </div>
                    <span className="text-2xl shrink-0">📚</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 13: ASSIGNMENTS DETAILS (Sub-homework view)
            ==================================================== */}
        {maktabView === 'assignments' && selectedHomework && (
          <div className="flex flex-col gap-5 select-none">
            <div className="flex flex-col gap-1.5">
              <Badge variant="primary" className="w-fit text-[8px] uppercase tracking-wider">Due date: {selectedHomework.due}</Badge>
              <h3 className="text-sm font-black text-slate-800 leading-snug mt-1">{selectedHomework.title}</h3>
              <span className="text-[11px] text-slate-500 font-semibold">Teacher: {selectedHomework.teacher}</span>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-soft">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block mb-2">Instructions details</span>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                {selectedHomework.desc}
              </p>
            </div>

            {/* Upload homework assignment simulator */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4.5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-xl">📄</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700 leading-none">Submit scan copy</span>
                  <span className="text-[9px] text-slate-400 font-semibold mt-1">Upload PDF or images of handbook</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => triggerToast("Homework file uploaded successfully!", "success")}
              >
                <span>Upload file</span>
              </Button>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 14: timETABLE
            ==================================================== */}
        {maktabView === 'timetable' && (
          <>
            {/* Timetable schedule tab selector */}
            <div className="flex gap-2 select-none justify-center">
              {['Student', 'Teacher'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setTimetableTab(tab)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-full border transition-all cursor-pointer ${
                    timetableTab === tab ? 'bg-primary border-primary text-white' : 'bg-slate-50 border-slate-100 text-slate-500'
                  }`}
                >
                  {tab} Schedule
                </button>
              ))}
            </div>

            {/* List schedule hours */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Saturday classes timetable</span>
              
              <div className="bg-white rounded-3xl p-4.5 border border-slate-50 shadow-soft flex flex-col gap-4">
                {[
                  { time: '09:00 AM - 10:00 AM', subject: 'Quran Tafseer', details: 'Maulana Syed Mohammad • Room 2' },
                  { time: '10:00 AM - 11:00 AM', subject: 'Fiqh Jurisprudence', details: 'Aga Syed Hadi • Central hall' }
                ].map((sched, idx) => (
                  <div key={idx} className="flex gap-4 items-start select-none border-b border-slate-50 last:border-0 pb-4 last:pb-0">
                    <span className="text-[10px] font-bold font-mono text-slate-400 shrink-0 w-24">{sched.time}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 leading-none">{sched.subject}</h4>
                      <span className="text-[9px] text-slate-400 font-semibold block mt-1">{sched.details}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ====================================================
            VIEW 15: FEE MANAGEMENT (Parent View)
            ==================================================== */}
        {maktabView === 'fees' && (
          <>
            {/* Fee balance box card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-soft select-none flex justify-between items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 font-bold uppercase">Pending Balance</span>
                <span className={`text-base font-black mt-0.5 ${feePaid ? 'text-emerald-600' : 'text-slate-800'}`}>
                  {feePaid ? '₹0 (Paid)' : '₹1,200 (Due)'}
                </span>
              </div>
              {!feePaid && (
                <Button variant="accent" size="sm" onClick={handlePayTuition}>
                  <span>Quick Pay Tuition</span>
                </Button>
              )}
            </div>

            {/* Invoices list */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Invoices Ledger History</span>
              <Card 
                onClick={() => navigateTo('fee-details')}
                className="flex justify-between items-center cursor-pointer select-none hover:border-emerald-100"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📄</span>
                  <div className="flex flex-col">
                    <h4 className="text-xs font-bold text-slate-800 leading-none">August 2026 tuition fee</h4>
                    <span className="text-[9px] text-slate-400 font-semibold block mt-1">Invoice: INV-2026-081</span>
                  </div>
                </div>

                <Badge variant={feePaid ? 'success' : 'neutral'} className="text-[8px] uppercase tracking-wider">
                  {feePaid ? 'Paid' : 'Unpaid'}
                </Badge>
              </Card>
            </div>
          </>
        )}

        {/* ====================================================
            VIEW 16: FEE INVOICE DETAILS
            ==================================================== */}
        {maktabView === 'fee-details' && (
          <div className="flex flex-col gap-5 select-none">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Tax invoice details</span>
              <h3 className="text-sm font-black text-slate-800 mt-0.5">Invoice INV-2026-081</h3>
            </div>

            {/* details registry */}
            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-soft flex flex-col gap-3.5 text-xs font-bold text-slate-700">
              <div className="flex justify-between items-center">
                <span>August tuition tuition fees</span>
                <span>₹1,200</span>
              </div>
              <hr className="border-slate-50" />
              <div className="flex justify-between items-center">
                <span>Admission registy discount</span>
                <span className="text-emerald-600">-₹0</span>
              </div>
              <hr className="border-slate-50" />
              <div className="flex justify-between items-center text-sm font-black">
                <span>Total amount</span>
                <span className={feePaid ? 'text-emerald-600' : 'text-slate-900'}>
                  {feePaid ? '₹0 Paid' : '₹1,200 Pending'}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-2">
              <Button variant="outline" className="flex-1" onClick={() => triggerToast("PDF receipt saved to offline documents", "success")}>
                <span>Download receipt</span>
              </Button>
              {!feePaid && (
                <Button variant="primary" className="flex-1" onClick={handlePayTuition}>
                  <span>Pay Tuition Fee</span>
                </Button>
              )}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 17: EXAM RESULTS REPORT CARDS
            ==================================================== */}
        {maktabView === 'results' && (
          <div className="flex flex-col gap-4 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Term I exam marks card</span>
            
            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-soft flex flex-col gap-3.5 text-xs font-bold text-slate-700">
              <div className="flex justify-between items-center py-1">
                <span>Quran Tafseer</span>
                <span className="text-emerald-600">95 / 100 (Grade A+)</span>
              </div>
              <hr className="border-slate-50" />
              <div className="flex justify-between items-center py-1">
                <span>Islamic law Fiqh</span>
                <span className="text-emerald-600">90 / 100 (Grade A+)</span>
              </div>
              <hr className="border-slate-50" />
              <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-50 mt-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Teacher remarks</span>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  "Mohsin shows great recitation commitment. Diligent, attends all classes present." - Maulana Syed Mohammad
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 18: QURAN PROGRESS WIDGET
            ==================================================== */}
        {maktabView === 'quran-progress' && (
          <div className="flex flex-col gap-5 select-none text-center items-center">
            {/* Circle progress indicator */}
            <div className="relative w-28 h-28 flex items-center justify-center p-3 border-4 border-emerald-800/10 rounded-full mt-4 bg-emerald-50/10">
              <div className="flex flex-col items-center">
                <span className="text-lg font-black text-emerald-800">Juz 1</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase mt-1">62% Read</span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-1 select-all">
              <Badge variant="success" className="w-fit mx-auto text-[8px] uppercase tracking-wider">Quran recitation logs</Badge>
              <h3 className="text-base font-black text-slate-800 leading-snug mt-1">Surah Al-Baqarah Ayah 125</h3>
              <p className="text-xs text-slate-400 font-semibold leading-relaxed max-w-[240px] mt-1">
                Daily goal: 15 verses. Today: 10 verses read. Complete 5 verses to retain streak.
              </p>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 19: ACADEMIC CERTIFICATES
            ==================================================== */}
        {maktabView === 'certificates' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">My Achievements certificates</span>
            
            <Card className="flex flex-col gap-4 select-none">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <Badge variant="success" className="text-[8px] uppercase tracking-wider mb-1.5">First Rank</Badge>
                  <h4 className="text-xs font-extrabold text-slate-800 leading-snug">Term I Quranic Competition</h4>
                  <span className="text-[10px] text-slate-400 font-semibold block mt-1">July 2026 | Al-Huda central Maktab</span>
                </div>
                <span className="text-3xl shrink-0">📜</span>
              </div>

              <div className="flex gap-3 justify-end pt-1 border-t border-slate-50 mt-1">
                <Button variant="outline" size="sm" onClick={() => triggerToast("PDF certificate generated and downloading", "success")}>
                  <span>Download credentials</span>
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* ====================================================
            VIEW 20: notices
            ==================================================== */}
        {maktabView === 'notices' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">School notice bulletins</span>
            
            <div className="grid grid-cols-1 gap-4">
              <Card className="flex gap-3.5 items-start select-none">
                <span className="text-2xl shrink-0">🔔</span>
                <div>
                  <Badge variant="accent" className="text-[8px] uppercase mb-1">Notice</Badge>
                  <h4 className="text-xs font-extrabold text-slate-800 leading-snug">Ashura religious holiday announced</h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed mt-1">
                    No classes will be organized from Wednesday, Aug 12 to Friday, Aug 14.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 21: SCHOOL CALENDAR
            ==================================================== */}
        {maktabView === 'calendar' && (
          <>
            <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft select-none flex flex-col gap-3.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">August 2026 School Events</span>
              <div className="flex justify-between items-center gap-1.5 text-center text-xs font-bold text-slate-600">
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

            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">School assemblies Wednesday, Aug 12</span>
              <Card className="flex gap-4 items-center select-none">
                <span className="text-2xl">🔔</span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 leading-snug truncate">Ashura Holiday assembly</h4>
                  <span className="text-[9px] text-slate-400 font-semibold block mt-1">Imambara hall | 10:00 AM</span>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* ====================================================
            VIEW 22: SCHOOL LIBRARY (Borrowed book registries)
            ==================================================== */}
        {maktabView === 'library' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">My Borrowed E-books</span>
            
            <Card className="flex justify-between items-center select-none hover:border-amber-100 cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="text-xl">📚</span>
                <div className="flex flex-col">
                  <h4 className="text-xs font-bold text-slate-800 leading-none">Quran translation & Tafseer</h4>
                  <span className="text-[9px] text-slate-400 font-semibold block mt-1">Return due: Aug 20, 2026</span>
                </div>
              </div>
              <Badge variant="success" className="text-[8px] uppercase tracking-wider font-bold">Checked Out</Badge>
            </Card>
          </div>
        )}

        {/* ====================================================
            VIEW 23: COMMUNICATION CHAT MOCK
            ==================================================== */}
        {maktabView === 'communication' && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col select-none">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Teacher messages</span>
              <h3 className="text-base font-black text-slate-800 mt-0.5">Maulana Syed Mohammad</h3>
            </div>

            {/* Chat discussion boxes */}
            <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-soft flex flex-col gap-3.5 select-none">
              <div className="flex flex-col gap-3 max-h-[180px] overflow-y-auto no-scrollbar">
                {chatFeed.map((msg, i) => (
                  <div key={i} className="text-xs leading-relaxed font-semibold">
                    <span className="text-primary font-bold mr-1.5">{msg.sender}:</span>
                    <span className="text-slate-600">{msg.msg}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex gap-2 border-t border-slate-50 pt-3">
                <input 
                  type="text" 
                  placeholder="Type message response to teacher..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-primary"
                />
                <button 
                  onClick={() => {
                    if (chatMessage.trim()) {
                      setChatFeed([...chatFeed, { sender: 'Parent (Mohsin\'s father)', msg: chatMessage }]);
                      setChatMessage('');
                      triggerToast("Message sent successfully", "success");
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
            VIEW 24: SCHOOL ANALYTICS (Coordinator charts)
            ==================================================== */}
        {maktabView === 'analytics' && (
          <div className="flex flex-col gap-5 select-none">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="flex flex-col p-3 bg-white border border-slate-50 rounded-3xl shadow-soft">
                <span className="text-lg font-black text-slate-800">450</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 leading-snug">Students registered</span>
              </div>
              <div className="flex flex-col p-3 bg-white border border-slate-50 rounded-3xl shadow-soft">
                <span className="text-lg font-black text-slate-800">24</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 leading-snug">Active School Centers</span>
              </div>
            </div>

            {/* Attendance metrics infographics */}
            <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft flex flex-col gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Average school attendance metrics</span>
              
              {[
                { school: 'Al-Huda Central Maktab', progress: 95, ratio: '95%' },
                { school: 'Imam Hussain Memorial', progress: 90, ratio: '90%' }
              ].map((sch, i) => (
                <div key={i} className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
                  <div className="flex justify-between items-center">
                    <span>{sch.school}</span>
                    <span>{sch.ratio}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${sch.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 25: SEARCH Todo query
            ==================================================== */}
        {maktabView === 'search' && (
          <div className="flex flex-col gap-4">
            <Input 
              placeholder="Search school registries, pupils..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<IoSearchOutline />}
            />

            {searchQuery.trim() === '' ? (
              <div className="text-center text-[10px] text-slate-400 italic py-6 select-none">
                Type queries to search registered schools and teachers.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search Matches</span>
                {mockSchools.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                  mockSchools.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map(s => (
                    <div 
                      key={s.id} 
                      onClick={() => { setSelectedSchool(s); navigateTo('details'); }}
                      className="p-3 border border-slate-50 bg-white rounded-2xl cursor-pointer hover:bg-slate-50"
                    >
                      <h4 className="text-xs font-bold text-slate-800 truncate">{s.name}</h4>
                      <span className="text-[9px] text-slate-400 font-bold block mt-0.5">{s.district} division</span>
                    </div>
                  ))
                ) : (
                  <EmptyState title="No results found" description="Adjust search parameters and filters." icon="🔍" />
                )}
              </div>
            )}
          </div>
        )}

        {/* ====================================================
            VIEW 26: EMPTY STATES LIST (Parent View)
            ==================================================== */}
        {maktabView === 'empty-states' && (
          <div className="flex flex-col gap-4 items-center justify-center py-6 select-none">
            <EmptyState 
              title="No Pending Fee Invoices" 
              description="All school tuition dues have been settled in platform ledger."
              icon="💳"
            />
          </div>
        )}

      </div>
    </div>
  );
};
export default MaktabModule;
