"use client";

import React, { useState } from 'react';
import { 
  IoSearchOutline, 
  IoEyeOutline, 
  IoEyeOffOutline, 
  IoChevronDownOutline, 
  IoCloudUploadOutline, 
  IoCheckmarkOutline,
  IoCalendarOutline,
  IoTimeOutline,
  IoImageOutline
} from 'react-icons/io5';

// ----------------------------------------------------
// HELPER FOR INPUT STATUS STYLING
// ----------------------------------------------------
const getFieldBorderColor = (error?: string, success?: boolean, disabled?: boolean) => {
  if (disabled) return 'bg-slate-100/60 border-slate-200 text-slate-400';
  if (error) return 'bg-white border-red-500 focus-within:border-red-500 shadow-sm shadow-red-500/5';
  if (success) return 'bg-white border-emerald-500 focus-within:border-emerald-500 shadow-sm shadow-emerald-500/5';
  return 'bg-slate-50 border-slate-100 hover:border-slate-200 focus-within:border-accent/40 focus-within:bg-white';
};

// ----------------------------------------------------
// 1. TEXT FIELD & TEXT AREA
// ----------------------------------------------------
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const TextField: React.FC<InputFieldProps> = ({
  label,
  helperText,
  error,
  success,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-bold text-slate-500 tracking-wide uppercase px-0.5">
          {label}
        </label>
      )}
      <div className={`relative flex items-center w-full border rounded-2xl transition-all duration-150 ${getFieldBorderColor(error, success, disabled)}`}>
        {leftIcon && (
          <div className="absolute left-4 text-slate-400 text-lg flex items-center justify-center pointer-events-none select-none">
            {leftIcon}
          </div>
        )}
        <input
          disabled={disabled}
          className={`w-full bg-transparent text-slate-800 text-sm font-semibold rounded-2xl px-4 py-3.5 focus:outline-none placeholder-slate-400 ${leftIcon ? 'pl-11' : ''} ${rightIcon ? 'pr-11' : ''} ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-4 text-slate-400 text-lg flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <span className="text-[10px] font-bold text-red-500 px-1">{error}</span>}
      {!error && helperText && <span className="text-[10px] font-semibold text-slate-400 px-1">{helperText}</span>}
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  helperText,
  error,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-bold text-slate-500 tracking-wide uppercase px-0.5">
          {label}
        </label>
      )}
      <textarea
        disabled={disabled}
        className={`w-full border rounded-2xl px-4 py-3.5 text-slate-800 text-sm font-semibold focus:outline-none placeholder-slate-400 transition-all duration-150 min-h-[100px] ${
          error 
            ? 'bg-white border-red-500 focus:border-red-500' 
            : disabled 
              ? 'bg-slate-100 border-slate-200 text-slate-400' 
              : 'bg-slate-50 border-slate-100 hover:border-slate-200 focus:border-accent/40 focus:bg-white'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-[10px] font-bold text-red-500 px-1">{error}</span>}
      {!error && helperText && <span className="text-[10px] font-semibold text-slate-400 px-1">{helperText}</span>}
    </div>
  );
};

