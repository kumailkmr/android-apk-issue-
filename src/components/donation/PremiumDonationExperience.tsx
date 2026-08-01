"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AnimatedIcon } from '@/components/ui/icons';

interface DonationCampaign {
  id: string;
  title: string;
  category: string;
  goal: number;
  raised: number;
  supporters: number;
  daysLeft: number;
  isFeatured?: boolean;
  isLive?: boolean;
  description: string;
  image: string;
}

interface DonationProps {
  triggerToast: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  openAuthDialog?: () => void;
  isGuest?: boolean;
}

export const PremiumDonationExperience: React.FC<DonationProps> = ({ triggerToast, openAuthDialog, isGuest }) => {
  const [selectedCampaign, setSelectedCampaign] = useState<DonationCampaign | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [step, setStep] = useState<'amount' | 'type' | 'method' | 'processing' | 'success'>('amount');
  
  // Selection states
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donationType, setDonationType] = useState<string>('General');
  const [paymentMethod, setPaymentMethod] = useState<string>('UPI');
  
  // Receipt details
  const [receiptData, setReceiptData] = useState<any>(null);

  const campaigns: DonationCampaign[] = [
    {
      id: 'c1',
      title: 'Education & Maktab Fund',
      category: 'Education',
      goal: 500000,
      raised: 385000,
      supporters: 420,
      daysLeft: 12,
      isFeatured: true,
      isLive: true,
      description: 'Funding 150+ village Maktabs, Quranic textbooks, and teacher stipends across Jammu & Kashmir.',
      image: '/kashmir_majlis.jpg'
    },
    {
      id: 'c2',
      title: 'Arbaeen Pilgrimage Relief Fund',
      category: 'Arbaeen Services',
      goal: 1000000,
      raised: 820000,
      supporters: 890,
      daysLeft: 3,
      isFeatured: true,
      isLive: true,
      description: 'Providing food, medical aid, and shelter tents for pilgrims traveling to Karbala.',
      image: '/arbaeen_walk.jpg'
    },
    {
      id: 'c3',
      title: 'Student Higher Scholarship',
      category: 'Scholarship',
      goal: 300000,
      raised: 210000,
      supporters: 185,
      daysLeft: 20,
      description: 'Supporting underprivileged Kashmiri students pursuing medical and engineering degrees.',
      image: '/mourning_shrine.jpg'
    },
    {
      id: 'c4',
      title: 'Emergency Medical & Blood Bank',
      category: 'Healthcare',
      goal: 250000,
      raised: 195000,
      supporters: 310,
      daysLeft: 8,
      description: 'Running emergency blood donation drives and funding urgent surgeries for needy families.',
      image: '/shrine_iraqi_hd.jpg'
    },
    {
      id: 'c5',
      title: 'Orphan & Widow Monthly Welfare',
      category: 'Welfare',
      goal: 400000,
      raised: 310000,
      supporters: 290,
      daysLeft: 15,
      description: 'Dignified monthly financial stipends and food ration packs for registered families.',
      image: '/shrine_abbas.jpg'
    }
  ];

  const presetAmounts = [100, 250, 500, 1000, 2500, 5000, 10000];
  const donationTypes = ['One Time', 'Monthly', 'Yearly', 'Sponsor', 'Zakat', 'Khums', 'Sadaqah', 'General'];
  const paymentMethods = [
    { id: 'UPI', label: 'UPI / GPay / PhonePe', icon: '📱' },
    { id: 'Card', label: 'Debit / Credit Card', icon: '💳' },
    { id: 'NetBanking', label: 'Net Banking', icon: '🏦' },
    { id: 'Wallet', label: 'Mobile Wallet', icon: '👛' },
    { id: 'Office', label: 'Cash at Secretariat', icon: '🏢' }
  ];

  const handleOpenDonate = (campaign: DonationCampaign) => {
    if (isGuest && openAuthDialog) {
      // Allow guest donation or prompt auth
    }
    setSelectedCampaign(campaign);
    setAmount(1000);
    setStep('amount');
    setSheetOpen(true);
  };

  const handlePayClick = () => {
    setStep('processing');
    
    // Simulate fintech processing delay
    setTimeout(() => {
      const finalAmt = customAmount ? parseInt(customAmount) || amount : amount;
      const txnId = `TXN-${Math.floor(100000000 + Math.random() * 900000000)}`;
      const recNo = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      setReceiptData({
        txnId,
        recNo,
        amount: finalAmt,
        campaign: selectedCampaign?.title || 'General Fund',
        type: donationType,
        method: paymentMethod,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      });

      setStep('success');
      triggerToast(`✓ Donation Successful! Transaction #${txnId}`, 'success');
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-5 select-none w-full pb-6">
      
      {/* 1. HERO FINTECH BANNER */}
      <Card className="p-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white border border-emerald-900/40 shadow-xl flex flex-col gap-3 relative overflow-hidden">
        <div className="flex justify-between items-start z-10">
          <div className="flex flex-col">
            <Badge variant="accent" className="text-[8px] uppercase tracking-widest py-0.5 px-2 mb-1 w-fit bg-accent text-slate-950 border-none font-black">
              Sadaqah Jariyah & Welfare Relief
            </Badge>
            <h2 className="text-lg font-black text-white tracking-wide">Pay Donation & Sadqa Jariya</h2>
            <p className="text-[10px] text-emerald-200/90 font-medium leading-relaxed max-w-[280px] mt-0.5">
              Empowering education, Maktab development, relief drives, and eternal Sadaqah Jariyah across Kashmir.
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-xl shrink-0 shadow-md">
            ❤️
          </div>
        </div>

        {/* Quick Impact Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 z-10">
          <div className="flex flex-col">
            <span className="text-[8px] text-emerald-300 font-bold uppercase">Total Raised</span>
            <span className="text-xs font-black text-white">₹24.8 Lakhs</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-emerald-300 font-bold uppercase">Active Donors</span>
            <span className="text-xs font-black text-accent">2,450+</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-emerald-300 font-bold uppercase">Tax Benefit</span>
            <span className="text-xs font-black text-white">Sec 80G</span>
          </div>
        </div>
      </Card>

      {/* 2. IMPACT TIER CARDS */}
      <div className="flex flex-col gap-2.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">How Your Support Helps</span>
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col items-center text-center gap-1">
            <span className="text-sm font-black text-primary">₹500</span>
            <span className="text-[8.5px] font-bold text-slate-600 leading-tight">Feeds 1 Family for 1 Week</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-100 flex flex-col items-center text-center gap-1">
            <span className="text-sm font-black text-amber-700">₹1,000</span>
            <span className="text-[8.5px] font-bold text-slate-600 leading-tight">Sponsors 1 Student Books</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-blue-50 border border-blue-100 flex flex-col items-center text-center gap-1">
            <span className="text-sm font-black text-blue-700">₹5,000</span>
            <span className="text-[8.5px] font-bold text-slate-600 leading-tight">Supports 1 Village Maktab</span>
          </div>
        </div>
      </div>

      {/* 3. CAMPAIGN CARDS LIST */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center px-0.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Welfare Campaigns</span>
          <span className="text-[9px] font-bold text-primary">{campaigns.length} Campaigns</span>
        </div>

        <div className="flex flex-col gap-3.5">
          {campaigns.map((c) => {
            const pct = Math.round((c.raised / c.goal) * 100);
            return (
              <Card 
                key={c.id}
                className="p-4 bg-white border border-slate-100 shadow-soft flex flex-col gap-3 hover:border-emerald-200 transition-colors"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="accent" className="text-[7.5px] uppercase font-bold py-0.5 px-2">{c.category}</Badge>
                      {c.isLive && (
                        <span className="flex items-center gap-1 text-[8px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" /> LIVE
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs font-extrabold text-slate-800 leading-tight">{c.title}</h3>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                  {c.description}
                </p>

                {/* Progress bar */}
                <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-50">
                  <div className="flex justify-between text-[9px] font-extrabold text-slate-600">
                    <span>Raised: ₹{c.raised.toLocaleString()}</span>
                    <span>Goal: ₹{c.goal.toLocaleString()} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex justify-between items-center text-[8.5px] font-bold text-slate-400 mt-0.5">
                    <span>👥 {c.supporters} Supporters</span>
                    <span>⏳ {c.daysLeft} Days Left</span>
                  </div>
                </div>

                {/* Donate CTA */}
                <Button 
                  size="sm"
                  variant="accent" 
                  fullWidth 
                  onClick={() => handleOpenDonate(c)}
                  className="text-[10px] font-black uppercase tracking-wider mt-1"
                >
                  ❤️ Donate Now
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 4. RECENT SUPPORTERS & DONOR FEED */}
      <Card className="p-4 bg-slate-50/80 border border-slate-100 shadow-soft flex flex-col gap-2.5">
        <div className="flex justify-between items-center">
          <span className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wider">Recent Supporters</span>
          <span className="text-[8.5px] text-primary font-bold">Live Stream</span>
        </div>

        <div className="flex flex-col gap-2">
          {[
            { name: 'Syed Ali', amt: '₹2,500', time: '5 mins ago', campaign: 'Education Fund' },
            { name: 'Fatima Z.', amt: '₹1,000', time: '12 mins ago', campaign: 'Arbaeen Relief' },
            { name: 'Anonymous Donor', amt: '₹5,000', time: '30 mins ago', campaign: 'Scholarship' }
          ].map((donor, idx) => (
            <div key={idx} className="flex justify-between items-center p-2 rounded-xl bg-white border border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-50 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                  🤲
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800">{donor.name}</span>
                  <span className="text-[8.5px] text-slate-400 font-semibold">{donor.campaign} • {donor.time}</span>
                </div>
              </div>
              <span className="font-black text-emerald-700">{donor.amt}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 5. FINTECH DONATION BOTTOM SHEET MODAL */}
      <AnimatePresence>
        {sheetOpen && selectedCampaign && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50"
            />

            {/* Bottom Sheet Container */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 max-w-[412px] mx-auto bg-white rounded-t-3xl shadow-2xl z-50 p-5 flex flex-col gap-4 select-none max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              {/* Sheet Drag Indicator Header */}
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto shrink-0" />

              {/* STEP 1: AMOUNT SELECTION */}
              {step === 'amount' && (
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <Badge variant="accent" className="text-[7.5px] uppercase font-bold py-0.5 px-2 mb-1 w-fit">
                        {selectedCampaign.category}
                      </Badge>
                      <h3 className="text-sm font-black text-slate-800">{selectedCampaign.title}</h3>
                    </div>
                    <button onClick={() => setSheetOpen(false)} className="text-slate-400 font-bold hover:text-slate-600">✕</button>
                  </div>

                  {/* Preset Amount Pills */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[9.5px] font-extrabold text-slate-400 uppercase tracking-wider">Select Amount</span>
                    <div className="grid grid-cols-4 gap-2">
                      {presetAmounts.map((amt) => (
                        <button
                          key={amt}
                          onClick={() => { setAmount(amt); setCustomAmount(''); }}
                          className={`py-2.5 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            amount === amt && !customAmount 
                              ? 'bg-primary text-white shadow-md font-black scale-105' 
                              : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100'
                          }`}
                        >
                          ₹{amt.toLocaleString()}
                        </button>
                      ))}
                    </div>

                    <Input 
                      placeholder="Enter Custom Amount (₹)"
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {/* Next Step Button */}
                  <Button 
                    variant="accent" 
                    fullWidth 
                    onClick={() => setStep('type')}
                    className="text-xs font-black uppercase py-3.5"
                  >
                    Continue to Donation Category →
                  </Button>
                </div>
              )}

              {/* STEP 2: DONATION TYPE */}
              {step === 'type' && (
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-black text-slate-800">Select Donation Category</h3>
                    <button onClick={() => setStep('amount')} className="text-xs text-primary font-bold">← Back</button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {donationTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setDonationType(type)}
                        className={`p-3 rounded-2xl border text-xs font-extrabold transition-all text-left cursor-pointer ${
                          donationType === type 
                            ? 'bg-emerald-50 border-emerald-300 text-primary font-black shadow-sm' 
                            : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <Button 
                    variant="accent" 
                    fullWidth 
                    onClick={() => setStep('method')}
                    className="text-xs font-black uppercase py-3.5 mt-2"
                  >
                    Select Payment Method →
                  </Button>
                </div>
              )}

              {/* STEP 3: PAYMENT METHOD & PAY BUTTON */}
              {step === 'method' && (
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-black text-slate-800">Choose Payment Method</h3>
                    <button onClick={() => setStep('type')} className="text-xs text-primary font-bold">← Back</button>
                  </div>

                  <div className="flex flex-col gap-2">
                    {paymentMethods.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id)}
                        className={`p-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                          paymentMethod === m.id 
                            ? 'bg-emerald-50 border-emerald-300 text-primary font-black shadow-sm' 
                            : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{m.icon}</span>
                          <span>{m.label}</span>
                        </div>
                        {paymentMethod === m.id && <span className="text-primary font-black">✓</span>}
                      </button>
                    ))}
                  </div>

                  {/* Summary Box */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center text-xs font-extrabold text-slate-800">
                    <span>Total Contribution:</span>
                    <span className="text-sm text-primary">₹{(customAmount ? parseInt(customAmount) || amount : amount).toLocaleString()}</span>
                  </div>

                  {/* Pay Securely Button */}
                  <Button 
                    variant="accent" 
                    fullWidth 
                    onClick={handlePayClick}
                    className="text-xs font-black uppercase py-4 shadow-lg shadow-emerald-500/20"
                  >
                    ❤️ Pay Securely ₹{(customAmount ? parseInt(customAmount) || amount : amount).toLocaleString()}
                  </Button>
                </div>
              )}

              {/* STEP 4: PROCESSING LOADER */}
              {step === 'processing' && (
                <div className="py-12 flex flex-col items-center justify-center gap-3 text-center">
                  <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
                  <h4 className="text-sm font-black text-slate-800">Processing Payment...</h4>
                  <span className="text-[10px] text-slate-400 font-bold">Connecting to Secure Payment Gateway</span>
                </div>
              )}

              {/* STEP 5: SUCCESS RECEIPT */}
              {step === 'success' && receiptData && (
                <div className="flex flex-col gap-4 py-2 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-2xl mx-auto shadow-lg shadow-emerald-500/30">
                    ✓
                  </div>

                  <div className="flex flex-col items-center">
                    <h3 className="text-base font-black text-slate-900">Donation Successful!</h3>
                    <p className="text-[10.5px] text-slate-500 font-medium mt-0.5">
                      May Almighty Allah reward your generosity for supporting {receiptData.campaign}.
                    </p>
                  </div>

                  {/* Formal Receipt Card */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left flex flex-col gap-2 text-xs text-slate-700 font-medium">
                    <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                      <span className="font-bold text-slate-900">Receipt No:</span>
                      <span className="font-mono text-primary font-bold">{receiptData.recNo}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">Transaction ID:</span>
                      <span className="font-mono text-slate-600">{receiptData.txnId}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">Amount Paid:</span>
                      <span className="font-black text-emerald-700 text-sm">₹{receiptData.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">Payment Date:</span>
                      <span>{receiptData.date}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="accent" 
                      fullWidth 
                      onClick={() => triggerToast(`Downloading PDF Receipt ${receiptData.recNo}.pdf...`, 'success')}
                    >
                      📄 Download PDF Receipt
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      fullWidth 
                      onClick={() => setSheetOpen(false)}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};
