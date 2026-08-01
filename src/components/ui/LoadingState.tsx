import React from 'react';

interface LoadingStateProps {
  type?: 'card' | 'list' | 'video';
  count?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  type = 'card',
  count = 1
}) => {
  const items = Array.from({ length: count });

  if (type === 'list') {
    return (
      <div className="flex flex-col gap-3 w-full">
        {items.map((_, i) => (
          <div key={i} className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-slate-50">
            <div className="w-10 h-10 rounded-full shimmer shrink-0" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-3 w-1/3 rounded bg-slate-200 shimmer" />
              <div className="h-2 w-1/2 rounded bg-slate-100 shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'video') {
    return (
      <div className="flex flex-col gap-4 w-full">
        {items.map((_, i) => (
          <div key={i} className="flex flex-col bg-white rounded-3xl p-4 gap-3 border border-slate-50">
            <div className="w-full h-40 rounded-2xl bg-slate-200 shimmer" />
            <div className="h-4 w-2/3 rounded bg-slate-200 shimmer" />
            <div className="h-3.5 w-1/2 rounded bg-slate-100 shimmer" />
          </div>
        ))}
      </div>
    );
  }

  // default: card skeleton
  return (
    <div className="grid grid-cols-1 gap-4 w-full">
      {items.map((_, i) => (
        <div key={i} className="bg-white rounded-3xl p-5 border border-slate-50 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="h-3.5 w-24 rounded bg-slate-200 shimmer" />
            <div className="h-5 w-14 rounded-full bg-slate-100 shimmer" />
          </div>
          <div className="h-3 w-full rounded bg-slate-100 shimmer" />
          <div className="h-3 w-4/5 rounded bg-slate-100 shimmer" />
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50">
            <div className="h-3.5 w-12 rounded bg-slate-100 shimmer" />
            <div className="h-7 w-20 rounded-xl bg-slate-200 shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
};
export default LoadingState;
