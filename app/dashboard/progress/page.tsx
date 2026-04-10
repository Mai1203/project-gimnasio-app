export default function ProgressPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Evolución y Progreso</h1>
        <p className="text-muted-foreground mt-2">Monitorea tus pesos y medidas a lo largo del tiempo.</p>
      </div>

      <div className="p-8 border border-border rounded-xl bg-card flex flex-col items-center justify-center min-h-[300px] text-center">
        <p className="text-muted-foreground mb-4">Gráfico de progreso en construcción...</p>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90">
          Registrar nuevo peso
        </button>
      </div>
    </div>
  );
}
