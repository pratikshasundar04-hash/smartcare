import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/lib/theme';
import { AuthProvider } from '@/lib/auth';
import { ScrollToTop } from '@/components/ScrollToTop';
import { PublicLayout } from '@/components/PublicLayout';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Services } from '@/pages/Services';
import { Treatments } from '@/pages/Treatments';
import { Doctors } from '@/pages/Doctors';
import { DoctorProfile } from '@/pages/DoctorProfile';
import { Locations } from '@/pages/Locations';
import { Contact } from '@/pages/Contact';
import { BookAppointment } from '@/pages/BookAppointment';
import { Privacy, Terms } from '@/pages/Legal';
import { ErpPortal } from '@/pages/erp/ErpPortal';
import { ErpLogin } from '@/pages/erp/ErpLogin';
import { AdminDashboard } from '@/pages/erp/AdminDashboard';
import { DoctorDashboard } from '@/pages/erp/DoctorDashboard';
import { PatientDashboard } from '@/pages/erp/PatientDashboard';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public site */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/treatments" element={<Treatments />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/doctors/:slug" element={<DoctorProfile />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book-appointment" element={<BookAppointment />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Route>

            {/* ERP portal */}
            <Route path="/erp" element={<ErpPortal />} />
            <Route path="/erp/admin/login" element={<ErpLogin role="admin" />} />
            <Route path="/erp/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/erp/doctor/login" element={<ErpLogin role="doctor" />} />
            <Route path="/erp/doctor/dashboard" element={<ProtectedRoute role="doctor"><DoctorDashboard /></ProtectedRoute>} />
            <Route path="/erp/patient/login" element={<ErpLogin role="patient" />} />
            <Route path="/erp/patient/dashboard" element={<ProtectedRoute role="patient"><PatientDashboard /></ProtectedRoute>} />

            <Route path="*" element={<div className="flex min-h-screen flex-col items-center justify-center bg-brand-900 text-center text-white"><h1 className="text-3xl font-bold">404 — Page Not Found</h1><a href="/" className="mt-4 text-brand-300 hover:text-white">Go home</a></div>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
