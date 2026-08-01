import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = '🕌'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-3xl border border-slate-50 shadow-sm w-full my-4">
      <span className="text-4xl mb-3 select-none">{icon}</span>
      <h4 className="text-sm font-bold text-slate-800 tracking-wide mb-1">
        {title}
      </h4>
      <p className="text-xs text-slate-400 font-medium max-w-[220px] leading-relaxed">
        {description}
      </p>
    </div>
  );
};
export default EmptyState;
