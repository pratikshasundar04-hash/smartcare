import { Link } from 'react-router-dom';
import { Star, CalendarPlus, UserCircle2, Clock } from 'lucide-react';
import type { Doctor } from '@/lib/types';

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="card group overflow-hidden hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-50">
        <img
          src={doctor.photo}
          alt={doctor.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-brand-700 shadow-sm">
          {doctor.specialization}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-brand-800 dark:text-white">{doctor.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{doctor.title}</p>
        <div className="mt-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center gap-1"><UserCircle2 className="h-3.5 w-3.5" /> {doctor.experience}</span>
          <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {doctor.rating}</span>
        </div>
        <p className="mt-2 inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="h-3.5 w-3.5" /> {doctor.availability}
        </p>
        <div className="mt-4 flex gap-2">
          <Link to={`/doctors/${doctor.slug}`} className="btn-outline flex-1 px-3 py-2 text-xs">
            View Profile
          </Link>
          <Link to={`/book-appointment?doctor=${doctor.slug}`} className="btn-emerald flex-1 px-3 py-2 text-xs">
            <CalendarPlus className="h-3.5 w-3.5" /> Book
          </Link>
        </div>
      </div>
    </div>
  );
}
