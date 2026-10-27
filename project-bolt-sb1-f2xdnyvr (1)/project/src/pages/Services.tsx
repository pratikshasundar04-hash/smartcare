import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Stethoscope, HeartPulse, Brain, Bone, Scissors, Baby, Sparkles, Flower2, Activity, Leaf, ArrowRight, CalendarPlus, Clock, UserCircle2 } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { services, doctors } from '@/lib/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Stethoscope, HeartPulse, Brain, Bone, Scissors, Baby, Sparkles, Flower2, Activity, Leaf,
};

export function Services() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = services.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Medical Services & Departments"
        subtitle="Search and explore our full range of specialized medical departments."
        image="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      <section className="container-page py-16">
        <div className="mx-auto max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input pl-12"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => {
            const Icon = iconMap[s.icon] ?? Stethoscope;
            const related = doctors.filter((d) => s.relatedDoctors.includes(d.slug));
            return (
              <div key={s.id} className="card p-6">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-700/40 dark:text-brand-300">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg font-bold text-brand-800 dark:text-white">{s.name}</h3>
                </div>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{s.details}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3.5 w-3.5" /> {s.consultationInfo}
                </div>
                {related.length > 0 && (
                  <div className="mt-4 border-t border-gray-100 pt-4 dark:border-brand-700/40">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Related Doctors</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {related.map((d) => (
                        <Link key={d.slug} to={`/doctors/${d.slug}`} className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 hover:bg-brand-100 dark:bg-brand-700/40 dark:text-brand-200">
                          <UserCircle2 className="h-3.5 w-3.5" /> {d.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-5 flex gap-2">
                  <Link to={`/book-appointment?department=${s.name}`} className="btn-emerald flex-1 px-3 py-2 text-xs">
                    <CalendarPlus className="h-3.5 w-3.5" /> Book
                  </Link>
                  <button onClick={() => setSelected(s.id)} className="btn-outline flex-1 px-3 py-2 text-xs">
                    View Details <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-gray-500">No services match your search.</p>
        )}
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-900/60 p-4" onClick={() => setSelected(null)}>
          <div className="card max-h-[80vh] w-full max-w-lg overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const s = services.find((x) => x.id === selected)!;
              const Icon = iconMap[s.icon] ?? Stethoscope;
              const related = doctors.filter((d) => s.relatedDoctors.includes(d.slug));
              return (
                <>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-700/40 dark:text-brand-300">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-xl font-bold text-brand-800 dark:text-white">{s.name}</h3>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{s.details}</p>
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400"><Clock className="mr-1.5 inline h-4 w-4" />{s.consultationInfo}</p>
                  {related.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Related Doctors</p>
                      <div className="mt-2 space-y-2">
                        {related.map((d) => (
                          <Link key={d.slug} to={`/doctors/${d.slug}`} onClick={() => setSelected(null)} className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 hover:bg-brand-50 dark:border-brand-700/40 dark:hover:bg-brand-800">
                            <img src={d.photo} alt="" className="h-10 w-10 rounded-full object-cover" />
                            <div>
                              <p className="text-sm font-semibold text-brand-800 dark:text-white">{d.name}</p>
                              <p className="text-xs text-gray-500">{d.specialization}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  <Link to={`/book-appointment?department=${s.name}`} className="btn-emerald mt-6 w-full" onClick={() => setSelected(null)}>
                    <CalendarPlus className="h-4 w-4" /> Book Appointment
                  </Link>
                  <button onClick={() => setSelected(null)} className="btn-ghost mt-2 w-full">Close</button>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
}
