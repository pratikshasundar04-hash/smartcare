import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Activity, ArrowRight, CalendarPlus } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { treatments } from '@/lib/data';

export function Treatments() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(treatments.map((t) => t.category)))];

  const filtered = treatments.filter((t) => {
    const matchQ = t.name.toLowerCase().includes(query.toLowerCase()) || t.description.toLowerCase().includes(query.toLowerCase());
    const matchC = category === 'All' || t.category === category;
    return matchQ && matchC;
  });

  return (
    <>
      <PageHero
        eyebrow="Treatments"
        title="Treatments & Procedures"
        subtitle="Explore treatments by specialty and category. Medically responsible descriptions — consult a doctor for personalized advice."
        image="https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      <section className="container-page py-16">
        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search treatments..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input pl-12"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="input pl-12 pr-8">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <div key={t.id} className="card p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-700/40 dark:text-brand-200">
                  <Activity className="h-3.5 w-3.5" /> {t.specialty}
                </span>
                <span className="text-xs text-gray-400">{t.category}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-brand-800 dark:text-white">{t.name}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{t.description}</p>
              <div className="mt-4 space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
                <p><span className="font-semibold text-brand-700 dark:text-brand-300">Department:</span> {t.department}</p>
                <p><span className="font-semibold text-brand-700 dark:text-brand-300">Recovery:</span> {t.recovery}</p>
              </div>
              <Link to={`/book-appointment?department=${t.department}`} className="btn-emerald mt-5 w-full px-3 py-2 text-xs">
                <CalendarPlus className="h-3.5 w-3.5" /> Book Consultation <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-gray-500">No treatments match your filters.</p>
        )}
      </section>
    </>
  );
}
