"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { TextField, PasswordField, Checkbox } from '@/components/ui/InputFields';
import { Dialog } from '@/components/ui/Dialog';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { 
  IoFingerPrintOutline, 
  IoLogoGoogle, 
  IoLogoApple, 
  IoArrowBackOutline,
  IoAlertCircleOutline
} from 'react-icons/io5';

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  // Inputs
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Biometric dialog simulator
  const [biometricOpen, setBiometricOpen] = useState(false);
  const [biometricProgress, setBiometricProgress] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!identity.trim()) {
      nextErrors.identity = 'Enter email or mobile number';
    } else if (identity.includes('@') && !/\S+@\S+\.\S+/.test(identity)) {
      nextErrors.identity = 'Enter a valid email address';
    } else if (!identity.includes('@') && isNaN(Number(identity.replace(/\s+/g, '')))) {
      nextErrors.identity = 'Enter a valid mobile number';
    }

    if (!password) {
      nextErrors.password = 'Enter your password';
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
    } else {
      // Successful mock logic -> goes to OTP screen to verify mobile/email
      router.push('/otp');
    }
  };

  const handleBiometricSim = () => {
    setBiometricOpen(true);
    setBiometricProgress(true);
    setTimeout(() => {
      setBiometricProgress(false);
      setBiometricOpen(false);
      router.push('/auth-success'); // Log in directly
    }, 2000);
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between bg-white text-slate-800 p-6 relative overflow-hidden select-none">
      
      {/* Top bar back button */}
      <div className="flex justify-between items-center h-10 select-none shrink-0">
        <button 
          onClick={() => router.push('/welcome')}
          className="p-1 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer select-none"
        >
          <IoArrowBackOutline className="text-xl" />
        </button>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Sign In</span>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col justify-center py-4">
        {/* Title */}
        <div className="flex flex-col mb-6 select-none">
          <h2 className="text-lg font-black text-slate-800 tracking-wide uppercase leading-tight">Welcome Back</h2>
          <p className="text-xs text-slate-400 font-semibold mt-1">Sign in to sync your Islamic calendar, attendance records and memberships.</p>
        </div>

        {/* Form fields */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <TextField
            label="Email or Mobile"
            placeholder="name@email.com or mobile"
            value={identity}
            onChange={(e) => {
              setIdentity(e.target.value);
              setErrors(prev => ({ ...prev, identity: '' }));
            }}
            error={errors.identity}
          />

          <PasswordField
            label="Password"
            placeholder="••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors(prev => ({ ...prev, password: '' }));
            }}
            error={errors.password}
          />

          {/* Remember me & forgot password */}
          <div className="flex justify-between items-center px-0.5 select-none">
            <Checkbox checked={rememberMe} onChange={setRememberMe} label="Remember me" />
            <button 
              type="button"
              onClick={() => router.push('/forgot-password')}
              className="text-[11px] font-bold text-accent hover:underline cursor-pointer select-none"
            >
              Forgot Password?
            </button>
          </div>

          <Button type="submit" variant="primary" fullWidth className="mt-2">
            <span className="text-xs uppercase tracking-wider font-extrabold">Sign In</span>
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6 select-none">
          <div className="flex-1 h-[1px] bg-slate-100" />
          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Or Continue With</span>
          <div className="flex-1 h-[1px] bg-slate-100" />
        </div>

        {/* Social Logins & Biometrics */}
        <div className="flex flex-col gap-3.5 items-center select-none">
          <div className="flex gap-4">
            {/* Google Mock */}
            <button 
              onClick={() => router.push('/auth-success')}
              className="w-12 h-12 rounded-full border border-slate-100 hover:border-slate-200 flex items-center justify-center text-slate-600 active:scale-95 transition-all cursor-pointer"
            >
              <IoLogoGoogle className="text-lg" />
            </button>
            {/* Apple Mock */}
            <button 
              onClick={() => router.push('/auth-success')}
              className="w-12 h-12 rounded-full border border-slate-100 hover:border-slate-200 flex items-center justify-center text-slate-600 active:scale-95 transition-all cursor-pointer"
            >
              <IoLogoApple className="text-lg" />
            </button>
            {/* Fingerprint Biometric simulation */}
            <button 
              onClick={handleBiometricSim}
              className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent hover:bg-accent-light hover:text-white active:scale-95 transition-all cursor-pointer"
            >
              <IoFingerPrintOutline className="text-xl" />
            </button>
          </div>
          
          <button 
            onClick={() => router.push('/guest')}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 hover:underline mt-2 cursor-pointer select-none"
          >
            Continue as Guest / Anonymous
          </button>
        </div>
      </div>

      {/* Footer controls: Register link */}
      <div className="flex justify-center select-none pb-4 shrink-0 mt-2">
        <span className="text-xs text-slate-400 font-bold">Don't have an account? </span>
        <button 
          onClick={() => router.push('/register')}
          className="text-xs font-black text-primary hover:underline ml-1 cursor-pointer"
        >
          Register Now
        </button>
      </div>

      {/* BIOMETRIC SCANNING DIALOG SIMULATOR */}
      <Dialog 
        isOpen={biometricOpen} 
        onClose={() => setBiometricOpen(false)} 
        title="Biometric Fingerprint Scanner"
        type="info"
      >
        <div className="flex flex-col items-center py-4 select-none">
          <IoFingerPrintOutline className={`text-5xl text-accent ${
            biometricProgress ? 'animate-pulse scale-105' : ''
          }`} />
          <span className="text-xs text-slate-400 font-semibold mt-3">
            {biometricProgress ? 'Scanning fingerprint...' : 'Scan Successful!'}
          </span>
        </div>
      </Dialog>
    </div>
  );
}
