"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/InputFields';
import { motion } from 'framer-motion';
import { IoArrowBackOutline, IoMailOpenOutline, IoPaperPlaneOutline } from 'react-icons/io5';

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsSending(true);

    // Simulate link dispatch delay
    setTimeout(() => {
      setIsSending(false);
      setSuccess(true);
    }, 1800);
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between bg-white text-slate-800 p-6 relative overflow-hidden select-none">
      
      {/* Top back button */}
      <div className="flex justify-between items-center h-10 select-none shrink-0">
        <button 
          onClick={() => router.push('/login')}
          className="p-1 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer select-none"
        >
          <IoArrowBackOutline className="text-xl" />
        </button>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Reset Password</span>
      </div>

      {/* Main container */}
      <div className="flex-1 flex flex-col justify-center py-4">
        {success ? (
          /* SUCCESS STATE PANEL */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center select-none"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100/50 flex items-center justify-center text-2xl mb-4">
              <IoMailOpenOutline />
            </div>
            <h3 className="text-base font-black text-slate-800 uppercase">Check Your Email</h3>
            <p className="text-xs text-slate-400 font-semibold mt-2 max-w-[240px] leading-relaxed">
              We sent a password reset link to <span className="text-slate-700 font-bold">{email}</span>. Click on the link inside the mail to define a new password.
            </p>
            <Button 
              variant="outline" 
              className="mt-6 min-w-[150px]"
              onClick={() => router.push('/login')}
            >
              Back to Sign In
            </Button>
          </motion.div>
        ) : (
          /* FORM VIEW */
          <motion.div
            initial={{ opacity: 1 }}
            className="flex flex-col"
          >
            {/* Heading */}
            <div className="flex flex-col items-center text-center mb-6 select-none">
              <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-500 text-xl shadow-sm mb-4">
                <IoPaperPlaneOutline />
              </div>
              <h2 className="text-base font-black text-slate-800 tracking-wide uppercase">Forgot Password</h2>
              <p className="text-xs text-slate-400 font-semibold mt-2 max-w-[240px] leading-relaxed">
                Enter your registered email address and we will dispatch a password recovery link to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <TextField
                type="email"
                label="Registered Email"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                error={error}
              />

              <Button 
                type="submit" 
                variant="primary" 
                fullWidth 
                className="mt-2"
                isLoading={isSending}
              >
                <span className="text-xs uppercase tracking-wider font-extrabold">Send Recovery Link</span>
              </Button>
            </form>
          </motion.div>
        )}
      </div>

      {/* Bottom padding spacing */}
      <div className="h-10 shrink-0" />
    </div>
  );
}
