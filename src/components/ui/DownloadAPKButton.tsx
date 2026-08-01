"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { APP_CONFIG } from '@/config/appConfig';

interface DownloadAPKButtonProps {
  label?: string;
  variant?: 'primary' | 'outline' | 'hero';
  className?: string;
  onToast?: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
}

type ButtonState = 'idle' | 'loading' | 'success' | 'error';

export const DownloadAPKButton: React.FC<DownloadAPKButtonProps> = ({
  label = "📱 Download Mobile Application",
  variant = 'primary',
  className = "",
  onToast
}) => {
  const [buttonState, setButtonState] = useState<ButtonState>('idle');

  const notifyUser = (msg: string, type: 'success' | 'warning' | 'error' | 'info') => {
    if (onToast) {
      onToast(msg, type);
    } else if (typeof window !== 'undefined') {
      alert(msg);
    }
  };

  const handleDownload = async () => {
    if (buttonState === 'loading') return;

    const url = APP_CONFIG.apkDownloadUrl;
    console.log('[APK Download Debug] Initiating download process for URL:', url);

    // 1. Validate URL against empty or placeholder strings
    const invalidPlaceholders = ['#', 'javascript:void(0)', 'javascript:void(0);', '/', 'null', 'undefined'];
    if (!url || url.trim() === '' || invalidPlaceholders.includes(url.trim().toLowerCase())) {
      console.error('[APK Download Debug] APK URL is missing or invalid:', url);
      setButtonState('error');
      notifyUser("APK is not available yet. Please check back soon.", "error");
      setTimeout(() => setButtonState('idle'), 3000);
      return;
    }

    setButtonState('loading');
    notifyUser("Preparing Download...", "info");

    // 2. Pre-flight file availability verification
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch(url, { method: 'HEAD', signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok && response.status !== 0) {
        console.error(`[APK Download Debug] APK file not found (${response.status}) at:`, url);
        setButtonState('error');
        notifyUser("APK is not available yet. File not found on server (404).", "error");
        setTimeout(() => setButtonState('idle'), 3000);
        return;
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.warn('[APK Download Debug] Verification request timed out, proceeding with direct download attempt.');
      } else {
        console.warn('[APK Download Debug] Verification fetch warning (CORS or offline), attempting direct download:', err);
      }
    }

    // 3. Perform HTML5 anchor download with fallback
    try {
      console.log('[APK Download Debug] Executing HTML5 download link click.');
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', APP_CONFIG.apkFileName || 'anjuman-app.apk');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setButtonState('success');
      notifyUser("✓ Download Started! Your Android application is downloading.", "success");
    } catch (downloadErr) {
      console.warn('[APK Download Debug] Direct download click failed, attempting new tab fallback:', downloadErr);
      try {
        window.open(url, '_blank');
        setButtonState('success');
        notifyUser("✓ Download Opened in new tab.", "success");
      } catch (fallbackErr) {
        console.error('[APK Download Debug] Download failed completely:', fallbackErr);
        setButtonState('error');
        notifyUser("Download Failed due to browser restrictions. Please check permissions.", "error");
      }
    }

    // Reset button state back to idle
    setTimeout(() => {
      setButtonState('idle');
    }, 3000);
  };

  const baseStyles = "relative overflow-hidden font-black text-xs uppercase tracking-wider rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 select-none shadow-md active:scale-95";

  const variantStyles = {
    primary: "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 hover:shadow-lg hover:shadow-emerald-500/25 py-3.5 px-5 border border-emerald-300/40",
    hero: "bg-emerald-500 text-slate-950 hover:bg-emerald-400 py-4 px-6 text-sm border border-emerald-300/50 shadow-lg shadow-emerald-500/30",
    outline: "bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3 px-4"
  };

  return (
    <motion.button
      whileHover={{ scale: buttonState === 'loading' ? 1 : 1.02 }}
      whileTap={{ scale: buttonState === 'loading' ? 1 : 0.98 }}
      disabled={buttonState === 'loading'}
      onClick={handleDownload}
      className={`${baseStyles} ${variantStyles[variant]} ${buttonState === 'loading' ? 'opacity-80 cursor-wait' : ''} ${className}`}
    >
      {buttonState === 'loading' && (
        <>
          <div className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
          <span>Downloading...</span>
        </>
      )}

      {buttonState === 'success' && (
        <>
          <span>✓ Download Started</span>
        </>
      )}

      {buttonState === 'error' && (
        <>
          <span>⚠️ APK Unavailable</span>
        </>
      )}

      {buttonState === 'idle' && (
        <>
          <span>{label}</span>
          <span className="text-sm">📥</span>
        </>
      )}
    </motion.button>
  );
};
