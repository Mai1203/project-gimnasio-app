"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ProgressPage() {
  const hasData = true;

  const stats = [
    { label: "Peso actual", value: "78 kg" },
    { label: "Cambio", value: "-2.5 kg" },
    { label: "Meta", value: "75 kg" },
  ];

  const chartData = [
    { date: "1 Abr", weight: 80.5 },
    { date: "5 Abr", weight: 79 },
    { date: "10 Abr", weight: 78 },
  ];

  const history = [
    { date: "10 Abr", weight: "78 kg" },
    { date: "5 Abr", weight: "79 kg" },
    { date: "1 Abr", weight: "80.5 kg" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Evolución y Progreso
        </h1>
        <p className="text-muted-foreground mt-2">
          Monitorea tus resultados y mantente motivado.
        </p>
      </div>

      {!hasData ? (
        <div className="p-10 border border-dashed rounded-2xl bg-card flex flex-col items-center justify-center text-center">
          <p className="text-muted-foreground mb-4">
            Aún no tienes registros de progreso.
          </p>
          <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition">
            Registrar primer peso
          </button>
        </div>
      ) : (
        <>
          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border bg-card shadow-sm"
              >
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* CHART REAL */}
          <div className="p-6 border rounded-2xl bg-card shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Progreso de peso</h3>
              <button className="text-sm text-primary hover:underline">
                Ver detalles
              </button>
            </div>

            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                  />

                  <YAxis
                    domain={["dataMin - 1", "dataMax + 1"]}
                    tick={{ fontSize: 12 }}
                  />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* HISTORY + CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* History */}
            <div className="p-6 border rounded-2xl bg-card shadow-sm">
              <h3 className="font-semibold mb-4">
                Historial reciente
              </h3>

              <div className="space-y-3">
                {history.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-3 rounded-lg bg-secondary/30"
                  >
                    <span className="text-sm text-muted-foreground">
                      {item.date}
                    </span>
                    <span className="font-medium">
                      {item.weight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 border rounded-2xl bg-card shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-semibold mb-2">
                  Registra tu progreso
                </h3>
                <p className="text-sm text-muted-foreground">
                  Mantén tus datos actualizados para ver mejores resultados y análisis.
                </p>
              </div>

              <button className="mt-6 w-full rounded-xl bg-primary text-primary-foreground py-2.5 font-medium hover:opacity-90 transition">
                Registrar nuevo peso
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}