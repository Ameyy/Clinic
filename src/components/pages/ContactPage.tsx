import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Navigation,
  Car,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { DOCTOR_INFO, FREQUENTLY_ASKED_QUESTIONS } from '../../data/doctorData';
import { PageId } from '../../types';

interface ContactPageProps {
  onOpenBooking: () => void;
  onNavigate: (page: PageId) => void;
}

const INDIA_CLINIC_LOCATIONS = [
  {
    id: 'rajkot',
    name: 'Rajkot Consultation & Wellness Center',
    state: 'Gujarat',
    city: 'Rajkot',
    address: 'Kalawad Road, Rajkot, Gujarat 360005, India',
    landmarks: 'Near Kotecha Chowk & Kalawad Road Health Corridor',
    transit: '15 mins from Rajkot Airport (Hirasar) / 10 mins from Rajkot Junction',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.82106464526!2d70.73889559527639!3d22.273466167223198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cdf0f%3A0x76dd15cfbe93ad3b!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1789983582609!5m2!1sen!2sin',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Rajkot,+Gujarat,+India',
  },
  {
    id: 'bengaluru',
    name: 'Indiranagar Flagship Clinic',
    state: 'Karnataka',
    city: 'Bengaluru',
    address: 'Plot 42, 100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038, India',
    landmarks: 'Next to 100 Feet Road Lifestyle Hub, 400m from Indiranagar Metro',
    transit: 'Purple Line Metro (Indiranagar Station) • Valet parking on-site',
    embedUrl: 'https://maps.google.com/maps?q=100+Feet+Road,+Indiranagar,+Bengaluru,+Karnataka+560038,+India&t=&z=15&ie=UTF8&iwloc=&output=embed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=100+Feet+Road,+Indiranagar,+Bengaluru,+Karnataka+560038,+India',
  },
];

