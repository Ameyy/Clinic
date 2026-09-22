import { Appointment } from '../types';

export interface DaySlot {
  dateString: string; // YYYY-MM-DD
  dayName: string;    // Mon, Tue, etc.
  dayNumber: number;  // 1-31
  monthName: string;  // Jan, Feb, Sep
  isAvailable: boolean;
  slotsCount: number;
}

export function getUpcomingDays(count: number = 14): DaySlot[] {
  const days: DaySlot[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const isSunday = d.getDay() === 0;
    const isSaturday = d.getDay() === 6;

    const dateString = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = d.getDate();
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });

    // Sunday clinic closed, Saturday telehealth limited
    const isAvailable = !isSunday;
    const slotsCount = isSunday ? 0 : isSaturday ? 4 : 8;

    days.push({
      dateString,
      dayName,
      dayNumber,
      monthName,
      isAvailable,
      slotsCount,
    });
  }

  return days;
}

export const TIME_SLOTS = {
  morning: [
    { time: '08:30 AM', popular: false },
    { time: '09:45 AM', popular: true },
    { time: '11:00 AM', popular: false },
  ],
  afternoon: [
    { time: '01:15 PM', popular: true },
    { time: '02:30 PM', popular: false },
    { time: '03:45 PM', popular: true },
    { time: '04:45 PM', popular: false },
  ],
};

export function generateConfirmationCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'AS-';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function downloadIcsCalendar(appointment: Appointment) {
  const title = `Medical Consultation: ${appointment.serviceName} with Dr. Ananya Sharma`;
  const description = `Appointment with Dr. Ananya Sharma, MD\\nService: ${appointment.serviceName}\\nVisit Type: ${appointment.visitType === 'in-person' ? 'In-Person Clinic (Indiranagar, Bengaluru)' : 'Pan-India Telehealth Video Call'}\\nConfirmation Code: ${appointment.confirmationCode}\\nPhone: +91 80 4920 8800`;
  const location = appointment.visitType === 'in-person' 
    ? 'Plot 42, 100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038' 
    : 'Dr. Sharma Encrypted Video Room (Link in Confirmation)';

  // Parse date and timeSlot
  // Example: 2026-09-21 and 09:45 AM
  const [year, month, day] = appointment.date.split('-').map(Number);
  let [time, modifier] = appointment.timeSlot.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  const startDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration default

  const formatUtc = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dr. Ananya Sharma MD//Appointment Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${appointment.id}@auramedicine.in`,
    `DTSTAMP:${formatUtc(new Date())}`,
    `DTSTART:${formatUtc(startDate)}`,
    `DTEND:${formatUtc(endDate)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `appointment-${appointment.confirmationCode}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
