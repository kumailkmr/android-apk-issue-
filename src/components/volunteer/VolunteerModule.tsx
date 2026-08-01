"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { Stepper, LinearProgress } from '@/components/ui/status/Status';
import { mockMember } from '@/data/mockData';
import { 
  IoChevronBackOutline, 
  IoFingerPrintOutline,
  IoCheckmarkCircle, 
  IoTimeOutline, 
  IoLocationOutline, 
  IoRibbonOutline, 
  IoCardOutline, 
  IoQrCodeOutline, 
  IoSearchOutline, 
  IoNotificationsOutline, 
  IoShieldCheckmarkOutline, 
  IoStarOutline, 
  IoHeartOutline, 
  IoCallOutline, 
  IoSchoolOutline,
  IoCalendarOutline,
  IoWarningOutline
} from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

interface VolunteerModuleProps {
  initialTab?: 'volunteer' | 'member';
  triggerToast: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  triggerAlert: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
  navigateBackToCommunity: () => void;
}

export const VolunteerModule: React.FC<VolunteerModuleProps> = ({ 
  initialTab = 'volunteer', 
  triggerToast, 
  triggerAlert,
  navigateBackToCommunity 
}) => {
  // Navigation State Machine
  const [activeView, setActiveView] = useState<string>(initialTab === 'volunteer' ? 'volunteer-dashboard' : 'membership-dashboard');
  const [viewHistory, setViewHistory] = useState<string[]>([initialTab === 'volunteer' ? 'volunteer-dashboard' : 'membership-dashboard']);

  // Flip state for digital IDs
  const [isVolCardFlipped, setIsVolCardFlipped] = useState(false);
  const [isMemCardFlipped, setIsMemCardFlipped] = useState(false);

  // Forms state
  const [volAppSubmitted, setVolAppSubmitted] = useState(false);
  const [volForm, setVolForm] = useState({ name: '', phone: '', skills: '', region: 'Budgam' });

  const [memAppSubmitted, setMemAppSubmitted] = useState(false);
  const [memForm, setMemForm] = useState({ name: '', phone: '', occupy: '', region: 'Srinagar' });

  // Verification state
  const [checkInDone, setCheckInDone] = useState(false);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTab, setSearchTab] = useState('Volunteers');

  // Custom checklist tasks
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Prepare Welfare Rations', priority: 'High', date: 'Today, 3:00 PM', done: false, desc: 'Sort wheat, oil and sugar bags for central distribution.' },
    { id: 't2', title: 'Coordinate Hall Setup', priority: 'Medium', date: 'Aug 12, 9:00 AM', done: false, desc: 'Arrange seating layout inside Imambara hall for Arbaeen seminar.' },
    { id: 't3', title: 'Distribute Literature books', priority: 'Low', date: 'Completed', done: true, desc: 'Distribute translation flyers to central schools.' }
  ]);

  const navigateTo = (view: string) => {
    setViewHistory([...viewHistory, view]);
    setActiveView(view);
  };

  const navigateBack = () => {
    if (viewHistory.length > 1) {
      const updatedHistory = [...viewHistory];
      updatedHistory.pop();
      setViewHistory(updatedHistory);
      setActiveView(updatedHistory[updatedHistory.length - 1]);
    } else {
      navigateBackToCommunity();
    }
  };

  // Mark task completed simulator
  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextState = !t.done;
        if (nextState) {
          triggerToast("Task completed! +50 Volunteer Points", "success");
        }
        return { ...t, done: nextState };
      }
      return t;
    }));
  };

  // Mock Database
  const mockLeaderboard = [
    { rank: 1, name: 'Sajad Ahmad Safvi', hours: 142, level: 'Level 5 (Gold)' },
    { rank: 2, name: 'Syed Mohsin Ali', hours: 34, level: 'Level 2 (Bronze)' },
    { rank: 3, name: 'Zahid Hussain', hours: 28, level: 'Level 2 (Bronze)' }
  ];

  return (
    <div className="w-full flex-1 flex flex-col min-h-0 bg-surface">
      
      {/* ----------------------------------------------------
          SUB-VIEW TOP BAR
          ---------------------------------------------------- */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 flex justify-between items-center select-none shrink-0 z-30 shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
        <div className="flex items-center gap-2">
          <button 
            onClick={navigateBack}
            className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-700 rounded-full transition-colors cursor-pointer"
          >
            <IoChevronBackOutline className="text-lg" />
          </button>
          <h3 className="text-xs font-black text-slate-800 tracking-wide uppercase">
            {activeView === 'volunteer-dashboard' && 'Volunteer Central'}
            {activeView === 'become-volunteer' && 'Join Volunteers'}
            {activeView === 'volunteer-status' && 'Application Stepper'}
            {activeView === 'volunteer-id' && 'Volunteer ID Card'}
            {activeView === 'qr-verification' && 'Verified Check-in'}
            {activeView === 'volunteer-tasks' && 'My Roster Tasks'}
            {activeView === 'attendance' && 'Attendance Registry'}
            {activeView === 'impact' && 'Community Impact'}
            {activeView === 'rewards' && 'Achievements'}
            {activeView === 'volunteer-certificates' && 'Earned Credentials'}
            {activeView === 'membership-dashboard' && 'Membership Core'}
            {activeView === 'become-member' && 'Join Membership'}
            {activeView === 'membership-card' && 'Membership ID Card'}
            {activeView === 'membership-benefits' && 'Benefits Guide'}
            {activeView === 'membership-timeline' && 'Timeline progress'}
            {activeView === 'contributions' && 'My Contributions'}
            {activeView === 'leaderboard' && 'Leaderboard Hall'}
            {activeView === 'search' && 'Directories Search'}
            {activeView === 'notifications' && 'System alerts'}
            {activeView === 'empty-states' && 'Verification logs'}
          </h3>
        </div>

        <div className="flex gap-2">
          {activeView.includes('dashboard') && (
            <>
              <button onClick={() => navigateTo('search')} className="text-slate-400 hover:text-primary p-1.5"><IoSearchOutline className="text-lg" /></button>
              <button onClick={() => navigateTo('notifications')} className="text-slate-400 hover:text-primary p-1.5"><IoNotificationsOutline className="text-lg" /></button>
            </>
          )}
        </div>
      </div>

      {/* ----------------------------------------------------
          ACTIVE VIEW SCROLLER
          ---------------------------------------------------- */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-5">
        
        {/* ====================================================
            VIEW 1: VOLUNTEER DASHBOARD
            ==================================================== */}
        {activeView === 'volunteer-dashboard' && (
          <>
            {/* Level status & points */}
            <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-3xl p-5 border border-emerald-950/20 shadow-soft select-none flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] text-accent-light uppercase tracking-widest font-extrabold">Active Status</span>
                <h4 className="text-sm font-black text-white">Level 2 (Bronze Volunteer)</h4>
                <p className="text-[10px] text-emerald-100 mt-1 max-w-[200px] leading-relaxed">
                  Earn 160 more points to unlock Silver Level benefits!
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-accent text-sm font-bold shrink-0">
                ⭐ 340
              </div>
            </div>

            {/* Quick Actions Volunteer */}
            <div className="grid grid-cols-4 gap-3 bg-white p-4 rounded-3xl border border-slate-50 shadow-soft select-none text-center">
              {[
                { label: 'Roster Tasks', icon: '📋', view: 'volunteer-tasks' },
                { label: 'Register', icon: '📝', view: 'become-volunteer' },
                { label: 'Check-In', icon: '🤳', view: 'qr-verification' },
                { label: 'ID Badge', icon: '🪪', view: 'volunteer-id' },
                { label: 'Timeline', icon: '📊', view: 'volunteer-status' },
                { label: 'Attendance', icon: '📆', view: 'attendance' },
                { label: 'Impact metrics', icon: '📈', view: 'impact' },
                { label: 'Rewards', icon: '🏆', view: 'rewards' }
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

            {/* Today's assignment alert */}
            <div className="bg-white rounded-3xl p-4.5 border border-slate-50 shadow-soft flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Today's Duty Briefing</span>
              <Card className="flex flex-col gap-3">
                <div className="flex justify-between items-start select-none">
                  <div>
                    <Badge variant="accent" className="text-[8px] uppercase tracking-wider mb-1.5">Emergency Relief</Badge>
                    <h4 className="text-xs font-extrabold text-slate-800 leading-snug">Srinagar Ration Distribution</h4>
                  </div>
                  <span className="text-2xl shrink-0">📦</span>
                </div>
                <div className="flex flex-col gap-1.5 text-[10px] text-slate-500 font-semibold border-t border-slate-50 pt-2.5 mt-1 select-none">
                  <span className="flex items-center gap-1.5"><IoTimeOutline /> Time: 4:00 PM - 7:00 PM</span>
                  <span className="flex items-center gap-1.5"><IoLocationOutline /> Assembly: Budgam relief office</span>
                </div>
              </Card>
            </div>

            {/* Leaderboard preview button */}
            <div className="flex justify-center select-none pt-1">
              <Button variant="outline" size="sm" onClick={() => navigateTo('leaderboard')} leftIcon={<IoRibbonOutline />}>
                <span>Browse Volunteers Leaderboard</span>
              </Button>
            </div>
          </>
        )}

        {/* ====================================================
            VIEW 2: BECOME A VOLUNTEER FORM
            ==================================================== */}
        {activeView === 'become-volunteer' && (
          <div className="flex flex-col gap-4 select-none">
            {volAppSubmitted ? (
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
                  Your volunteer profile has been sent to review board. Review step logs in progress timelines.
                </p>
                <Button variant="primary" className="mt-6" onClick={() => navigateTo('volunteer-status')}>
                  Check Application Status
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Registries</span>
                  <h3 className="text-base font-black text-slate-800 mt-0.5">Register as Volunteer</h3>
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (volForm.name.trim() && volForm.phone.trim()) {
                      setVolAppSubmitted(true);
                      triggerToast("Volunteer registry application submitted", "success");
                    } else {
                      triggerToast("Please fill out required inputs", "error");
                    }
                  }}
                  className="flex flex-col gap-4 mt-2"
                >
                  <Input 
                    placeholder="Full Name"
                    value={volForm.name}
                    onChange={(e) => setVolForm({ ...volForm, name: e.target.value })}
                  />

                  <Input 
                    placeholder="Contact phone"
                    type="tel"
                    value={volForm.phone}
                    onChange={(e) => setVolForm({ ...volForm, phone: e.target.value })}
                  />

                  <div className="flex flex-col gap-1 px-0.5 text-xs font-bold text-slate-700">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mb-1">Select Region</span>
                    <select 
                      value={volForm.region}
                      onChange={(e) => setVolForm({ ...volForm, region: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-2xl text-xs focus:outline-none"
                    >
                      {['Budgam', 'Srinagar', 'Baramulla'].map(reg => (
                        <option key={reg} value={reg}>{reg}</option>
                      ))}
                    </select>
                  </div>

                  <Input 
                    placeholder="Primary Skills (e.g. medical, logistics)"
                    value={volForm.skills}
                    onChange={(e) => setVolForm({ ...volForm, skills: e.target.value })}
                  />

                  <Button type="submit" variant="primary" fullWidth className="mt-2">
                    <span>Submit Application</span>
                  </Button>
                </form>
              </>
            )}
          </div>
        )}

        {/* ====================================================
            VIEW 3: APPLICATION STATUS TIMELINE
            ==================================================== */}
        {activeView === 'volunteer-status' && (
          <div className="flex flex-col gap-5 select-none">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Timeline</span>
              <h3 className="text-base font-black text-slate-800 mt-0.5">Welfare Application Stepper</h3>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft">
              <Stepper 
                steps={['Submitted', 'Under Review', 'Verified Status', 'Activated']} 
                currentStep={1} 
              />
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4 flex gap-3 text-slate-600 mt-1">
              <IoWarningOutline className="text-xl shrink-0 mt-0.5 text-accent" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wide">Review in progress</span>
                <p className="text-[9px] text-slate-400 leading-relaxed font-semibold">
                  Board verifies skills and coordinates with district relief centers before final activation credentials.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 4: DIGITAL VOLUNTEER ID CARD
            ==================================================== */}
        {activeView === 'volunteer-id' && (
          <div className="flex flex-col items-center gap-5 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block self-start">Digital Badge ID</span>

            {/* FLIPPING BADGE CONTAINER */}
            <div 
              onClick={() => setIsVolCardFlipped(!isVolCardFlipped)}
              className="w-full max-w-[280px] h-[380px] cursor-pointer relative preserve-3d transition-transform duration-500"
              style={{ transform: isVolCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
              {/* CARD FRONT SIDE */}
              <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-primary to-primary-dark rounded-[32px] border-2 border-accent/25 p-5 text-white flex flex-col justify-between shadow-xl">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-accent-light tracking-widest font-extrabold uppercase">Anjuman Welfare</span>
                    <span className="text-[8px] text-emerald-300 font-bold block">Relief Volunteer</span>
                  </div>
                  <IoShieldCheckmarkOutline className="text-accent text-2xl" />
                </div>

                {/* Avatar & details */}
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
                <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 select-none">
                  <span>Cryptographic QR Code Pass</span>
                  <span>Budgam Relief</span>
                </div>

                {/* QR barcode mock */}
                <div className="flex justify-center my-6">
                  <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center font-mono text-[7px] text-center font-bold shadow-sm p-2 select-none">
                    [TICKET QR]
                  </div>
                </div>

                <div className="border-t border-slate-50 pt-3 text-center text-[9px] font-bold text-slate-400">
                  <span>Expires: Dec 2026 • Tap card to flip</span>
                </div>
              </div>
            </div>

            <span className="text-[10px] text-slate-400 italic">Click card to view verification barcode code.</span>
          </div>
        )}

        {/* ====================================================
            VIEW 5: QR VERIFICATION / CHECK-IN
            ==================================================== */}
        {activeView === 'qr-verification' && (
          <div className="flex flex-col items-center gap-5 select-none text-center">
            {checkInDone ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mb-4 animate-bounce">
                  <IoCheckmarkCircle />
                </div>
                <h3 className="text-base font-black text-slate-800 tracking-wide uppercase">Attendance Recorded</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">Successfully checked-in at Imambara Budgam!</p>
                <Button variant="outline" className="mt-6" onClick={() => setCheckInDone(false)}>
                  Scan Check-In Again
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="flex flex-col self-start text-left">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Scanner</span>
                  <h3 className="text-base font-black text-slate-800 mt-0.5">Verified Check-In</h3>
                  <p className="text-xs text-slate-400 font-semibold mt-1">Scan terminal QR code at event venue to log service hours.</p>
                </div>

                {/* Simulated scanner lens */}
                <div className="relative w-48 h-48 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50/50 mt-4 overflow-hidden group">
                  <IoQrCodeOutline className="text-5xl text-slate-400 group-hover:scale-105 transition-transform" />
                  {/* Laser line animation */}
                  <div className="absolute left-0 right-0 h-[1.5px] bg-accent/70 top-0 bottom-0 top-1/2 -translate-y-1/2 animate-pulse" />
                </div>

                <Button 
                  variant="primary" 
                  fullWidth 
                  className="mt-6"
                  onClick={() => {
                    setCheckInDone(true);
                    triggerToast("Attendance check-in logged successfully", "success");
                  }}
                >
                  <span>Simulate QR Scan Check-In</span>
                </Button>
              </>
            )}
          </div>
        )}

        {/* ====================================================
            VIEW 6: VOLUNTEER TASKS
            ==================================================== */}
        {activeView === 'volunteer-tasks' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Active Assignment Checklist</span>
            
            <div className="flex flex-col gap-3">
              {tasks.map((task) => (
                <Card 
                  key={task.id}
                  className={`flex flex-col gap-3 transition-all ${
                    task.done ? 'opacity-65 border-transparent bg-slate-50/50' : 'hover:border-emerald-100'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4 select-none">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Badge 
                          variant={task.priority === 'High' ? 'error' : task.priority === 'Medium' ? 'warning' : 'success'} 
                          className="text-[8px] uppercase tracking-wider"
                        >
                          {task.priority} Priority
                        </Badge>
                        {task.done && <Badge variant="primary" className="text-[8px] uppercase">Completed</Badge>}
                      </div>
                      <h4 className={`text-xs font-extrabold leading-snug ${task.done ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {task.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-1 leading-relaxed">
                        {task.desc}
                      </p>
                    </div>

                    <input 
                      type="checkbox"
                      checked={task.done}
                      onChange={() => handleToggleTask(task.id)}
                      className="accent-primary w-4.5 h-4.5 cursor-pointer mt-0.5 shrink-0"
                    />
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 border-t border-slate-50 pt-2.5 mt-1 select-none">
                    <span>Deadline: {task.date}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 7: ATTENDANCE REGISTRY
            ==================================================== */}
        {activeView === 'attendance' && (
          <>
            <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft select-none text-center grid grid-cols-2 gap-4">
              <div className="flex flex-col p-2 bg-slate-50 border border-slate-100/50 rounded-2xl">
                <span className="text-lg font-black text-slate-800">12 days</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 leading-snug">Days Present</span>
              </div>
              <div className="flex flex-col p-2 bg-slate-50 border border-slate-100/50 rounded-2xl">
                <span className="text-lg font-black text-primary">96%</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 leading-snug">Attendance Ratio</span>
              </div>
            </div>

            {/* Attendance calendar view */}
            <div className="bg-white rounded-3xl p-4.5 border border-slate-50 shadow-soft select-none flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Aug 2026 logs</span>
              <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold text-slate-600">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i} className="text-slate-400 font-extrabold text-[9px] uppercase">{d}</span>)}
                {[...Array(14)].map((_, i) => {
                  const present = i !== 4 && i !== 9;
                  return (
                    <span 
                      key={i} 
                      className={`py-1 rounded-lg text-[10px] font-black border ${
                        present ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'
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
            VIEW 8: COMMUNITY IMPACT
            ==================================================== */}
        {activeView === 'impact' && (
          <div className="flex flex-col gap-5 select-none">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="flex flex-col p-3 bg-white border border-slate-50 rounded-3xl shadow-soft">
                <span className="text-lg font-black text-slate-800">34 hrs</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 leading-snug">Hours Served</span>
              </div>
              <div className="flex flex-col p-3 bg-white border border-slate-50 rounded-3xl shadow-soft">
                <span className="text-lg font-black text-primary">25 fams</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 leading-snug">Families Helped</span>
              </div>
            </div>

            {/* Impact metrics breakdown list */}
            <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft flex flex-col gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Impact Category Metrics</span>
              
              {[
                { label: 'Relief Rations Distributed', val: '14 packs', percent: 60 },
                { label: 'Medical Assistance cases coordinated', val: '8 cases', percent: 35 },
                { label: 'Congregational events managed', val: '3 programs', percent: 15 }
              ].map((imp, i) => (
                <div key={i} className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
                  <div className="flex justify-between items-center">
                    <span>{imp.label}</span>
                    <span className="text-accent">{imp.val}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${imp.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 9: REWARDS & RECOGNITION
            ==================================================== */}
        {activeView === 'rewards' && (
          <div className="flex flex-col gap-4 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">My Achievements</span>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center flex flex-col items-center justify-between border border-slate-50 hover:border-slate-100 bg-white">
                <span className="text-3xl">🛡️</span>
                <div className="mt-3">
                  <h4 className="text-[11px] font-bold text-slate-800 leading-snug">Bronze Helper Shield</h4>
                  <span className="text-[8.5px] text-slate-400 font-semibold block mt-1">Unlocked: 30 hours served</span>
                </div>
              </Card>

              <Card className="p-4 text-center flex flex-col items-center justify-between border border-slate-50 hover:border-slate-100 opacity-60 bg-white">
                <span className="text-3xl">🌟</span>
                <div className="mt-3">
                  <h4 className="text-[11px] font-bold text-slate-800 leading-snug">Silver Helper Shield</h4>
                  <span className="text-[8.5px] text-slate-400 font-semibold block mt-1">Locks: 100 hours served</span>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 10: VOLUNTEER CERTIFICATES
            ==================================================== */}
        {activeView === 'volunteer-certificates' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Community Service Certificates</span>
            
            <Card className="flex flex-col gap-4 select-none">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <Badge variant="success" className="text-[8px] uppercase tracking-wider mb-1.5">Verified</Badge>
                  <h4 className="text-xs font-extrabold text-slate-800 leading-snug">Ration Distribution Relief Drive</h4>
                  <span className="text-[10px] text-slate-400 font-semibold block mt-1">July 2026 | Budgam relief Secretariat</span>
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
            VIEW 11: MEMBERSHIP DASHBOARD
            ==================================================== */}
        {activeView === 'membership-dashboard' && (
          <>
            {/* Status card preview */}
            <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-3xl p-5 border border-emerald-950/20 shadow-soft select-none flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] text-accent-light uppercase tracking-widest font-extrabold">Membership status</span>
                <h4 className="text-sm font-black text-white">Full Registered Member</h4>
                <p className="text-[10px] text-emerald-100 mt-1 max-w-[200px] leading-relaxed">
                  Card ID: {mockMember.cardNumber} | Verified
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-accent text-sm font-bold shrink-0">
                🪪 Verified
              </div>
            </div>

            {/* Quick Actions Membership */}
            <div className="grid grid-cols-4 gap-3 bg-white p-4 rounded-3xl border border-slate-50 shadow-soft select-none text-center">
              {[
                { label: 'Register Profile', icon: '📝', view: 'become-member' },
                { label: 'Member Card', icon: '🪪', view: 'membership-card' },
                { label: 'Perks Benefits', icon: '✨', view: 'membership-benefits' },
                { label: 'Timeline Status', icon: '📊', view: 'membership-timeline' },
                { label: 'My Contribution', icon: '💳', view: 'contributions' },
                { label: 'Leaderboard', icon: '🏆', view: 'leaderboard' },
                { label: 'Verify Ticket', icon: '🎫', view: 'qr-verification' },
                { label: 'Empty log test', icon: '🤷', view: 'empty-states' }
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

            {/* Contribution brief statistics */}
            <div className="bg-white rounded-3xl p-4.5 border border-slate-50 shadow-soft select-none cursor-pointer" onClick={() => navigateTo('contributions')}>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3.5">My Contributions summary</span>
              <div className="flex justify-around items-center">
                <div className="flex flex-col items-center">
                  <span className="text-base font-black text-slate-800">34 hrs</span>
                  <span className="text-[8.5px] text-slate-400 font-bold uppercase mt-0.5">Volunteered</span>
                </div>
                <div className="w-[1px] h-8 bg-slate-100" />
                <div className="flex flex-col items-center">
                  <span className="text-base font-black text-primary">₹15,000</span>
                  <span className="text-[8.5px] text-slate-400 font-bold uppercase mt-0.5">Donated</span>
                </div>
                <div className="w-[1px] h-8 bg-slate-100" />
                <div className="flex flex-col items-center">
                  <span className="text-base font-black text-slate-800">12 classes</span>
                  <span className="text-[8.5px] text-slate-400 font-bold uppercase mt-0.5">Syllabus Read</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ====================================================
            VIEW 12: BECOME A MEMBER FORM
            ==================================================== */}
        {activeView === 'become-member' && (
          <div className="flex flex-col gap-4 select-none">
            {memAppSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mb-4 animate-bounce">
                  <IoCheckmarkCircle />
                </div>
                <h3 className="text-base font-black text-slate-800 tracking-wide uppercase">Profile Logged</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1 max-w-[240px] leading-relaxed mx-auto">
                  Your digital membership request has been dispatched to review board logs under registration ticket.
                </p>
                <Button variant="primary" className="mt-6" onClick={() => navigateTo('membership-timeline')}>
                  Check Verification Status
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Application Form</span>
                  <h3 className="text-base font-black text-slate-800 mt-0.5">Register Membership</h3>
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (memForm.name.trim() && memForm.phone.trim()) {
                      setMemAppSubmitted(true);
                      triggerToast("Membership verification application submitted", "success");
                    } else {
                      triggerToast("Please fill out required inputs", "error");
                    }
                  }}
                  className="flex flex-col gap-4 mt-2"
                >
                  <Input 
                    placeholder="Full Name of applicant"
                    value={memForm.name}
                    onChange={(e) => setMemForm({ ...memForm, name: e.target.value })}
                  />

                  <Input 
                    placeholder="Contact phone"
                    type="tel"
                    value={memForm.phone}
                    onChange={(e) => setMemForm({ ...memForm, phone: e.target.value })}
                  />

                  <Input 
                    placeholder="Occupation / Profession"
                    value={memForm.occupy}
                    onChange={(e) => setMemForm({ ...memForm, occupy: e.target.value })}
                  />

                  <div className="flex flex-col gap-1 px-0.5 text-xs font-bold text-slate-700">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mb-1">Select Region</span>
                    <select 
                      value={memForm.region}
                      onChange={(e) => setMemForm({ ...memForm, region: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-2xl text-xs focus:outline-none"
                    >
                      {['Budgam', 'Srinagar', 'Baramulla'].map(reg => (
                        <option key={reg} value={reg}>{reg}</option>
                      ))}
                    </select>
                  </div>

                  <Button type="submit" variant="primary" fullWidth className="mt-2">
                    <span>Submit Verification Request</span>
                  </Button>
                </form>
              </>
            )}
          </div>
        )}

        {/* ====================================================
            VIEW 13: DIGITAL MEMBERSHIP CARD (FRONT BACK FLIP)
            ==================================================== */}
        {activeView === 'membership-card' && (
          <div className="flex flex-col items-center gap-5 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block self-start">Digital Member Pass</span>

            {/* FLIPPING MEMBERSHIP CARD */}
            <div 
              onClick={() => setIsMemCardFlipped(!isMemCardFlipped)}
              className="w-full max-w-[280px] h-[172px] cursor-pointer relative preserve-3d transition-transform duration-500"
              style={{ transform: isMemCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
              {/* CARD FRONT SIDE */}
              <div className="absolute inset-0 backface-hidden bg-gradient-to-r from-emerald-800 to-emerald-950 rounded-3xl border border-emerald-900/10 p-5 text-white flex flex-col justify-between shadow-xl">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-accent-light tracking-widest font-extrabold uppercase">Anjuman-e-Sharie Shian</span>
                    <span className="text-[8px] text-emerald-300 font-bold block mt-0.5">Digital Member Card</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-0.5 text-primary text-[8px] font-urdu font-bold">
                    شرعی
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center text-xs font-black font-urdu shrink-0 shadow-sm">
                    SA
                  </div>
                  <div className="flex flex-col min-w-0 pr-2">
                    <h3 className="text-xs font-black tracking-wide truncate">{mockMember.name}</h3>
                    <span className="text-[9px] text-emerald-300 font-mono mt-0.5">{mockMember.cardNumber}</span>
                  </div>
                </div>

                <div className="flex justify-between text-[7px] font-bold text-emerald-300">
                  <span>Verified Member status</span>
                  <span className="uppercase">Expires: DEC 2026</span>
                </div>
              </div>

              {/* CARD BACK SIDE */}
              <div 
                className="absolute inset-0 backface-hidden bg-white rounded-3xl border border-slate-100 p-5 text-slate-800 flex flex-col justify-between shadow-xl"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <div className="flex justify-between items-center text-[8px] font-bold text-slate-400">
                  <span>Cryptographic Member Pass QR Code</span>
                  <span>Shariat Registry</span>
                </div>

                <div className="flex justify-center my-1 select-none">
                  <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-mono text-[5px] text-center font-bold p-1 shadow-sm select-none">
                    [MEMBER QR]
                  </div>
                </div>

                <div className="text-center text-[7px] font-bold text-slate-400">
                  <span>Tap card to view front details</span>
                </div>
              </div>
            </div>

            <span className="text-[10px] text-slate-400 italic">Click card to check cryptographic verify QR details.</span>
          </div>
        )}

        {/* ====================================================
            VIEW 14: MEMBERSHIP BENEFITS GUIDE
            ==================================================== */}
        {activeView === 'membership-benefits' && (
          <div className="flex flex-col gap-4 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Membership Perks & Privileges</span>
            
            <div className="grid grid-cols-1 gap-3 bg-white p-4.5 rounded-3xl border border-slate-50 shadow-soft">
              {[
                { label: 'Fiqh Jurisdiction Board', desc: 'Submit questions and get direct jurisprudential directives from the Shariat Council.' },
                { label: 'Maktab Student Records', desc: 'Secure parent portal dashboard accessing grades, timetables, and invoice billing.' },
                { label: 'Welfare Charity Ledgers', desc: 'Print verified transaction receipts for tax exemptions on charity contributions.' }
              ].map((perf, i) => (
                <div key={i} className="flex gap-3 items-start text-xs font-semibold text-slate-600">
                  <IoCheckmarkCircle className="text-primary text-lg shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-slate-800">{perf.label}</span>
                    <span className="text-slate-400 leading-relaxed">{perf.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 15: MEMBERSHIP TIMELINE STEPPER
            ==================================================== */}
        {activeView === 'membership-timeline' && (
          <div className="flex flex-col gap-5 select-none">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Timeline</span>
              <h3 className="text-base font-black text-slate-800 mt-0.5">Membership Stepper Status</h3>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-soft">
              <Stepper 
                steps={['Profile Logged', 'Doc Verification', 'Office Approval', 'Card Activated']} 
                currentStep={2} 
              />
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 16: CONTRIBUTIONS HUB
            ==================================================== */}
        {activeView === 'contributions' && (
          <div className="flex flex-col gap-4 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">My Contributions logs</span>
            
            <div className="flex flex-col gap-3.5 bg-white p-4.5 rounded-3xl border border-slate-50 shadow-soft text-xs font-bold text-slate-700">
              <div className="flex justify-between items-center py-1">
                <span>Volunteer hours tracked</span>
                <span className="text-primary">34 hrs</span>
              </div>
              <hr className="border-slate-50" />
              <div className="flex justify-between items-center py-1">
                <span>Welfare donations logged</span>
                <span className="text-primary">₹15,000</span>
              </div>
              <hr className="border-slate-50" />
              <div className="flex justify-between items-center py-1">
                <span>Theological classes completed</span>
                <span className="text-primary">1 class</span>
              </div>
              <hr className="border-slate-50" />
              <div className="flex justify-between items-center py-1">
                <span>Certificates verified</span>
                <span className="text-primary">1 credential</span>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 17: LEADERS BOARD Recognition
            ==================================================== */}
        {activeView === 'leaderboard' && (
          <div className="flex flex-col gap-4 select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Top Volunteers ranking</span>
            
            <div className="flex flex-col gap-3.5">
              {mockLeaderboard.map((ld) => (
                <Card 
                  key={ld.rank}
                  className="flex justify-between items-center bg-white border border-slate-50 hover:border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      ld.rank === 1 ? 'bg-amber-100 text-amber-800' : 'bg-slate-50 border border-slate-100 text-slate-500'
                    }`}>
                      {ld.rank}
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-xs font-bold text-slate-800">{ld.name}</h4>
                      <span className="text-[9.5px] text-slate-400 font-semibold block mt-0.5">{ld.level}</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-primary font-mono">{ld.hours} hrs</span>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 18: DIRECTORIES SEARCH
            ==================================================== */}
        {activeView === 'search' && (
          <div className="flex flex-col gap-4">
            <Input 
              placeholder="Search volunteers, members directories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<IoSearchOutline />}
            />

            <div className="flex gap-2 select-none justify-center">
              {['Volunteers', 'Members'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setSearchTab(tab)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-full border transition-all cursor-pointer ${
                    searchTab === tab ? 'bg-primary border-primary text-white' : 'bg-slate-50 border-slate-100 text-slate-500'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {searchQuery.trim() === '' ? (
              <div className="text-center text-[10px] text-slate-400 italic py-6 select-none">
                Type queries to lookup verified directory profiles.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Matches</span>
                {mockLeaderboard.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                  mockLeaderboard.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase())).map(l => (
                    <div key={l.rank} className="p-3 border border-slate-50 bg-white rounded-2xl">
                      <h4 className="text-xs font-bold text-slate-800">{l.name}</h4>
                      <span className="text-[9px] text-slate-400 font-bold block mt-0.5">{l.level}</span>
                    </div>
                  ))
                ) : (
                  <EmptyState title="No matched directories" description="Refine search syntax rules." icon="🔍" />
                )}
              </div>
            )}
          </div>
        )}

        {/* ====================================================
            VIEW 19: NOTIFICATIONS ALERTS
            ==================================================== */}
        {activeView === 'notifications' && (
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">Recent system alerts</span>
            
            <div className="grid grid-cols-1 gap-4">
              <Card className="flex gap-3.5 items-start select-none">
                <span className="text-xl">🪪</span>
                <div>
                  <Badge variant="primary" className="text-[8px] uppercase tracking-wider mb-1">Update</Badge>
                  <h4 className="text-xs font-extrabold text-slate-800 leading-snug">Digital Membership ID Card Generated</h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed mt-1">
                    Your cryptographical QR verification code is synced in registry records.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 20: EMPTY STATES PREVIEWS (Zero-state logger)
            ==================================================== */}
        {activeView === 'empty-states' && (
          <div className="flex flex-col gap-4 justify-center items-center py-6 select-none">
            <EmptyState 
              title="No Volunteer Credentials Found" 
              description="Training certifications will display here once issued by education secretaria."
              icon="📜"
            />
          </div>
        )}

      </div>
    </div>
  );
};
export default VolunteerModule;