// ----------------------------------------------------
// 2. PASSWORD FIELD
// ----------------------------------------------------
export const PasswordField: React.FC<InputFieldProps> = (props) => {
  const [show, setShow] = useState(false);
  return (
    <TextField
      type={show ? 'text' : 'password'}
      rightIcon={
        <button 
          type="button" 
          onClick={() => setShow(!show)} 
          className="text-slate-400 hover:text-slate-600 focus:outline-none p-1 cursor-pointer select-none"
        >
          {show ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </button>
      }
      {...props}
    />
  );
};

// ----------------------------------------------------
// 3. SEARCH FIELD
// ----------------------------------------------------
export const SearchField: React.FC<InputFieldProps> = (props) => {
  return (
    <TextField
      type="search"
      leftIcon={<IoSearchOutline />}
      {...props}
    />
  );
};

// ----------------------------------------------------
// 4. PHONE INPUT
// ----------------------------------------------------
export const PhoneInput: React.FC<InputFieldProps> = (props) => {
  return (
    <TextField
      type="tel"
      leftIcon={<span className="text-xs font-bold text-slate-500 border-r border-slate-200 pr-2">+91</span>}
      className="pl-14"
      {...props}
    />
  );
};

// ----------------------------------------------------
// 5. OTP INPUT
// ----------------------------------------------------
interface OTPInputProps {
  length?: number;
  onChangeOTP?: (otp: string) => void;
  error?: string;
}

export const OTPInput: React.FC<OTPInputProps> = ({ length = 4, onChangeOTP, error }) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));

  const handleChange = (val: string, idx: number) => {
    if (isNaN(Number(val))) return;
    const nextVals = [...values];
    nextVals[idx] = val.slice(-1);
    setValues(nextVals);
    
    if (onChangeOTP) onChangeOTP(nextVals.join(''));
    
    // Auto focus next field
    if (val && idx < length - 1) {
      const nextInput = document.getElementById(`otp-${idx + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && !values[idx] && idx > 0) {
      const prevInput = document.getElementById(`otp-${idx - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-3 justify-center">
        {values.map((v, idx) => (
          <input
            key={idx}
            id={`otp-${idx}`}
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            value={v}
            onChange={(e) => handleChange(e.target.value, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`w-12 h-14 bg-slate-50 border text-center text-lg font-bold rounded-2xl focus:bg-white focus:border-accent focus:outline-none transition-all ${
              error ? 'border-red-500 bg-red-50/20' : 'border-slate-100 hover:border-slate-200'
            }`}
          />
        ))}
      </div>
      {error && <span className="text-[10px] font-bold text-red-500">{error}</span>}
    </div>
  );
};

// ----------------------------------------------------
// 6. DROPDOWN
// ----------------------------------------------------
interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  error,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-bold text-slate-500 tracking-wide uppercase px-0.5">
          {label}
        </label>
      )}
      <div className="relative w-full flex items-center">
        <select
          disabled={disabled}
          className={`w-full appearance-none border rounded-2xl px-4 py-3.5 text-slate-800 text-sm font-semibold focus:outline-none transition-all duration-150 ${
            error 
              ? 'bg-white border-red-500 focus:border-red-500'
              : disabled 
                ? 'bg-slate-100 border-slate-200 text-slate-400' 
                : 'bg-slate-50 border-slate-100 hover:border-slate-200 focus:border-accent/40 focus:bg-white'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 pointer-events-none select-none text-slate-400 text-xs">
          <IoChevronDownOutline />
        </div>
      </div>
      {error && <span className="text-[10px] font-bold text-red-500 px-1">{error}</span>}
    </div>
  );
};

// ----------------------------------------------------
// 7. CHECKBOX & RADIO BUTTON & TOGGLE
// ----------------------------------------------------
interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Checkbox: React.FC<ToggleProps> = ({ checked, onChange, label, disabled }) => {
  return (
    <label className={`flex items-center gap-3 select-none ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      <div 
        onClick={() => !disabled && onChange(!checked)}
        className={`w-5.5 h-5.5 rounded-lg border transition-all flex items-center justify-center ${
          checked 
            ? 'bg-primary border-primary text-white' 
            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
        }`}
      >
        {checked && <IoCheckmarkOutline className="text-sm font-bold" />}
      </div>
      {label && <span className="text-xs font-semibold text-slate-700">{label}</span>}
    </label>
  );
};

