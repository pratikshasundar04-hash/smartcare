import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';
import type { User } from '@supabase/supabase-js';

type DemoRole = 'admin' | 'doctor' | 'patient' | null;

interface DemoUser {
  role: Exclude<DemoRole, null>;
  name: string;
  email: string;
  doctorSlug?: string;
}

interface AuthCtx {
  /** Real Supabase session user (email/password auth) if available */
  user: User | null;
  /** Demo role-based session used for the ERP portal preview */
  demoUser: DemoUser | null;
  loading: boolean;
  /** true when Supabase auth is active (real persistence) */
  realAuth: boolean;
  signInDemo: (role: Exclude<DemoRole, null>, email: string, name?: string, doctorSlug?: string) => void;
  signOutDemo: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthCtx>({} as AuthCtx);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [demoUser, setDemoUser] = useState<DemoUser | null>(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('smartcare-demo-session') : null;
    return raw ? (JSON.parse(raw) as DemoUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signInDemo: AuthCtx['signInDemo'] = (role, email, name, doctorSlug) => {
    const demo: DemoUser = { role, email, name: name ?? email, doctorSlug };
    setDemoUser(demo);
    localStorage.setItem('smartcare-demo-session', JSON.stringify(demo));
  };

  const signOutDemo = () => {
    setDemoUser(null);
    localStorage.removeItem('smartcare-demo-session');
  };

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
    signOutDemo();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        demoUser,
        loading,
        realAuth: isSupabaseConfigured,
        signInDemo,
        signOutDemo,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
