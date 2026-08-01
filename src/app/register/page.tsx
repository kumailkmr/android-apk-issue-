"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { TextField, PasswordField, Checkbox, Dropdown } from '@/components/ui/InputFields';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { IoArrowBackOutline } from 'react-icons/io5';

export default function RegisterScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  // Inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('IN');
  const [city, setCity] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!name.trim()) {
      nextErrors.name = 'Full name is required';
    }

    if (!email.trim()) {
      nextErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = 'Enter a valid email address';
    }

    if (!mobile.trim()) {
      nextErrors.mobile = 'Mobile number is required';
    } else if (isNaN(Number(mobile)) || mobile.length < 10) {
      nextErrors.mobile = 'Enter a valid 10-digit mobile number';
    }

    if (!password) {
      nextErrors.password = 'Password is required';
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }

    if (!city.trim()) {
      nextErrors.city = 'City / Location is required';
    }

    if (!acceptTerms) {
      nextErrors.terms = 'You must accept the terms & conditions';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
    } else {
      // Successful registration -> goes to OTP validation
      router.push('/otp');
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between bg-white text-slate-800 p-6 relative overflow-hidden select-none">
      
      {/* Top back button header */}
      <div className="flex justify-between items-center h-10 select-none shrink-0">
        <button 
          onClick={() => router.push('/login')}
          className="p-1 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer select-none"
        >
          <IoArrowBackOutline className="text-xl" />
        </button>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Register</span>
      </div>

      {/* Roster form body */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-4 pr-1">
        {/* Title */}
        <div className="flex flex-col mb-5 select-none">
          <h2 className="text-lg font-black text-slate-800 tracking-wide uppercase leading-tight">Create Profile</h2>
          <p className="text-xs text-slate-400 font-semibold mt-1">Join the digital community of Anjuman-e-Sharie Shian.</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <TextField
            label="Full Name"
            placeholder="Syed Mohsin Ali"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors(prev => ({ ...prev, name: '' }));
            }}
            error={errors.name}
          />

          <TextField
            type="email"
            label="Email Address"
            placeholder="mohsin@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors(prev => ({ ...prev, email: '' }));
            }}
            error={errors.email}
          />

          <TextField
            type="tel"
            label="Mobile Number"
            placeholder="9876543210"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
              setErrors(prev => ({ ...prev, mobile: '' }));
            }}
            error={errors.mobile}
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

          <PasswordField
            label="Confirm Password"
            placeholder="••••••"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors(prev => ({ ...prev, confirmPassword: '' }));
            }}
            error={errors.confirmPassword}
          />

          <Dropdown
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            options={[
              { value: 'IN', label: 'India (Jammu & Kashmir)' },
              { value: 'PK', label: 'Pakistan' },
              { value: 'IR', label: 'Iran' },
              { value: 'IQ', label: 'Iraq' }
            ]}
          />

          <TextField
            label="City / District"
            placeholder="Budgam or Srinagar"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setErrors(prev => ({ ...prev, city: '' }));
            }}
            error={errors.city}
          />

          {/* Terms checkbox */}
          <div className="flex flex-col gap-1.5 px-0.5 select-none mt-2">
            <Checkbox checked={acceptTerms} onChange={setAcceptTerms} label="I accept all welfare rules & terms" />
            {errors.terms && <span className="text-[10px] font-bold text-red-500">{errors.terms}</span>}
          </div>

          <Button type="submit" variant="primary" fullWidth className="mt-3">
            <span className="text-xs uppercase tracking-wider font-extrabold">Register Account</span>
          </Button>
        </form>
      </div>

      {/* Footer controls: Back to login */}
      <div className="flex justify-center select-none pb-4 shrink-0 mt-3 pt-2 border-t border-slate-50">
        <span className="text-xs text-slate-400 font-bold">Already have an account? </span>
        <button 
          onClick={() => router.push('/login')}
          className="text-xs font-black text-primary hover:underline ml-1 cursor-pointer"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
