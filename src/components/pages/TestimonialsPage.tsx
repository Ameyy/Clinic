import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  CheckCircle2,
  MessageSquarePlus,
  Filter,
  X,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PATIENT_TESTIMONIALS, DOCTOR_INFO } from '../../data/doctorData';
import { Testimonial, PageId } from '../../types';

interface TestimonialsPageProps {
  onOpenBooking: () => void;
  onNavigate: (page: PageId) => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({
  onOpenBooking,
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(PATIENT_TESTIMONIALS);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  // New review form
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newCondition, setNewCondition] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const filters = [
    { id: 'all', label: 'All Reviews (480+)' },
    { id: 'preventive', label: 'Preventive Care' },
    { id: 'cardiology', label: 'Cardiometabolic' },
    { id: 'longevity', label: 'Longevity & Cellular' },
    { id: 'telehealth', label: 'Virtual Telehealth' },
  ];

  const filteredTestimonials =
    selectedFilter === 'all'
      ? testimonials
      : testimonials.filter((t) => t.category === selectedFilter);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newReviewText.trim()) return;

    const newTestimonial: Testimonial = {
      id: 'test-' + Date.now(),
      patientName: newAuthor.trim(),
      location: newLocation.trim() || 'Bengaluru, KA',
      rating: newRating,
      date: 'Just now',
      condition: newCondition.trim() || 'Preventive Consultation',
      category: (selectedFilter !== 'all' ? selectedFilter : 'preventive') as any,
      reviewText: newReviewText.trim(),
      verified: true,
      avatarBg: 'bg-emerald-800',
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setFormSuccess(true);
    setTimeout(() => {
      setIsReviewModalOpen(false);
      setFormSuccess(false);
      setNewAuthor('');
      setNewLocation('');
      setNewCondition('');
      setNewReviewText('');
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* 1. Scorecard Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0a2321] to-emerald-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-emerald-900/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-[#b5f63d]" />
              <span>Verified Patient Feedback</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Real Health Outcomes From Real Patients
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/80 max-w-xl">
              From reversing metabolic fatigue to optimizing ApoB and blood pressure, discover how patients experience unhurried integrative medicine.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="px-6 py-3 rounded-full bg-[#b5f63d] hover:bg-[#a5e930] text-[#0a2321] font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Write a Patient Review</span>
              </button>
            </div>
          </div>

          {/* Metric Highlights */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 text-center">
              <p className="text-3xl sm:text-4xl font-black text-white">4.96</p>
              <div className="flex justify-center my-1.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-emerald-200">Overall Rating</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 text-center">
              <p className="text-3xl sm:text-4xl font-black text-[#b5f63d]">98%</p>
              <p className="text-xs font-semibold text-white mt-2">Satisfaction</p>
              <p className="text-xs text-emerald-200">Recommendation rate</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 text-center">
              <p className="text-3xl sm:text-4xl font-black text-white">480+</p>
              <p className="text-xs font-semibold text-white mt-2">Verified Reviews</p>
              <p className="text-xs text-emerald-200">Across India</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 text-center">
              <p className="text-3xl sm:text-4xl font-black text-white">100%</p>
              <p className="text-xs font-semibold text-white mt-2">Direct Access</p>
              <p className="text-xs text-emerald-200">With {DOCTOR_INFO.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedFilter === filter.id
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setIsReviewModalOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Add Your Experience</span>
        </button>
      </div>

      {/* 3. Visual Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Patient Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.avatarBg || 'bg-emerald-800'} text-white font-bold text-sm flex items-center justify-center`}>
                    {t.patientName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.patientName}</h4>
                    <p className="text-[11px] text-slate-500">{t.location} • {t.date}</p>
                  </div>
                </div>
                <div className="flex items-center text-amber-400">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                "{t.reviewText}"
              </p>
            </div>

            {/* Condition Tag & Verified Badge */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-medium text-[11px]">
                {t.condition}
              </span>
              <span className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Visit</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Bottom CTA */}
      <div className="bg-slate-50 rounded-3xl p-8 text-center space-y-4 border border-slate-200">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Experience the Difference of Unhurried Medicine
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          Join hundreds of proactive patients taking charge of their cardiometabolic future.
        </p>
        <button
          onClick={onOpenBooking}
          className="px-7 py-3 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
        >
          Book Your Initial Consultation
        </button>
      </div>

      {/* 5. Write a Review Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Share Your Health Journey</h3>
                  <p className="text-xs text-slate-500">Your feedback helps others discover proactive care.</p>
                </div>
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {formSuccess ? (
                <div className="p-6 bg-emerald-50 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-emerald-900 text-base">Thank You!</h4>
                  <p className="text-xs text-emerald-700">Your review has been successfully posted.</p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewRating(star)}
                          className="p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jordan Mitchell"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Indiranagar, Bengaluru"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Health Focus</label>
                      <input
                        type="text"
                        placeholder="e.g. ApoB & Lipids"
                        value={newCondition}
                        onChange={(e) => setNewCondition(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Experience</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How was your consultation with Dr. Sharma? What changes have you noticed?"
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
