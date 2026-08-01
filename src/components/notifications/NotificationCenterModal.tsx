"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedIcon } from '@/components/ui/icons';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Prayer Reminder: Maghrib',
      desc: 'Maghrib prayer time in Srinagar begins in 15 minutes (6:45 PM).',
      time: '10m ago',
      category: 'Prayers',
      icon: 'mosque',
      unread: true
    },
    {
      id: '2',
      title: 'Volunteer Briefing Update',
      desc: 'Please assemble at Astan Budgam at 8:00 AM sharp for 20 Safar Jaloos Security.',
      time: '1h ago',
      category: 'Volunteer',
      icon: 'prayer-hands',
      unread: true
    },
    {
      id: '3',
      title: 'New Sermon Broadcast Live',
      desc: 'Aga Syed Mujtaba Abbas Mosavi live stream has started.',
      time: '3h ago',
      category: 'Media',
      icon: 'video',
      unread: false
    },
    {
      id: '4',
      title: 'Maktab Term II Results Released',
      desc: 'Annual Examination scores for Level 2 Shia Jurisprudence are now published.',
      time: '1d ago',
      category: 'Maktab',
      icon: 'maktab',
      unread: false
    }
  ]);

  if (!isOpen) return null;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/40 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white w-full max-w-md mx-auto h-full flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-full transition-colors">
                <AnimatedIcon name="arrow-left" size={20} />
              </button>
              <div>
                <h3 className="text-sm font-black text-slate-800">Notification Center</h3>
                <p className="text-[10px] text-slate-400 font-bold">Updates, Reminders & Announcements</p>
              </div>
            </div>
            <button 
              onClick={markAllRead}
              className="text-[10px] font-bold text-accent uppercase tracking-wider hover:underline"
            >
              Mark Read
            </button>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {notifications.map((item) => (
              <div 
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-all flex gap-3 ${
                  item.unread 
                    ? 'bg-emerald-50/40 border-emerald-100 shadow-soft' 
                    : 'bg-white border-slate-100 opacity-80'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <AnimatedIcon name={item.icon as any} size={20} />
                </div>
                <div className="flex flex-col flex-1 gap-0.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-accent uppercase tracking-wider">{item.category}</span>
                    <span className="text-[8.5px] font-semibold text-slate-400">{item.time}</span>
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-800 leading-tight">{item.title}</h4>
                  <p className="text-[10px] text-slate-500 font-semibold leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
