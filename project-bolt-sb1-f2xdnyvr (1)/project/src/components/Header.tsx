import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, CalendarPlus, LayoutDashboard } from 'lucide-react';
import { Logo } from './Logo';
import { useTheme } from '@/lib/theme';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Treatments', to: '/treatments' },
  { label: 'Doctors', to: '/doctors' },
  { label: 'Locations', to: '/locations' },
  { label: 'Contact Us', to: '/contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="sticky top-0 z-50">
      <div className={`border-b transition-all ${scrolled ? 'border-gray-100 bg-white/95 shadow-sm backdrop-blur dark:border-brand-700/40 dark:bg-brand-900/95' : 'border-transparent bg-white dark:bg-brand-900'}`}>
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-1 xl:flex">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'text-brand-600 dark:text-brand-300'
                      : 'text-brand-800/80 hover:bg-brand-50 hover:text-brand-600 dark:text-gray-200 dark:hover:bg-brand-800'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="hidden rounded-lg p-2 text-brand-700 transition hover:bg-brand-50 dark:text-gray-200 dark:hover:bg-brand-800 sm:inline-flex"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <Link to="/book-appointment" className="hidden btn-emerald sm:inline-flex">
              <CalendarPlus className="h-4 w-4" /> Book Appointment
            </Link>
            <Link to="/erp" className="hidden btn-primary md:inline-flex">
              <LayoutDashboard className="h-4 w-4" /> Workload ERP
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="inline-flex rounded-lg p-2 text-brand-700 hover:bg-brand-50 dark:text-gray-200 dark:hover:bg-brand-800 xl:hidden"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-gray-100 bg-white px-4 pb-4 pt-2 dark:border-brand-700/40 dark:bg-brand-900 xl:hidden">
            <nav className="flex flex-col">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? 'bg-brand-50 text-brand-600 dark:bg-brand-800 dark:text-brand-300'
                        : 'text-brand-800/80 hover:bg-brand-50 dark:text-gray-200 dark:hover:bg-brand-800'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-brand-800">
                <span className="text-sm text-brand-700 dark:text-gray-300">Dark mode</span>
                <button onClick={toggle} aria-label="Toggle dark mode" className="text-brand-600">
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </button>
              </div>
              <Link to="/book-appointment" className="btn-emerald w-full">
                <CalendarPlus className="h-4 w-4" /> Book Appointment
              </Link>
              <Link to="/erp" className="btn-primary w-full">
                <LayoutDashboard className="h-4 w-4" /> Workload ERP
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
