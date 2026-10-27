import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { DoctorCard } from '@/components/DoctorCard';
import { doctors, specializations, locationNames } from '@/lib/data';

export function Doctors() {
  const [query, setQuery] = useState('');
  const [spec, setSpec] = useState('All');
  const [loc, setLoc] = useState('All');
  const [day, setDay] = useState('All');

  const days = ['All', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const filtered = doctors.filter((d) => {
    const matchQ = d.name.toLowerCase().includes(query.toLowerCase()) || d.specialization.toLowerCase().includes(query.toLowerCase());
    const matchSpec = spec === 'All' || d.specialization === spec;
    const matchLoc = loc === 'All' || d.location === loc;
    const matchDay = day === 'All' || d.days.includes(day);
    return matchQ && matchSpec && matchLoc && matchDay;
  });

  return (
    <>
      <PageHero
        eyebrow="Our Doctors"
        title="Find the Right Specialist"
        subtitle="Search by name, specialization, location, or available day."
        image="https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      <section className="container-page py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input placeholder="Search by name..." value={query} onChange={(e) => setQuery(e.target.value)} className="input pl-12" />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select value={spec} onChange={(e) => setSpec(e.target.value)} className="input pl-12 pr-8">
              <option value="All">All Specializations</option>
              {specializations.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select value={loc} onChange={(e) => setLoc(e.target.value)} className="input pl-12 pr-8">
              <option value="All">All Locations</option>
              {locationNames.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select value={day} onChange={(e) => setDay(e.target.value)} className="input pl-12 pr-8">
              <option value="All">Any Day</option>
              {days.filter((d) => d !== 'All').map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">{filtered.length} doctor(s) found</p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => <DoctorCard key={d.slug} doctor={d} />)}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-gray-500">No doctors match your filters.</p>
        )}
      </section>
    </>
  );
}
