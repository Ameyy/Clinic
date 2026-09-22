import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Building2,
  CheckCircle2,
  AlertCircle,
  Download,
  User,
  Mail,
  Phone,
  FileText,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  CalendarPlus,
} from 'lucide-react';
import { MEDICAL_SERVICES, DOCTOR_INFO } from '../data/doctorData';
import { Appointment, VisitType } from '../types';
import {
  getUpcomingDays,
  TIME_SLOTS,
  generateConfirmationCode,
  downloadIcsCalendar,
  DaySlot,
} from '../utils/calendar';

interface BookingSystemProps {
  initialServiceId?: string;
  onAppointmentCreated: (appointment: Appointment) => void;
  onViewMyAppointments: () => void;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({
  initialServiceId,
  onAppointmentCreated,
  onViewMyAppointments,
}) => {
  // Step state: 1 = Service, 2 = Date & Time, 3 = Patient Details, 4 = Confirmation
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form selections
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || MEDICAL_SERVICES[0].id
  );
  const [visitType, setVisitType] = useState<VisitType>('in-person');

  // Days and slots
  const [upcomingDays, setUpcomingDays] = useState<DaySlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  // Patient Info
  const [patientName, setPatientName] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [insuranceProvider, setInsuranceProvider] = useState<string>(DOCTOR_INFO.insurances[0]);
  const [reason, setReason] = useState<string>('');
  const [isNewPatient, setIsNewPatient] = useState<boolean>(true);

  // Errors & Confirmation
  const [formError, setFormError] = useState<string>('');
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Initialize available days
  useEffect(() => {
    const days = getUpcomingDays(14);
    setUpcomingDays(days);
    // Find first available day
    const firstAvailable = days.find((d) => d.isAvailable);
    if (firstAvailable) {
      setSelectedDate(firstAvailable.dateString);
    }
  }, []);

