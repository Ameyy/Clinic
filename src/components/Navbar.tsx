import React, { useState } from 'react';
import { Phone, Calendar, Clock, Menu, X, ShieldCheck, HeartPulse, ArrowRight } from 'lucide-react';
import { DOCTOR_INFO } from '../data/doctorData';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenBooking: (serviceId?: string) => void;
  onOpenMyAppointments: () => void;
  appointmentCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
  onOpenMyAppointments,
  appointmentCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About & Team' },
    { id: 'booking', label: 'Book Visit' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'blog', label: 'Health Journal' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top Clinic Status & Hours Bar */}
      <div className="hidden md:block bg-[#091f1d] text-emerald-100/90 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#b5f63d] animate-pulse" />
              <span>Accepting New Patients • Pan-India Telehealth & Bengaluru Clinic</span>
            </span>
            <span className="text-emerald-500/40">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
              <span>Mon–Thu: 8am–5pm • Fri: 8am–3pm</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-emerald-100">
            <a
              href={`tel:${DOCTOR_INFO.phone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#b5f63d]" />
              <span className="font-semibold">{DOCTOR_INFO.phone}</span>
            </a>
            <span className="text-emerald-500/40">|</span>
            <span className="text-emerald-200/80">{DOCTOR_INFO.address.split(',')[0]}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Emblem (Reference 1/2 style - modern health badge) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0a2624] to-[#044a44] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6 text-[#b5f63d]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-900 transition-colors">
                  {DOCTOR_INFO.name}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  FACP
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Integrative Internal Medicine & Longevity
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden sm:flex items-center gap-3">
            {/* My Appointments Pill */}
            <button
              onClick={onOpenMyAppointments}
              className="relative px-3.5 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>My Visits</span>
              {appointmentCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-800 text-white text-[10px] font-bold flex items-center justify-center">
                  {appointmentCount}
                </span>
              )}
            </button>

            {/* Book Consultation Accent Button (Reference 1 style) */}
            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-2.5 rounded-full bg-[#b5f63d] hover:bg-[#a6e830] text-[#0a2321] font-semibold text-xs flex items-center gap-2 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenMyAppointments}
              className="p-2 text-slate-700 hover:text-slate-900 relative"
              title="My Visits"
            >
              <Calendar className="w-5 h-5" />
              {appointmentCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-2 ring-white" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-white font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-full bg-[#b5f63d] text-[#0a2321] font-semibold text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`tel:${DOCTOR_INFO.phone}`}
              className="w-full py-2.5 rounded-full border border-slate-200 text-slate-700 font-medium text-xs flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>Call Clinic: {DOCTOR_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
