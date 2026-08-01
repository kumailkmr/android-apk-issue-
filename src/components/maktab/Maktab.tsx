"use client";

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  IoCalendarOutline, 
  IoBookOutline, 
  IoCashOutline, 
  IoCheckmarkCircleOutline, 
  IoClipboardOutline, 
  IoTimeOutline 
} from 'react-icons/io5';

// ----------------------------------------------------
// 1. STUDENT ATTENDANCE TILE
// ----------------------------------------------------
interface AttendanceProps {
  studentName: string;
  rollNumber: string;
  onStatusChange?: (status: 'Present' | 'Absent' | 'Late') => void;
}

export const StudentAttendanceTile: React.FC<AttendanceProps> = ({ studentName, rollNumber, onStatusChange }) => {
  const [status, setStatus] = useState<'Present' | 'Absent' | 'Late'>('Present');

  const handleSelect = (s: 'Present' | 'Absent' | 'Late') => {
    setStatus(s);
    if (onStatusChange) onStatusChange(s);
  };

  const btnColors = {
    Present: 'bg-emerald-600 text-white',
    Absent: 'bg-red-500 text-white',
    Late: 'bg-amber-500 text-white',
    inactive: 'bg-slate-100 text-slate-500 hover:bg-slate-200'
  };

  return (
    <Card className="flex items-center justify-between p-4 bg-white border border-slate-50 shadow-soft select-none">
      <div className="flex flex-col min-w-0 pr-4">
        <span className="text-xs font-bold text-slate-800 tracking-wide truncate">{studentName}</span>
        <span className="text-[9px] text-slate-400 font-bold mt-0.5">Roll No: {rollNumber}</span>
      </div>

      <div className="flex gap-1.5 shrink-0">
        {['Present', 'Absent', 'Late'].map((st) => (
          <button
            key={st}
            onClick={() => handleSelect(st as any)}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-wide transition-all cursor-pointer ${
              status === st ? btnColors[st as keyof typeof btnColors] : btnColors.inactive
            }`}
          >
            {st}
          </button>
        ))}
      </div>
    </Card>
  );
};

// ----------------------------------------------------
// 2. MAKTAB FEE CARD
// ----------------------------------------------------
interface FeeProps {
  invoiceNo: string;
  month: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Unpaid' | 'Pending';
  onPaySim?: () => void;
}

export const MaktabFeeCard: React.FC<FeeProps> = ({ invoiceNo, month, amount, dueDate, status, onPaySim }) => {
  const badgeVariants = {
    Paid: 'success' as const,
    Unpaid: 'error' as const,
    Pending: 'warning' as const
  };

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex justify-between items-start select-none">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{invoiceNo}</span>
          <h4 className="text-xs font-extrabold text-slate-800 mt-0.5">{month} Fee Invoice</h4>
        </div>
        <Badge variant={badgeVariants[status]} className="text-[8px] uppercase">{status}</Badge>
      </div>

      <div className="flex justify-between items-center bg-slate-50 rounded-2xl p-3.5 border border-slate-100 mt-1 select-none">
        <div className="flex flex-col">
          <span className="text-[8px] text-slate-400 font-bold uppercase">Amount Due</span>
          <span className="text-xs font-black text-slate-800 mt-0.5">₹{amount.toLocaleString()}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[8px] text-slate-400 font-bold uppercase">Due Date</span>
          <span className="text-xs font-bold text-slate-600 mt-0.5">{dueDate}</span>
        </div>
      </div>

      {status !== 'Paid' && (
        <div className="flex justify-end pt-1 border-t border-slate-50 mt-1">
          <Button variant="accent" size="sm" onClick={onPaySim} leftIcon={<IoCashOutline />}>
            <span className="text-[10px] uppercase font-bold tracking-wider">Pay Simulated Fee</span>
          </Button>
        </div>
      )}
    </Card>
  );
};

// ----------------------------------------------------
// 3. HOMEWORK CARD
// ----------------------------------------------------
interface HomeworkProps {
  subject: string;
  assignmentTitle: string;
  dueDate: string;
  isSubmitted: boolean;
  onToggleSubmission?: () => void;
}

export const HomeworkCard: React.FC<HomeworkProps> = ({
  subject,
  assignmentTitle,
  dueDate,
  isSubmitted,
  onToggleSubmission
}) => {
  return (
    <Card className="flex flex-col gap-2.5">
      <div className="flex justify-between items-start select-none">
        <div>
          <Badge variant="secondary" className="text-[8px] uppercase tracking-wider mb-1.5">{subject}</Badge>
          <h4 className="text-xs font-extrabold text-slate-800 leading-snug">{assignmentTitle}</h4>
        </div>
        <Badge variant={isSubmitted ? 'success' : 'warning'} className="text-[8px] uppercase shrink-0">
          {isSubmitted ? 'Submitted' : 'Pending'}
        </Badge>
      </div>

      <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold border-t border-slate-50 pt-2 select-none">
        <span className="flex items-center gap-1"><IoCalendarOutline /> Due: {dueDate}</span>
        <button
          onClick={onToggleSubmission}
          className="text-primary font-bold hover:underline flex items-center gap-1 cursor-pointer"
        >
          <IoCheckmarkCircleOutline />
          <span>{isSubmitted ? 'Mark Unsubmitted' : 'Mark Completed'}</span>
        </button>
      </div>
    </Card>
  );
};

// ----------------------------------------------------
// 4. RESULT / GRADES CARD
// ----------------------------------------------------
interface GradeItem {
  subject: string;
  marksScored: number;
  totalMarks: number;
}

interface ResultProps {
  examName: string;
  gradeItems: GradeItem[];
  percentage: number;
  finalGrade: string;
}

export const ResultCard: React.FC<ResultProps> = ({ examName, gradeItems, percentage, finalGrade }) => {
  return (
    <Card className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-50 pb-2.5 select-none">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Academic Report</span>
          <h4 className="text-xs font-extrabold text-slate-800 mt-0.5">{examName}</h4>
        </div>
        <div className="flex flex-col items-end">
          <Badge variant="primary" className="text-[10px] px-3 font-black">{finalGrade}</Badge>
          <span className="text-[8px] text-slate-400 font-bold uppercase mt-1">Grade</span>
        </div>
      </div>

      {/* Subject rows */}
      <div className="flex flex-col gap-2.5 select-none">
        {gradeItems.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5"><IoBookOutline className="text-slate-400" /> {item.subject}</span>
            <span className="font-mono text-slate-800">{item.marksScored} / {item.totalMarks}</span>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex justify-between items-center select-none">
        <span className="text-[10px] font-bold text-slate-500 uppercase">Average Percent</span>
        <span className="text-sm font-black text-emerald-600">{percentage}%</span>
      </div>
    </Card>
  );
};

// ----------------------------------------------------
// 5. TIMETABLE SCHEDULE CARD
// ----------------------------------------------------
interface ScheduleItem {
  period: string;
  time: string;
  subject: string;
  teacher: string;
}

interface TimetableProps {
  dayName: string;
  schedule: ScheduleItem[];
}

export const TimetableCard: React.FC<TimetableProps> = ({ dayName, schedule }) => {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex justify-between items-center border-b border-slate-50 pb-2 select-none">
        <h4 className="text-xs font-extrabold text-slate-800 tracking-wide">{dayName} Timetable</h4>
        <span className="text-[9px] text-accent font-bold uppercase tracking-wider">{schedule.length} Periods</span>
      </div>

      <div className="flex flex-col gap-3 pt-1 select-none">
        {schedule.map((sch, i) => (
          <div key={i} className="flex justify-between items-start gap-4">
            <div className="flex gap-3">
              <span className="w-6.5 h-6.5 rounded-lg bg-slate-50 text-[10px] font-black text-slate-600 border border-slate-100 flex items-center justify-center shrink-0">
                P{sch.period}
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800 leading-tight">{sch.subject}</span>
                <span className="text-[9px] text-slate-400 font-semibold">{sch.teacher}</span>
              </div>
            </div>
            <span className="text-[10px] text-slate-500 font-mono font-bold flex items-center gap-1">
              <IoTimeOutline className="text-xs text-slate-400" />
              {sch.time}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
