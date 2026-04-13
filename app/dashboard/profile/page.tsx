export default function ProfilePage() {
  const user = {
    name: "Michael Coral",
    email: "maicolcoralbravo@gmail.com",
  };

  const motivationalMessage =
    "La disciplina tarde o temprano vence al talento. 💪";

  return (
    <div className="space-y-10 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Hola, {user.name.split(" ")[0]} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Este es tu espacio personal.
        </p>
      </div>

      {/* Motivational Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20">
        <p className="text-sm text-muted-foreground mb-2">
          Mensaje del día
        </p>
        <p className="text-lg font-semibold text-primary">
          {motivationalMessage}
        </p>
      </div>

      {/* Main Card */}
      <div className="p-6 border rounded-2xl shadow-sm bg-card space-y-8">
        {/* Personal Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Información Personal
          </h3>

          <div className="flex items-center gap-4 mb-6">
            {/* Avatar */}
            <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary">
              {user.name.charAt(0)}
            </div>

            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-secondary/30">
              <p className="text-xs text-muted-foreground mb-1">
                Nombre completo
              </p>
              <p className="font-medium">{user.name}</p>
            </div>

            <div className="p-4 rounded-lg bg-secondary/30">
              <p className="text-xs text-muted-foreground mb-1">
                Correo electrónico
              </p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Membership */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Membresía
          </h3>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 rounded-xl border border-primary/20 bg-primary/5">
            <div>
              <span className="inline-block px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-600 font-medium mb-2">
                ACTIVA
              </span>

              <p className="font-semibold text-primary">
                Premium Anual
              </p>

              <p className="text-sm text-muted-foreground">
                Vence: 12 Octubre 2026
              </p>
            </div>

            <button className="px-5 py-2.5 rounded-xl border border-primary text-primary hover:bg-primary/10 transition font-medium">
              Gestionar plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}