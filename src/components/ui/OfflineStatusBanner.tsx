"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoWifiOutline, IoRefreshOutline } from 'react-icons/io5';

export const OfflineStatusBanner: React.FC = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    if (typeof window !== 'undefined') {
      setIsOffline(!navigator.onLine);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      }
    };
  }, []);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        setIsOffline(!navigator.onLine);
      }
      setIsRetrying(false);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 text-xs font-bold flex items-center justify-between shadow-md select-none sticky top-0 z-50"
        >
          <div className="flex items-center gap-2">
            <IoWifiOutline className="text-sm shrink-0 animate-pulse" />
            <span>Offline Mode • Displaying Cached Islamic Data</span>
          </div>

          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer"
          >
            <IoRefreshOutline className={`text-xs ${isRetrying ? 'animate-spin' : ''}`} />
            <span>{isRetrying ? 'Checking...' : 'Retry'}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
