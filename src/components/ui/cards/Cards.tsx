"use client";

import React from 'react';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { 
  IoPlayCircleOutline, 
  IoBookOutline, 
  IoTimeOutline, 
  IoCalendarOutline, 
  IoLocationOutline, 
  IoRibbonOutline, 
  IoCheckboxOutline, 
  IoTrendingUpOutline, 
  IoDownloadOutline 
} from 'react-icons/io5';

// ----------------------------------------------------
// 1. LECTURE CARD
// ----------------------------------------------------
interface LectureCardProps {
  title: string;
  speaker: string;
  duration: string;
  views: string;
  date: string;
  category: string;
  onPlay?: () => void;
}

export const LectureCard: React.FC<LectureCardProps> = ({
  title,
  speaker,
  duration,
  views,
  date,
  category,
  onPlay
}) => {
  return (
    <Card onClick={onPlay} className="flex flex-col gap-3 cursor-pointer hover:border-accent/20">
      <div className="w-full h-36 rounded-2xl bg-slate-900 flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-slate-800/40 z-0" />
        <IoPlayCircleOutline className="text-5xl text-white/90 z-20 group-hover:scale-105 transition-transform" />
        <span className="absolute bottom-3 right-3 bg-black/60 text-[9px] text-white font-mono px-2 py-0.5 rounded font-bold z-10">
          {duration}
        </span>
        <span className="absolute top-3 left-3 bg-accent text-[8px] text-white font-bold px-2 py-0.5 rounded-full z-10 uppercase tracking-wider">
          {category}
        </span>
      </div>
      <div className="flex flex-col">
        <h4 className="text-xs font-extrabold text-slate-800 tracking-wide leading-snug">
          {title}
        </h4>
        <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100">
          <span className="text-[10px] text-slate-500 font-bold">{speaker}</span>
          <span className="text-[9px] text-slate-400 font-semibold">{views} views • {date}</span>
        </div>
      </div>
    </Card>
  );
};

// ----------------------------------------------------
// 2. BOOK CARD
// ----------------------------------------------------
interface BookCardProps {
  title: string;
  author: string;
  pages: number;
  category: string;
  onRead?: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({ title, author, pages, category, onRead }) => {
  return (
    <Card onClick={onRead} className="flex gap-4 cursor-pointer hover:border-accent/20">
      <div className="w-14 h-20 bg-gradient-to-br from-accent to-accent-dark rounded-lg flex flex-col justify-between p-1.5 text-white shrink-0 shadow border border-amber-800/20">
        <IoBookOutline className="text-white/60 text-xs" />
        <span className="text-[7px] font-bold line-clamp-3 leading-tight font-serif uppercase tracking-wider text-center">
          {title}
        </span>
        <span className="text-[6px] text-white/50 text-center">Ebook</span>
      </div>
      <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
        <div>
          <h4 className="text-xs font-bold text-slate-800 leading-snug truncate">{title}</h4>
          <p className="text-[10px] text-slate-500 font-semibold mt-1">Author: {author}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[9px] text-slate-400 font-semibold">{pages} pages • {category}</span>
          <span className="text-[10px] text-accent font-bold uppercase tracking-wider">Read</span>
        </div>
      </div>
    </Card>
  );
};

// ----------------------------------------------------
// 3. COURSE CARD
// ----------------------------------------------------
interface CourseCardProps {
  title: string;
  instructor: string;
  lessons: number;
  progress: number; // 0 to 100
  onStart?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ title, instructor, lessons, progress, onStart }) => {
  return (
    <Card className="flex flex-col gap-3">
      <div>
        <Badge variant={progress > 0 ? 'primary' : 'neutral'} className="text-[8px] uppercase mb-1.5">
          {progress === 100 ? 'Completed' : progress > 0 ? 'In Progress' : 'Not Started'}
        </Badge>
        <h4 className="text-xs font-extrabold text-slate-800 leading-snug truncate">{title}</h4>
        <span className="text-[9px] text-slate-400 font-bold mt-1 block">Instructor: {instructor}</span>
      </div>
      <div className="flex flex-col gap-1.5 mt-1">
        <div className="flex justify-between text-[9px] text-slate-400 font-bold">
          <span>{lessons} lessons</span>
          <span>{progress}% complete</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/20">
          <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="flex justify-end mt-1">
        <Button variant={progress > 0 ? 'outline' : 'accent'} size="sm" onClick={onStart}>
          <span className="text-[10px] uppercase tracking-wider">
            {progress === 100 ? 'Review' : progress > 0 ? 'Continue' : 'Start Learn'}
          </span>
        </Button>
      </div>
    </Card>
  );
};

// ----------------------------------------------------
// 4. DONATION CAMPAIGN CARD
// ----------------------------------------------------
interface DonationCardProps {
  title: string;
  raised: number;
  goal: number;
  category: string;
  onDonate?: () => void;
}

