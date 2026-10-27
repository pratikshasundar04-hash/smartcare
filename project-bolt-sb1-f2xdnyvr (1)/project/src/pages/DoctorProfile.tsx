import { Link, useParams } from 'react-router-dom';
import { Star, Clock, GraduationCap, Briefcase, MapPin, CalendarPlus, ArrowLeft, CheckCircle2, Building2 } from 'lucide-react';
import { doctors } from '@/lib/data';

export function DoctorProfile() {
  const { slug } = useParams();
  const doctor = doctors.find((d) => d.slug === slug);

  if (!doctor) {
    return (
      <div className="container-page py-32 text-center">
        <h1 className="text-2xl font-bold text-brand-800 dark:text-white">Doctor not found</h1>
        <Link to="/doctors" className="btn-primary mt-6">Back to Doctors</Link>
      </div>
    );
  }

  return (
    <>
      <section className="bg-brand-50/60 py-10 dark:bg-brand-800/30">
        <div className="container-page">
          <Link to="/doctors" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:gap-2">
            <ArrowLeft className="h-4 w-4" /> All Doctors
          </Link>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
          <div>
            <div className="card overflow-hidden">
              <img src={doctor.photo} alt={doctor.name} className="aspect-[4/5] w-full object-cover" />
              <div className="p-5">
                <h1 className="text-2xl font-extrabold text-brand-800 dark:text-white">{doctor.name}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{doctor.title}</p>
                <div className="mt-3 flex items-center gap-3 text-sm">
                  <span className="inline-flex items-center gap-1 text-amber-500"><Star className="h-4 w-4 fill-amber-400" /> {doctor.rating}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500 dark:text-gray-400">{doctor.experience}</span>
                </div>
                <Link to={`/book-appointment?doctor=${doctor.slug}`} className="btn-emerald mt-5 w-full">
                  <CalendarPlus className="h-4 w-4" /> Book Appointment
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-7">
              <h2 className="text-lg font-bold text-brand-800 dark:text-white">About</h2>
              <p className="mt-3 text-gray-600 dark:text-gray-300">{doctor.bio}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex gap-3 rounded-xl bg-brand-50 p-4 dark:bg-brand-800/50">
                  <GraduationCap className="h-5 w-5 flex-shrink-0 text-brand-600" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-400">Qualifications</p>
                    <p className="text-sm text-brand-800 dark:text-gray-200">{doctor.qualifications}</p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-xl bg-brand-50 p-4 dark:bg-brand-800/50">
                  <Briefcase className="h-5 w-5 flex-shrink-0 text-brand-600" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-400">Experience</p>
                    <p className="text-sm text-brand-800 dark:text-gray-200">{doctor.experience}</p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-xl bg-brand-50 p-4 dark:bg-brand-800/50">
                  <Building2 className="h-5 w-5 flex-shrink-0 text-brand-600" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-400">Department</p>
                    <p className="text-sm text-brand-800 dark:text-gray-200">{doctor.department}</p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-xl bg-brand-50 p-4 dark:bg-brand-800/50">
                  <MapPin className="h-5 w-5 flex-shrink-0 text-brand-600" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-400">Location</p>
                    <p className="text-sm text-brand-800 dark:text-gray-200">{doctor.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-7">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-brand-600" />
                <h2 className="text-lg font-bold text-brand-800 dark:text-white">Consultation Hours</h2>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{doctor.availability}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => {
                  const active = doctor.days.includes(d);
                  return (
                    <span key={d} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${active ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' : 'bg-gray-100 text-gray-400 dark:bg-brand-800 dark:text-gray-500'}`}>
                      {d}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="card p-7">
              <h2 className="text-lg font-bold text-brand-800 dark:text-white">Available Appointment Slots</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Sample slots — availability is confirmed during booking.</p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                {doctor.slots.map((s) => (
                  <div key={s} className="flex items-center gap-2 rounded-lg border border-gray-100 px-3 py-2 text-sm text-brand-800 dark:border-brand-700/40 dark:text-gray-200">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> {s}
                  </div>
                ))}
              </div>
              <Link to={`/book-appointment?doctor=${doctor.slug}`} className="btn-emerald mt-6 w-full">
                <CalendarPlus className="h-4 w-4" /> Book with {doctor.name.split(' ').slice(0, 2).join(' ')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
