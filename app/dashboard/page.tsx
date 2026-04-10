'use client';

import { useSession } from 'next-auth/react';
import { Activity, Flame, Trophy } from 'lucide-react';

export default function DashboardClientPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">¡Hola, {session?.user?.name || 'Deportista'}!</h1>
        <p className="text-muted-foreground mt-2">Aquí tienes un resumen de tu actividad reciente.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border border-border rounded-xl shadow-sm bg-card text-card-foreground">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Asistencias este mes</h3>
            <Activity className="text-primary" />
          </div>
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm text-muted-foreground mt-1">Buen ritmo de entrenamiento</p>
        </div>

        <div className="p-6 border border-border rounded-xl shadow-sm bg-card text-card-foreground">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Racha actual</h3>
            <Flame className="text-primary" />
          </div>
          <p className="text-3xl font-bold">4 días</p>
          <p className="text-sm text-muted-foreground mt-1">No te rindas ahora</p>
        </div>

        <div className="p-6 border border-border rounded-xl shadow-sm bg-card text-card-foreground">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Logros</h3>
            <Trophy className="text-primary" />
          </div>
          <p className="text-3xl font-bold">3</p>
          <p className="text-sm text-muted-foreground mt-1">Medallas ganadas</p>
        </div>
      </div>
    </div>
  );
}
