import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowLeft, AlertCircle, Info } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/lib/auth';
import { doctors } from '@/lib/data';

interface Props {
  role: 'admin' | 'doctor' | 'patient';
}

const roleConfig = {
  admin: { title: 'Admin Login', dashboard: '/erp/admin/dashboard', demoEmail: 'admin@smartcare.health', demoPass: 'admin123', demoName: 'Administrator' },
  doctor: { title: 'Doctor Login', dashboard: '/erp/doctor/dashboard', demoEmail: 'priya.sharma@smartcare.health', demoPass: 'doctor123', demoName: 'Dr. Priya Sharma', demoSlug: 'dr-priya-sharma' },
  patient: { title: 'Patient Login', dashboard: '/erp/patient/dashboard', demoEmail: 'patient@smartcare.health', demoPass: 'patient123', demoName: 'Demo Patient' },
};

export function ErpLogin({ role }: Props) {
  const cfg = roleConfig[role];
  const navigate = useNavigate();
  const { signInDemo } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }
    // Demo auth: accept any non-empty credentials, or match demo creds
    const doctorMatch = doctors.find((d) => email.toLowerCase().includes(d.name.split(' ')[1].toLowerCase()));
    const name = doctorMatch?.name ?? cfg.demoName;
    const slug = doctorMatch?.slug ?? (role === 'doctor' ? 'dr-priya-sharma' : undefined);
    signInDemo(role, email, name, slug);
    navigate(cfg.dashboard);
  };

  const fillDemo = () => {
    setEmail(cfg.demoEmail);
    setPassword(cfg.demoPass);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-900 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center">
          <Logo light />
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-brand-800">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-brand-800 dark:text-white">{cfg.title}</h1>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-700/40 dark:text-brand-300">
              <Lock className="h-5 w-5" />
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Sign in to access your dashboard.</p>

          <div className="mt-4 flex items-start gap-2 rounded-lg bg-brand-50 px-4 py-2.5 text-xs text-brand-700 dark:bg-brand-700/30 dark:text-brand-200">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>Demo mode — use any email/password, or click "Fill demo credentials" below.</span>
          </div>

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" /> {error}
            </div>
          )}

          <form onSubmit={submit} className="mt-5 space-y-4">
            <div>
              <label className="label"><Mail className="mr-1 inline h-4 w-4" />Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@smartcare.health" className="input" />
            </div>
            <div>
              <label className="label"><Lock className="mr-1 inline h-4 w-4" />Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="input" />
            </div>
            <button type="submit" className="btn-primary w-full">Sign In</button>
          </form>

          <button onClick={fillDemo} className="btn-outline mt-3 w-full text-xs">
            Fill demo credentials
          </button>

          <Link to="/erp" className="mt-5 flex items-center justify-center gap-1 text-xs font-semibold text-brand-600 hover:gap-2">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to portals
          </Link>
        </div>
        <p className="mt-6 text-center text-xs text-brand-400">
          Demo authentication for preview. Role sessions are stored in your browser.
        </p>
      </div>
    </div>
  );
}
