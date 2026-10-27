import type { Doctor, Notification } from './types';

// Demo data for dashboards — clearly labelled in UI as sample data

export interface DoctorWorkload {
  slug: string;
  name: string;
  specialization: string;
  capacity: number;       // max appointments per day
  scheduled: number;      // appointments today
  utilization: number;    // percentage
  status: 'optimal' | 'high' | 'critical' | 'low';
}

export const doctorWorkloads: DoctorWorkload[] = [
  { slug: 'dr-priya-sharma', name: 'Dr. Priya Sharma', specialization: 'Cardiology', capacity: 20, scheduled: 18, utilization: 90, status: 'high' },
  { slug: 'dr-arun-kumar', name: 'Dr. Arun Kumar', specialization: 'Neurology', capacity: 15, scheduled: 14, utilization: 93, status: 'critical' },
  { slug: 'dr-meena-rao', name: 'Dr. Meena Rao', specialization: 'General Medicine', capacity: 24, scheduled: 10, utilization: 42, status: 'low' },
  { slug: 'dr-rohan-verma', name: 'Dr. Rohan Verma', specialization: 'Orthopedics', capacity: 18, scheduled: 15, utilization: 83, status: 'high' },
  { slug: 'dr-anita-desai', name: 'Dr. Anita Desai', specialization: 'Pediatrics', capacity: 22, scheduled: 16, utilization: 73, status: 'optimal' },
  { slug: 'dr-sanjay-gupta', name: 'Dr. Sanjay Gupta', specialization: 'General Surgery', capacity: 12, scheduled: 7, utilization: 58, status: 'optimal' },
  { slug: 'dr-lata-menon', name: 'Dr. Lata Menon', specialization: 'Dermatology', capacity: 20, scheduled: 12, utilization: 60, status: 'optimal' },
  { slug: 'dr-vikram-nair', name: 'Dr. Vikram Nair', specialization: 'Gynecology', capacity: 16, scheduled: 9, utilization: 56, status: 'optimal' },
];

export interface DemoAppointment {
  id: string;
  ref: string;
  patient: string;
  doctorSlug: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  reason: string;
}

export const demoAppointments: DemoAppointment[] = [
  { id: 'a1', ref: 'SC-A1B2C3D4', patient: 'Rajesh Mehta', doctorSlug: 'dr-priya-sharma', doctorName: 'Dr. Priya Sharma', department: 'Cardiology', date: '2026-10-26', time: '09:00 AM', status: 'confirmed', reason: 'Follow-up — chest pain' },
  { id: 'a2', ref: 'SC-E5F6G7H8', patient: 'Sneha Iyer', doctorSlug: 'dr-priya-sharma', doctorName: 'Dr. Priya Sharma', department: 'Cardiology', date: '2026-10-26', time: '09:30 AM', status: 'pending', reason: 'ECG review' },
  { id: 'a3', ref: 'SC-I9J0K1L2', patient: 'Aditya Nair', doctorSlug: 'dr-priya-sharma', doctorName: 'Dr. Priya Sharma', department: 'Cardiology', date: '2026-10-26', time: '10:00 AM', status: 'completed', reason: 'Routine check-up' },
  { id: 'a4', ref: 'SC-M3N4O5P6', patient: 'Kavita Shah', doctorSlug: 'dr-arun-kumar', doctorName: 'Dr. Arun Kumar', department: 'Neurology', date: '2026-10-26', time: '10:30 AM', status: 'confirmed', reason: 'Migraine evaluation' },
  { id: 'a5', ref: 'SC-Q7R8S9T0', patient: 'Vikram Joshi', doctorSlug: 'dr-arun-kumar', doctorName: 'Dr. Arun Kumar', department: 'Neurology', date: '2026-10-26', time: '11:30 AM', status: 'pending', reason: 'Post-surgery review' },
  { id: 'a6', ref: 'SC-U1V2W3X4', patient: 'Priya Reddy', doctorSlug: 'dr-meena-rao', doctorName: 'Dr. Meena Rao', department: 'General Medicine', date: '2026-10-26', time: '08:00 AM', status: 'completed', reason: 'Diabetes management' },
  { id: 'a7', ref: 'SC-Y5Z6A7B8', patient: 'Arjun Singh', doctorSlug: 'dr-rohan-verma', doctorName: 'Dr. Rohan Verma', department: 'Orthopedics', date: '2026-10-26', time: '11:00 AM', status: 'confirmed', reason: 'Knee pain' },
  { id: 'a8', ref: 'SC-C9D0E1F2', patient: 'Meera Kapoor', doctorSlug: 'dr-anita-desai', doctorName: 'Dr. Anita Desai', department: 'Pediatrics', date: '2026-10-26', time: '09:30 AM', status: 'cancelled', reason: 'Vaccination' },
  { id: 'a9', ref: 'SC-G3H4I5J6', patient: 'Suresh Patel', doctorSlug: 'dr-priya-sharma', doctorName: 'Dr. Priya Sharma', department: 'Cardiology', date: '2026-10-27', time: '09:00 AM', status: 'pending', reason: 'BP monitoring' },
  { id: 'a10', ref: 'SC-K7L8M9N0', patient: 'Ananya Das', doctorSlug: 'dr-arun-kumar', doctorName: 'Dr. Arun Kumar', department: 'Neurology', date: '2026-10-27', time: '10:30 AM', status: 'confirmed', reason: 'Seizure follow-up' },
];

