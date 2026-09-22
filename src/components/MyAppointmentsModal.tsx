import React from 'react';
import { X, Calendar, Clock, Video, Building2, Download, Trash2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Appointment } from '../types';
import { downloadIcsCalendar } from '../utils/calendar';
import { DOCTOR_INFO } from '../data/doctorData';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onBookNew: () => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  onBookNew,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif-display">
                My Scheduled Consultations
              </h3>
              <p className="text-xs text-stone-500">
                Dr. Elena Vance • {DOCTOR_INFO.clinicName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {appointments.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-stone-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-semibold text-stone-900">No scheduled visits yet</h4>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  You haven't scheduled any consultations with Dr. Vance yet. Choose an open slot to get started.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onBookNew();
                }}
                className="px-5 py-2.5 bg-[#0f2b26] hover:bg-[#18443c] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                Schedule First Appointment
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.map((apt) => {
                const isCancelled = apt.status === 'cancelled';
                return (
                  <div
                    key={apt.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isCancelled
                        ? 'border-stone-200 bg-stone-50/60 opacity-60'
                        : 'border-emerald-200/80 bg-white shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isCancelled
                                ? 'bg-stone-200 text-stone-600'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {isCancelled ? 'Cancelled' : 'Confirmed'}
                          </span>
                          <span className="text-xs text-stone-400 font-mono">#{apt.confirmationCode}</span>
                        </div>
                        <h4 className="text-sm font-bold text-stone-900 mt-1">{apt.serviceName}</h4>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {!isCancelled && (
                          <button
                            type="button"
                            onClick={() => downloadIcsCalendar(apt)}
                            title="Add to Google / Apple Calendar"
                            className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 hover:text-stone-900 text-xs flex items-center gap-1"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">.ics</span>
                          </button>
                        )}
                        {!isCancelled && (
                          <button
                            type="button"
                            onClick={() => onCancelAppointment(apt.id)}
                            title="Cancel appointment"
                            className="p-1.5 rounded-lg border border-stone-200 hover:border-rose-200 hover:bg-rose-50 text-stone-400 hover:text-rose-600 text-xs"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>
                          {apt.date} at <strong>{apt.timeSlot}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {apt.visitType === 'in-person' ? (
                          <>
                            <Building2 className="w-3.5 h-3.5 text-stone-400" />
                            <span>In-Person: Palo Alto Clinic</span>
                          </>
                        ) : (
                          <>
                            <Video className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Virtual Telehealth Video</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 text-[11px] text-stone-500">
                      Patient: <strong className="text-stone-700">{apt.patientName}</strong> • {apt.insuranceProvider}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Need to reschedule? Call clinic at {DOCTOR_INFO.phone}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-200 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
