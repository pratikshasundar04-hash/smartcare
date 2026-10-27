import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Navigation, Building2, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { locations } from '@/lib/data';

export function Locations() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title="Find a SmartCare Near You"
        subtitle="Three branches across the city, each with dedicated specialties and 24/7 emergency support."
        image="https://images.pexels.com/photos/248415/pexels-photo-248415.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      <section className="container-page py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {locations.map((l) => (
            <div key={l.id} className="card overflow-hidden">
              <div className="aspect-video w-full bg-brand-100 dark:bg-brand-800">
                <iframe
                  title={l.name}
                  className="h-full w-full border-0"
                  loading="lazy"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(l.mapQuery)}&output=embed`}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-800 dark:text-white">{l.name}</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex gap-2.5"><MapPin className="h-4 w-4 flex-shrink-0 text-brand-500" /> {l.address}</li>
                  <li className="flex gap-2.5"><Phone className="h-4 w-4 flex-shrink-0 text-brand-500" /> {l.phone}</li>
                  <li className="flex gap-2.5"><Clock className="h-4 w-4 flex-shrink-0 text-brand-500" /> {l.hours}</li>
                </ul>
                <div className="mt-4">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400"><Building2 className="h-3.5 w-3.5" /> Departments</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {l.departments.map((d) => (
                      <span key={d} className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 dark:bg-brand-700/40 dark:text-brand-200">{d}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-5 flex gap-2">
                  <a href={`https://www.google.com/maps?q=${encodeURIComponent(l.mapQuery)}`} target="_blank" rel="noreferrer" className="btn-outline flex-1 px-3 py-2 text-xs">
                    <Navigation className="h-3.5 w-3.5" /> Directions
                  </a>
                  <Link to="/book-appointment" className="btn-emerald flex-1 px-3 py-2 text-xs">
                    Book <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
