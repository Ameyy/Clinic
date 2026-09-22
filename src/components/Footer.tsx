import React, { useState } from 'react';
import { ShieldCheck, Mail, Phone, MapPin, CheckCircle2, ArrowRight, HeartPulse } from 'lucide-react';
import { DOCTOR_INFO } from '../data/doctorData';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
  onOpenMyAppointments: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenMyAppointments,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterSuccess(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#081b19] text-slate-300 pt-16 pb-12 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Emergency Care Advisory Banner */}
        <div className="p-4 rounded-2xl bg-[#0f2c27] border border-emerald-800/60 text-xs sm:text-sm text-emerald-100 flex items-start gap-3">
          <HeartPulse className="w-5 h-5 text-[#b5f63d] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block">Medical Emergency Notice</span>
            <span className="text-emerald-200/80">
              {DOCTOR_INFO.emergencyNotice} For routine or outpatient consultations, please reserve online or contact clinic concierge.
            </span>
          </div>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Column 1: Doctor Branding & Care Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 to-[#044a44] border border-emerald-500/40 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">
                  {DOCTOR_INFO.name}
                </h3>
                <p className="text-xs text-[#b5f63d] font-medium">
                  Integrative Internal Medicine & Longevity
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Unhurried, root-cause medicine in Indiranagar, Bengaluru. Combining advanced ApoB cardiometabolic diagnostics with personalized Indian nutrition, sleep chronobiology, and longevity protocols.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-[#b5f63d]" />
              <span>NMC Registered & Certified Clinical Practice</span>
            </div>
          </div>

          {/* Column 2: Navigation & Services */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Clinical Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  About Dr. Sharma & Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('booking')}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Book Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('testimonials')}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Patient Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Longevity Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Clinic Location & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Patient Portal & Appointments */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Patient Access
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-emerald-300 font-semibold hover:underline cursor-pointer"
                >
                  Reserve Initial Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMyAppointments}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  View & Manage My Visits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Insurance & Cashless Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Bengaluru Clinic & Directions
                </button>
              </li>
            </ul>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{DOCTOR_INFO.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>{DOCTOR_INFO.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{DOCTOR_INFO.address.split(',')[0]}</span>
              </p>
            </div>
          </div>

          {/* Column 4: Newsletter & Clinical Digest */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Longevity Research Digest
            </h4>
            <p className="text-xs text-slate-400">
              Monthly, peer-reviewed clinical summaries on lipid biomarkers, vascular fitness, and metabolic longevity.
            </p>

            {newsletterSuccess ? (
              <div className="p-3 rounded-xl bg-emerald-900/60 border border-emerald-600 text-xs text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Subscribed! Welcome to the digest.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1 rounded-lg bg-[#b5f63d] text-[#0a2321] hover:bg-[#a6e830] transition-colors cursor-pointer"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 block">
                  No spam. Unsubscribe with 1 click anytime.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} {DOCTOR_INFO.name}, {DOCTOR_INFO.degrees}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-400">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-400">NMC Medical Ethics</button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-400">Terms of Care</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
