import React, { useState } from 'react';
import { Award, GraduationCap, MapPin, Phone, Mail, Clock, ChevronDown, CheckCircle2, ShieldCheck } from 'lucide-react';
import { DOCTOR_INFO, FREQUENTLY_ASKED_QUESTIONS } from '../data/doctorData';

interface DoctorBioSectionProps {
  onBookClick: () => void;
}

export const DoctorBioSection: React.FC<DoctorBioSectionProps> = ({ onBookClick }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#fafbfa] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: Doctor Biography & Background */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left: Doctor Portrait & Clinic Stamp */}
          <div className="lg:col-span-5">
            <div className="relative max-w-md mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-white p-2">
                <div className="aspect-4/5 rounded-xl overflow-hidden bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800"
                    alt="Dr. Elena Vance in clinic consultation"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Verified Clinical Credentials Badge */}
              <div className="absolute -bottom-6 -right-4 bg-white rounded-xl p-4 shadow-xl border border-stone-200/90 max-w-xs space-y-1">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold text-stone-900">Harvard & Stanford Trained</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Fellow, American College of Physicians (FACP) & Certified Lifestyle Physician.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Bio & Care Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-semibold">
                <Award className="w-3.5 h-3.5 text-emerald-700" />
                <span>Meet Your Physician</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-stone-900 tracking-tight">
                Dr. Elena Vance, MD, FACP
              </h2>
              <p className="text-sm font-semibold text-emerald-800">
                Integrative Internal Medicine & Preventive Cardiometabolic Specialist
              </p>
            </div>

            <div className="space-y-4 text-stone-600 text-sm leading-relaxed">
              <p>
                "Healthcare in America has become increasingly fragmented and rushed. Patients are handed prescriptions for lab numbers without anyone taking the time to ask about their sleep architecture, cellular stress, or chronic inflammatory triggers."
              </p>
              <p>
                Dr. Elena Vance founded <strong>Aura Health & Vance Integrative Medicine</strong> in Palo Alto with a single mission: to provide the rigorous, unhurried medical partnership that patients deserve. Following her internal medicine residency at Johns Hopkins and advanced fellowship training at Harvard Medical School, she served on the affiliated clinical faculty at Stanford Medicine.
              </p>
              <p>
                Her clinical practice blends cutting-edge diagnostics—including advanced ApoB particle quantification, continuous glucose analytics, and coronary plaque imaging—with actionable nutrition and lifestyle medicine.
              </p>
            </div>

            {/* Specialties & Distinctions Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {DOCTOR_INFO.specialties.map((spec, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-medium text-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            {/* Quick CTA */}
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onBookClick}
                className="px-6 py-3 bg-[#0f2b26] hover:bg-[#18443c] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Schedule Consultation with Dr. Vance
              </button>
              <a
                href={`tel:${DOCTOR_INFO.phone}`}
                className="text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>Call Clinic Directly</span>
              </a>
            </div>

          </div>
        </div>

        {/* Clinic Operations & FAQ Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 border-t border-stone-200/80">
          
          {/* Clinic Information & Hours Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-serif-display font-bold text-stone-900">
                Clinic Location & Hours
              </h3>
              <p className="text-xs text-stone-500">
                Conveniently located in downtown Palo Alto with dedicated patient parking.
              </p>
            </div>

            {/* Address & Contact Box */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-3.5 shadow-xs text-xs text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 font-semibold block">{DOCTOR_INFO.clinicName}</strong>
                  <span>{DOCTOR_INFO.address}</span>
                  <br />
                  <span>{DOCTOR_INFO.cityStateZip}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Direct Line: <strong className="text-stone-900">{DOCTOR_INFO.phone}</strong></span>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Concierge Email: <strong className="text-stone-900">{DOCTOR_INFO.email}</strong></span>
              </div>
            </div>

            {/* Hours Table */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-2.5 shadow-xs text-xs">
              <div className="font-semibold text-stone-900 flex items-center gap-2 pb-1 border-b border-stone-100">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>Weekly Consultation Schedule</span>
              </div>
              {DOCTOR_INFO.hours.map((h, i) => (
                <div key={i} className="flex items-center justify-between text-stone-600">
                  <span className="font-medium text-stone-700">{h.dayRange}</span>
                  <span className="text-stone-900 font-mono text-[11px]">{h.time}</span>
                </div>
              ))}
            </div>

            {/* Insurance Accepted Quick List */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-xs text-xs">
              <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Accepted Insurance Providers</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {DOCTOR_INFO.insurances.map((ins, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium">
                    {ins}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive FAQs Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <h3 className="text-xl font-serif-display font-bold text-stone-900">
                Frequently Asked Clinical Questions
              </h3>
              <p className="text-xs text-stone-500">
                Clear answers regarding care philosophy, appointments, and insurance.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {FREQUENTLY_ASKED_QUESTIONS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-xs transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      <span className="text-sm font-bold text-stone-900">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180 text-emerald-800' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
