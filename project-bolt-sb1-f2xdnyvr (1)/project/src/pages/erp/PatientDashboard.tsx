import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, CalendarClock, CalendarPlus, UserSearch, Bell, UserCircle,
  CheckCircle2, Clock, XCircle, ArrowRight,
} from 'lucide-react';
import { DashboardShell } from '@/components/DashboardShell';
import { useAuth } from '@/lib/auth';
import { getPatientDemoAppointments } from '@/lib/demoData';

const nav = [
  { label: 'My Dashboard', key: 'dashboard', icon: LayoutDashboard },
  { label: 'My Appointments', key: 'appointments', icon: CalendarClock },
  { label: 'Book Appointment', key: 'book', icon: CalendarPlus },
  { label: 'Search Doctors', key: 'search', icon: UserSearch },
  { label: 'Notifications', key: 'notifications', icon: Bell },
  { label: 'My Profile', key: 'profile', icon: UserCircle },
];

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-brand-100 text-brand-700',
  completed: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
};

export function PatientDashboard() {
  const { demoUser } = useAuth();
  const [active, setActive] = useState('dashboard');
  const myAppts = getPatientDemoAppointments();
  const upcoming = myAppts.filter((a) => a.date >= '2026-10-26' && a.status !== 'cancelled' && a.status !== 'completed');
  const previous = myAppts.filter((a) => a.status === 'completed' || a.status === 'cancelled');
  const title = nav.find((n) => n.key === active)?.label ?? 'Dashboard';

  return (
    <DashboardShell role="patient" nav={nav} active={active} onNavigate={setActive} title={title}>
      {active === 'dashboard' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-gradient-to-r from-brand-500 to-brand-700 p-6 text-white">
            <h2 className="text-2xl font-bold">Welcome, {demoUser?.name ?? 'Patient'}</h2>
            <p className="mt-1 text-brand-100">Manage your appointments and health journey.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/book-appointment" className="btn-emerald"><CalendarPlus className="h-4 w-4" /> Book Appointment</Link>
              <Link to="/doctors" className="btn-outline border-white/30 bg-white/10 text-white hover:bg-white/20"><UserSearch className="h-4 w-4" /> Find a Doctor</Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Upcoming', value: upcoming.length, icon: CalendarClock, color: 'text-brand-600 bg-brand-50' },
              { label: 'Completed', value: previous.filter((a) => a.status === 'completed').length, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
              { label: 'Cancelled', value: previous.filter((a) => a.status === 'cancelled').length, icon: XCircle, color: 'text-red-600 bg-red-50' },
            ].map((s) => (
              <div key={s.label} className="card p-5">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-2xl font-extrabold text-brand-800 dark:text-white">{s.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="card p-6">
            <h3 className="font-bold text-brand-800 dark:text-white">Upcoming Appointments</h3>
            <div className="mt-4 space-y-2">
              {upcoming.length === 0 && <p className="text-sm text-gray-400">No upcoming appointments.</p>}
              {upcoming.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-xl border border-gray-100 p-3 dark:border-brand-700/40">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-brand-500" />
                    <div>
                      <p className="font-semibold text-brand-800 dark:text-white">{a.date} at {a.time}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{a.doctorName} • {a.department} • Ref: {a.ref}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusColors[a.status]}`}>{a.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {active === 'appointments' && (
        <div className="card overflow-hidden">
          <div className="border-b border-gray-100 p-5 dark:border-brand-700/40">
            <h3 className="font-bold text-brand-800 dark:text-white">My Appointments</h3>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-brand-50/60 text-left text-xs uppercase text-gray-500 dark:bg-brand-800/50">
              <tr><th className="px-4 py-3">Ref</th><th className="px-4 py-3">Doctor</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Time</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-brand-700/40">
              {myAppts.map((a) => (
                <tr key={a.id} className="hover:bg-brand-50/40 dark:hover:bg-brand-800/30">
                  <td className="px-4 py-3 font-mono text-xs text-brand-600">{a.ref}</td>
                  <td className="px-4 py-3 font-medium text-brand-800 dark:text-white">{a.doctorName}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{a.date}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{a.time}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusColors[a.status]}`}>{a.status}</span></td>
                  <td className="px-4 py-3">
                    {a.status === 'pending' || a.status === 'confirmed' ? (
                      <div className="flex gap-2">
                        <button className="text-xs font-semibold text-brand-600 hover:underline">Reschedule</button>
                        <button className="text-xs font-semibold text-red-500 hover:underline">Cancel</button>
                      </div>
                    ) : <span className="text-xs text-gray-400">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {active === 'book' && (
        <div className="card p-8 text-center">
          <CalendarPlus className="mx-auto h-12 w-12 text-emerald-500" />
          <h3 className="mt-4 text-xl font-bold text-brand-800 dark:text-white">Book a New Appointment</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Choose a department, doctor, and available time slot.</p>
          <Link to="/book-appointment" className="btn-emerald mt-5">
            Start Booking <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {active === 'search' && (
        <div className="card p-8 text-center">
          <UserSearch className="mx-auto h-12 w-12 text-brand-500" />
          <h3 className="mt-4 text-xl font-bold text-brand-800 dark:text-white">Find a Doctor</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Search by name, specialization, location, or available day.</p>
          <Link to="/doctors" className="btn-primary mt-5">
            Search Doctors <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {active === 'notifications' && (
        <div className="card p-6">
          <h3 className="font-bold text-brand-800 dark:text-white">Notifications</h3>
          <div className="mt-4 space-y-3">
            {[
              { title: 'Appointment confirmed', body: 'Your appointment with Dr. Priya Sharma is confirmed.', time: '1 hour ago' },
              { title: 'Reminder', body: 'You have an appointment tomorrow at 09:00 AM.', time: '3 hours ago' },
            ].map((n, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-gray-100 p-4 dark:border-brand-700/40">
                <Bell className="mt-0.5 h-5 w-5 text-brand-500" />
                <div>
                  <p className="font-semibold text-brand-800 dark:text-white">{n.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{n.body}</p>
                  <p className="mt-1 text-xs text-gray-400">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {active === 'profile' && (
        <div className="card p-6">
          <h3 className="font-bold text-brand-800 dark:text-white">My Profile</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div><label className="label">Full Name</label><input className="input" defaultValue={demoUser?.name ?? ''} /></div>
            <div><label className="label">Email</label><input className="input" defaultValue={demoUser?.email ?? ''} readOnly /></div>
            <div><label className="label">Phone</label><input className="input" placeholder="+91 98765 43210" /></div>
            <div><label className="label">Age</label><input className="input" placeholder="35" /></div>
          </div>
          <button className="btn-primary mt-5">Save Changes</button>
        </div>
      )}
    </DashboardShell>
  );
}
