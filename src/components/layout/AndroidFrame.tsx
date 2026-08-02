"use client";

import React, { useEffect, useState } from 'react';
import { IoWifi, IoBatteryDead, IoChevronBackOutline } from 'react-icons/io5';

interface AndroidFrameProps {
  children: React.ReactNode;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen max-w-full lg:max-w-[440px] bg-slate-50 flex flex-col relative overflow-x-hidden shadow-none lg:shadow-2xl lg:rounded-3xl lg:border lg:border-slate-800/50">
      {/* Screen Content Wrapper */}
      <div className="w-full min-h-screen flex-1 flex flex-col bg-surface relative">
        {children}
      </div>
    </div>
  );
};
