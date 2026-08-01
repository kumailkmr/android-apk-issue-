"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { IoReloadOutline } from 'react-icons/io5';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger' | 'success' | 'fab';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  // Base style representing a luxury tactile mobile interaction target
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-150 focus:outline-none select-none cursor-pointer border border-transparent disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Specific theme button styling
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-light active:bg-primary-dark shadow-soft active:shadow-none',
    secondary: 'bg-secondary text-white hover:bg-slate-800 active:bg-slate-950 shadow-soft active:shadow-none',
    accent: 'bg-accent text-white hover:bg-accent-light active:bg-accent-dark shadow-soft active:shadow-none',
    outline: 'border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200',
    danger: 'bg-error text-white hover:opacity-90 active:bg-red-700 shadow-soft',
    success: 'bg-success text-white hover:opacity-90 active:bg-emerald-700 shadow-soft',
    fab: 'rounded-full w-14 h-14 bg-accent text-white shadow-floating hover:bg-accent-light active:scale-95 flex items-center justify-center border-none'
  };

  // Large tap targets for mobile accessibility (Material Design guidelines)
  const sizes = {
    sm: 'px-3 py-2 text-xs rounded-xl min-h-[36px]',
    md: 'px-5 py-3 text-sm rounded-2xl min-h-[46px]',
    lg: 'px-7 py-4 text-base rounded-[18px] min-h-[54px]'
  };

  const widthStyle = fullWidth ? 'w-full flex' : '';
  const isButtonDisabled = disabled || isLoading;

  if (variant === 'fab') {
    return (
      <motion.button
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
        disabled={isButtonDisabled}
        className={`${variants.fab} ${className}`}
        {...props}
      >
        {isLoading ? (
          <IoReloadOutline className="text-2xl animate-spin" />
        ) : (
          children
        )}
      </motion.button>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      disabled={isButtonDisabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {isLoading && (
        <IoReloadOutline className="text-base animate-spin mr-2 shrink-0" />
      )}
      
      {!isLoading && leftIcon && (
        <span className="mr-2 inline-flex items-center justify-center shrink-0">{leftIcon}</span>
      )}
      
      <span className="truncate">{children}</span>
      
      {!isLoading && rightIcon && (
        <span className="ml-2 inline-flex items-center justify-center shrink-0">{rightIcon}</span>
      )}
    </motion.button>
  );
};
export default Button;
