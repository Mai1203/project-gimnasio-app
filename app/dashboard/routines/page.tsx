export default function RoutinesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tus Rutinas</h1>
        <p className="text-muted-foreground mt-2">Planes de entrenamiento asignados por tus instructores.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((routine) => (
          <div key={routine} className="border border-border rounded-xl p-6 shadow-sm bg-card">
            <h3 className="text-xl font-bold mb-2">Rutina de Hipertrofia {routine}</h3>
            <p className="text-muted-foreground mb-4">Para fortalecimiento general y volumen.</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-md">
                <span className="font-medium">Press de Banca</span>
                <span className="text-sm text-muted-foreground">4x12</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-md">
                <span className="font-medium">Sentadilla Libre</span>
                <span className="text-sm text-muted-foreground">4x10</span>
              </div>
            </div>
            <button className="mt-6 w-full rounded-lg bg-primary/10 text-primary py-2 font-medium hover:bg-primary/20 transition-colors">
              Iniciar Sesión
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