export const RadioButton: React.FC<ToggleProps> = ({ checked, onChange, label, disabled }) => {
  return (
    <label className={`flex items-center gap-3 select-none ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      <div 
        onClick={() => !disabled && onChange(true)}
        className={`w-5.5 h-5.5 rounded-full border transition-all flex items-center justify-center p-[3px] ${
          checked 
            ? 'border-primary' 
            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
        }`}
      >
        {checked && <div className="w-full h-full rounded-full bg-primary" />}
      </div>
      {label && <span className="text-xs font-semibold text-slate-700">{label}</span>}
    </label>
  );
};

export const ToggleSwitch: React.FC<ToggleProps> = ({ checked, onChange, label, disabled }) => {
  return (
    <label className={`flex items-center justify-between select-none w-full ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      {label && <span className="text-xs font-bold text-slate-700">{label}</span>}
      <div 
        onClick={() => !disabled && onChange(!checked)}
        className={`w-11 h-6.5 rounded-full transition-colors relative p-[3px] flex items-center ${
          checked ? 'bg-primary' : 'bg-slate-200'
        }`}
      >
        <div 
          className={`w-5 h-5 rounded-full bg-white shadow-sm transition-all absolute ${
            checked ? 'left-[21px]' : 'left-[3px]'
          }`}
        />
      </div>
    </label>
  );
};

// ----------------------------------------------------
// 8. SLIDER
// ----------------------------------------------------
interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (val: number) => void;
  label?: string;
  step?: number;
}

export const Slider: React.FC<SliderProps> = ({ min, max, value, onChange, label, step = 1 }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wide px-0.5">
        <span>{label}</span>
        <span className="text-accent">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-accent"
      />
    </div>
  );
};

// ----------------------------------------------------
// 9. DATE & TIME PICKER (Simulated Android Native elements)
// ----------------------------------------------------
export const DatePicker: React.FC<InputFieldProps> = (props) => {
  return (
    <TextField
      type="date"
      leftIcon={<IoCalendarOutline />}
      {...props}
    />
  );
};

export const TimePicker: React.FC<InputFieldProps> = (props) => {
  return (
    <TextField
      type="time"
      leftIcon={<IoTimeOutline />}
      {...props}
    />
  );
};

// ----------------------------------------------------
// 10. FILE UPLOAD & IMAGE PICKER
// ----------------------------------------------------
interface UploadProps {
  label?: string;
  onFileSelect?: (file: File | null) => void;
  helperText?: string;
}

export const FileUpload: React.FC<UploadProps> = ({ label, onFileSelect, helperText }) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file ? file.name : '');
    if (onFileSelect) onFileSelect(file);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-bold text-slate-500 tracking-wide uppercase px-0.5">
          {label}
        </label>
      )}
      <label className="border-2 border-dashed border-slate-200 hover:border-accent/40 rounded-2xl p-6 bg-slate-50/50 hover:bg-white flex flex-col items-center justify-center text-center cursor-pointer transition-all select-none">
        <input type="file" className="hidden" onChange={handleFileChange} />
        <IoCloudUploadOutline className="text-2xl text-slate-400 mb-2" />
        <span className="text-xs font-bold text-slate-700">
          {fileName || 'Tap to select document'}
        </span>
        <span className="text-[9px] text-slate-400 font-semibold mt-1">
          {helperText || 'PDF, DOCX, or JPG (Max 5MB)'}
        </span>
      </label>
    </div>
  );
};

export const ImagePicker: React.FC<UploadProps> = ({ label, onFileSelect }) => {
  const [preview, setPreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview('');
    }
    if (onFileSelect) onFileSelect(file);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-bold text-slate-500 tracking-wide uppercase px-0.5">
          {label}
        </label>
      )}
      <label className="relative w-24 h-24 rounded-2xl border-2 border-dashed border-slate-200 hover:border-accent/40 bg-slate-50/50 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all shrink-0">
        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        {preview ? (
          <img src={preview} alt="Selected preview" className="w-full h-full object-cover" />
        ) : (
          <>
            <IoImageOutline className="text-xl text-slate-400 mb-1" />
            <span className="text-[9px] font-bold text-slate-500">Pick Photo</span>
          </>
        )}
      </label>
    </div>
  );
};
