import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  CheckCircle2,
  ArrowRight,
  Shield,
  Sparkles,
  Search,
  Check,
  X,
  FileText,
  AlertCircle
} from 'lucide-react';
import { MEDICAL_SERVICES, DOCTOR_INFO } from '../../data/doctorData';
import { MedicalService, PageId } from '../../types';

interface ServicesPageProps {
  onOpenBooking: (serviceId?: string) => void;
  onNavigate: (page: PageId) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalService, setActiveModalService] = useState<MedicalService | null>(null);
  const [insuranceQuery, setInsuranceQuery] = useState('');

  const filteredServices = selectedCategory === 'all'
    ? MEDICAL_SERVICES
    : MEDICAL_SERVICES.filter((s) => s.category === selectedCategory);

  const matchedInsurances = DOCTOR_INFO.insurances.filter((ins) =>
    ins.toLowerCase().includes(insuranceQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* 1. Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Evidence-Based Clinical Services</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Comprehensive Care Tailored to Your Biology
        </h1>
        <p className="text-base text-slate-600">
          Unhurried, physician-led consultations dedicated to advanced cardiometabolic risk reduction,
          cellular longevity protocols, and comprehensive preventive medicine.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {[
            { id: 'all', label: 'All Services (6)' },
            { id: 'preventive', label: 'Preventive Health' },
            { id: 'cardiology', label: 'Cardiometabolic' },
            { id: 'longevity', label: 'Longevity & Cellular' },
            { id: 'telehealth', label: 'Virtual Telehealth' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-white shadow-md shadow-emerald-800/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Visual Cards Grid (Images + Cards + Less Text) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            {/* Visual Photo Card Header */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src={service.imageUrl || 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800'}
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {service.badge && (
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#b5f63d] text-[#0c2423] text-xs font-bold shadow-md">
                  {service.badge}
                </span>
              )}
              <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-slate-900/75 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-300" />
                <span>{service.durationMinutes} Minutes</span>
              </span>
            </div>

            {/* Content Area */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    {service.category}
                  </span>
                  <span className="text-base font-bold text-slate-900">
                    ₹{service.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {service.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Key Checklist Items */}
                <div className="space-y-1.5 pt-2">
                  <p className="text-xs font-semibold text-slate-900">What's included:</p>
                  {service.includedItems.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                  {service.includedItems.length > 3 && (
                    <p className="text-[11px] text-emerald-700 font-medium pl-5">
                      +{service.includedItems.length - 3} additional clinical assessments
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => onOpenBooking(service.id)}
                  className="flex-1 py-2.5 px-4 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>Book Visit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActiveModalService(service)}
                  className="py-2.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-all cursor-pointer"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Comparative Matrix: Traditional 7-Min Care vs. Vance Integrative 75-Min Care */}
      <div className="bg-gradient-to-br from-slate-900 to-[#0b2422] text-white rounded-3xl p-6 sm:p-10">
        <div className="max-w-2xl mx-auto text-center mb-8 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#b5f63d]">Care Model Comparison</p>
          <h2 className="text-2xl sm:text-3xl font-bold">Why Extended Consultations Matter</h2>
          <p className="text-xs sm:text-sm text-emerald-100/70">
            True preventive medicine requires time to investigate biochemistry, lifestyle, and root causes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Traditional Medicine */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Standard Factory Medicine</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Rushed 7 to 10 minute appointments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Basic cholesterol tests that miss 50% of heart risks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Reactive treatment only after chronic disease manifests</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Impersonal communication through front-desk gatekeepers</span>
              </li>
            </ul>
          </div>

          {/* Dr. Sharma Model */}
          <div className="bg-emerald-950/70 rounded-2xl p-6 border border-emerald-500/40 space-y-4">
            <div className="flex items-center gap-2 text-[#b5f63d] font-semibold text-sm">
              <Shield className="w-4 h-4" />
              <span>{DOCTOR_INFO.name} Integrative Care</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-emerald-100">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#b5f63d] shrink-0 mt-0.5" />
                <span>60 to 75 dedicated minutes with {DOCTOR_INFO.name}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#b5f63d] shrink-0 mt-0.5" />
                <span>Advanced ApoB, Lp(a), fasting insulin & vascular elasticity</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#b5f63d] shrink-0 mt-0.5" />
                <span>Proactive 10-year longevity & metabolic optimization roadmap</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#b5f63d] shrink-0 mt-0.5" />
                <span>Direct encrypted portal access for ongoing support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Interactive Insurance Checker Tool */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200">
        <div className="max-w-xl mx-auto text-center space-y-4">
          <h3 className="text-2xl font-bold text-slate-900">Insurance & TPA Coverage Lookup</h3>
          <p className="text-xs sm:text-sm text-slate-600">
            We partner with major Indian health insurance networks and TPAs for cashless hospitalization and outpatient reimbursement assistance.
          </p>

          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search your insurance (e.g. Star Health, HDFC ERGO, Care Health, Niva Bupa)..."
              value={insuranceQuery}
              onChange={(e) => setInsuranceQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-900"
            />
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-2">
            {matchedInsurances.length > 0 ? (
              matchedInsurances.map((ins, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-white border border-emerald-300 text-emerald-900 text-xs font-medium shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{ins}</span>
                </span>
              ))
            ) : (
              <p className="text-xs text-slate-500">
                Plan not listed? We provide comprehensive itemized medical invoices for seamless reimbursement claims.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 5. Service Detail Modal */}
      <AnimatePresence>
        {activeModalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 overflow-hidden shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    {activeModalService.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {activeModalService.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalService(null)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={activeModalService.imageUrl}
                  alt={activeModalService.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Recommended For:</h4>
                  <p>{activeModalService.recommendedFor}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Clinical Overview:</h4>
                  <p>{activeModalService.description}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Protocol Elements:</h4>
                  <div className="space-y-2">
                    {activeModalService.includedItems.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-slate-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500">Consultation Fee</span>
                  <p className="text-xl font-bold text-slate-900">₹{activeModalService.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalService(null)}
                    className="px-4 py-2.5 rounded-full text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const id = activeModalService.id;
                      setActiveModalService(null);
                      onOpenBooking(id);
                    }}
                    className="px-6 py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>Schedule Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
