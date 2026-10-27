import { Link } from 'react-router-dom';
import { Shield, Stethoscope, User, ArrowRight, Lock, Activity, CalendarClock, Users } from 'lucide-react';

const portals = [
  {
    role: 'admin',
    title: 'Admin Portal',
    desc: 'Manage doctors, patients, departments, schedules, appointments, and workload analytics.',
    icon: Shield,
    color: 'from-brand-500 to-brand-700',
    features: ['Doctor & patient management', 'Appointment oversight', 'Workload analytics', 'AI recommendations'],
    loginTo: '/erp/admin/login',
  },
  {
    role: 'doctor',
    title: 'Doctor Portal',
    desc: 'View personal appointments, schedules, workload, availability, and patient queues.',
    icon: Stethoscope,
    color: 'from-emerald-500 to-emerald-700',
    features: ['My appointments & schedule', 'Workload tracking', 'Patient queue', 'Leave requests'],
    loginTo: '/erp/doctor/login',
  },
  {
    role: 'patient',
    title: 'Patient Portal',
    desc: 'Book appointments, view personal bookings, manage requests, and access your information.',
    icon: User,
    color: 'from-brand-400 to-brand-600',
    features: ['Book & track appointments', 'Booking references', 'View status', 'Profile management'],
    loginTo: '/erp/patient/login',
  },
];

export function ErpPortal() {
  return (
    <div className="min-h-screen bg-brand-900 py-16">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center text-white">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-700/50 px-3 py-1 text-xs font-semibold text-brand-200">
            <Activity className="h-3.5 w-3.5" /> SmartCare Workload ERP
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Choose Your Portal</h1>
          <p className="mt-4 text-brand-200">Select the portal that matches your role. Each portal has secure, role-based access.</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {portals.map((p) => (
            <div key={p.role} className="group rounded-2xl bg-white p-7 shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:bg-brand-800">
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${p.color} text-white shadow-md`}>
                <p.icon className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-xl font-bold text-brand-800 dark:text-white">{p.title}</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{p.desc}</p>
              <ul className="mt-5 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-brand-800/80 dark:text-gray-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {f}
                  </li>
                ))}
              </ul>
              <Link to={p.loginTo} className="btn-primary mt-6 w-full">
                <Lock className="h-4 w-4" /> Login to {p.title.replace(' Portal', '')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-center text-brand-300">
          <span className="inline-flex items-center gap-2 text-sm"><Users className="h-4 w-4" /> 42 doctors</span>
          <span className="inline-flex items-center gap-2 text-sm"><CalendarClock className="h-4 w-4" /> 1,284 appointments</span>
          <span className="inline-flex items-center gap-2 text-sm"><Activity className="h-4 w-4" /> 74% avg workload</span>
        </div>

        <div className="mt-10 text-center">
          <Link to="/" className="text-sm font-semibold text-brand-300 hover:text-white">← Back to website</Link>
        </div>

        <p className="mt-8 text-center text-xs text-brand-400">
          Demo authentication — role sessions are stored locally for preview. Connect Supabase auth for secure persistence.
        </p>
      </div>
    </div>
  );
}
