import { Link } from 'react-router-dom';
import {
  UserSearch, CalendarPlus, Stethoscope, LayoutDashboard,
  HeartPulse, Brain, Bone, Scissors, Baby, Sparkles, Flower2, Activity, Leaf,
  ShieldCheck, CalendarClock, Workflow, Lightbulb, Users, Lock,
  ArrowRight, MapPin, Phone, Clock, Star, CheckCircle2, TrendingUp,
} from 'lucide-react';
import { HeroCarousel } from '@/components/HeroCarousel';
import { SectionHeading } from '@/components/SectionHeading';
import { DoctorCard } from '@/components/DoctorCard';
import { doctors, services, locations, testimonials } from '@/lib/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Stethoscope, HeartPulse, Brain, Bone, Scissors, Baby, Sparkles, Flower2, Activity, Leaf,
};

const quickCards = [
  { icon: UserSearch, title: 'Find a Doctor', desc: 'Search specialists by name, department, or availability.', to: '/doctors', color: 'text-brand-600 bg-brand-50' },
  { icon: CalendarPlus, title: 'Book an Appointment', desc: 'Choose a doctor, pick a slot, and confirm instantly.', to: '/book-appointment', color: 'text-emerald-600 bg-emerald-50' },
  { icon: Stethoscope, title: 'Our Medical Services', desc: 'Explore 10+ specialized medical departments.', to: '/services', color: 'text-brand-600 bg-brand-50' },
  { icon: LayoutDashboard, title: 'Smart Workload ERP', desc: 'Manage hospital workflows intelligently.', to: '/erp', color: 'text-emerald-600 bg-emerald-50' },
];

const whyChoose = [
  { icon: CalendarPlus, title: 'Easy Appointment Booking', desc: 'Find and book the right specialist in minutes.' },
  { icon: CheckCircle2, title: 'Clear Doctor Availability', desc: 'See real-time slots and avoid waiting-room surprises.' },
  { icon: Workflow, title: 'Organized Hospital Workflows', desc: 'Schedules, departments, and queues in one place.' },
  { icon: Lightbulb, title: 'Intelligent Workload Recommendations', desc: 'AI-assisted suggestions balance doctor workloads.' },
  { icon: Users, title: 'Convenient Patient Access', desc: 'Track bookings, references, and status online.' },
  { icon: Lock, title: 'Secure Role-Based Dashboards', desc: 'Admin, doctor, and patient — each sees only their data.' },
];

const erpStats = [
  { label: 'Total Appointments', value: '1,284', icon: CalendarPlus },
  { label: 'Doctors Available', value: '42', icon: Users },
  { label: 'Scheduled Today', value: '96', icon: CalendarClock },
  { label: 'Avg. Workload', value: '74%', icon: TrendingUp },
];

const weeklyData = [
  { day: 'Mon', appts: 92 }, { day: 'Tue', appts: 110 }, { day: 'Wed', appts: 128 },
  { day: 'Thu', appts: 104 }, { day: 'Fri', appts: 136 }, { day: 'Sat', appts: 88 }, { day: 'Sun', appts: 42 },
];

