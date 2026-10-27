import { useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/lib/auth';
import { Bell, LogOut, Menu, X, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme';
import { demoNotifications } from '@/lib/demoData';

interface NavItem {
  label: string;
  key: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Props {
  role: 'admin' | 'doctor' | 'patient';
  nav: NavItem[];
  active: string;
  onNavigate: (key: string) => void;
  title: string;
  children: ReactNode;
}

export function DashboardShell({ role, nav, active, onNavigate, title, children }: Props) {
  const { demoUser, signOut } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const unread = demoNotifications.filter((n) => !n.read).length;

  const handleSignOut = () => {
    signOut();
    navigate('/erp');
  };

  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-brand-900">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-brand-800 text-brand-100 transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between border-b border-brand-700/40 px-4">
          <Logo light />
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-brand-200">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-3 py-4">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-brand-400">{roleLabel} Portal</p>
          <nav className="mt-3 space-y-1">
            {nav.map((item) => (
              <button
                key={item.key}
                onClick={() => { onNavigate(item.key); setSidebarOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active === item.key
                    ? 'bg-brand-600 text-white'
                    : 'text-brand-200 hover:bg-brand-700/50 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" /> {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-8 border-t border-brand-700/40 pt-4">
            <Link to="/" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-brand-300 hover:text-white">
              ← Back to website
            </Link>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-brand-700/40 dark:bg-brand-800">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-brand-700 dark:text-gray-200">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-bold text-brand-800 dark:text-white">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden relative md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input placeholder="Search..." className="w-48 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm dark:border-brand-700 dark:bg-brand-900 dark:text-gray-200" />
            </div>
            <button onClick={toggle} className="rounded-lg p-2 text-brand-700 hover:bg-brand-50 dark:text-gray-200 dark:hover:bg-brand-700">
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <div className="relative">
              <button onClick={() => setNotifOpen((o) => !o)} className="relative rounded-lg p-2 text-brand-700 hover:bg-brand-50 dark:text-gray-200 dark:hover:bg-brand-700">
                <Bell className="h-5 w-5" />
                {unread > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />}
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl border border-gray-100 bg-white shadow-lg dark:border-brand-700 dark:bg-brand-800">
                  <p className="border-b border-gray-100 px-4 py-3 text-sm font-semibold text-brand-800 dark:border-brand-700 dark:text-white">Notifications</p>
                  <div className="max-h-72 overflow-y-auto">
                    {demoNotifications.map((n) => (
                      <div key={n.id} className={`border-b border-gray-50 px-4 py-3 dark:border-brand-700/40 ${!n.read ? 'bg-brand-50/50 dark:bg-brand-700/20' : ''}`}>
                        <div className="flex items-start gap-2">
                          <span className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${n.type === 'warning' ? 'bg-amber-500' : n.type === 'success' ? 'bg-emerald-500' : 'bg-brand-500'}`} />
                          <div>
                            <p className="text-sm font-semibold text-brand-800 dark:text-white">{n.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{n.body}</p>
                            <p className="mt-1 text-xs text-gray-400">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 border-l border-gray-200 pl-2 dark:border-brand-700">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-brand-800 dark:text-white">{demoUser?.name ?? 'User'}</p>
                <p className="text-xs text-gray-400">{roleLabel}</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-brand-500 text-center text-sm font-bold leading-9 text-white">
                {(demoUser?.name ?? 'U').charAt(0)}
              </div>
              <button onClick={handleSignOut} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10" aria-label="Sign out">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
