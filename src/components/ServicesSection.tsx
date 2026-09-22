import React, { useState } from 'react';
import { Clock, Check, ArrowUpRight, Sparkles, Shield, Heart, Activity } from 'lucide-react';
import { MEDICAL_SERVICES } from '../data/doctorData';
import { MedicalService } from '../types';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'preventive', label: 'Preventive & Primary' },
    { id: 'cardiology', label: 'Cardiometabolic' },
    { id: 'longevity', label: 'Longevity & Hormones' },
    { id: 'telehealth', label: 'Virtual Care' },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? MEDICAL_SERVICES
      : MEDICAL_SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 text-xs font-semibold">
              <Activity className="w-3.5 h-3.5 text-emerald-700" />
              <span>Evidence-Based Clinical Practice</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-stone-900 tracking-tight">
              Specialized Care Protocols
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              We replace hurried assembly-line medicine with thorough, unhurried consultations that examine genetics, advanced lipidology, endocrine balance, and autonomic nervous system health.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-stone-100 p-1.5 rounded-xl self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service: MedicalService) => (
            <div
              key={service.id}
              className="bg-[#fbfcfb] rounded-2xl border border-stone-200 hover:border-emerald-700/60 p-6 flex flex-col justify-between transition-all hover:shadow-md group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {service.badge ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                      {service.badge}
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-stone-400 capitalize">
                      {service.category} Medicine
                    </span>
                  )}
                  <div className="flex items-center gap-1 text-xs text-stone-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{service.durationMinutes} min</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-serif-display text-stone-900 group-hover:text-emerald-950 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Recommended For */}
                <div className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100/80 text-[11px] text-emerald-900">
                  <span className="font-semibold">Recommended for:</span> {service.recommendedFor}
                </div>

                {/* Included Elements Checklist */}
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <div className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider">
                    What's Included:
                  </div>
                  <ul className="space-y-1.5 text-xs text-stone-600">
                    {service.includedItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Book Action Button */}
              <div className="pt-6 mt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400 font-medium block">Standard Consultation</span>
                  <span className="text-xl font-bold font-serif-display text-stone-900">
                    ${service.price}
                  </span>
                  <span className="text-[11px] text-stone-500 ml-1">/ visit</span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectServiceToBook(service.id)}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0f2b26] hover:bg-[#18443c] text-white text-xs font-semibold rounded-xl transition-all group-hover:shadow-sm cursor-pointer"
                >
                  <span>Book Visit</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Insurance and Guarantee Note */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0f2b26] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h4 className="text-base font-bold font-serif-display text-white">
                Transparent Billing & Direct Insurance Verification
              </h4>
              <p className="text-xs text-emerald-100/80 mt-0.5">
                We accept major PPO plans (Aetna, Blue Cross Blue Shield, Cigna, Medicare) and provide detailed superbills for out-of-network reimbursement.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#booking"
              className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-[#0f2b26] font-bold text-xs rounded-xl shadow transition-colors"
            >
              Verify Insurance in Booking
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