export function Home() {
  const featured = doctors.slice(0, 6);

  return (
    <>
      <HeroCarousel />

      {/* Quick info cards */}
      <section className="container-page -mt-12 relative z-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickCards.map((c) => (
            <Link key={c.title} to={c.to} className="card group p-5 hover:-translate-y-1 hover:shadow-md">
              <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${c.color}`}>
                <c.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-bold text-brand-800 dark:text-white">{c.title}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{c.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2">
                Learn more <ArrowRight className="h-4 w-4 transition" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* About preview */}
      <section className="container-page py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="About SmartCare"
              title="Healthcare That Works Smarter."
              subtitle="SmartCare connects patients, doctors, and administrators through an organized digital healthcare platform — making care easier to access and easier to deliver."
            />
            <ul className="mt-6 space-y-3">
              {[
                'Experienced, multi-specialty healthcare professionals',
                'Simplified patient appointment management',
                'Organized, conflict-free doctor schedules',
                'Intelligent workload insights and recommendations',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-brand-800 dark:text-gray-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" /> {t}
                </li>
              ))}
            </ul>
            <Link to="/about" className="btn-primary mt-8">
              Discover Our Approach <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/6627815/pexels-photo-6627815.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="Healthcare team"
              className="rounded-2xl object-cover shadow-md"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-5 shadow-lg dark:bg-brand-800 sm:block">
              <p className="text-3xl font-extrabold text-brand-600">25+</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Years of Care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-brand-50/60 py-20 dark:bg-brand-800/30">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Our Services"
            title="Comprehensive Medical Services"
            subtitle="From routine check-ups to specialized treatments, our departments cover your every healthcare need."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((s) => {
              const Icon = iconMap[s.icon] ?? Stethoscope;
              return (
                <Link key={s.id} to={`/services`} className="card group p-6 hover:-translate-y-1 hover:shadow-md">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-700/40 dark:text-brand-300">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-bold text-brand-800 dark:text-white">{s.name}</h3>
                  <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{s.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2">
                    View Details <ArrowRight className="h-4 w-4 transition" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured doctors */}
      <section className="container-page py-20">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Meet Our Team"
            title="Featured Doctors"
            subtitle="Experienced specialists across multiple medical disciplines."
          />
          <Link to="/doctors" className="btn-outline hidden sm:inline-flex">
            View All Doctors <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((d) => <DoctorCard key={d.slug} doctor={d} />)}
        </div>
      </section>

      {/* Why choose */}
      <section className="bg-brand-800 py-20 text-white">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-emerald-400">Why SmartCare</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Why Choose SmartCare?</h2>
            <p className="mt-3 text-brand-200">We combine compassionate care with smart technology to deliver a better healthcare experience.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((w) => (
              <div key={w.title} className="rounded-2xl bg-brand-700/40 p-6 ring-1 ring-brand-600/30 transition hover:bg-brand-700/60">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                  <w.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-bold">{w.title}</h3>
                <p className="mt-1.5 text-sm text-brand-200">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ERP preview */}
      <section className="container-page py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Smart Workload ERP"
              title="A Smarter Way to Manage Hospital Workflows."
              subtitle="An integrated system that tracks appointments, monitors doctor workloads, and recommends intelligent scheduling decisions."
            />
            <div className="mt-8 grid grid-cols-2 gap-4">
              {erpStats.map((s) => (
                <div key={s.label} className="card p-5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-700/40 dark:text-brand-300">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-2xl font-extrabold text-brand-800 dark:text-white">{s.value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>
            <Link to="/erp" className="btn-primary mt-8">
              Explore Workload ERP <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="card overflow-hidden p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Weekly Appointments</p>
                <p className="text-2xl font-bold text-brand-800 dark:text-white">700+</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">Demo data</span>
            </div>
            <div className="mt-6 flex h-44 items-end justify-between gap-3">
              {weeklyData.map((d) => (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full items-end justify-center" style={{ height: '100%' }}>
                    <div
                      className="w-full max-w-[42px] rounded-t-md bg-gradient-to-t from-brand-600 to-brand-400 transition-all hover:from-brand-700 hover:to-brand-500"
                      style={{ height: `${(d.appts / 140) * 100}%` }}
                      title={`${d.appts} appointments`}
                    />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{d.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-brand-50/60 py-20 dark:bg-brand-800/30">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Patient Experience"
            title="What Our Patients Say"
            subtitle="Demonstration testimonials for preview purposes."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.id} className="card p-6">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-brand-800/90 dark:text-gray-200">“{t.text}”</p>
                <div className="mt-5 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                  <div>
                    <p className="text-sm font-semibold text-brand-800 dark:text-white">{t.name}</p>
                    <p className="text-xs text-emerald-600">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations preview */}
      <section className="container-page py-20">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Visit Us" title="Our Locations" subtitle="Find a SmartCare branch near you." />
          <Link to="/locations" className="btn-outline hidden sm:inline-flex">
            All Locations <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {locations.map((l) => (
            <div key={l.id} className="card p-6">
              <h3 className="text-lg font-bold text-brand-800 dark:text-white">{l.name}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex gap-2.5"><MapPin className="h-4 w-4 flex-shrink-0 text-brand-500" /> {l.address}</li>
                <li className="flex gap-2.5"><Phone className="h-4 w-4 flex-shrink-0 text-brand-500" /> {l.phone}</li>
                <li className="flex gap-2.5"><Clock className="h-4 w-4 flex-shrink-0 text-brand-500" /> {l.hours}</li>
              </ul>
              <Link to="/locations" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:gap-2">
                Get Directions <ArrowRight className="h-4 w-4 transition" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
