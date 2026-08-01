"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black z-45 rounded-[32px]"
          />
          {/* Bottom Sheet Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 max-h-[85%] bg-white rounded-t-[32px] shadow-2xl z-50 flex flex-col overflow-hidden pb-6"
          >
            {/* Grab handle indicator */}
            <div className="w-full flex justify-center pt-3 pb-2 cursor-pointer shrink-0" onClick={onClose}>
              <div className="w-12 h-1 bg-slate-200 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-5 py-2 flex justify-between items-center border-b border-slate-50 shrink-0">
              <h3 className="text-base font-bold text-slate-800">
                {title}
              </h3>
              <button 
                onClick={onClose}
                className="p-1 rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <IoCloseOutline className="text-xl" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4 no-scrollbar">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default BottomSheet;