export const demoNotifications: Notification[] = [
  { id: 'n1', title: 'High workload alert', body: 'Dr. Arun Kumar is at 93% capacity. Consider reassignment.', time: '5 min ago', read: false, type: 'warning' },
  { id: 'n2', title: 'New appointment', body: 'Rajesh Mehta booked with Dr. Priya Sharma at 09:00 AM.', time: '20 min ago', read: false, type: 'info' },
  { id: 'n3', title: 'Appointment completed', body: 'Aditya Nair completed consultation with Dr. Priya Sharma.', time: '1 hour ago', read: true, type: 'success' },
  { id: 'n4', title: 'Leave request', body: 'Dr. Meena Rao requested leave on Friday.', time: '2 hours ago', read: false, type: 'warning' },
];

export interface AiRecommendation {
  id: string;
  type: 'reassign' | 'conflict' | 'capacity' | 'idle';
  priority: 'high' | 'medium' | 'low';
  title: string;
  reason: string;
  action: string;
  approved?: boolean;
}

export const aiRecommendations: AiRecommendation[] = [
  {
    id: 'r1',
    type: 'reassign',
    priority: 'high',
    title: 'Reassign appointment from Dr. Arun Kumar to Dr. Meena Rao',
    reason: 'Dr. Arun Kumar is at 93% of configured daily capacity (14/15). Dr. Meena Rao has available slots in the same specialty window (General Medicine covers neurology referrals) and is at 42% utilization.',
    action: 'Offer the patient Aditya Nair\'s 10:30 AM slot to Dr. Meena Rao at 08:30 AM.',
  },
  {
    id: 'r2',
    type: 'capacity',
    priority: 'medium',
    title: 'Dr. Priya Sharma approaching capacity',
    reason: 'Dr. Priya Sharma is at 90% of configured daily capacity (18/20). 2 slots remain. Consider blocking new bookings once capacity is reached.',
    action: 'Set a soft cap at 20 appointments and route overflow to Dr. Meena Rao.',
  },
  {
    id: 'r3',
    type: 'idle',
    priority: 'low',
    title: 'Underutilized availability detected',
    reason: 'Dr. Meena Rao has 14 unused slots today (42% utilization). Demand analysis suggests cardiology overflow could be routed here.',
    action: 'Cross-list Dr. Meena Rao for general cardiology referrals today.',
  },
  {
    id: 'r4',
    type: 'conflict',
    priority: 'high',
    title: 'Potential scheduling conflict',
    reason: 'Dr. Rohan Verma has 15 appointments scheduled but an orthopedics emergency may require 2 additional slots. Current utilization is 83%.',
    action: 'Pre-emptively move 2 routine cases to Dr. Sanjay Gupta (58% utilization).',
  },
];

export const weeklyAppointmentTrend = [
  { day: 'Mon', appts: 92, completed: 78, cancelled: 6 },
  { day: 'Tue', appts: 110, completed: 95, cancelled: 8 },
  { day: 'Wed', appts: 128, completed: 112, cancelled: 5 },
  { day: 'Thu', appts: 104, completed: 90, cancelled: 7 },
  { day: 'Fri', appts: 136, completed: 120, cancelled: 9 },
  { day: 'Sat', appts: 88, completed: 76, cancelled: 4 },
  { day: 'Sun', appts: 42, completed: 38, cancelled: 2 },
];

export const departmentDemand = [
  { name: 'Cardiology', value: 286 },
  { name: 'Neurology', value: 198 },
  { name: 'General Med', value: 245 },
  { name: 'Orthopedics', value: 172 },
  { name: 'Pediatrics', value: 156 },
  { name: 'Surgery', value: 134 },
];

// Heatmap: doctors (rows) x days (cols), value = utilization 0-100
export const workloadHeatmap: { doctor: string; values: number[] }[] = [
  { doctor: 'Dr. Priya', values: [85, 90, 95, 88, 92, 70, 40] },
  { doctor: 'Dr. Arun', values: [80, 88, 93, 90, 91, 75, 30] },
  { doctor: 'Dr. Meena', values: [42, 50, 45, 48, 52, 38, 20] },
  { doctor: 'Dr. Rohan', values: [70, 78, 83, 75, 82, 65, 35] },
  { doctor: 'Dr. Anita', values: [60, 68, 73, 70, 75, 55, 28] },
  { doctor: 'Dr. Sanjay', values: [45, 52, 58, 50, 55, 40, 18] },
];

export function getDoctorDemoAppointments(slug: string): DemoAppointment[] {
  return demoAppointments.filter((a) => a.doctorSlug === slug);
}

export function getPatientDemoAppointments(): DemoAppointment[] {
  return demoAppointments.slice(0, 5);
}

export const allDoctors: Doctor[] = []; // re-exported from data.ts where needed
