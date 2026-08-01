"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  delay?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  onClick,
  className = '',
  delay = 0
}) => {
  const isClickable = typeof onClick === 'function';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.45, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      whileTap={isClickable ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`bg-white rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 ${
        isClickable ? 'cursor-pointer select-none hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] active:bg-slate-50/50 transition-shadow' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};
export default Card;