export const ContactPage: React.FC<ContactPageProps> = ({
  onOpenBooking,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactTopic, setContactTopic] = useState('New Patient Consultation');
  const [contactMessage, setContactMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  // Google Maps location in India
  const [selectedLocationId, setSelectedLocationId] = useState<'rajkot' | 'bengaluru'>('rajkot');
  const [copiedLocationId, setCopiedLocationId] = useState<string | null>(null);

  const activeLocation =
    INDIA_CLINIC_LOCATIONS.find((l) => l.id === selectedLocationId) || INDIA_CLINIC_LOCATIONS[0];

  const handleCopyAddress = (id: string, addressText: string) => {
    navigator.clipboard.writeText(addressText).catch(() => {});
    setCopiedLocationId(id);
    setTimeout(() => {
      setCopiedLocationId(null);
    }, 2200);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;
    setMessageSent(true);
  };

  // Helper to check if currently open (Bengaluru is IST: UTC + 5:30)
  const isClinicOpenNow = () => {
    const now = new Date();
    // IST offset is +5.5 hours from UTC
    const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
    const istHours = istTime.getUTCHours();
    const day = istTime.getUTCDay(); // 0 is Sunday, 1 is Monday, etc.

    if (day >= 1 && day <= 5) {
      // Mon - Fri: 8:30am - 6:00pm
      return istHours >= 8 && istHours < 18;
    } else if (day === 6) {
      // Sat: 9:00am - 2:00pm
      return istHours >= 9 && istHours < 14;
    }
    return false;
  };

  const isOpen = isClinicOpenNow();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* 1. Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Patient Concierge & Clinic Access</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Get in Touch With Our Practice
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Have questions regarding consultations, insurances, or lab orders?
          Our concierge team is here to assist you promptly.
        </p>
      </div>

      {/* 2. Main Contact Grid: Location & Details (Left) + Direct Message Form (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact Cards & Clinic Status */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Status Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Practice Status</span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  isOpen
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                  }`}
                />
                <span>{isOpen ? 'Clinic Open Now' : 'Currently Closed (On-Call Active)'}</span>
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3 text-slate-700">
                <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">{DOCTOR_INFO.clinicName}</p>
                  <p>{DOCTOR_INFO.address}</p>
                  <p>{DOCTOR_INFO.cityStateZip}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                <a href={`tel:${DOCTOR_INFO.phone}`} className="hover:text-emerald-800 font-semibold">
                  {DOCTOR_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                <a href={`mailto:${DOCTOR_INFO.email}`} className="hover:text-emerald-800">
                  {DOCTOR_INFO.email}
                </a>
              </div>
            </div>

            {/* Clinic Hours Table */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                <span>Office & Consultation Hours</span>
              </p>
              <div className="space-y-1.5 text-xs text-slate-600">
                {DOCTOR_INFO.hours.map((h, i) => (
                  <div key={i} className="flex justify-between py-0.5 border-b border-slate-50">
                    <span className="font-medium text-slate-800">{h.dayRange}</span>
                    <span>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-3 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
              >
                Schedule Consultation Directly
              </button>
            </div>
          </div>

          {/* Parking & Transit Info */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
              <Car className="w-4 h-4 text-emerald-700" />
              <span>Location & Parking</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complimentary valet and dedicated basement parking available at our Indiranagar clinic.
              We are located 400 meters from the Indiranagar Metro Station (Purple Line).
            </p>
            <a
              href="#google-maps-india"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors pt-1"
            >
              <span>View Clinic on Google Maps ↓</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Direct Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Send a Message to Concierge</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              For general clinical inquiries, insurance queries, or records requests. We reply within 24 hours.
            </p>
          </div>

          {messageSent ? (
            <div className="bg-emerald-50 rounded-2xl p-8 text-center space-y-3 border border-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-emerald-900">Message Received</h4>
              <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto">
                Thank you for reaching out, {contactName}. Our concierge coordinator will follow up via email ({contactEmail}) or WhatsApp shortly.
              </p>
              <button
                onClick={() => {
                  setMessageSent(false);
                  setContactName('');
                  setContactEmail('');
                  setContactPhone('');
                  setContactMessage('');
                }}
                className="px-5 py-2 rounded-full bg-emerald-800 text-white text-xs font-semibold cursor-pointer"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kulkarni"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ramesh@example.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (WhatsApp)</label>
                  <input
                    type="tel"
                    placeholder="+91 98450 12345"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Topic</label>
                  <select
                    value={contactTopic}
                    onChange={(e) => setContactTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                  >
                    <option value="New Patient Consultation">New Patient Consultation</option>
                    <option value="Cashless Insurance & Reimbursement">Cashless Insurance & Reimbursement</option>
                    <option value="Cardiometabolic / ApoB Testing">Cardiometabolic / ApoB Testing</option>
                    <option value="Pan-India Telehealth Video">Pan-India Telehealth Video</option>
                    <option value="Other Medical Questions">Other Medical Questions</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Message or Health Goals</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Please describe how we can assist you with your care..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 3. Google Maps India Location & Directions */}
      <div id="google-maps-india" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>Google Maps • India Clinic Locations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Locate Our Clinic on Google Maps
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Find directions, landmarks, transit access, and on-site parking for our primary clinical locations in India.
            </p>
          </div>

          {/* Location Switcher Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl shrink-0 self-start md:self-auto border border-slate-200">
            {INDIA_CLINIC_LOCATIONS.map((loc) => {
              const isSelected = selectedLocationId === loc.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocationId(loc.id as 'rajkot' | 'bengaluru')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#b5f63d]' : 'text-slate-400'}`} />
                  <span>{loc.city}, {loc.state}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Location Details Strip */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-sm sm:text-base text-slate-900">{activeLocation.name}</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                {activeLocation.city}, {activeLocation.state}
              </span>
            </div>
            <p className="text-xs text-slate-600">{activeLocation.address}</p>
            <p className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
              <Car className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>{activeLocation.landmarks} • {activeLocation.transit}</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
            <button
              onClick={() => handleCopyAddress(activeLocation.id, activeLocation.address)}
              className="flex-1 md:flex-none px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              {copiedLocationId === activeLocation.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Address</span>
                </>
              )}
            </button>

            <a
              href={activeLocation.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all"
            >
              <Navigation className="w-3.5 h-3.5 text-[#b5f63d]" />
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3 text-emerald-200" />
            </a>
          </div>
        </div>

        {/* Interactive Google Maps Frame */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs bg-slate-100 h-80 sm:h-96 lg:h-[440px]">
          <iframe
            id="google-maps-embed-iframe"
            src={activeLocation.embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title={`Google Maps - ${activeLocation.name}`}
            className="w-full h-full"
          />

          {/* Floating Live Badge */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200/80 shadow-md text-slate-900 max-w-xs hidden sm:block pointer-events-none">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                {activeLocation.city} Clinic
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-900 leading-snug">{activeLocation.name}</p>
            <p className="text-[11px] text-slate-500 mt-0.5 truncate">{activeLocation.address}</p>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-slate-900 block">Valet & Basement</span>
            <span className="text-[11px] text-slate-500">Dedicated patient parking</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-slate-900 block">Public Transit</span>
            <span className="text-[11px] text-slate-500">Close to transit & arterial roads</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-slate-900 block">Wheelchair Accessible</span>
            <span className="text-[11px] text-slate-500">Ramp and elevator access</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-slate-900 block">Pan-India Telehealth</span>
            <span className="text-[11px] text-slate-500">Virtual visits across all states</span>
          </div>
        </div>
      </div>

      {/* 4. Interactive Frequently Asked Questions */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Patient FAQ</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Answers to common questions regarding visits, insurance, and scheduling.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-slate-100">
          {FREQUENTLY_ASKED_QUESTIONS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 group-hover:text-emerald-800 transition-transform ${
                      isOpen ? 'rotate-180 text-emerald-800' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Emergency Medical Advisory Disclaimer */}
      <div className="bg-amber-50 rounded-2xl p-4 sm:p-5 border border-amber-200 flex items-start gap-3 text-amber-900 text-xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Emergency Notice:</span>{' '}
          <span>{DOCTOR_INFO.emergencyNotice}</span>
        </div>
      </div>
    </div>
  );
};
