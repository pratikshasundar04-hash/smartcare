import { useState } from 'react';
import {
  LayoutDashboard, Users, CalendarClock, Building2, CalendarDays, CalendarOff,
  TrendingUp, Lightbulb, FileText, ScrollText, Stethoscope, UserCog,
  CheckCircle2, XCircle, Clock, AlertTriangle, ArrowRight, ThumbsUp,
} from 'lucide-react';
import { DashboardShell } from '@/components/DashboardShell';
import {
  BarChart, Bar, LineChart as ReLineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { doctors } from '@/lib/data';
import {
  doctorWorkloads, demoAppointments, aiRecommendations,
  weeklyAppointmentTrend, departmentDemand, workloadHeatmap,
} from '@/lib/demoData';
import type { AiRecommendation } from '@/lib/demoData';

const nav = [
  { label: 'Dashboard', key: 'dashboard', icon: LayoutDashboard },
  { label: 'Doctor Management', key: 'doctors', icon: Stethoscope },
  { label: 'Patient Management', key: 'patients', icon: Users },
  { label: 'Appointment Management', key: 'appointments', icon: CalendarClock },
  { label: 'Department Management', key: 'departments', icon: Building2 },
  { label: 'Schedule Management', key: 'schedules', icon: CalendarDays },
  { label: 'Leave Management', key: 'leave', icon: CalendarOff },
  { label: 'Workload Analytics', key: 'workload', icon: TrendingUp },
  { label: 'AI Recommendations', key: 'ai', icon: Lightbulb },
  { label: 'Reports', key: 'reports', icon: FileText },
  { label: 'Audit Logs', key: 'audit', icon: ScrollText },
];

const PIE_COLORS = ['#1769AA', '#16834A', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

const stats = [
  { label: 'Total Doctors', value: '8', icon: Stethoscope, color: 'text-brand-600 bg-brand-50' },
  { label: 'Registered Patients', value: '1,247', icon: Users, color: 'text-emerald-600 bg-emerald-50' },
  { label: "Today's Appointments", value: '96', icon: CalendarClock, color: 'text-brand-600 bg-brand-50' },
  { label: 'Pending', value: '23', icon: Clock, color: 'text-amber-600 bg-amber-50' },
  { label: 'Completed', value: '61', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
  { label: 'Cancelled', value: '12', icon: XCircle, color: 'text-red-600 bg-red-50' },
  { label: 'Available Doctors', value: '5', icon: ThumbsUp, color: 'text-emerald-600 bg-emerald-50' },
  { label: 'High Workload', value: '3', icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-brand-100 text-brand-700',
  completed: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
};

const workloadColors: Record<string, string> = {
  optimal: 'text-emerald-600',
  high: 'text-amber-600',
  critical: 'text-red-600',
  low: 'text-brand-500',
};

function heatColor(v: number): string {
  if (v >= 90) return 'bg-red-500 text-white';
  if (v >= 75) return 'bg-amber-400 text-white';
  if (v >= 50) return 'bg-brand-400 text-white';
  if (v >= 30) return 'bg-brand-200 text-brand-800';
  return 'bg-gray-100 text-gray-500 dark:bg-brand-800';
}

export function AdminDashboard() {
  const [active, setActive] = useState('dashboard');
  const [recs, setRecs] = useState<AiRecommendation[]>(aiRecommendations);
  const [search, setSearch] = useState('');

  const approve = (id: string) => setRecs((r) => r.map((x) => (x.id === id ? { ...x, approved: true } : x)));

  const title = nav.find((n) => n.key === active)?.label ?? 'Dashboard';
  const filteredDoctors = doctors.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardShell role="admin" nav={nav} active={active} onNavigate={setActive} title={title}>
      {/* Dashboard overview */}
      {active === 'dashboard' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">Overview of hospital operations — demo data.</p>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">Sample data</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="card p-5">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-2xl font-extrabold text-brand-800 dark:text-white">{s.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card p-6">
              <h3 className="font-bold text-brand-800 dark:text-white">Weekly Appointment Trends</h3>
              <ResponsiveContainer width="100%" height={250} className="mt-4">
                <AreaChart data={weeklyAppointmentTrend}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1769AA" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#1769AA" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="appts" stroke="#1769AA" fill="url(#g1)" strokeWidth={2} name="Appointments" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-brand-800 dark:text-white">Department Demand</h3>
              <ResponsiveContainer width="100%" height={250} className="mt-4">
                <PieChart>
                  <Pie data={departmentDemand} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={(e) => e.name}>
                    {departmentDemand.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-bold text-brand-800 dark:text-white">Workload Heatmap</h3>
            <p className="text-xs text-gray-400">Utilization % by doctor and day</p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-center text-xs">
                <thead>
                  <tr className="text-gray-400">
                    <th className="px-2 py-1 text-left">Doctor</th>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => <th key={d} className="px-2 py-1">{d}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {workloadHeatmap.map((row) => (
                    <tr key={row.doctor}>
                      <td className="whitespace-nowrap px-2 py-1 text-left font-medium text-brand-800 dark:text-gray-200">{row.doctor}</td>
                      {row.values.map((v, i) => (
                        <td key={i} className="px-1 py-1">
                          <span className={`inline-flex h-9 w-12 items-center justify-center rounded text-xs font-semibold ${heatColor(v)}`}>{v}%</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Management */}
      {active === 'doctors' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <input placeholder="Search doctors..." value={search} onChange={(e) => setSearch(e.target.value)} className="input max-w-xs" />
            <button className="btn-primary"><UserCog className="h-4 w-4" /> Add Doctor</button>
          </div>
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-brand-50/60 text-left text-xs uppercase text-gray-500 dark:bg-brand-800/50">
                <tr>
                  <th className="px-4 py-3">Doctor</th>
                  <th className="px-4 py-3">Specialization</th>
                  <th className="px-4 py-3">Experience</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-brand-700/40">
                {filteredDoctors.map((d) => {
                  const wl = doctorWorkloads.find((w) => w.slug === d.slug);
                  return (
                    <tr key={d.slug} className="hover:bg-brand-50/40 dark:hover:bg-brand-800/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={d.photo} alt="" className="h-9 w-9 rounded-full object-cover" />
                          <span className="font-semibold text-brand-800 dark:text-white">{d.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{d.specialization}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{d.experience}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{d.location}</td>
                      <td className="px-4 py-3">
                        <span className={`font-semibold ${workloadColors[wl?.status ?? 'optimal']}`}>{wl?.status ?? 'optimal'}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="text-xs font-semibold text-brand-600 hover:underline">Edit</button>
                          <button className="text-xs font-semibold text-red-500 hover:underline">Deactivate</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Patient Management */}
      {active === 'patients' && (
        <div className="card p-6">
          <h3 className="font-bold text-brand-800 dark:text-white">Patient Management</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Demo data — 1,247 registered patients.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {['Rajesh Mehta', 'Sneha Iyer', 'Aditya Nair', 'Kavita Shah', 'Vikram Joshi', 'Priya Reddy'].map((p, i) => (
              <div key={p} className="rounded-xl border border-gray-100 p-4 dark:border-brand-700/40">
                <p className="font-semibold text-brand-800 dark:text-white">{p}</p>
                <p className="text-xs text-gray-400">PAT-{1000 + i}</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{demoAppointments[i % demoAppointments.length].department}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Appointment Management */}
      {active === 'appointments' && (
        <div className="card overflow-hidden">
          <div className="border-b border-gray-100 p-5 dark:border-brand-700/40">
            <h3 className="font-bold text-brand-800 dark:text-white">Appointment Management</h3>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-brand-50/60 text-left text-xs uppercase text-gray-500 dark:bg-brand-800/50">
              <tr>
                <th className="px-4 py-3">Ref</th>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-brand-700/40">
              {demoAppointments.map((a) => (
                <tr key={a.id} className="hover:bg-brand-50/40 dark:hover:bg-brand-800/30">
                  <td className="px-4 py-3 font-mono text-xs text-brand-600">{a.ref}</td>
                  <td className="px-4 py-3 font-medium text-brand-800 dark:text-white">{a.patient}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{a.doctorName}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{a.date}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{a.time}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusColors[a.status]}`}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Department Management */}
      {active === 'departments' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {['Cardiology', 'Neurology', 'General Medicine', 'Orthopedics', 'Pediatrics', 'General Surgery', 'Dermatology', 'Gynecology'].map((dept) => {
            const count = doctors.filter((d) => d.department === dept).length;
            return (
              <div key={dept} className="card p-5">
                <Building2 className="h-8 w-8 text-brand-500" />
                <h3 className="mt-3 font-bold text-brand-800 dark:text-white">{dept}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{count} doctor(s)</p>
                <button className="btn-outline mt-4 w-full text-xs">Manage</button>
              </div>
            );
          })}
        </div>
      )}

      {/* Schedule Management */}
      {active === 'schedules' && (
        <div className="card p-6">
          <h3 className="font-bold text-brand-800 dark:text-white">Doctor Schedule Management</h3>
          <div className="mt-5 space-y-3">
            {doctorWorkloads.map((w) => (
              <div key={w.slug} className="flex items-center justify-between rounded-xl border border-gray-100 p-4 dark:border-brand-700/40">
                <div>
                  <p className="font-semibold text-brand-800 dark:text-white">{w.name}</p>
                  <p className="text-xs text-gray-500">{w.specialization}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{w.scheduled}/{w.capacity} today</span>
                  <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-100 dark:bg-brand-700">
                    <div className={`h-full ${w.utilization >= 90 ? 'bg-red-500' : w.utilization >= 75 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${w.utilization}%` }} />
                  </div>
                  <button className="text-xs font-semibold text-brand-600 hover:underline">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leave Management */}
      {active === 'leave' && (
        <div className="card p-6">
          <h3 className="font-bold text-brand-800 dark:text-white">Leave Requests</h3>
          <div className="mt-5 space-y-3">
            {[
              { doctor: 'Dr. Meena Rao', date: 'Fri, Oct 30', reason: 'Personal', status: 'pending' },
              { doctor: 'Dr. Rohan Verma', date: 'Mon, Nov 2', reason: 'Conference', status: 'approved' },
            ].map((l, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-gray-100 p-4 dark:border-brand-700/40">
                <div>
                  <p className="font-semibold text-brand-800 dark:text-white">{l.doctor}</p>
                  <p className="text-xs text-gray-500">{l.date} — {l.reason}</p>
                </div>
                <div className="flex gap-2">
                  {l.status === 'pending' ? (
                    <>
                      <button className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600 hover:bg-emerald-100">Approve</button>
                      <button className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100">Reject</button>
                    </>
                  ) : (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Approved</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Workload Analytics */}
      {active === 'workload' && (
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="font-bold text-brand-800 dark:text-white">Workload Distribution</h3>
            <ResponsiveContainer width="100%" height={300} className="mt-4">
              <BarChart data={doctorWorkloads}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="scheduled" fill="#1769AA" name="Scheduled" radius={[4, 4, 0, 0]} />
                <Bar dataKey="capacity" fill="#E5E7EB" name="Capacity" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card p-6">
              <h3 className="font-bold text-brand-800 dark:text-white">Appointments vs Completed</h3>
              <ResponsiveContainer width="100%" height={250} className="mt-4">
                <BarChart data={weeklyAppointmentTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="appts" fill="#1769AA" name="Appointments" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completed" fill="#16834A" name="Completed" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-brand-800 dark:text-white">Weekly Trend</h3>
              <ResponsiveContainer width="100%" height={250} className="mt-4">
                <ReLineChart data={weeklyAppointmentTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="appts" stroke="#1769AA" strokeWidth={2} name="Appointments" />
                  <Line type="monotone" dataKey="completed" stroke="#16834A" strokeWidth={2} name="Completed" />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* AI Recommendations */}
      {active === 'ai' && (
        <div className="space-y-5">
          <div className="flex items-start gap-3 rounded-xl bg-brand-50 p-4 dark:bg-brand-800/50">
            <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
            <p className="text-sm text-brand-700 dark:text-brand-200">
              Explainable, rule-based recommendations. Each suggestion includes its reasoning and respects specialization, availability, and configured capacity. An admin can review and approve each one.
            </p>
          </div>
          {recs.map((r) => (
            <div key={r.id} className={`card p-5 border-l-4 ${r.priority === 'high' ? 'border-l-red-500' : r.priority === 'medium' ? 'border-l-amber-500' : 'border-l-brand-400'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold uppercase ${r.priority === 'high' ? 'bg-red-100 text-red-700' : r.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-brand-100 text-brand-700'}`}>{r.priority}</span>
                    <span className="text-xs text-gray-400">{r.type}</span>
                  </div>
                  <h3 className="mt-2 font-bold text-brand-800 dark:text-white">{r.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold">Reason: </span>{r.reason}</p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold">Suggested action: </span>{r.action}</p>
                </div>
                {r.approved ? (
                  <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600"><CheckCircle2 className="h-5 w-5" /> Approved</span>
                ) : (
                  <button onClick={() => approve(r.id)} className="btn-emerald flex-shrink-0 text-xs">
                    <ThumbsUp className="h-3.5 w-3.5" /> Approve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reports */}
      {active === 'reports' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {['Daily Appointment Report', 'Doctor Workload Report', 'Department Demand Report', 'Patient Registration Report', 'Cancellation Analysis', 'Monthly Performance'].map((r) => (
            <div key={r} className="card p-5">
              <FileText className="h-8 w-8 text-brand-500" />
              <h3 className="mt-3 font-bold text-brand-800 dark:text-white">{r}</h3>
              <p className="text-xs text-gray-400">Generated from demo data</p>
              <button className="btn-outline mt-4 w-full text-xs">Download <ArrowRight className="h-3.5 w-3.5" /></button>
            </div>
          ))}
        </div>
      )}

      {/* Audit Logs */}
      {active === 'audit' && (
        <div className="card overflow-hidden">
          <div className="border-b border-gray-100 p-5 dark:border-brand-700/40">
            <h3 className="font-bold text-brand-800 dark:text-white">Audit Logs</h3>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-brand-50/60 text-left text-xs uppercase text-gray-500 dark:bg-brand-800/50">
              <tr><th className="px-4 py-3">Time</th><th className="px-4 py-3">User</th><th className="px-4 py-3">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-brand-700/40">
              {[
                { time: '10:42 AM', user: 'admin@smartcare.health', action: 'Approved leave request for Dr. Rohan Verma' },
                { time: '10:15 AM', user: 'admin@smartcare.health', action: 'Added doctor: Dr. Lata Menon' },
                { time: '09:30 AM', user: 'admin@smartcare.health', action: 'Updated schedule for Dr. Priya Sharma' },
                { time: '09:00 AM', user: 'admin@smartcare.health', action: 'Login' },
              ].map((l, i) => (
                <tr key={i} className="hover:bg-brand-50/40 dark:hover:bg-brand-800/30">
                  <td className="px-4 py-3 text-gray-500">{l.time}</td>
                  <td className="px-4 py-3 font-medium text-brand-800 dark:text-white">{l.user}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{l.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardShell>
  );
}
