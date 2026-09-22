import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  Activity,
  Award,
  Video,
  HeartPulse,
  Sparkles,
  Stethoscope,
  ChevronRight,
  PhoneCall,
  Clock,
  UserCheck
} from 'lucide-react';
import { DOCTOR_INFO, MEDICAL_SERVICES, PATIENT_TESTIMONIALS } from '../../data/doctorData';
import { PageId } from '../../types';

interface HomePageProps {
  onNavigate: (page: PageId, serviceId?: string) => void;
  onOpenBooking: (serviceId?: string) => void;
  onSelectServiceDetails?: (serviceId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'cardiology' | 'longevity' | 'preventive' | 'telehealth'>('cardiology');

  const specialtyData = {
    cardiology: {
      title: 'Advanced Cardiometabolic & Lipid Clinic',
      subtitle: 'Early plaque detection & particle counts before symptoms arise',
      doctor: 'Dr. Elena Vance, MD, FACP',
      rating: '4.98 (184 reviews)',
      highlights: [
        'ApoB & Lipoprotein(a) precision particle profiling',
        'Coronary Calcium & CT Angiography interpretation',
        'Resting endothelial elasticity & arterial stiffness',
        'Personalized non-statin & statin optimization',
      ],
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
      statLabel: 'Plaque Risk Reduction',
      statVal: '42% Average',
      serviceId: 'cardiometabolic-consult',
    },
    longevity: {
      title: 'Cellular Longevity & Hormonal Harmony',
      subtitle: 'Evidence-based mitochondrial and metabolic vitality protocols',
      doctor: 'Dr. Elena Vance & Sarah Chen, RD',
      rating: '4.95 (142 reviews)',
      highlights: [
        'Continuous Glucose Monitor (CGM) metabolic titration',
        'Comprehensive bio-identical hormone & thyroid balance',
        'VO2 max & sarcopenia-reversal exercise prescriptions',
        'Mitochondrial assays & cellular longevity roadmap',
      ],
      image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600',
      statLabel: 'Metabolic Energy Score',
      statVal: '92% Improved',
      serviceId: 'longevity-hormone',
    },
    preventive: {
      title: 'Comprehensive Annual Health Assessment',
      subtitle: '75-minute unhurried clinical deep dive into full-body health',
      doctor: 'Dr. Elena Vance, MD',
      rating: '4.99 (210 reviews)',
      highlights: [
        '75 minutes of direct physician examination',
        'In-depth functional biomarkers & full systemic review',
        'Biological age & resting metabolic rate calculation',
        '30 days of direct encrypted patient portal messaging',
      ],
      image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=600',
      statLabel: 'Patient Trust Score',
      statVal: '99.4%',
      serviceId: 'comprehensive-annual',
    },
    telehealth: {
      title: 'California-Wide Virtual Video Care',
      subtitle: 'Same-day encrypted telehealth visits with direct e-prescribing',
      doctor: 'Dr. Elena Vance, MD',
      rating: '4.96 (120 reviews)',
      highlights: [
        'Zero waiting room friction via encrypted web link',
        'Same-day digital prescriptions sent to local pharmacy',
        'Home blood pressure & wearable data integration',
        'Comprehensive clinical summary provided in portal',
      ],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600',
      statLabel: 'Average Wait Time',
      statVal: '< 15 Mins',
      serviceId: 'telehealth-consult',
    },
  };

  const currentSpecialty = specialtyData[activeTab];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION (Directly inspired by Reference 1 - Dark rounded container card with floating stats & doctor portrait) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="relative rounded-3xl lg:rounded-[36px] bg-gradient-to-br from-[#0c2423] via-[#091a1a] to-[#043e39] text-white p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl border border-emerald-900/40">
          {/* Subtle Ambient Glows & Background Elements */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:28px_28px] opacity-5 pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 sm:space-y-8"
            >
              {/* Category Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#b5f63d] animate-pulse" />
                <span>SMART HEALTH & PREVENTIVE CLINIC 2026</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                Your Care, One Click Away With{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-[#b5f63d]">
                  {DOCTOR_INFO.name}
                </span>
              </h1>

              {/* Concise Subhead (Less text, more visual punch) */}
              <p className="text-base sm:text-lg text-emerald-100/80 max-w-xl font-normal leading-relaxed">
                Consult with AIIMS-trained Senior Consultant Internist {DOCTOR_INFO.name}.
                Personalized cardiometabolic diagnostics, cellular longevity protocols, and pan-India telehealth care.
              </p>

              {/* Primary Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  id="hero-book-consultation-btn"
                  onClick={() => onOpenBooking()}
                  className="group px-7 py-4 rounded-full bg-[#b5f63d] hover:bg-[#a5e930] text-[#0a2321] font-semibold text-base flex items-center gap-2.5 shadow-lg shadow-[#b5f63d]/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-explore-services-btn"
                  onClick={() => onNavigate('services')}
                  className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-base border border-white/15 backdrop-blur-sm transition-all hover:border-white/30 cursor-pointer"
                >
                  Explore Services
                </button>
              </div>

              {/* Social Proof & Active Patients Badge (Ref 1 style) */}
              <div className="pt-4 flex items-center gap-4 border-t border-emerald-800/40">
                <div className="flex -space-x-2.5">
                  <img
                    className="w-10 h-10 rounded-full border-2 border-[#0c2423] object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                    alt="Patient avatar"
                  />
                  <img
                    className="w-10 h-10 rounded-full border-2 border-[#0c2423] object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
                    alt="Patient avatar"
                  />
                  <img
                    className="w-10 h-10 rounded-full border-2 border-[#0c2423] object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
                    alt="Patient avatar"
                  />
                  <div className="w-10 h-10 rounded-full border-2 border-[#0c2423] bg-[#b5f63d] text-[#0c2423] font-bold text-xs flex items-center justify-center">
                    +480
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-white text-xs font-semibold ml-1.5">4.96 / 5.0</span>
                  </div>
                  <p className="text-xs text-emerald-200/70">Trusted by 14,000+ patients across India</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Doctor Portrait with Floating Stats Cards (Reference 1 style) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative flex justify-center items-center"
            >
              {/* Central Doctor Visual Frame */}
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden border-2 border-emerald-500/20 bg-emerald-950/40 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800"
                  alt="Dr. Ananya Sharma, MD"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c2423] via-transparent to-transparent opacity-80" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{DOCTOR_INFO.name}, {DOCTOR_INFO.degrees.split(',')[0]}</p>
                      <p className="text-xs text-emerald-300">AIIMS New Delhi • FICP Senior Fellow</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#b5f63d] text-[#0a2321] text-[11px] font-bold">
                      Accepting
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Stat Card 1: 95% Successful Diagnosis (Ref 1 Style) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 sm:-left-8 bg-white text-slate-900 rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center gap-3.5 z-20"
              >
                {/* Circular Mini Gauge */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-12 h-12 transform -rotate-90">
                    <circle cx="24" cy="24" r="20" stroke="#e2e8f0" strokeWidth="4" fill="transparent" />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="#059669"
                      strokeWidth="4"
                      strokeDasharray={125}
                      strokeDashoffset={125 * (1 - 0.95)}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <span className="absolute text-xs font-bold text-emerald-800">95%</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Successful Diagnosis</p>
                  <p className="text-[11px] text-slate-500">Early Detection Protocol</p>
                </div>
              </motion.div>

              {/* Floating Stat Card 2: 350+ Clinical Procedures (Ref 1 Style) */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -right-4 sm:-right-6 bg-white text-slate-900 rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">350+ Protocols</p>
                  <p className="text-[11px] text-slate-500">Precision Medicine</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. RUNNING RIBBON TICKER (Directly inspired by Reference 2 - Clean Animated Medical Marquee) */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-emerald-100 py-3.5 shadow-sm">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-8 text-sm font-medium tracking-wide mx-4">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#b5f63d]" />
              <span>Compassionate Care</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#b5f63d]" />
              <span>AIIMS & Post-Graduate Trained</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#b5f63d]" />
              <span>Precision Cardiometabolic Diagnostics</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#b5f63d]" />
              <span>98% Patient Satisfaction Rate</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <Video className="w-4 h-4 text-[#b5f63d]" />
              <span>Pan-India Encrypted Telehealth</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#b5f63d]" />
              <span>Cashless & Reimbursement Support</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-[#b5f63d]" />
              <span>FICP Senior Fellow</span>
            </span>
          </div>
          {/* Duplicate set for seamless continuous marquee */}
          <div className="flex items-center gap-8 text-sm font-medium tracking-wide mx-4">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#b5f63d]" />
              <span>Compassionate Care</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#b5f63d]" />
              <span>AIIMS & Post-Graduate Trained</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#b5f63d]" />
              <span>Precision Cardiometabolic Diagnostics</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#b5f63d]" />
              <span>98% Patient Satisfaction Rate</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <Video className="w-4 h-4 text-[#b5f63d]" />
              <span>Pan-India Encrypted Telehealth</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#b5f63d]" />
              <span>Cashless & Reimbursement Support</span>
            </span>
          </div>
        </div>
      </section>

      {/* 3. BENTO GRID: "Advancing Health Through Smart Technology and Heart" (Reference 1 & 2 - Clean looking, less text, more images & cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Why Patients Choose Our Practice
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Advancing Health Through Smart Technology and Heart
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Connecting patients with personalized diagnostics, proactive prevention, and seamless digital access.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Bento Card 1: Virtual Care & Quick Connectivity */}
          <div className="md:col-span-2 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/40 rounded-3xl p-7 border border-emerald-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-md shadow-emerald-700/20">
                <Video className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Live Virtual Hub
              </span>
            </div>
            <div className="space-y-2 mb-6">
              <h3 className="text-xl font-bold text-slate-900">Instant Telehealth & Connected Care</h3>
              <p className="text-sm text-slate-600">
                Consult securely from anywhere in India. Encrypted video calls, continuous glucose monitor tracking, and direct digital prescriptions.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald-100/80">
              <div>
                <p className="text-2xl font-bold text-slate-900">14,000+</p>
                <p className="text-xs text-slate-500">Virtual visits completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-700">&lt; 15 Mins</p>
                <p className="text-xs text-slate-500">Average intake wait time</p>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Photographic Card of Doctor With Patient (Ref 2 Style) */}
          <div className="md:col-span-1 lg:col-span-2 relative rounded-3xl overflow-hidden min-h-[260px] shadow-sm group">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
              alt="Medical consultation"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium text-emerald-300">
                <Award className="w-3.5 h-3.5" />
                <span>Award-Winning Care</span>
              </div>
              <h3 className="text-lg font-bold text-white">140+ Clinical Honors & Recognitions</h3>
              <p className="text-xs text-slate-200 line-clamp-2">
                Recognized by the American College of Physicians for proactive prevention protocols.
              </p>
            </div>
          </div>

          {/* Bento Card 3: Metrics 1 - 98% Satisfaction */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-4">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-900">98%</p>
              <h4 className="text-sm font-semibold text-slate-800 mt-1">Patient Satisfaction</h4>
              <p className="text-xs text-slate-500 mt-1">
                Patients report marked vitality improvement in under 60 days.
              </p>
            </div>
          </div>

          {/* Bento Card 4: Metrics 2 - 200+ Conditions */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-900">200+</p>
              <h4 className="text-sm font-semibold text-slate-800 mt-1">Medical Conditions</h4>
              <p className="text-xs text-slate-500 mt-1">
                From lipid disorders to metabolic fatigue and thyroid optimization.
              </p>
            </div>
          </div>

          {/* Bento Card 5: Metrics 3 - 80+ Cities */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-900">75 Mins</p>
              <h4 className="text-sm font-semibold text-slate-800 mt-1">Unhurried Visits</h4>
              <p className="text-xs text-slate-500 mt-1">
                10x longer than typical 7-minute factory medicine appointments.
              </p>
            </div>
          </div>

          {/* Bento Card 6: Direct Telehealth Link */}
          <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-3xl p-6 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center mb-4">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Direct Clinical Line</h4>
              <p className="text-xs text-emerald-100/80 mt-1">
                Speak directly with concierge staff for priority scheduling.
              </p>
            </div>
            <a
              href={`tel:${DOCTOR_INFO.phone}`}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#b5f63d] hover:underline"
            >
              <span>{DOCTOR_INFO.phone}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE SPECIALTIES CAROUSEL / SELECTOR (Directly inspired by Reference 2 - "Our Areas of Expertise") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50/80 rounded-3xl p-6 sm:p-10 border border-slate-200/80">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Specialized Focus</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Our Areas of Expertise</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Select a clinical domain below to view treatment protocols and direct scheduling.
            </p>
          </div>

          {/* Specialty Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {[
              { id: 'cardiology', label: 'Cardiometabolic' },
              { id: 'longevity', label: 'Cellular Longevity' },
              { id: 'preventive', label: 'Annual Preventive' },
              { id: 'telehealth', label: 'Virtual Care' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20'
                    : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Specialty Card (Ref 2 Style) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-4 aspect-square rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={currentSpecialty.image}
                alt={currentSpecialty.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{currentSpecialty.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500">{currentSpecialty.subtitle}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold text-xs border border-emerald-200">
                  {currentSpecialty.statLabel}: {currentSpecialty.statVal}
                </span>
              </div>

              {/* Highlights Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {currentSpecialty.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action row */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onOpenBooking(currentSpecialty.serviceId)}
                  className="px-6 py-3 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>Book This Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('services')}
                  className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs sm:text-sm transition-all cursor-pointer"
                >
                  View All Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VISUAL SERVICES CARDS (Cards with Photography, Clean Layout, Less Text) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Clinical Catalog</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Featured Consultations</h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
          >
            <span>View all 6 care services</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MEDICAL_SERVICES.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={service.imageUrl || 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=600'}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {service.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#b5f63d] text-[#0c2423] text-xs font-bold shadow-md">
                    {service.badge}
                  </span>
                )}
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium">
                  {service.durationMinutes} Mins
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Self-pay / Cashless</span>
                    <p className="text-lg font-bold text-slate-900">₹{service.price.toLocaleString('en-IN')}</p>
                  </div>
                  <button
                    onClick={() => onOpenBooking(service.id)}
                    className="px-4 py-2 rounded-full bg-emerald-50 hover:bg-emerald-800 hover:text-white text-emerald-800 text-xs font-semibold transition-all cursor-pointer"
                  >
                    Schedule Visit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. VERIFIED PATIENT TESTIMONIAL PREVIEW (Reference 2 Style - Clean, modern card stack) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-[#0c2423] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                What Our Patients Say About Their Care Experience
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/70">
                Real stories from verified patients across Bengaluru, Mumbai, and pan-India who took control of their cardiometabolic and long-term health.
              </p>
              <button
                onClick={() => onNavigate('testimonials')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all cursor-pointer"
              >
                <span>Read All 480+ Reviews</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PATIENT_TESTIMONIALS.slice(0, 2).map((test) => (
                <div key={test.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-300">{test.patientName}</span>
                    <span className="text-[11px] text-emerald-200/60">{test.location}</span>
                  </div>
                  <p className="text-xs text-slate-200 italic line-clamp-4">
                    "{test.reviewText}"
                  </p>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-300/80">
                    <span>{test.condition}</span>
                    <span className="text-[#b5f63d]">Verified Patient</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. QUICK APPOINTMENT CTA BANNER (Clean, high-impact conversion trigger) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-3xl p-8 sm:p-12 border border-emerald-200 text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Ready to Prioritize Your Long-Term Health?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Reserve your unhurried 60–75 minute session with {DOCTOR_INFO.name}. In-person in Indiranagar, Bengaluru or via pan-India telehealth.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="px-8 py-3.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              Schedule an Appointment
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-300 transition-all cursor-pointer"
            >
              Contact Clinic Desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
