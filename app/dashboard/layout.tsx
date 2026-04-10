'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Activity, Dumbbell, User, LayoutDashboard } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Resumen', icon: LayoutDashboard },
    { href: '/dashboard/routines', label: 'Rutinas', icon: Dumbbell },
    { href: '/dashboard/progress', label: 'Progreso', icon: Activity },
    { href: '/dashboard/profile', label: 'Perfil', icon: User },
  ];

  if (status === 'loading') {
    return <div className="p-8 text-center">Cargando perfil...</div>;
  }

  if (!session) {
    return <div className="p-8 text-center text-destructive">Debes iniciar sesión.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      {/* Sidebar Privado */}
      <aside className="w-full md:w-64 border-r border-border bg-secondary/10 p-6 flex-shrink-0">
        <h2 className="text-xl font-bold mb-8 hidden md:block">Mi Cuenta</h2>
        <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap',
                  isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                )}
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Privado */}
      <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
