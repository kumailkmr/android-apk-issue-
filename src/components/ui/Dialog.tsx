"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';
import Button from './Button';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  confirmLabel?: string;
  onConfirm?: () => void;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  confirmLabel = 'OK',
  onConfirm,
  type = 'info'
}) => {
  const typeIcons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };

  const borderColors = {
    info: 'border-blue-100',
    success: 'border-emerald-100',
    warning: 'border-amber-100',
    error: 'border-red-100'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 z-45 rounded-[32px]"
          />
          {/* Modal Container */}
          <div className="absolute inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-[320px] bg-white rounded-3xl p-5 shadow-2xl border ${borderColors[type]} pointer-events-auto flex flex-col items-center text-center`}
            >
              <span className="text-3xl mb-2">{typeIcons[type]}</span>
              
              <h3 className="text-base font-bold text-slate-800 mb-1">
                {title}
              </h3>
              
              <div className="text-xs text-slate-500 font-medium leading-relaxed mb-5">
                {children}
              </div>

              <div className="flex gap-3 w-full">
                {onConfirm && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                )}
                <Button 
                  variant={type === 'success' ? 'primary' : type === 'error' ? 'secondary' : 'accent'}
                  size="sm" 
                  onClick={onConfirm || onClose}
                  className="flex-1"
                >
                  {confirmLabel}
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
export default Dialog;
