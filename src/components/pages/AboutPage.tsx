import React from 'react';
import {
  Award,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Heart,
  Stethoscope,
  Building2,
  UserCheck
} from 'lucide-react';
import { DOCTOR_INFO, CLINICAL_TEAM, CLINIC_FACILITIES } from '../../data/doctorData';
import { PageId } from '../../types';

interface AboutPageProps {
  onOpenBooking: () => void;
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenBooking,
  onNavigate,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* 1. Header Profile Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0a2321] to-emerald-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl border border-emerald-900/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Doctor Portrait */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-64 sm:w-72 aspect-[4/5] rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800"
                alt="Dr. Elena Vance, MD"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md rounded-xl p-2 text-center text-xs text-emerald-200">
                Dr. Elena Vance, MD, FACP
              </div>
            </div>
          </div>

          {/* Bio & Credentials */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-[#b5f63d]" />
              <span>Founder & Clinical Director</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Pioneering Root-Cause Cardiometabolic Care
            </h1>

            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              Dr. Elena Vance is a double board-certified internist and lifestyle medicine physician.
              After witnessing standard medical visits shrink to 7-minute transactional prescription handoffs,
              she founded Aura Health & Vance Integrative Medicine to deliver unhurried, evidence-backed
              preventive care that detects vascular and metabolic disease decades before events occur.
            </p>

            {/* Credential Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-emerald-200 bg-white/5 p-3 rounded-xl border border-white/10">
                <GraduationCap className="w-4 h-4 text-[#b5f63d] shrink-0" />
                <span>Harvard Medical School Fellowship</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-emerald-200 bg-white/5 p-3 rounded-xl border border-white/10">
                <Building2 className="w-4 h-4 text-[#b5f63d] shrink-0" />
                <span>Johns Hopkins Internal Medicine Residency</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-emerald-200 bg-white/5 p-3 rounded-xl border border-white/10">
                <Award className="w-4 h-4 text-[#b5f63d] shrink-0" />
                <span>Fellow of the American College of Physicians (FACP)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-emerald-200 bg-white/5 p-3 rounded-xl border border-white/10">
                <Stethoscope className="w-4 h-4 text-[#b5f63d] shrink-0" />
                <span>Stanford Medicine Affiliated Clinical Faculty</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-full bg-[#b5f63d] hover:bg-[#a6e830] text-[#0a2321] font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                Schedule With Dr. Vance
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
              >
                Visit Clinic in Palo Alto
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Clinical Team Cards (Images + Cards) */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Multidisciplinary Team</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Your Dedicated Care Team</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Collaborative specialists committed to cardiovascular resilience, hormonal balance, and clinical nutrition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CLINICAL_TEAM.map((member, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col group"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium">
                  {member.badge}
                </span>
              </div>
              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">{member.role}</p>
                  <p className="text-xs text-slate-600 mt-2">{member.specialty}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                  {member.education}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Clinic Facility Showcase (Visual Cards with Clinic Photography) */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Palo Alto Clinic</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">A Tranquil, Modern Clinical Sanctuary</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Designed from the ground up for privacy, clinical precision, and patient comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLINIC_FACILITIES.map((facility, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                <img
                  src={facility.imageUrl}
                  alt={facility.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-emerald-800 text-white text-[11px] font-semibold">
                  {facility.badge}
                </span>
              </div>
              <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                <h4 className="text-sm font-bold text-slate-900">{facility.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Core Clinical Values */}
      <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200">
        <div className="max-w-2xl mx-auto text-center mb-10 space-y-2">
          <h3 className="text-2xl font-bold text-slate-900">Our Clinical Commitments</h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Every patient interaction is guided by our 4 foundational pillars.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Unhurried Time',
              desc: '60 to 75 minutes for initial consultations. We listen deeply to your story.',
              icon: Stethoscope,
            },
            {
              title: 'Objective Science',
              desc: 'Rigorous ApoB, continuous glucose, and genomic biomarkers grounded in current literature.',
              icon: Award,
            },
            {
              title: 'Accessible Care',
              desc: 'In-network with top PPO insurances and transparent self-pay pricing.',
              icon: ShieldCheck,
            },
            {
              title: 'Total Autonomy',
              desc: 'Empowering you with education and tools to make informed longevity decisions.',
              icon: Heart,
            },
          ].map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">{pillar.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
