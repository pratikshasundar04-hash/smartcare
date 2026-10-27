import { useEffect, useState } from 'react';
import { Clock, Phone, CalendarDays, MapPin } from 'lucide-react';

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function TopBar() {
  const now = useClock();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="hidden bg-brand-800 text-brand-50 lg:block">
      <div className="container-page flex h-9 items-center justify-between text-xs">
        <div className="flex items-center gap-5">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-brand-300" /> Mumbai, India
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-brand-300" /> Mon–Sat: 8:00 AM – 8:00 PM
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-brand-300" /> {dateStr}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="inline-flex items-center gap-1.5 font-medium tabular-nums">{timeStr}</span>
          <a href="tel:+912240001000" className="inline-flex items-center gap-1.5 font-semibold text-emerald-400 hover:text-emerald-300">
            <Phone className="h-3.5 w-3.5" /> Emergency: +91 22 4000 1000
          </a>
        </div>
      </div>
    </div>
  );
}
