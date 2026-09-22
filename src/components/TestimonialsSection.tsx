import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquarePlus, Filter, X, ShieldCheck } from 'lucide-react';
import { PATIENT_TESTIMONIALS } from '../data/doctorData';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  onBookClick: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onBookClick }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(PATIENT_TESTIMONIALS);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  // New review form fields
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newCondition, setNewCondition] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const filters = [
    { id: 'all', label: 'All Reviews' },
    { id: 'preventive', label: 'Preventive Care' },
    { id: 'cardiology', label: 'Cardiometabolic' },
    { id: 'longevity', label: 'Longevity & Hormones' },
    { id: 'telehealth', label: 'Telehealth' },
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
      location: newLocation.trim() || 'Bay Area, CA',
      rating: newRating,
      date: 'Just now',
      condition: newCondition.trim() || 'Preventive Medicine',
      category: 'preventive',
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
    <section id="testimonials" className="py-16 sm:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Rating Highlights */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>Patient Stories & Care Outcomes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-stone-900 tracking-tight">
              Experiences of Restored Vitality
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Read how Dr. Vance’s unhurried diagnostic approach has helped patients pinpoint silent cardiovascular risks, balance metabolic health, and reclaim daily energy.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="flex items-center gap-5 p-4 rounded-2xl bg-stone-50 border border-stone-200 self-start lg:self-auto">
            <div className="text-center pr-4 border-r border-stone-200">
              <div className="text-3xl font-bold font-serif-display text-stone-900">4.96</div>
              <div className="flex items-center gap-0.5 justify-center mt-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[10px] text-stone-500 font-medium block mt-0.5">480+ Verified</span>
            </div>

            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>99.4% Patient Satisfaction</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Zero Rushed Consultations</span>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(true)}
                className="text-[11px] font-bold text-emerald-800 hover:text-emerald-900 hover:underline flex items-center gap-1 pt-0.5 cursor-pointer"
              >
                <MessageSquarePlus className="w-3 h-3" />
                <span>Write Patient Review</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                selectedFilter === f.id
                  ? 'bg-[#0f2b26] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Testimonials Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((item: Testimonial) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-[#fbfcfb] border border-stone-200 hover:border-emerald-700/50 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header: Stars & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  {item.verified && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Patient</span>
                    </span>
                  )}
                </div>

                {/* Focus Area Pill */}
                <div className="text-xs font-bold text-stone-900 bg-stone-100/80 px-2.5 py-1 rounded-md inline-block">
                  {item.condition}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{item.reviewText}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full ${item.avatarBg} text-white flex items-center justify-center text-xs font-bold font-serif-display shadow-xs`}>
                    {item.patientName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">{item.patientName}</div>
                    <div className="text-[10px] text-stone-400 font-medium">{item.location}</div>
                  </div>
                </div>
                <div className="text-[10px] text-stone-400 font-medium">
                  {item.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Booking Prompt */}
        <div className="mt-14 text-center">
          <p className="text-xs text-stone-500 mb-3">
            Ready to experience thoughtful, unhurried healthcare?
          </p>
          <button
            onClick={onBookClick}
            className="px-6 py-3 bg-[#0f2b26] hover:bg-[#18443c] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Schedule Your Consultation Today
          </button>
        </div>

      </div>

      {/* Write Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2">
                <MessageSquarePlus className="w-5 h-5 text-emerald-800" />
                <h3 className="text-base font-bold text-stone-900 font-serif-display">
                  Share Your Care Experience
                </h3>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="p-6 space-y-4 text-xs">
              {formSuccess ? (
                <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-900">Thank You for Your Feedback!</h4>
                  <p className="text-xs text-emerald-700">
                    Your verified review has been recorded to help others seeking thoughtful care.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Your Rating</label>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= newRating ? 'fill-amber-400 text-amber-500' : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-stone-500 ml-2 font-semibold">{newRating} of 5 Stars</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. David M."
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg outline-none focus:border-emerald-700"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">City, State</label>
                      <input
                        type="text"
                        placeholder="e.g. Palo Alto, CA"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg outline-none focus:border-emerald-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Condition or Care Focus
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Preventive Baseline / Cholesterol / Energy Optimization"
                      value={newCondition}
                      onChange={(e) => setNewCondition(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg outline-none focus:border-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Your Experience & Observations *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How did Dr. Vance assist with your diagnostic journey and health goals?..."
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg outline-none focus:border-emerald-700"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => setIsReviewModalOpen(false)}
                      className="px-4 py-2 text-stone-600 hover:text-stone-900 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#0f2b26] hover:bg-[#18443c] text-white font-bold rounded-lg shadow-xs cursor-pointer"
                    >
                      Submit Review
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
