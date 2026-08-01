"use client";

import React, { useEffect, useState } from 'react';
import { IoWifi, IoBatteryDead, IoChevronBackOutline } from 'react-icons/io5';

interface AndroidFrameProps {
  children: React.ReactNode;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({ children }) => {
  const [time, setTime] = useState("2:45 PM");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 should be 12
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[412px] h-[892px] bg-white rounded-[40px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col border-[8px] border-slate-800">
      {/* Android Top Camera Punch Hole / Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-5 bg-black rounded-full z-50 flex items-center justify-center">
        <div className="w-3 h-3 bg-neutral-900 rounded-full border border-neutral-800 ml-auto mr-4" />
      </div>



      {/* Screen Content Wrapper */}
      <div className="w-full flex-1 overflow-y-auto no-scrollbar flex flex-col bg-surface relative">
        {children}
      </div>

      {/* Simulated Android Navigation Bar */}
      <div className="w-full h-8 bg-slate-900 flex justify-center items-center shrink-0 z-45 select-none pb-1">
        {/* Gesture pill */}
        <div className="w-32 h-1 bg-white/40 rounded-full" />
      </div>
    </div>
  );
};
