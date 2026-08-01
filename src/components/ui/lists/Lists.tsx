"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronForwardOutline, IoChevronDownOutline } from 'react-icons/io5';

// ----------------------------------------------------
// 1. SIMPLE LIST ITEM & SETTINGS ITEM
// ----------------------------------------------------
interface SimpleListItemProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  onClick?: () => void;
}

export const SimpleListItem: React.FC<SimpleListItemProps> = ({
  title,
  subtitle,
  icon,
  rightElement,
  onClick
}) => {
  const isClickable = typeof onClick === 'function';
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-50 shadow-soft transition-all duration-150 select-none ${
        isClickable ? 'cursor-pointer hover:bg-slate-50 active:scale-[0.99]' : ''
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {icon && (
          <div className="text-slate-500 text-lg flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-slate-800 tracking-wide truncate">
            {title}
          </span>
          {subtitle && (
            <span className="text-[10px] text-slate-400 font-semibold truncate mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      </div>
      <div>
        {rightElement || (isClickable && (
          <IoChevronForwardOutline className="text-slate-400 text-xs" />
        ))}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 2. AVATAR / NOTIFICATION LIST ITEM
// ----------------------------------------------------
interface AvatarListItemProps {
  avatarText: string;
  title: string;
  description: string;
  time?: string;
  unread?: boolean;
  onClick?: () => void;
}

export const AvatarListItem: React.FC<AvatarListItemProps> = ({
  avatarText,
  title,
  description,
  time,
  unread = false,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer select-none ${
        unread 
          ? 'bg-emerald-50/20 border-emerald-100 shadow-[0_4px_15px_rgba(16,185,129,0.02)]' 
          : 'bg-white border-slate-50 shadow-soft hover:bg-slate-50'
      }`}
    >
      {/* Circle Avatar wrapper */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
        unread ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
      }`}>
        {avatarText}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className={`text-xs tracking-wide truncate ${unread ? 'font-extrabold text-slate-900' : 'font-bold text-slate-800'}`}>
            {title}
          </h4>
          {time && (
            <span className="text-[9px] text-slate-400 font-bold shrink-0 ml-2 mt-0.5">
              {time}
            </span>
          )}
        </div>
        <p className={`text-[10px] leading-relaxed mt-1 line-clamp-2 ${unread ? 'font-semibold text-slate-600' : 'font-medium text-slate-400'}`}>
          {description}
        </p>
      </div>

      {unread && (
        <span className="w-2 h-2 rounded-full bg-primary shrink-0 self-center" />
      )}
    </div>
  );
};

// ----------------------------------------------------
// 3. EXPANDABLE ACCORDION LIST
// ----------------------------------------------------
interface ExpandableListItemProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const ExpandableListItem: React.FC<ExpandableListItemProps> = ({ title, icon, children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-slate-50 bg-white rounded-2xl overflow-hidden shadow-soft transition-all duration-200">
      <div 
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between p-4 cursor-pointer select-none hover:bg-slate-50 active:bg-slate-100/50"
      >
        <div className="flex items-center gap-3.5">
          {icon && <div className="text-slate-500 text-lg flex items-center justify-center shrink-0">{icon}</div>}
          <span className="text-xs font-bold text-slate-800 tracking-wide">{title}</span>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-slate-400 text-xs"
        >
          <IoChevronDownOutline />
        </motion.div>
      </div>
      
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-slate-50 bg-slate-50/30"
          >
            <div className="p-4 text-xs font-medium text-slate-500 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ----------------------------------------------------
// 4. SELECTABLE LIST
// ----------------------------------------------------
interface SelectableListProps {
  options: { id: string; label: string; description?: string }[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const SelectableList: React.FC<SelectableListProps> = ({ options, selectedId, onSelect }) => {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      {options.map((opt) => {
        const isSelected = selectedId === opt.id;
        return (
          <div
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer select-none transition-all ${
              isSelected 
                ? 'bg-primary/5 border-primary shadow-[0_4px_15px_rgba(6,78,59,0.02)]' 
                : 'bg-white border-slate-50 shadow-soft hover:bg-slate-50'
            }`}
          >
            <div className="flex flex-col min-w-0 pr-4">
              <span className={`text-xs tracking-wide ${isSelected ? 'font-extrabold text-primary' : 'font-bold text-slate-800'}`}>
                {opt.label}
              </span>
              {opt.description && (
                <span className="text-[10px] text-slate-400 font-semibold mt-0.5 truncate">
                  {opt.description}
                </span>
              )}
            </div>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center p-[3px] transition-colors shrink-0 ${
              isSelected ? 'border-primary' : 'border-slate-200'
            }`}>
              {isSelected && <div className="w-full h-full rounded-full bg-primary" />}
            </div>
          </div>
        );
      })}
    </div>
  );
};
