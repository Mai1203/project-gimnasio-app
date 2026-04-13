export default function RoutinesPage() {
  const routines = [
    {
      id: 1,
      title: "Hipertrofia Upper",
      description: "Enfoque en tren superior y volumen muscular (Pectorales).",
      status: "Activa",
      duration: "60 min",
      frequency: "4 días/semana",
      exercises: [
        { name: "Press de Banca", sets: "4x12" },
        { name: "Press inclinado", sets: "4x10" },
        { name: "Press declinado", sets: "4x12" },
        { name: "Aperturas", sets: "4x10" },
      ],
    },
    {
      id: 2,
      title: "Pierna & Glúteo",
      description: "Fuerza y desarrollo de tren inferior.",
      status: "Pendiente",
      duration: "50 min",
      frequency: "3 días/semana",
      exercises: [
        { name: "Sentadilla Libre", sets: "4x10" },
        { name: "Hip Thrust", sets: "4x12" },
        { name: "Prensa", sets: "4x12" },
        { name: "Zancada", sets: "4x10" },
      ],
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Tus Rutinas</h1>
        <p className="text-muted-foreground">
          Rutinas personalizadas asignadas por tu coach.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {routines.map((routine) => (
          <div
            key={routine.id}
            className="group border border-border rounded-2xl p-6 bg-card shadow-sm hover:shadow-md transition-all"
          >
            {/* Header Card */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{routine.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {routine.description}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  routine.status === "Activa"
                    ? "bg-green-500/10 text-green-600"
                    : "bg-yellow-500/10 text-yellow-600"
                }`}
              >
                {routine.status}
              </span>
            </div>

            {/* Meta info */}
            <div className="flex gap-4 text-sm text-muted-foreground mb-5">
              <span>⏱ {routine.duration}</span>
              <span>📅 {routine.frequency}</span>
            </div>

            {/* Exercises */}
            <div className="space-y-2">
              {routine.exercises.map((ex, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-3 py-2 rounded-lg bg-secondary/30 group-hover:bg-secondary/40 transition-colors"
                >
                  <span className="font-medium">{ex.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {ex.sets}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="mt-6 w-full rounded-xl bg-primary text-primary-foreground py-2.5 font-medium hover:opacity-90 transition">
              {routine.status === "Activa"
                ? "Continuar rutina"
                : "Comenzar rutina"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}