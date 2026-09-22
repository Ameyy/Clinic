import React from 'react';
import { BookingSystem } from '../BookingSystem';
import { Appointment, PageId } from '../../types';
import { ShieldCheck, Clock, CheckCircle2, PhoneCall } from 'lucide-react';
import { DOCTOR_INFO } from '../../data/doctorData';

interface BookingPageProps {
  initialServiceId?: string;
  onAppointmentCreated: (appointment: Appointment) => void;
  onViewMyAppointments: () => void;
  onNavigate: (page: PageId) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  initialServiceId,
  onAppointmentCreated,
  onViewMyAppointments,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          Direct Scheduling Studio
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Reserve Your Consultation
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Select your clinical service, choose your preferred day and time, and confirm your visit in under two minutes.
        </p>
      </div>

      {/* Trust & Guarantee Pill Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-semibold text-slate-800">HIPAA Encrypted</span>
        </div>
        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-semibold text-slate-800">Instant Calendar Sync</span>
        </div>
        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-semibold text-slate-800">No Hidden Fees</span>
        </div>
        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <PhoneCall className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-semibold text-slate-800">Concierge Triage</span>
        </div>
      </div>

      {/* Core Booking Component */}
      <div className="max-w-4xl mx-auto">
        <BookingSystem
          initialServiceId={initialServiceId}
          onAppointmentCreated={onAppointmentCreated}
          onViewMyAppointments={onViewMyAppointments}
        />
      </div>

      {/* Helpful Pre-Visit Information Card */}
      <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
        <h3 className="text-lg font-bold text-slate-900">What to expect after booking:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-600">
          <div className="space-y-1">
            <span className="font-bold text-emerald-800">1. Instant Confirmation:</span>
            <p>You'll receive a confirmation code and one-click calendar invitation file immediately.</p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-emerald-800">2. Secure Intake Portal:</span>
            <p>Upload prior bloodwork and complete your medical questionnaire online before your visit.</p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-emerald-800">3. Dedicated Visit:</span>
            <p>Enjoy a full, unhurried 60–75 minute consultation with Dr. Vance in-person or via video.</p>
          </div>
        </div>
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Need to reschedule later? Manage anytime in "My Visits".</span>
          <span className="font-medium text-slate-700">Clinic Desk: {DOCTOR_INFO.phone}</span>
        </div>
      </div>
    </div>
  );
};
