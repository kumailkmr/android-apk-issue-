"use client";

import React from 'react';
import { IoPlayCircleOutline } from 'react-icons/io5';

export const LiveBroadcast: React.FC<{ videoId: string, title: string, author: string }> = ({ videoId, title, author }) => {
  return (
    <div 
      className="bg-slate-900 rounded-3xl p-1 shadow-2xl border border-slate-800 relative overflow-hidden group cursor-pointer"
      onClick={() => alert('Starting live stream...')}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 pointer-events-none" />
      
      <div className="aspect-video w-full rounded-2xl overflow-hidden relative z-0 bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} 
          alt="Live Broadcast Thumbnail" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-red-500/80 backdrop-blur-sm flex items-center justify-center text-white border border-white/30 shadow-[0_0_30px_rgba(239,68,68,0.5)] group-hover:scale-110 transition-transform">
            <IoPlayCircleOutline className="text-4xl ml-1" />
          </div>
        </div>
      </div>

      <div className="p-4 relative z-20 flex flex-col gap-1 mt-1">
        <h4 className="text-white font-bold text-sm leading-snug line-clamp-1">{title}</h4>
        <p className="text-white/60 text-[10px]">{author}</p>
      </div>
    </div>
  );
};
