'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from './sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  requiredRole?: string[];
}

export default function DashboardLayout({
  children,
  requiredRole,
}: DashboardLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/connexion');
      return;
    }

    if (requiredRole && !requiredRole.includes(session.user.role)) {
      // Redirect to appropriate dashboard based on role
      switch (session.user.role) {
        case 'ADMIN':
          router.push('/admin');
          break;
        case 'PILOTE_CELLULE':
          router.push('/pilote');
          break;
        case 'RESPONSABLE_TACHE':
          router.push('/responsable');
          break;
        case 'GUEST':
          router.push('/guest');
          break;
        default:
          router.push('/utilisateur');
      }
    }
  }, [session, status, router, requiredRole]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
