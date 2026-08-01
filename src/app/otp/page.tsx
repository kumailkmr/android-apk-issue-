"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { OTPInput } from '@/components/ui/InputFields';
import { motion, AnimatePresence } from 'framer-motion';
import { IoArrowBackOutline, IoLockClosedOutline, IoCheckmarkCircle } from 'react-icons/io5';

export default function OTPScreen() {
  const router = useRouter();
  
  const [otpVal, setOtpVal] = useState('');
  const [timer, setTimer] = useState(59);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer(t => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = () => {
    if (otpVal.length < 4) {
      setError('Please enter the full 4-digit code');
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate network delay
    setTimeout(() => {
      setIsVerifying(false);
      setShowSuccessAnim(true);
      
      // Navigate to success dashboard after showing verification success checkmark
      setTimeout(() => {
        router.push('/auth-success');
      }, 1500);
    }, 1500);
  };

  const handleResend = () => {
    setTimer(59);
    setError('');
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between bg-white text-slate-800 p-6 relative overflow-hidden select-none">
      
      {/* Top bar back button */}
      <div className="flex justify-between items-center h-10 select-none shrink-0">
        <button 
          onClick={() => router.push('/login')}
          className="p-1 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer select-none"
        >
          <IoArrowBackOutline className="text-xl" />
        </button>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Verify Code</span>
      </div>

      {/* Verification success animation mock */}
      <AnimatePresence>
        {showSuccessAnim ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center z-20"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center text-4xl mb-4 animate-bounce">
              <IoCheckmarkCircle />
            </div>
            <h3 className="text-base font-black text-slate-800 tracking-wide uppercase">Verification Success</h3>
            <p className="text-xs text-slate-400 font-semibold mt-1">Connecting to digital platform services...</p>
          </motion.div>
        ) : (
          /* Default OTP Input Form view */
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-center py-4"
          >
            {/* Padlock Icon & Description */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-500 text-xl shadow-sm mb-4">
                <IoLockClosedOutline />
              </div>
              <h2 className="text-base font-black text-slate-800 tracking-wide uppercase">OTP Verification</h2>
              <p className="text-xs text-slate-400 font-semibold mt-2 max-w-[240px] leading-relaxed">
                We sent a 4-digit verification code to your registered mobile number (+91 ******8941).
              </p>
            </div>

            {/* OTP component */}
            <div className="my-2">
              <OTPInput 
                length={4} 
                onChangeOTP={(otp) => {
                  setOtpVal(otp);
                  setError('');
                }} 
                error={error} 
              />
            </div>

            {/* Timer and Resend links */}
            <div className="flex flex-col items-center gap-1.5 mt-6 select-none">
              {timer > 0 ? (
                <span className="text-xs text-slate-400 font-semibold">
                  Resend code in <span className="text-accent font-bold font-mono">0:{timer.toString().padStart(2, '0')}</span>
                </span>
              ) : (
                <button 
                  onClick={handleResend}
                  className="text-xs font-black text-primary hover:underline cursor-pointer select-none"
                >
                  Resend Verification OTP
                </button>
              )}
            </div>

            {/* Trigger verify action */}
            <Button 
              variant="accent" 
              fullWidth 
              className="mt-8"
              isLoading={isVerifying}
              onClick={handleVerify}
            >
              <span className="text-xs uppercase tracking-wider font-extrabold">Verify & Authenticate</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom spacer padding */}
      <div className="h-10 shrink-0" />
    </div>
  );
}