export const DonationCampaignCard: React.FC<DonationCardProps> = ({ title, raised, goal, category, onDonate }) => {
  const percent = Math.min(100, Math.round((raised / goal) * 100));
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex justify-between items-start gap-4">
        <h4 className="text-xs font-extrabold text-slate-800 tracking-wide leading-tight">{title}</h4>
        <Badge variant="success" className="text-[8px] uppercase">{category}</Badge>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-[9px] font-bold text-slate-500">
          <span>Progress: {percent}%</span>
          <span>Goal: ₹{goal.toLocaleString()}</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
          <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${percent}%` }} />
        </div>
      </div>
      <div className="flex justify-between items-center mt-1 pt-1 border-t border-slate-100">
        <span className="text-[10px] font-bold text-emerald-600">Raised: ₹{raised.toLocaleString()}</span>
        <Button variant="accent" size="sm" onClick={onDonate}>
          <span className="text-[10px] tracking-wide font-extrabold uppercase">Donate</span>
        </Button>
      </div>
    </Card>
  );
};

// ----------------------------------------------------
// 5. VOLUNTEER TASK CARD
// ----------------------------------------------------
interface VolunteerCardProps {
  taskTitle: string;
  location: string;
  status: 'Pending' | 'Active' | 'Completed';
  date: string;
  onAction?: () => void;
}

export const VolunteerCard: React.FC<VolunteerCardProps> = ({ taskTitle, location, status, date, onAction }) => {
  const statusColors = {
    Pending: 'neutral' as const,
    Active: 'primary' as const,
    Completed: 'success' as const
  };

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <h4 className="text-xs font-extrabold text-slate-800 tracking-wide">{taskTitle}</h4>
        <Badge variant={statusColors[status]} className="text-[8px] uppercase">{status}</Badge>
      </div>
      <div className="flex flex-col gap-1 text-[10px] text-slate-500 font-semibold">
        <span className="flex items-center gap-1.5"><IoLocationOutline /> {location}</span>
        <span className="flex items-center gap-1.5"><IoCalendarOutline /> {date}</span>
      </div>
      <div className="flex justify-end pt-1 border-t border-slate-50 mt-1">
        <Button variant="outline" size="sm" onClick={onAction}>
          <span className="text-[10px] uppercase font-bold">Details</span>
        </Button>
      </div>
    </Card>
  );
};

// ----------------------------------------------------
// 6. EVENT CARD
// ----------------------------------------------------
interface EventCardProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  onInteract?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ title, date, time, venue, onInteract }) => {
  return (
    <Card onClick={onInteract} className="flex flex-col gap-2 cursor-pointer hover:border-accent/15">
      <div className="flex justify-between items-start gap-2">
        <h4 className="text-xs font-extrabold text-slate-800 leading-snug">{title}</h4>
        <Badge variant="accent" className="text-[8px] uppercase shrink-0">Event</Badge>
      </div>
      <div className="flex flex-col gap-1 text-[10px] text-slate-500 font-semibold mt-1">
        <span className="flex items-center gap-1.5"><IoCalendarOutline className="text-accent" /> {date} | {time}</span>
        <span className="flex items-center gap-1.5"><IoLocationOutline className="text-accent" /> {venue}</span>
      </div>
    </Card>
  );
};

// ----------------------------------------------------
// 7. STAT & ANALYTICS CARD
// ----------------------------------------------------
interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string; // e.g. "+12%" or "-5%"
  isPositive?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, isPositive = true }) => {
  return (
    <Card className="flex items-center justify-between p-4.5">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{title}</span>
        <h3 className="text-lg font-black text-slate-800 leading-none mt-0.5">{value}</h3>
        {trend && (
          <span className={`text-[9px] font-bold mt-1 flex items-center gap-0.5 ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
            <IoTrendingUpOutline className={isPositive ? '' : 'rotate-180'} />
            {trend} since last month
          </span>
        )}
      </div>
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 border border-slate-100 flex items-center justify-center text-lg shadow-sm">
          {icon}
        </div>
      )}
    </Card>
  );
};

// ----------------------------------------------------
// 8. CERTIFICATE CARD
// ----------------------------------------------------
interface CertificateCardProps {
  courseTitle: string;
  issueDate: string;
  onDownload?: () => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ courseTitle, issueDate, onDownload }) => {
  return (
    <Card className="flex items-center gap-4 border border-emerald-100/50 bg-gradient-to-r from-white to-emerald-50/20">
      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl shrink-0 border border-emerald-100">
        <IoRibbonOutline />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-slate-800 leading-tight truncate">{courseTitle}</h4>
        <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">Issued: {issueDate}</span>
      </div>
      <button 
        onClick={onDownload}
        className="w-8 h-8 rounded-lg bg-white border border-slate-100 text-slate-500 hover:text-slate-900 active:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer select-none"
      >
        <IoDownloadOutline />
      </button>
    </Card>
  );
};

// ----------------------------------------------------
// 9. STUDENT & TEACHER MAKTAB CARDS
// ----------------------------------------------------
interface StudentCardProps {
  studentName: string;
  rollNumber: string;
  classNameGrade: string;
  attendancePercent: number;
}

export const StudentCard: React.FC<StudentCardProps> = ({ studentName, rollNumber, classNameGrade, attendancePercent }) => {
  return (
    <Card className="flex flex-col gap-2.5">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-xs font-extrabold text-slate-800 truncate">{studentName}</h4>
          <span className="text-[9px] text-slate-400 font-bold block mt-0.5">Roll No: {rollNumber} • Grade: {classNameGrade}</span>
        </div>
        <Badge variant={attendancePercent >= 75 ? 'success' : 'warning'} className="text-[8px]">
          {attendancePercent}% Att.
        </Badge>
      </div>
      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${attendancePercent >= 75 ? 'bg-emerald-600' : 'bg-amber-500'}`} 
          style={{ width: `${attendancePercent}%` }} 
        />
      </div>
    </Card>
  );
};
