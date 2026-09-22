export type VisitType = 'in-person' | 'telehealth';

export type PageId = 'home' | 'services' | 'about' | 'booking' | 'testimonials' | 'blog' | 'contact';

export interface MedicalService {
  id: string;
  name: string;
  category: 'preventive' | 'cardiology' | 'metabolic' | 'longevity' | 'telehealth';
  durationMinutes: number;
  price: number;
  description: string;
  badge?: string;
  recommendedFor: string;
  imageUrl?: string;
  includedItems: string[];
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  visitType: VisitType;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  insuranceProvider: string;
  reason: string;
  isNewPatient: boolean;
  status: 'confirmed' | 'rescheduled' | 'cancelled';
  createdAt: string;
  confirmationCode: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  location: string;
  rating: number;
  date: string;
  condition: string;
  category: 'all' | 'preventive' | 'cardiology' | 'longevity' | 'telehealth';
  reviewText: string;
  verified: boolean;
  avatarBg: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: 'Cardiology' | 'Metabolism & Longevity' | 'Lifestyle Medicine' | 'Preventive Care';
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  imageUrl?: string;
  tags: string[];
  keyTakeaways: string[];
  citationNote?: string;
}

export interface DoctorInfo {
  name: string;
  title: string;
  degrees: string;
  specialties: string[];
  clinicName: string;
  address: string;
  cityStateZip: string;
  phone: string;
  email: string;
  emergencyNotice: string;
  currencySymbol: string;
  currencyCode: string;
  hours: {
    dayRange: string;
    time: string;
  }[];
  insurances: string[];
}
