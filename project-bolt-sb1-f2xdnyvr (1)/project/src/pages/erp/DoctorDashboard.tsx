import { useState } from 'react';
import {
  LayoutDashboard, CalendarClock, CalendarDays, TrendingUp, Users,
  UserCircle, Bell, CheckCircle2, Clock, XCircle, CalendarOff, ArrowRight,
} from 'lucide-react';
import { DashboardShell } from '@/components/DashboardShell';
import { useAuth } from '@/lib/auth';
import { doctors } from '@/lib/data';
import { getDoctorDemoAppointments, doctorWorkloads } from '@/lib/demoData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const nav = [
  { label: 'My Dashboard', key: 'dashboard', icon: LayoutDashboard },
  { label: 'My Appointments', key: 'appointments', icon: CalendarClock },
  { label: 'My Schedule', key: 'schedule', icon: CalendarDays },
  { label: 'My Workload', key: 'workload', icon: TrendingUp },
  { label: 'Patient Queue', key: 'queue', icon: Users },
  { label: 'My Profile', key: 'profile', icon: UserCircle },
  { label: 'Notifications', key: 'notifications', icon: Bell },
];

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-brand-100 text-brand-700',
  completed: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
};

export function DoctorDashboard() {
  const { demoUser } = useAuth();
  const [active, setActive] = useState('dashboard');
  const doctor = doctors.find((d) => d.slug === demoUser?.doctorSlug) ?? doctors[0];
  const myAppointments = getDoctorDemoAppointments(doctor.slug);
  const workload = doctorWorkloads.find((w) => w.slug === doctor.slug);

  const today = myAppointments.filter((a) => a.date === '2026-10-26');
  const upcoming = myAppointments.filter((a) => a.date > '2026-10-26');
  const completed = myAppointments.filter((a) => a.status === 'completed');

  const title = nav.find((n) => n.key === active)?.label ?? 'Dashboard';

  const weeklyData = [
    { day: 'Mon', appts: 15 }, { day: 'Tue', appts: 17 }, { day: 'Wed', appts: 14 },
    { day: 'Thu', appts: 16 }, { day: 'Fri', appts: 18 }, { day: 'Sat', appts: 10 }, { day: 'Sun', appts: 0 },
  ];

  return (
    <DashboardShell role="doctor" nav={nav} active={active} onNavigate={setActive} title={title}>
      {active === 'dashboard' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-gradient-to-r from-brand-600 to-brand-800 p-6 text-white">
            <h2 className="text-2xl font-bold">Welcome, {doctor.name}</h2>
            <p className="mt-1 text-brand-100">{doctor.specialization} • {doctor.location}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <span className="rounded-lg bg-white/10 px-3 py-1.5">{today.length} appointments today</span>
              <span className="rounded-lg bg-white/10 px-3 py-1.5">{upcoming.length} upcoming</span>
              <span className="rounded-lg bg-white/10 px-3 py-1.5">{workload?.utilization}% workload</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Today's Appointments", value: today.length, icon: CalendarClock, color: 'text-brand-600 bg-brand-50' },
              { label: 'Upcoming', value: upcoming.length, icon: CalendarDays, color: 'text-emerald-600 bg-emerald-50' },
              { label: 'Completed', value: completed.length, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
              { label: 'Workload', value: `${workload?.utilization}%`, icon: TrendingUp, color: 'text-amber-600 bg-amber-50' },
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
            <h3 className="font-bold text-brand-800 dark:text-white">Today's Appointments</h3>
            <div className="mt-4 space-y-2">
              {today.length === 0 && <p className="text-sm text-gray-400">No appointments today.</p>}
              {today.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-xl border border-gray-100 p-3 dark:border-brand-700/40">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-brand-500" />
                    <div>
                      <p className="font-semibold text-brand-800 dark:text-white">{a.time} — {a.patient}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{a.reason}</p>
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
              <tr><th className="px-4 py-3">Ref</th><th className="px-4 py-3">Patient</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Time</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-brand-700/40">
              {myAppointments.map((a) => (
                <tr key={a.id} className="hover:bg-brand-50/40 dark:hover:bg-brand-800/30">
                  <td className="px-4 py-3 font-mono text-xs text-brand-600">{a.ref}</td>
                  <td className="px-4 py-3 font-medium text-brand-800 dark:text-white">{a.patient}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{a.date}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{a.time}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusColors[a.status]}`}>{a.status}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs font-semibold text-emerald-600 hover:underline">Complete</button>
                      <button className="text-xs font-semibold text-red-500 hover:underline">Cancel</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {active === 'schedule' && (
        <div className="card p-6">
          <h3 className="font-bold text-brand-800 dark:text-white">My Weekly Schedule</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {doctor.days.map((d) => <span key={d} className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">{d}</span>)}
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{doctor.availability}</p>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {doctor.slots.map((s) => (
              <div key={s} className="flex items-center gap-2 rounded-lg border border-gray-100 px-3 py-2 text-sm dark:border-brand-700/40">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> {s}
              </div>
            ))}
          </div>
        </div>
      )}

      {active === 'workload' && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Daily Capacity', value: workload?.capacity ?? 20, icon: TrendingUp },
              { label: 'Scheduled Today', value: workload?.scheduled ?? 0, icon: CalendarClock },
              { label: 'Utilization', value: `${workload?.utilization}%`, icon: TrendingUp },
            ].map((s) => (
              <div key={s.label} className="card p-5">
                <s.icon className="h-6 w-6 text-brand-500" />
                <p className="mt-2 text-2xl font-extrabold text-brand-800 dark:text-white">{s.value}</p>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="card p-6">
            <h3 className="font-bold text-brand-800 dark:text-white">Weekly Workload</h3>
            <ResponsiveContainer width="100%" height={250} className="mt-4">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="appts" fill="#1769AA" name="Appointments" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <CalendarOff className="h-5 w-5 text-amber-500" />
              <button className="btn-outline text-sm">Request Leave</button>
            </div>
          </div>
        </div>
      )}

      {active === 'queue' && (
        <div className="card p-6">
          <h3 className="font-bold text-brand-800 dark:text-white">Patient Queue</h3>
          <div className="mt-4 space-y-2">
            {today.map((a, i) => (
              <div key={a.id} className="flex items-center justify-between rounded-xl border border-gray-100 p-3 dark:border-brand-700/40">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 dark:bg-brand-700 dark:text-brand-200">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-brand-800 dark:text-white">{a.patient}</p>
                    <p className="text-xs text-gray-500">{a.time} — {a.reason}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusColors[a.status]}`}>{a.status}</span>
              </div>
            ))}
            {today.length === 0 && <p className="text-sm text-gray-400">Queue is empty.</p>}
          </div>
        </div>
      )}

      {active === 'profile' && (
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <img src={doctor.photo} alt="" className="h-20 w-20 rounded-full object-cover" />
            <div>
              <h3 className="text-xl font-bold text-brand-800 dark:text-white">{doctor.name}</h3>
              <p className="text-sm text-gray-500">{doctor.title}</p>
              <p className="text-sm text-gray-500">{doctor.qualifications}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div><label className="label">Specialization</label><input className="input" defaultValue={doctor.specialization} readOnly /></div>
            <div><label className="label">Experience</label><input className="input" defaultValue={doctor.experience} readOnly /></div>
            <div><label className="label">Location</label><input className="input" defaultValue={doctor.location} readOnly /></div>
            <div><label className="label">Availability</label><input className="input" defaultValue={doctor.availability} readOnly /></div>
          </div>
          <button className="btn-primary mt-5">Update Profile</button>
        </div>
      )}

      {active === 'notifications' && (
        <div className="card p-6">
          <h3 className="font-bold text-brand-800 dark:text-white">Notifications</h3>
          <div className="mt-4 space-y-3">
            {[
              { title: 'New appointment', body: 'Rajesh Mehta booked at 09:00 AM today.', time: '20 min ago' },
              { title: 'Leave approved', body: 'Your leave on Friday was approved.', time: '1 hour ago' },
              { title: 'Workload alert', body: 'You are at 90% capacity. Consider delegating.', time: '2 hours ago' },
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
    </DashboardShell>
  );
}
