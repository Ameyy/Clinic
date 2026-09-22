import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MyAppointmentsModal } from './components/MyAppointmentsModal';
import { HomePage } from './components/pages/HomePage';
import { ServicesPage } from './components/pages/ServicesPage';
import { AboutPage } from './components/pages/AboutPage';
import { BookingPage } from './components/pages/BookingPage';
import { TestimonialsPage } from './components/pages/TestimonialsPage';
import { BlogPage } from './components/pages/BlogPage';
import { ContactPage } from './components/pages/ContactPage';
import { Appointment, PageId } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);

  // Appointments state with localStorage persistence
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('vance_doctor_appointments');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read saved appointments from localStorage', e);
    }
    // Default sample appointment to showcase "My Visits" management immediately
    return [
      {
        id: 'apt-sample-1',
        serviceId: 'comprehensive-annual',
        serviceName: 'Comprehensive Preventive Health Assessment',
        visitType: 'in-person',
        date: '2026-09-24',
        timeSlot: '09:45 AM',
        patientName: 'Alex Rivera',
        patientEmail: 'alex.rivera@example.com',
        patientPhone: '(650) 555-0199',
        insuranceProvider: 'Blue Cross Blue Shield / Anthem',
        reason: 'Annual executive preventive baseline and lipid particle review',
        isNewPatient: false,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        confirmationCode: 'VA-94281',
      },
    ];
  });

  const [isAppointmentsModalOpen, setIsAppointmentsModalOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vance_doctor_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.warn('Could not persist appointments to localStorage', e);
    }
  }, [appointments]);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) {
      setPreselectedServiceId(serviceId);
    }
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAppointmentCreated = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt))
    );
  };

  const activeConfirmedCount = appointments.filter((a) => a.status === 'confirmed').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#fafcfa] text-slate-900 selection:bg-[#b5f63d] selection:text-[#0c2423]">
      {/* Multipage Sticky Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        onOpenMyAppointments={() => setIsAppointmentsModalOpen(true)}
        appointmentCount={activeConfirmedCount}
      />

      {/* Multipage Main Content View with Animated Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {currentPage === 'home' && (
              <HomePage
                onOpenBooking={handleOpenBooking}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'services' && (
              <ServicesPage
                onOpenBooking={handleOpenBooking}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage
                onOpenBooking={() => handleOpenBooking()}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'booking' && (
              <BookingPage
                initialServiceId={preselectedServiceId}
                onAppointmentCreated={handleAppointmentCreated}
                onViewMyAppointments={() => setIsAppointmentsModalOpen(true)}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'testimonials' && (
              <TestimonialsPage
                onOpenBooking={() => handleOpenBooking()}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'blog' && (
              <BlogPage
                onOpenBooking={() => handleOpenBooking()}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'contact' && (
              <ContactPage
                onOpenBooking={() => handleOpenBooking()}
                onNavigate={handleNavigate}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Multipage Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyAppointments={() => setIsAppointmentsModalOpen(true)}
      />

      {/* "My Visits" Modal */}
      <MyAppointmentsModal
        isOpen={isAppointmentsModalOpen}
        onClose={() => setIsAppointmentsModalOpen(false)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        onBookNew={() => {
          setIsAppointmentsModalOpen(false);
          handleOpenBooking();
        }}
      />
    </div>
  );
}
