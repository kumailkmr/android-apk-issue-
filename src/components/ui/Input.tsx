import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  icon,
  leftIcon,
  className = '',
  ...props
}) => {
  const displayIcon = leftIcon || icon;
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-bold text-slate-500 tracking-wide uppercase px-1">
          {label}
        </label>
      )}
      <div className="relative flex items-center w-full">
        {displayIcon && (
          <div className="absolute left-4 text-slate-400 text-lg flex items-center justify-center pointer-events-none select-none">
            {displayIcon}
          </div>
        )}
        <input
          className={`w-full bg-slate-50 text-slate-800 text-sm font-medium rounded-2xl border border-transparent px-4 py-3.5 focus:bg-white focus:border-accent/40 focus:outline-none transition-all placeholder-slate-400 ${
            displayIcon ? 'pl-11' : ''
          } ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};
export default Input;
