import { Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white shadow-sm transition group-hover:bg-brand-600">
        <HeartPulse className="h-6 w-6" strokeWidth={2.4} />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-brand-800" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`text-lg font-extrabold tracking-tight ${light ? 'text-white' : 'text-brand-800 dark:text-white'}`}>
          Smart<span className="text-emerald-600">Care</span>
        </span>
        <span className={`text-[10px] font-medium ${light ? 'text-brand-100' : 'text-gray-400 dark:text-gray-400'}`}>
          Workload Management
        </span>
      </span>
    </Link>
  );
}
