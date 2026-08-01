"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CapacitorNative, NativeLocation } from '@/lib/capacitorNative';
import { 
  IoCameraOutline, 
  IoDocumentAttachOutline, 
  IoShareSocialOutline, 
  IoLockClosedOutline, 
  IoLogoWhatsapp, 
  IoCallOutline, 
  IoLocationOutline, 
  IoNotificationsOutline,
  IoCheckmarkCircle
} from 'react-icons/io5';

interface NativeDeviceHubProps {
  triggerToast: (msg: string, type: 'success' | 'warning' | 'error' | 'info') => void;
}

export const NativeDeviceHub: React.FC<NativeDeviceHubProps> = ({ triggerToast }) => {
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [attachedDoc, setAttachedDoc] = useState<{ name: string; size: string } | null>(null);
  const [pushStatus, setPushStatus] = useState<string | null>(null);
  const [gpsLocation, setGpsLocation] = useState<NativeLocation | null>(null);
  const [securedToken, setSecuredToken] = useState<string | null>(null);

  const handleCamera = async () => {
    const photoData = await CapacitorNative.captureImageFromCamera();
    if (photoData) {
      setCapturedPhoto(photoData);
      triggerToast("✓ Captured photo via Native Camera", "success");
    }
  };

  const handleDocumentPicker = async () => {
    const doc = await CapacitorNative.pickPdfDocument();
    if (doc.name) {
      setAttachedDoc({ name: doc.name, size: doc.size });
      triggerToast(`✓ Selected document: ${doc.name}`, "success");
    }
  };

  const handleShare = async () => {
    const shared = await CapacitorNative.shareContent(
      "Anjuman-e-Sharie Shian Mobile App",
      "Download the official Islamic Super App for Kashmir & Global Community.",
      "https://anjumansharieshian.org"
    );
    if (shared) {
      triggerToast("✓ Opened Native Share Sheet", "info");
    }
  };

  const handlePushRegistration = async () => {
    const push = await CapacitorNative.registerPushNotifications();
    setPushStatus(push.token);
    triggerToast("✓ Registered FCM Push Notification Token", "success");
  };

  const handleLocation = async () => {
    const loc = await CapacitorNative.getCurrentLocation();
    setGpsLocation(loc);
    triggerToast(`✓ GPS Location: ${loc.latitude.toFixed(4)}°N, ${loc.longitude.toFixed(4)}°E`, "success");
  };

  const handleSecureStorage = async () => {
    const token = `jwt_session_anjuman_${Date.now()}`;
    await CapacitorNative.setSecureItem('auth_token', token);
    const retrieved = await CapacitorNative.getSecureItem('auth_token');
    setSecuredToken(retrieved);
    triggerToast("✓ Session Token stored in Native Secure Storage", "success");
  };

  return (
    <Card className="p-4 bg-white border border-slate-100 shadow-soft select-none flex flex-col gap-3.5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[8.5px] font-extrabold text-primary uppercase tracking-widest">Native Integration</span>
          <h3 className="text-sm font-black text-slate-800">Native Mobile Device Hub</h3>
        </div>
        <Badge variant="accent" className="text-[8px] uppercase font-bold py-0.5 px-2">Capacitor 6</Badge>
      </div>

      <p className="text-[10.5px] text-slate-500 font-medium leading-relaxed">
        Test production mobile hardware features including Camera, Document Uploads, Secure Keychain, GPS, and FCM Push Notifications.
      </p>

      {/* Grid of Native Feature Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-1">
        <button
          onClick={handleCamera}
          className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 active:bg-emerald-100 border border-slate-200/70 text-slate-800 text-xs font-bold transition-all cursor-pointer"
        >
          <IoCameraOutline className="text-base text-emerald-700 shrink-0" />
          <span>Camera Upload</span>
        </button>

        <button
          onClick={handleDocumentPicker}
          className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 active:bg-emerald-100 border border-slate-200/70 text-slate-800 text-xs font-bold transition-all cursor-pointer"
        >
          <IoDocumentAttachOutline className="text-base text-teal-700 shrink-0" />
          <span>PDF / Doc Picker</span>
        </button>

        <button
          onClick={handlePushRegistration}
          className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 active:bg-amber-100 border border-slate-200/70 text-slate-800 text-xs font-bold transition-all cursor-pointer"
        >
          <IoNotificationsOutline className="text-base text-amber-600 shrink-0" />
          <span>FCM Push Token</span>
        </button>

        <button
          onClick={handleSecureStorage}
          className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 active:bg-blue-100 border border-slate-200/70 text-slate-800 text-xs font-bold transition-all cursor-pointer"
        >
          <IoLockClosedOutline className="text-base text-blue-600 shrink-0" />
          <span>Secure Keychain</span>
        </button>

        <button
          onClick={handleLocation}
          className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 active:bg-rose-100 border border-slate-200/70 text-slate-800 text-xs font-bold transition-all cursor-pointer"
        >
          <IoLocationOutline className="text-base text-rose-600 shrink-0" />
          <span>GPS Location</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 active:bg-purple-100 border border-slate-200/70 text-slate-800 text-xs font-bold transition-all cursor-pointer"
        >
          <IoShareSocialOutline className="text-base text-purple-600 shrink-0" />
          <span>Native Share</span>
        </button>
      </div>

      {/* Output Status Indicators */}
      <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 text-[10px]">
        {capturedPhoto && (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-900 p-2 rounded-lg border border-emerald-200/60">
            <IoCheckmarkCircle className="text-emerald-600 text-sm shrink-0" />
            <span className="font-bold truncate">Photo Captured via Camera</span>
          </div>
        )}

        {attachedDoc && (
          <div className="flex items-center gap-2 bg-teal-50 text-teal-900 p-2 rounded-lg border border-teal-200/60">
            <IoCheckmarkCircle className="text-teal-600 text-sm shrink-0" />
            <span className="font-bold truncate">Doc Attached: {attachedDoc.name} ({attachedDoc.size})</span>
          </div>
        )}

        {pushStatus && (
          <div className="flex items-center gap-2 bg-amber-50 text-amber-900 p-2 rounded-lg border border-amber-200/60">
            <IoCheckmarkCircle className="text-amber-600 text-sm shrink-0" />
            <span className="font-bold truncate">FCM Token: {pushStatus}</span>
          </div>
        )}

        {gpsLocation && (
          <div className="flex items-center gap-2 bg-rose-50 text-rose-900 p-2 rounded-lg border border-rose-200/60">
            <IoCheckmarkCircle className="text-rose-600 text-sm shrink-0" />
            <span className="font-bold truncate">GPS: {gpsLocation.latitude.toFixed(4)}°N, {gpsLocation.longitude.toFixed(4)}°E (Budgam Center)</span>
          </div>
        )}
      </div>

      {/* Quick Launchers */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => CapacitorNative.openWhatsApp("+911951255000", "Salam, I am contacting from Anjuman Mobile App.")}
          leftIcon={<IoLogoWhatsapp className="text-emerald-600" />}
        >
          <span>WhatsApp Helpline</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => CapacitorNative.openPhoneDialer("+911951255000")}
          leftIcon={<IoCallOutline className="text-blue-600" />}
        >
          <span>Call Secretariat</span>
        </Button>
      </div>
    </Card>
  );
};
