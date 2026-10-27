export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';

export interface Appointment {
  id: string;
  booking_ref: string;
  patient_name: string;
  patient_age: number | null;
  phone: string;
  email: string;
  department: string;
  doctor_slug: string;
  doctor_name: string;
  location: string;
  appt_date: string;
  time_slot: string;
  reason: string | null;
  consultation_type: string;
  status: AppointmentStatus;
  created_at: string;
}

export interface Doctor {
  slug: string;
  name: string;
  title: string;
  specialization: string;
  department: string;
  qualifications: string;
  experience: string;
  bio: string;
  photo: string;
  availability: string;
  slots: string[];
  days: string[];
  rating: number;
  location: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  details: string;
  relatedDoctors: string[];
  consultationInfo: string;
}

export interface Treatment {
  id: string;
  name: string;
  category: string;
  specialty: string;
  description: string;
  department: string;
  recovery: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  departments: string[];
  mapQuery: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}
