"use client";

import React from 'react';
import { motion, SVGMotionProps } from 'framer-motion';
import { ICON_PATHS, IconName } from './IconPaths';

export type AnimationType = 'pulse' | 'float' | 'rotate' | 'scale' | 'glow' | 'spin' | 'none';

export interface AnimatedIconProps extends Omit<SVGMotionProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number | string;
  className?: string;
  animation?: AnimationType;
  strokeWidth?: number;
  color?: string;
  badge?: string | number;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  name,
  size = 24,
  className = '',
  animation = 'scale',
  strokeWidth = 1.5,
  color = 'currentColor',
  badge,
  ...rest
}) => {
  const iconPath = ICON_PATHS[name];

  if (!iconPath) {
    console.warn(`Icon "${name}" not found in ICON_PATHS.`);
    return null;
  }

  // Animation variants
  const getAnimationProps = () => {
    switch (animation) {
      case 'pulse':
        return {
          animate: { scale: [1, 1.08, 1] },
          transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" as const }
        };
      case 'float':
        return {
          animate: { y: [0, -3, 0] },
          transition: { repeat: Infinity, duration: 3, ease: "easeInOut" as const }
        };
      case 'rotate':
        return {
          whileHover: { rotate: [0, -12, 12, 0] },
          transition: { duration: 0.5 }
        };
      case 'spin':
        return {
          animate: { rotate: 360 },
          transition: { repeat: Infinity, duration: 8, ease: "linear" as const }
        };
      case 'glow':
        return {
          animate: { opacity: [0.85, 1, 0.85] },
          transition: { repeat: Infinity, duration: 2, ease: "easeInOut" as const }
        };
      case 'scale':
        return {
          whileHover: { scale: 1.15 },
          whileTap: { scale: 0.92 },
          transition: { type: "spring" as const, stiffness: 400, damping: 17 }
        };
      case 'none':
      default:
        return {};
    }
  };

  return (
    <div className={`inline-flex items-center justify-center relative select-none ${className}`}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...getAnimationProps()}
        {...rest}
      >
        {iconPath}
      </motion.svg>
      
      {badge && (
        <span className="absolute -top-1 -right-1.5 min-w-[14px] h-[14px] px-1 text-[8px] font-black bg-red-500 text-white rounded-full flex items-center justify-center border border-white shadow-sm">
          {badge}
        </span>
      )}
    </div>
  );
};
