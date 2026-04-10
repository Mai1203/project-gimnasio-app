import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Perfil de Usuario</h1>
        <p className="text-muted-foreground mt-2">Administra tus datos personales y membresía.</p>
      </div>

      <div className="p-6 border border-border rounded-xl shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-semibold border-b border-border pb-2 mb-4">Información Personal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Nombre</p>
              <p className="text-foreground">Deportista Ejemplar</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Correo Electrónico</p>
              <p className="text-foreground">usuario@estheticgym.com</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold border-b border-border pb-2 mb-4">Estado de Membresía</h3>
          <div className="flex items-center justify-between bg-primary/5 p-4 rounded-lg border border-primary/20">
            <div>
              <span className="inline-block px-2 py-1 bg-green-500/10 text-green-600 font-medium text-xs rounded-full mb-1">
                ACTIVA
              </span>
              <p className="font-semibold text-primary">Membresía Premium Anual</p>
              <p className="text-sm text-muted-foreground">Vence: 12 Octubre 2026</p>
            </div>
            <button className="px-4 py-2 border border-primary text-primary hover:bg-primary/5 rounded-md text-sm font-medium transition-colors">
              Gestionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
