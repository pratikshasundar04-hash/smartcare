import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';

interface Props {
  role: 'admin' | 'doctor' | 'patient';
  children: ReactNode;
}

export function ProtectedRoute({ role, children }: Props) {
  const { demoUser, loading } = useAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-brand-900 text-brand-200">Loading...</div>;
  }

  if (!demoUser || demoUser.role !== role) {
    return <Navigate to={`/erp/${role}/login`} replace />;
  }

  return <>{children}</>;
}
