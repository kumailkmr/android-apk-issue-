"use client";

import React, { useEffect, useState } from 'react';
import { IoCheckmarkCircle, IoTimeOutline } from 'react-icons/io5';

// ----------------------------------------------------
// 1. CHIP / TAG
// ----------------------------------------------------
interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({ label, selected = false, onClick, icon }) => {
  const isClickable = typeof onClick === 'function';
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isClickable}
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all select-none border ${
        selected 
          ? 'bg-primary text-white border-primary shadow-sm shadow-primary/10' 
          : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      } ${isClickable ? 'cursor-pointer active:scale-95' : 'cursor-default'}`}
    >
      {icon && <span className="text-sm shrink-0">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

// ----------------------------------------------------
// 2. LINEAR & CIRCULAR PROGRESS
// ----------------------------------------------------
interface ProgressProps {
  value: number; // 0 to 100
  color?: string; // e.g. "bg-primary"
}

export const LinearProgress: React.FC<ProgressProps> = ({ value, color = 'bg-primary' }) => {
  const percent = Math.min(100, Math.max(0, value));
  return (
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/20">
      <div 
        className={`h-full rounded-full transition-all duration-300 ${color}`} 
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

interface CircularProgressProps extends ProgressProps {
  size?: number; // width/height in px
  strokeWidth?: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ 
  value, 
  color = 'text-primary', 
  size = 48, 
  strokeWidth = 4.5 
}) => {
  const percent = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90">
        {/* Track circle */}
        <circle
          className="text-slate-100"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className={`transition-all duration-300 ${color}`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className="absolute text-[10px] font-black text-slate-800">{percent}%</span>
    </div>
  );
};

// ----------------------------------------------------
// 3. STEPPER
// ----------------------------------------------------
interface StepperProps {
  steps: string[];
  currentStep: number; // 0-indexed
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between w-full px-2 py-4 select-none">
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isActive = idx === currentStep;

        return (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center gap-1.5 relative">
              {/* Node index / check */}
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black transition-all ${
                isCompleted 
                  ? 'bg-primary border-primary text-white' 
                  : isActive 
                    ? 'border-accent text-accent bg-white shadow' 
                    : 'border-slate-200 text-slate-400 bg-white'
              }`}>
                {isCompleted ? <IoCheckmarkCircle className="text-lg" /> : idx + 1}
              </div>
              <span className={`text-[9px] font-bold text-center absolute -bottom-5 w-16 truncate ${
                isActive ? 'text-accent' : isCompleted ? 'text-primary' : 'text-slate-400'
              }`}>
                {step}
              </span>
            </div>
            
            {/* Connection Line */}
            {idx < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300" 
                  style={{ width: isCompleted ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ----------------------------------------------------
// 4. TIMELINE
// ----------------------------------------------------
interface TimelineItem {
  title: string;
  subtitle: string;
  description?: string;
  icon?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="flex flex-col w-full pl-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-4 relative pb-6 last:pb-2">
          {/* Vertical connection line */}
          {idx < items.length - 1 && (
            <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-100" />
          )}

          {/* Icon indicator */}
          <div className="w-8.5 h-8.5 rounded-full bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center text-sm z-10 shrink-0 select-none">
            {item.icon || '📍'}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 flex flex-col pt-0.5">
            <h4 className="text-xs font-extrabold text-slate-800 leading-snug">{item.title}</h4>
            <span className="text-[9px] text-accent font-bold mt-0.5">{item.subtitle}</span>
            {item.description && (
              <p className="text-[10px] text-slate-500 leading-relaxed font-semibold mt-1">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// ----------------------------------------------------
// 5. COUNTDOWN TIMER
// ----------------------------------------------------
interface CountdownProps {
  label: string;
  targetSeconds: number; // mock duration
}

export const CountdownTimer: React.FC<CountdownProps> = ({ label, targetSeconds }) => {
  const [seconds, setSeconds] = useState(targetSeconds);

  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds(s => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-5 border border-slate-800 shadow-lg w-full text-center">
      <span className="text-[9px] font-bold text-accent-light uppercase tracking-widest flex items-center gap-1.5 mb-2 select-none">
        <IoTimeOutline className="animate-pulse" />
        {label}
      </span>
      <div className="flex gap-4 justify-center">
        {/* Hours block */}
        <div className="flex flex-col items-center select-none">
          <div className="bg-white/10 px-3 py-2 rounded-xl text-lg font-black font-mono border border-white/5 min-w-[42px]">
            {hrs.toString().padStart(2, '0')}
          </div>
          <span className="text-[8px] text-white/50 uppercase mt-1 tracking-wider font-semibold">Hours</span>
        </div>
        {/* colon */}
        <span className="text-lg font-bold text-white/40 self-center -translate-y-2">:</span>
        {/* Minutes block */}
        <div className="flex flex-col items-center select-none">
          <div className="bg-white/10 px-3 py-2 rounded-xl text-lg font-black font-mono border border-white/5 min-w-[42px]">
            {mins.toString().padStart(2, '0')}
          </div>
          <span className="text-[8px] text-white/50 uppercase mt-1 tracking-wider font-semibold">Mins</span>
        </div>
        {/* colon */}
        <span className="text-lg font-bold text-white/40 self-center -translate-y-2">:</span>
        {/* Seconds block */}
        <div className="flex flex-col items-center select-none">
          <div className="bg-white/10 px-3 py-2 rounded-xl text-lg font-black font-mono border border-white/5 min-w-[42px]">
            {secs.toString().padStart(2, '0')}
          </div>
          <span className="text-[8px] text-white/50 uppercase mt-1 tracking-wider font-semibold">Secs</span>
        </div>
      </div>
    </div>
  );
};
