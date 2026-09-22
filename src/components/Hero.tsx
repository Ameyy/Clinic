import React from 'react';
import { Calendar, ShieldCheck, HeartPulse, Award, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { DOCTOR_INFO } from '../data/doctorData';

interface HeroProps {
  onBookClick: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreServices }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f4f7f5] via-[#fafbfa] to-white pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200/60">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-teal-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Clinical Presentation & Headlines */}
          <div className="lg:col-span-7 space-y-7">
            {/* Status indicator pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-semibold shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span>Online Booking Open • Next Slot Available Today</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display tracking-tight text-stone-900 leading-[1.12]">
                Care that goes beyond symptoms. <br />
                <span className="italic text-[#0f2b26]">Medicine built for longevity.</span>
              </h1>
              <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed font-normal">
                Dr. Elena Vance provides unhurried, evidence-based internal medicine and preventive cardiometabolic care. 
                Combining advanced biomarker diagnostics with personalized lifestyle and clinical interventions in Palo Alto.
              </p>
            </div>

            {/* Clinical Highlights Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-sm text-stone-700">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>60–75 Min Unhurried Consultations</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Comprehensive ApoB & Metabolic Labs</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>In-Person Palo Alto & CA Telehealth</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>PPO Insurances & Medicare Accepted</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-book-cta-btn"
                onClick={onBookClick}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#0f2b26] hover:bg-[#18423a] active:bg-[#0a1f1b] text-white text-sm sm:text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-emerald-300" />
                <span>Schedule an Appointment</span>
              </button>

              <button
                id="hero-services-cta-btn"
                onClick={onExploreServices}
                className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-stone-50 active:bg-stone-100 text-stone-800 text-sm sm:text-base font-semibold rounded-xl border border-stone-300/80 shadow-xs hover:border-stone-400 transition-all cursor-pointer"
              >
                <span>Explore Care Services</span>
                <ArrowRight className="w-4 h-4 text-stone-500" />
              </button>
            </div>

            {/* Practice Trust Bar */}
            <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center gap-6 text-xs text-stone-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>HIPAA Encrypted Records</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-700" />
                <span>Fellow, American College of Physicians</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-emerald-700" />
                <span>Stanford Affiliated Faculty</span>
              </div>
            </div>
          </div>

          {/* Right Column: Doctor Portrait & Credential Badge Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Doctor Main Card Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-white p-3 shadow-xl border border-stone-200/80">
                {/* Doctor Photo */}
                <div className="relative aspect-4/5 rounded-xl overflow-hidden bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1594824813580-c11df5b7e944?auto=format&fit=crop&q=80&w=800"
                    alt="Dr. Elena Vance, MD, FACP"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2b26]/85 via-transparent to-transparent opacity-90" />
                  
                  {/* Overlay doctor name and title */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold font-serif-display tracking-wide text-white">
                          Dr. Elena Vance, MD
                        </h3>
                        <p className="text-xs text-emerald-200 font-medium">
                          Internal Medicine & Preventive Cardiometabolic Health
                        </p>
                      </div>
                      <div className="px-2 py-1 rounded bg-white/20 backdrop-blur-xs text-[11px] font-semibold text-white border border-white/30">
                        15+ Yrs Exp
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Sub-stats Bar */}
                <div className="grid grid-cols-3 gap-2 pt-3 pb-1 text-center divide-x divide-stone-100">
                  <div>
                    <div className="text-lg font-bold text-stone-900 font-serif-display">4.96 ★</div>
                    <div className="text-[11px] text-stone-500 font-medium">480+ Reviews</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-stone-900 font-serif-display">12k+</div>
                    <div className="text-[11px] text-stone-500 font-medium">Consultations</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-emerald-800 font-serif-display">75m</div>
                    <div className="text-[11px] text-stone-500 font-medium">Baseline Visits</div>
                  </div>
                </div>
              </div>

              {/* Floating Testimonial Snippet Bubble */}
              <div className="hidden sm:flex absolute -bottom-5 -left-6 max-w-xs bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-lg border border-stone-200/90 items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 font-serif-display font-bold text-xs">
                  ★
                </div>
                <div>
                  <p className="text-xs text-stone-700 italic leading-snug">
                    "The first doctor who truly listened and discovered my elevated ApoB in time."
                  </p>
                  <p className="text-[10px] text-stone-400 font-medium mt-1">
                    — Marcus S., Verified Patient
                  </p>
                </div>
              </div>

              {/* Floating Real-time Slot indicator */}
              <div className="hidden sm:flex absolute -top-4 -right-4 bg-[#0f2b26] text-white rounded-lg px-3 py-2 shadow-md border border-emerald-700/50 items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-300" />
                <span className="text-xs font-semibold text-emerald-100">Today's Openings: 2 slots</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