  // Update selected service if prop changes
  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
      // Auto-adjust visit type if service is strictly telehealth
      if (initialServiceId === 'telehealth-consult') {
        setVisitType('telehealth');
      }
    }
  }, [initialServiceId]);

  const selectedService = MEDICAL_SERVICES.find((s) => s.id === selectedServiceId) || MEDICAL_SERVICES[0];

  const handleStep1Next = () => {
    setFormError('');
    setCurrentStep(2);
  };

  const handleStep2Next = () => {
    if (!selectedDate) {
      setFormError('Please select an appointment date.');
      return;
    }
    if (!selectedTimeSlot) {
      setFormError('Please select a convenient time slot.');
      return;
    }
    setFormError('');
    setCurrentStep(3);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!patientName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!patientEmail.trim() || !patientEmail.includes('@')) {
      setFormError('Please provide a valid email address for confirmation.');
      return;
    }
    if (!patientPhone.trim() || patientPhone.length < 7) {
      setFormError('Please enter a valid contact phone number.');
      return;
    }

    const newAppointment: Appointment = {
      id: 'apt-' + Date.now(),
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      visitType,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      patientName: patientName.trim(),
      patientEmail: patientEmail.trim(),
      patientPhone: patientPhone.trim(),
      insuranceProvider,
      reason: reason.trim() || 'General health consultation',
      isNewPatient,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      confirmationCode: generateConfirmationCode(),
    };

    setConfirmedAppointment(newAppointment);
    onAppointmentCreated(newAppointment);
    setCurrentStep(4);
  };

  const handleResetForNew = () => {
    setCurrentStep(1);
    setSelectedTimeSlot('');
    setPatientName('');
    setPatientEmail('');
    setPatientPhone('');
    setReason('');
    setConfirmedAppointment(null);
  };

  return (
    <section id="booking" className="py-16 sm:py-20 bg-stone-50/70 border-b border-stone-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-900 text-xs font-semibold">
            <CalendarIcon className="w-3.5 h-3.5 text-emerald-700" />
            <span>Intuitive Direct Scheduling</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-stone-900 tracking-tight">
            Schedule Your Consultation
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Reserve dedicated time with {DOCTOR_INFO.name}. Choose between an in-person visit at our Indiranagar clinic in Bengaluru or a secure telehealth appointment.
          </p>
        </div>

        {/* Multi-Step Card Container */}
        <div className="bg-white rounded-2xl shadow-md border border-stone-200/90 overflow-hidden">
          
          {/* Step Progress Bar Header */}
          <div className="border-b border-stone-100 bg-stone-50/50 px-6 py-4">
            <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-center">
              <div
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-colors ${
                  currentStep >= 1 ? 'text-emerald-900 bg-emerald-50' : 'text-stone-400'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  currentStep >= 1 ? 'bg-[#0f2b26] text-white' : 'bg-stone-200 text-stone-600'
                }`}>
                  1
                </span>
                <span className="hidden sm:inline">Select Care</span>
              </div>

              <div
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-colors ${
                  currentStep >= 2 ? 'text-emerald-900 bg-emerald-50' : 'text-stone-400'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  currentStep >= 2 ? 'bg-[#0f2b26] text-white' : 'bg-stone-200 text-stone-600'
                }`}>
                  2
                </span>
                <span className="hidden sm:inline">Date & Time</span>
              </div>

              <div
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-colors ${
                  currentStep >= 3 ? 'text-emerald-900 bg-emerald-50' : 'text-stone-400'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  currentStep >= 3 ? 'bg-[#0f2b26] text-white' : 'bg-stone-200 text-stone-600'
                }`}>
                  3
                </span>
                <span className="hidden sm:inline">Patient Info</span>
              </div>

              <div
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-colors ${
                  currentStep >= 4 ? 'text-emerald-900 bg-emerald-50' : 'text-stone-400'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  currentStep >= 4 ? 'bg-[#0f2b26] text-white' : 'bg-stone-200 text-stone-600'
                }`}>
                  4
                </span>
                <span className="hidden sm:inline">Confirmed</span>
              </div>
            </div>
          </div>

          {/* Form Content Area */}
          <div className="p-6 sm:p-8">

            {formError && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Action Required</p>
                  <p className="text-xs text-rose-700">{formError}</p>
                </div>
              </div>
            )}

            {/* STEP 1: Service & Visit Type Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-stone-900">Step 1: Choose Consultation Type & Setting</h3>
                  <p className="text-xs text-stone-500 mt-0.5">Select the medical service that best aligns with your current priorities.</p>
                </div>

                {/* Visit Type Switcher */}
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  <button
                    type="button"
                    onClick={() => setVisitType('in-person')}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                      visitType === 'in-person'
                        ? 'border-emerald-800 bg-emerald-50/70 text-stone-900 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${visitType === 'in-person' ? 'bg-[#0f2b26] text-white' : 'bg-stone-100 text-stone-600'}`}>
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">In-Person Clinic</div>
                      <div className="text-[11px] text-stone-500">Bengaluru, KA</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisitType('telehealth')}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                      visitType === 'telehealth'
                        ? 'border-emerald-800 bg-emerald-50/70 text-stone-900 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${visitType === 'telehealth' ? 'bg-[#0f2b26] text-white' : 'bg-stone-100 text-stone-600'}`}>
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">Telehealth Video</div>
                      <div className="text-[11px] text-stone-500">Pan-India Video</div>
                    </div>
                  </button>
                </div>

                {/* Service Cards Radio Grid */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    Available Consultation Services
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {MEDICAL_SERVICES.map((srv) => {
                      const isSelected = selectedServiceId === srv.id;
                      return (
                        <div
                          key={srv.id}
                          onClick={() => setSelectedServiceId(srv.id)}
                          className={`cursor-pointer p-4 rounded-xl border transition-all relative ${
                            isSelected
                              ? 'border-emerald-800 bg-emerald-50/40 ring-1 ring-emerald-800/40 shadow-xs'
                              : 'border-stone-200 hover:border-stone-300 bg-white'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-stone-900">{srv.name}</h4>
                              </div>
                              <p className="text-xs text-stone-500 line-clamp-2 mt-1">{srv.description}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-sm font-bold text-stone-900">₹{srv.price.toLocaleString('en-IN')}</span>
                              <div className="text-[11px] text-stone-400 font-medium">{srv.durationMinutes} min</div>
                            </div>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
                            <span className="text-stone-500 text-[11px] font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3 text-stone-400" />
                              Unhurried 1-on-1 visit
                            </span>
                            {srv.badge && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                                {srv.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 1 Actions */}
                <div className="pt-4 flex items-center justify-between border-t border-stone-100">
                  <div className="text-xs text-stone-500">
                    Selected: <span className="font-semibold text-stone-800">{selectedService.name}</span> ({selectedService.durationMinutes} min)
                  </div>
                  <button
                    type="button"
                    onClick={handleStep1Next}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#0f2b26] hover:bg-[#19463e] text-white text-sm font-semibold rounded-xl shadow transition-colors cursor-pointer"
                  >
                    <span>Continue to Date & Time</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Interactive Date & Time Picker */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-stone-900">Step 2: Choose Your Date & Time Slot</h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Showing available openings for <span className="font-semibold text-stone-800">{selectedService.name}</span> with {DOCTOR_INFO.name}.
                  </p>
                </div>

                {/* Date Strip Picker */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    Select Day (Upcoming 14 Days)
                  </label>
                  <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                    {upcomingDays.map((day) => {
                      const isSelected = selectedDate === day.dateString;
                      return (
                        <button
                          key={day.dateString}
                          type="button"
                          disabled={!day.isAvailable}
                          onClick={() => {
                            setSelectedDate(day.dateString);
                            setSelectedTimeSlot(''); // Reset slot on date switch
                          }}
                          className={`shrink-0 w-20 py-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                            !day.isAvailable
                              ? 'bg-stone-50 border-stone-200/60 opacity-40 cursor-not-allowed text-stone-400'
                              : isSelected
                              ? 'bg-[#0f2b26] border-[#0f2b26] text-white shadow-sm'
                              : 'bg-white border-stone-200 hover:border-stone-300 text-stone-700'
                          }`}
                        >
                          <span className="text-[11px] font-semibold uppercase">{day.dayName}</span>
                          <span className="text-lg font-serif-display font-bold leading-tight my-0.5">{day.dayNumber}</span>
                          <span className="text-[10px] opacity-80">{day.monthName}</span>
                          {day.isAvailable && (
                            <span
                              className={`mt-1 text-[9px] px-1.5 py-0.2 rounded font-medium ${
                                isSelected ? 'bg-emerald-900 text-emerald-200' : 'bg-emerald-50 text-emerald-700'
                              }`}
                            >
                              {day.slotsCount} slots
                            </span>
                          )}
                          {!day.isAvailable && (
                            <span className="mt-1 text-[9px] text-stone-400">Closed</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots Groups */}
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-stone-600 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>Morning Openings</span>
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {TIME_SLOTS.morning.map((slot) => {
                        const isSelected = selectedTimeSlot === slot.time;
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot.time)}
                            className={`py-3 px-3 rounded-xl border text-sm font-semibold flex items-center justify-between transition-all ${
                              isSelected
                                ? 'bg-emerald-800 border-emerald-800 text-white shadow-xs'
                                : 'bg-white border-stone-200 hover:border-emerald-700 hover:bg-emerald-50/30 text-stone-800'
                            }`}
                          >
                            <span>{slot.time}</span>
                            {slot.popular && (
                              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${isSelected ? 'bg-emerald-900 text-emerald-200' : 'bg-emerald-50 text-emerald-800'}`}>
                                Popular
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-semibold text-stone-600 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>Afternoon Openings</span>
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {TIME_SLOTS.afternoon.map((slot) => {
                        const isSelected = selectedTimeSlot === slot.time;
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot.time)}
                            className={`py-3 px-3 rounded-xl border text-sm font-semibold flex items-center justify-between transition-all ${
                              isSelected
                                ? 'bg-emerald-800 border-emerald-800 text-white shadow-xs'
                                : 'bg-white border-stone-200 hover:border-emerald-700 hover:bg-emerald-50/30 text-stone-800'
                            }`}
                          >
                            <span>{slot.time}</span>
                            {slot.popular && (
                              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${isSelected ? 'bg-emerald-900 text-emerald-200' : 'bg-emerald-50 text-emerald-800'}`}>
                                Popular
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Step 2 Actions */}
                <div className="pt-4 flex items-center justify-between border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Services</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleStep2Next}
                    disabled={!selectedTimeSlot}
                    className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl shadow transition-colors ${
                      selectedTimeSlot
                        ? 'bg-[#0f2b26] hover:bg-[#19463e] text-white cursor-pointer'
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    <span>Continue to Patient Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Patient Intake Form */}
            {currentStep === 3 && (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-stone-900">Step 3: Patient Information & Visit Context</h3>
                  <p className="text-xs text-stone-500 mt-0.5">Your records are confidential and stored in compliance with Indian digital health guidelines.</p>
                </div>

                {/* Patient status: New vs Returning */}
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="text-stone-600">Patient Relationship:</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="patientStatus"
                      checked={isNewPatient}
                      onChange={() => setIsNewPatient(true)}
                      className="text-emerald-700 focus:ring-emerald-700"
                    />
                    <span>New Patient (First Visit)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="patientStatus"
                      checked={!isNewPatient}
                      onChange={() => setIsNewPatient(false)}
                      className="text-emerald-700 focus:ring-emerald-700"
                    />
                    <span>Returning Patient</span>
                  </label>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-stone-400" />
                      <span>Full Legal Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kulkarni"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <span>Email Address (for confirmation) *</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ramesh@example.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <span>Mobile Phone (for WhatsApp / SMS reminder) *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98450 12345"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                      <span>Insurance Provider / Payment Option</span>
                    </label>
                    <select
                      value={insuranceProvider}
                      onChange={(e) => setInsuranceProvider(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none transition-all bg-white"
                    >
                      {DOCTOR_INFO.insurances.map((ins) => (
                        <option key={ins} value={ins}>
                          {ins}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-stone-400" />
                    <span>Primary Health Focus or Chief Symptoms</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe what you'd like Dr. Sharma to focus on (e.g. elevated ApoB / cholesterol review, fatigue, HbA1c review, preventive baseline, medication review)..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none transition-all"
                  />
                </div>

                {/* Appointment Summary Snapshot */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-1.5">
                  <div className="font-semibold text-stone-900">Visit Summary:</div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1">
                    <span>
                      Service: <strong className="text-stone-900">{selectedService.name}</strong>
                    </span>
                    <span>
                      Setting: <strong className="text-stone-900">{visitType === 'in-person' ? 'In-Person (Bengaluru)' : 'Pan-India Telehealth Video'}</strong>
                    </span>
                    <span>
                      Time: <strong className="text-stone-900">{selectedDate} at {selectedTimeSlot}</strong>
                    </span>
                    <span>
                      Fee: <strong className="text-emerald-800">₹{selectedService.price.toLocaleString('en-IN')}</strong>
                    </span>
                  </div>
                </div>

                {/* Step 3 Actions */}
                <div className="pt-4 flex items-center justify-between border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Date & Time</span>
                  </button>

                  <button
                    type="submit"
                    id="submit-booking-btn"
                    className="flex items-center gap-2 px-7 py-3 bg-[#0f2b26] hover:bg-[#19463e] text-white text-sm font-bold rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Confirm & Book Appointment</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: Instant Confirmation & Management */}
            {currentStep === 4 && confirmedAppointment && (
              <div className="space-y-6 text-center sm:text-left">
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200/80">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-200/60 text-emerald-900 text-xs font-bold">
                        Confirmation #{confirmedAppointment.confirmationCode}
                      </div>
                      <h3 className="text-2xl font-serif-display font-bold text-stone-900">
                        Appointment Confirmed with {DOCTOR_INFO.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600">
                        A detailed confirmation email and SMS / WhatsApp calendar invite have been dispatched to{' '}
                        <strong className="text-stone-900">{confirmedAppointment.patientEmail}</strong>.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Appointment Card Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2 text-xs">
                    <div className="font-semibold text-stone-900 uppercase tracking-wider text-[10px] text-emerald-800">
                      Appointment Specifications
                    </div>
                    <div className="space-y-1.5 text-stone-700">
                      <p>
                        <strong className="text-stone-900">Patient:</strong> {confirmedAppointment.patientName}
                      </p>
                      <p>
                        <strong className="text-stone-900">Service:</strong> {confirmedAppointment.serviceName}
                      </p>
                      <p>
                        <strong className="text-stone-900">Date & Time:</strong> {confirmedAppointment.date} at {confirmedAppointment.timeSlot}
                      </p>
                      <p>
                        <strong className="text-stone-900">Format:</strong>{' '}
                        {confirmedAppointment.visitType === 'in-person' ? 'In-Person Consultation' : 'HD Encrypted Telehealth'}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2 text-xs">
                    <div className="font-semibold text-stone-900 uppercase tracking-wider text-[10px] text-emerald-800">
                      Location & Instructions
                    </div>
                    <div className="space-y-1.5 text-stone-700">
                      {confirmedAppointment.visitType === 'in-person' ? (
                        <>
                          <p>
                            <strong className="text-stone-900">Clinic Address:</strong>
                            <br />
                            {DOCTOR_INFO.clinicName}
                            <br />
                            {DOCTOR_INFO.address}, {DOCTOR_INFO.cityStateZip}
                          </p>
                          <p className="text-stone-500 text-[11px]">Valet and basement parking available at building entrance.</p>
                        </>
                      ) : (
                        <>
                          <p>
                            <strong className="text-stone-900">Telehealth Video Link:</strong>
                            <br />
                            A secure, one-click video room link has been sent to your email. No software download required.
                          </p>
                          <p className="text-stone-500 text-[11px]">Please log on 5 minutes prior from a quiet, well-lit room.</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Calendar & Next Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => downloadIcsCalendar(confirmedAppointment)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#0f2b26] hover:bg-[#18443c] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-emerald-300" />
                    <span>Download Calendar (.ICS)</span>
                  </button>

                  <button
                    type="button"
                    onClick={onViewMyAppointments}
                    className="flex items-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    <CalendarPlus className="w-4 h-4 text-stone-600" />
                    <span>View in My Visits</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetForNew}
                    className="flex items-center gap-1.5 px-3 py-2.5 text-stone-500 hover:text-stone-800 text-xs font-medium ml-auto"
                  >
                    <span>Book Another Consultation</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
