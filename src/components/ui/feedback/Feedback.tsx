"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCheckmarkCircle, IoWarning, IoCloseCircle, IoCloudOfflineOutline, IoClose } from 'react-icons/io5';

// ----------------------------------------------------
// 1. FLOATING TOAST / SNACKBAR NOTIFICATION
// ----------------------------------------------------
interface ToastProps {
  isOpen: boolean;
  message: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  onClose: () => void;
  durationMs?: number;
}

export const Toast: React.FC<ToastProps> = ({
  isOpen,
  message,
  type = 'info',
  onClose,
  durationMs = 3000
}) => {
  useEffect(() => {
    if (isOpen && durationMs > 0) {
      const timer = setTimeout(onClose, durationMs);
      return () => clearTimeout(timer);
    }
  }, [isOpen, durationMs, onClose]);

  const icons = {
    success: <IoCheckmarkCircle className="text-emerald-500 text-lg shrink-0" />,
    warning: <IoWarning className="text-amber-500 text-lg shrink-0" />,
    error: <IoCloseCircle className="text-red-500 text-lg shrink-0" />,
    info: <span className="text-lg shrink-0">ℹ️</span>
  };

  const bgStyles = {
    success: 'bg-white border-emerald-50 shadow-emerald-500/5',
    warning: 'bg-white border-amber-50 shadow-amber-500/5',
    error: 'bg-white border-red-50 border shadow-red-500/5',
    info: 'bg-white border-slate-100 shadow-slate-500/5'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className={`absolute bottom-20 left-4 right-4 z-50 p-4 border rounded-2xl shadow-floating flex items-center justify-between gap-3 ${bgStyles[type]}`}
        >
          <div className="flex items-center gap-3 min-w-0">
            {icons[type]}
            <span className="text-xs font-bold text-slate-700 leading-tight">
              {message}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer select-none"
          >
            <IoClose className="text-sm" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ----------------------------------------------------
// 2. OFFLINE STATE PANEL
// ----------------------------------------------------
interface OfflineStateProps {
  onRetry?: () => void;
  isLoading?: boolean;
}

export const OfflineState: React.FC<OfflineStateProps> = ({ onRetry, isLoading = false }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-3xl border border-red-100 shadow-soft w-full my-4 select-none">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-2xl border border-red-100/50 mb-3 animate-bounce">
        <IoCloudOfflineOutline />
      </div>
      <h4 className="text-sm font-extrabold text-slate-800 tracking-wide mb-1">
        Connection Lost
      </h4>
      <p className="text-xs text-slate-400 font-semibold max-w-[240px] leading-relaxed mb-5">
        Please check your internet settings. In a live production build, offline data caching will enable basic features.
      </p>
      <button
        onClick={onRetry}
        disabled={isLoading}
        className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-soft hover:bg-primary-light active:scale-95 transition-all select-none cursor-pointer"
      >
        {isLoading ? 'Connecting...' : 'Retry Connection'}
      </button>
    </div>
  );
};
