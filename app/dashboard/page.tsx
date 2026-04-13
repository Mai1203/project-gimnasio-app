'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import {
  Activity,
  Flame,
  Trophy,
  Scale,
  Zap,
  Users,
  CalendarCheck,
  Dumbbell,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

// ─────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────
interface KpiCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  trend?: 'up' | 'down' | 'neutral';
  accentColor?: string;
}

interface GoalRowProps {
  label: string;
  current: number;
  total: number;
  unit: string;
  color: string;
}

interface ClassItem {
  day: string;
  time: string;
  name: string;
  trainer: string;
  status: 'inscrito' | 'disponible' | 'ultimos';
}

interface Achievement {
  icon: string;
  title: string;
  subtitle: string;
  level: 'oro' | 'plata' | 'bronce';
}

interface LeaderboardEntry {
  rank: number;
  initials: string;
  name: string;
  attendances: number;
  isMe?: boolean;
}

// ─────────────────────────────────────────────
// DATOS DE EJEMPLO — reemplazar con llamadas a API
// ─────────────────────────────────────────────
const MOCK_STATS = {
  attendancesThisMonth: 14,
  attendancesDelta: 3,
  currentStreak: 4,
  bestStreak: 12,
  caloriesBurned: 8340,
  currentWeight: 74.0,
  weightDelta: -2.4,
};

const MOCK_ATTENDANCE_WEEKS = [
  { label: 'Sem 12', value: 3 },
  { label: 'Sem 13', value: 4 },
  { label: 'Sem 14', value: 2 },
  { label: 'Sem 15', value: 5 },
];

const MOCK_WEIGHT_HISTORY = [76.4, 76.1, 75.8, 75.5, 75.2, 74.9, 74.4, 74.0];
const MOCK_WEIGHT_LABELS = ['Sem 8', 'Sem 9', 'Sem 10', 'Sem 11', 'Sem 12', 'Sem 13', 'Sem 14', 'Sem 15'];

const MOCK_GOALS: GoalRowProps[] = [
  { label: 'Cardio semanal', current: 3, total: 4, unit: 'días', color: '#1D9E75' },
  { label: 'Fuerza semanal', current: 2, total: 3, unit: 'días', color: '#378ADD' },
  { label: 'Meta de calorías', current: 8340, total: 10000, unit: 'kcal', color: '#EF9F27' },
];

// 0 = entrenado, 1 = descanso, 2 = sin dato
const MOCK_STREAK_APRIL = [
  0, 1, 0, 0, 1, 0, 0, 0, 1, 0,
  0, 0, 0, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
];

const MOCK_CLASSES: ClassItem[] = [
  { day: 'HOY', time: '07:00', name: 'Spinning', trainer: 'Coach Valentina R.', status: 'inscrito' },
  { day: 'MIÉ', time: '06:30', name: 'CrossFit', trainer: 'Coach Andrés M.', status: 'disponible' },
  { day: 'JUE', time: '18:00', name: 'Yoga funcional', trainer: 'Coach Lucía P.', status: 'ultimos' },
  { day: 'VIE', time: '07:00', name: 'HIIT', trainer: 'Coach Diego F.', status: 'disponible' },
];

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { icon: '🔥', title: 'Racha de fuego', subtitle: '7 días seguidos · hace 2 semanas', level: 'oro' },
  { icon: '🏅', title: '20 clases completadas', subtitle: 'Hito de constancia · hace 1 mes', level: 'plata' },
  { icon: '💧', title: 'Primer mes activo', subtitle: 'Membresía completa · marzo', level: 'bronce' },
];

const MOCK_MACROS = { calories: 1840, caloriesGoal: 2200, protein: 148, carbs: 210, fat: 54 };

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, initials: 'CM', name: 'Carlos M.', attendances: 22 },
  { rank: 2, initials: 'LP', name: 'Laura P.', attendances: 19 },
  { rank: 3, initials: 'SE', name: 'Sebastián E. (tú)', attendances: 14, isMe: true },
  { rank: 4, initials: 'MG', name: 'María G.', attendances: 11 },
  { rank: 5, initials: 'JR', name: 'Jorge R.', attendances: 9 },
];

// ─────────────────────────────────────────────
// SUBCOMPONENTES
// ─────────────────────────────────────────────
function KpiCard({ icon, label, value, sub, trend = 'neutral', accentColor = '#1D9E75' }: KpiCardProps) {
  const trendColor =
    trend === 'up' ? '#1D9E75' : trend === 'down' ? '#D85A30' : 'var(--color-text-tertiary)';
  const TrendIcon =
    trend === 'up' ? ChevronUp : trend === 'down' ? ChevronDown : null;

  return (
    <div className="kpi-card">
      <div className="kpi-icon-row">
        <span className="kpi-label">{label}</span>
        <span className="kpi-icon" style={{ color: accentColor }}>{icon}</span>
      </div>
      <p className="kpi-value">{value}</p>
      <p className="kpi-sub" style={{ color: trendColor }}>
        {TrendIcon && <TrendIcon size={12} style={{ display: 'inline', marginRight: 2, verticalAlign: 'middle' }} />}
        {sub}
      </p>
    </div>
  );
}

function GoalRow({ label, current, total, unit, color }: GoalRowProps) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="goal-row">
      <div className="goal-header">
        <span className="goal-label">{label}</span>
        <span className="goal-value">
          {current.toLocaleString()} / {total.toLocaleString()} {unit}
        </span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ClassItem['status'] }) {
  const map = {
    inscrito: { label: 'Inscrito', bg: '#E1F5EE', color: '#0F6E56' },
    disponible: { label: 'Disponible', bg: '#E6F1FB', color: '#185FA5' },
    ultimos: { label: '2 cupos', bg: '#FAEEDA', color: '#854F0B' },
  };
  const s = map[status];
  return (
    <span className="badge" style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

function LevelBadge({ level }: { level: Achievement['level'] }) {
  const map = {
    oro: { bg: '#FAEEDA', color: '#854F0B' },
    plata: { bg: '#D3D1C7', color: '#444441' },
    bronce: { bg: '#FAECE7', color: '#993C1D' },
  };
  const s = map[level];
  return (
    <span className="badge" style={{ background: s.bg, color: s.color, textTransform: 'capitalize' }}>
      {level}
    </span>
  );
}

// ─────────────────────────────────────────────
// MINI CHART — barras de asistencia (SVG puro, sin dependencias)
// ─────────────────────────────────────────────
function AttendanceBarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = 7;
  const h = 120;
  const barW = 32;
  const gap = 20;
  const totalW = data.length * (barW + gap) - gap;

  return (
    <svg viewBox={`0 0 ${totalW + 20} ${h + 40}`} width="100%" style={{ overflow: 'visible' }}>
      {data.map((d, i) => {
        const barH = (d.value / max) * h;
        const x = i * (barW + gap) + 10;
        const y = h - barH;
        const isLast = i === data.length - 1;
        return (
          <g key={d.label}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx={6}
              fill={isLast ? '#1D9E75' : '#9FE1CB'}
            />
            <text
              x={x + barW / 2}
              y={y - 6}
              textAnchor="middle"
              fontSize={11}
              fontWeight={isLast ? 500 : 400}
              fill={isLast ? '#1D9E75' : '#888780'}
            >
              {d.value}
            </text>
            <text x={x + barW / 2} y={h + 18} textAnchor="middle" fontSize={11} fill="#888780">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─────────────────────────────────────────────
// MINI CHART — línea de peso (SVG puro)
// ─────────────────────────────────────────────
function WeightLineChart({ data, labels }: { data: number[]; labels: string[] }) {
  const W = 400;
  const H = 100;
  const minVal = Math.min(...data) - 0.5;
  const maxVal = Math.max(...data) + 0.5;
  const xStep = W / (data.length - 1);

  const toX = (i: number) => i * xStep;
  const toY = (v: number) => H - ((v - minVal) / (maxVal - minVal)) * H;

  const pathD = data
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`)
    .join(' ');

  const areaD =
    pathD +
    ` L ${toX(data.length - 1).toFixed(1)} ${H} L 0 ${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H + 30}`} width="100%" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#378ADD" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#378ADD" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#weightGrad)" />
      <path d={pathD} fill="none" stroke="#378ADD" strokeWidth={2} strokeLinejoin="round" />
      {data.map((v, i) => (
        <g key={i}>
          <circle cx={toX(i)} cy={toY(v)} r={3} fill="#378ADD" />
          {i % 2 === 0 && (
            <text x={toX(i)} y={H + 18} textAnchor="middle" fontSize={10} fill="#888780">
              {labels[i]}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────
export default function DashboardClientPage() {
  const { data: session } = useSession();
  const name = session?.user?.name ?? 'Deportista';
  const s = MOCK_STATS;

  const today = new Date();
  const dateStr = today.toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <>
      {/* ── ESTILOS GLOBALES ── */}
      <style>{`
        .dashboard-root {
          font-family: 'Geist', 'Inter', system-ui, sans-serif;
          color: var(--color-text-primary, #111);
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Header */
        .dash-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 1.75rem;
        }
        .dash-date {
          font-size: 11px;
          color: var(--color-text-tertiary, #888);
          text-transform: capitalize;
          letter-spacing: 0.04em;
          margin-bottom: 4px;
        }
        .dash-title {
          font-size: 26px;
          font-weight: 600;
          color: var(--color-text-primary, #111);
          line-height: 1.2;
          margin: 0 0 4px;
        }
        .dash-sub {
          font-size: 13px;
          color: var(--color-text-secondary, #666);
          margin: 0;
        }
        .dash-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #E1F5EE;
          color: #0F6E56;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 500;
          padding: 3px 10px;
          border-radius: 20px;
        }

        /* KPIs */
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 10px;
          margin-bottom: 1.5rem;
        }
        .kpi-card {
          background: var(--color-background-secondary, #f7f7f5);
          border-radius: 12px;
          padding: 16px 18px;
        }
        .kpi-icon-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .kpi-label {
          font-size: 12px;
          color: var(--color-text-secondary, #666);
        }
        .kpi-icon {
          display: flex;
          align-items: center;
        }
        .kpi-value {
          font-size: 28px;
          font-weight: 600;
          color: var(--color-text-primary, #111);
          line-height: 1;
          margin: 0 0 4px;
        }
        .kpi-sub {
          font-size: 12px;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        /* Cards */
        .card {
          background: var(--color-background-primary, #fff);
          border: 0.5px solid var(--color-border-tertiary, rgba(0,0,0,0.1));
          border-radius: 14px;
          padding: 18px 20px;
        }
        .card-title {
          font-size: 13px;
          font-weight: 500;
          color: var(--color-text-primary, #111);
          margin: 0 0 14px;
        }

        /* Grid layouts */
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 1.25rem;
        }
        .grid-full {
          margin-bottom: 1.25rem;
        }
        @media (max-width: 640px) {
          .grid-2 { grid-template-columns: 1fr; }
          .kpi-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 380px) {
          .kpi-grid { grid-template-columns: 1fr; }
        }

        /* Goals */
        .goal-row { margin-bottom: 14px; }
        .goal-row:last-child { margin-bottom: 0; }
        .goal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .goal-label {
          font-size: 12px;
          color: var(--color-text-secondary, #666);
        }
        .goal-value {
          font-size: 12px;
          font-weight: 500;
          color: var(--color-text-primary, #111);
        }
        .progress-bar {
          height: 6px;
          border-radius: 4px;
          background: var(--color-background-secondary, #f0efea);
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.6s ease;
        }

        /* Streak dots */
        .streak-dots {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        .dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .dot-active { background: #1D9E75; }
        .dot-rest   { background: #F0997B; }
        .dot-empty  { background: var(--color-background-secondary, #f0efea); border: 0.5px solid var(--color-border-tertiary, rgba(0,0,0,0.12)); }
        .streak-legend {
          display: flex;
          gap: 14px;
          margin-top: 12px;
        }
        .streak-legend-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--color-text-secondary, #666);
        }

        /* Classes */
        .class-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 9px 0;
          border-bottom: 0.5px solid var(--color-border-tertiary, rgba(0,0,0,0.08));
        }
        .class-row:last-child { border-bottom: none; }
        .class-time {
          font-size: 11px;
          color: var(--color-text-tertiary, #888);
          min-width: 58px;
          line-height: 1.3;
        }
        .class-name {
          font-size: 13px;
          font-weight: 500;
          color: var(--color-text-primary, #111);
        }
        .class-trainer {
          font-size: 11px;
          color: var(--color-text-tertiary, #888);
        }

        /* Achievements */
        .achievement-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 0;
          border-bottom: 0.5px solid var(--color-border-tertiary, rgba(0,0,0,0.08));
        }
        .achievement-row:last-child { border-bottom: none; }
        .achievement-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }
        .achievement-title {
          font-size: 13px;
          font-weight: 500;
          color: var(--color-text-primary, #111);
        }
        .achievement-sub {
          font-size: 11px;
          color: var(--color-text-tertiary, #888);
        }

        /* Macros */
        .macro-row {
          display: flex;
          gap: 8px;
          margin-top: 10px;
        }
        .macro-block {
          flex: 1;
          background: var(--color-background-secondary, #f7f7f5);
          border-radius: 10px;
          padding: 10px 8px;
          text-align: center;
        }
        .macro-val {
          font-size: 19px;
          font-weight: 600;
          line-height: 1;
        }
        .macro-lbl {
          font-size: 11px;
          color: var(--color-text-secondary, #666);
          margin-top: 3px;
        }

        /* Leaderboard */
        .lb-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          border-bottom: 0.5px solid var(--color-border-tertiary, rgba(0,0,0,0.08));
        }
        .lb-row:last-child { border-bottom: none; }
        .lb-rank {
          font-size: 13px;
          font-weight: 500;
          min-width: 20px;
        }
        .lb-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
          flex-shrink: 0;
        }
        .lb-name {
          flex: 1;
          font-size: 13px;
          color: var(--color-text-primary, #111);
        }
        .lb-count {
          font-size: 13px;
          font-weight: 500;
          color: var(--color-text-primary, #111);
        }
        .lb-me {
          background: #E1F5EE;
          border-radius: 10px;
          padding: 6px 10px;
          margin: 2px -4px;
        }
        .lb-me .lb-name { color: #0F6E56; font-weight: 500; }
        .lb-me .lb-rank { color: #0F6E56; }
        .lb-me .lb-count { color: #0F6E56; }
      `}</style>

      <div className="dashboard-root">
        {/* ── HEADER ── */}
        <div className="dash-header">
          <div>
            <p className="dash-date">{dateStr} · semana 15</p>
            <h1 className="dash-title">¡Hola, {name}!</h1>
            <p className="dash-sub">
              Llevas {s.currentStreak} días seguidos entrenando. ¡Sigue así!
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge" style={{ background: '#E1F5EE', color: '#0F6E56' }}>
              Plan Activo
            </span>
            <div className="dash-avatar">
              {name.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </div>

        {/* ── KPIs ── */}
        <div className="kpi-grid">
          <KpiCard
            icon={<Activity size={16} />}
            label="Asistencias este mes"
            value={String(s.attendancesThisMonth)}
            sub={`+${s.attendancesDelta} vs mes anterior`}
            trend="up"
            accentColor="#1D9E75"
          />
          <KpiCard
            icon={<Flame size={16} />}
            label="Racha actual"
            value={`${s.currentStreak} días`}
            sub={`Mejor racha: ${s.bestStreak} días`}
            trend="up"
            accentColor="#EF9F27"
          />
          <KpiCard
            icon={<Zap size={16} />}
            label="Calorías quemadas"
            value={s.caloriesBurned.toLocaleString()}
            sub="este mes"
            trend="neutral"
            accentColor="#D85A30"
          />
          <KpiCard
            icon={<Scale size={16} />}
            label="Peso actual"
            value={`${s.currentWeight} kg`}
            sub={`${s.weightDelta} kg desde inicio`}
            trend="down"
            accentColor="#378ADD"
          />
        </div>

        {/* ── GRÁFICA ASISTENCIA ── */}
        <div className="grid-full">
          <div className="card">
            <p className="card-title">Asistencia — últimas 4 semanas</p>
            <AttendanceBarChart data={MOCK_ATTENDANCE_WEEKS} />
          </div>
        </div>

        {/* ── OBJETIVOS + RACHA ── */}
        <div className="grid-2">
          <div className="card">
            <p className="card-title">Progreso de objetivos</p>
            {MOCK_GOALS.map((g) => (
              <GoalRow key={g.label} {...g} />
            ))}
          </div>

          <div className="card">
            <p className="card-title">Racha de asistencia — abril</p>
            <div className="streak-dots">
              {MOCK_STREAK_APRIL.map((s, i) => (
                <div
                  key={i}
                  className={`dot ${s === 0 ? 'dot-active' : s === 1 ? 'dot-rest' : 'dot-empty'}`}
                  title={`Día ${i + 1}`}
                />
              ))}
            </div>
            <div className="streak-legend">
              <span className="streak-legend-item">
                <span className="dot dot-active" />
                Entrenado
              </span>
              <span className="streak-legend-item">
                <span className="dot dot-rest" />
                Descanso
              </span>
              <span className="streak-legend-item">
                <span className="dot dot-empty" />
                Sin dato
              </span>
            </div>
          </div>
        </div>

        {/* ── CLASES + LOGROS ── */}
        <div className="grid-2">
          <div className="card">
            <p className="card-title">Próximas clases</p>
            {MOCK_CLASSES.map((c) => (
              <div className="class-row" key={`${c.day}-${c.name}`}>
                <div className="class-time">
                  {c.day}
                  <br />
                  {c.time}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="class-name">{c.name}</div>
                  <div className="class-trainer">{c.trainer}</div>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>

          <div className="card">
            <p className="card-title">Logros recientes</p>
            {MOCK_ACHIEVEMENTS.map((a) => {
              const iconBg =
                a.level === 'oro' ? '#FAEEDA' : a.level === 'plata' ? '#D3D1C7' : '#FAECE7';
              return (
                <div className="achievement-row" key={a.title}>
                  <div className="achievement-icon" style={{ background: iconBg }}>
                    {a.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="achievement-title">{a.title}</div>
                    <div className="achievement-sub">{a.subtitle}</div>
                  </div>
                  <LevelBadge level={a.level} />
                </div>
              );
            })}
          </div>
        </div>

        {/* ── PESO + MACROS ── */}
        <div className="grid-2">
          <div className="card">
            <p className="card-title">Peso corporal — últimas 8 semanas</p>
            <WeightLineChart data={MOCK_WEIGHT_HISTORY} labels={MOCK_WEIGHT_LABELS} />
          </div>

          <div className="card">
            <p className="card-title">Macros consumidos hoy</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Calorías</span>
              <span style={{ fontSize: 16, fontWeight: 600 }}>
                {MOCK_MACROS.calories.toLocaleString()}{' '}
                <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--color-text-tertiary)' }}>
                  / {MOCK_MACROS.caloriesGoal.toLocaleString()} kcal
                </span>
              </span>
            </div>
            <div className="progress-bar" style={{ marginTop: 8, marginBottom: 14 }}>
              <div
                className="progress-fill"
                style={{
                  width: `${Math.round((MOCK_MACROS.calories / MOCK_MACROS.caloriesGoal) * 100)}%`,
                  background: '#EF9F27',
                }}
              />
            </div>
            <div className="macro-row">
              <div className="macro-block">
                <div className="macro-val" style={{ color: '#185FA5' }}>{MOCK_MACROS.protein}g</div>
                <div className="macro-lbl">Proteínas</div>
              </div>
              <div className="macro-block">
                <div className="macro-val" style={{ color: '#639922' }}>{MOCK_MACROS.carbs}g</div>
                <div className="macro-lbl">Carbos</div>
              </div>
              <div className="macro-block">
                <div className="macro-val" style={{ color: '#BA7517' }}>{MOCK_MACROS.fat}g</div>
                <div className="macro-lbl">Grasas</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── LEADERBOARD ── */}
        <div className="grid-full">
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <p className="card-title" style={{ margin: 0 }}>Tabla de posiciones — este mes</p>
              <Users size={14} color="var(--color-text-tertiary)" />
            </div>
            {MOCK_LEADERBOARD.map((entry) => {
              const rankColor =
                entry.rank === 1 ? '#BA7517' : entry.rank === 2 ? '#5F5E5A' : 'var(--color-text-tertiary)';
              const avatarStyles: Record<number, { bg: string; color: string }> = {
                1: { bg: '#FAEEDA', color: '#854F0B' },
                2: { bg: '#D3D1C7', color: '#444441' },
                3: { bg: '#5DCAA5', color: '#085041' },
                4: { bg: '#FAECE7', color: '#993C1D' },
                5: { bg: '#E6F1FB', color: '#185FA5' },
              };
              const av = avatarStyles[entry.rank] ?? { bg: '#f0efea', color: '#666' };

              return (
                <div className={`lb-row${entry.isMe ? ' lb-me' : ''}`} key={entry.rank}>
                  <span className="lb-rank" style={{ color: entry.isMe ? '#0F6E56' : rankColor }}>
                    {entry.rank}
                  </span>
                  <div
                    className="lb-avatar"
                    style={{ background: av.bg, color: av.color }}
                  >
                    {entry.initials}
                  </div>
                  <span className="lb-name">{entry.name}</span>
                  <span className="lb-count">
                    {entry.attendances}{' '}
                    <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--color-text-tertiary)' }}>
                      asistencias
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
// GUÍA DE CONEXIÓN A BASE DE DATOS
// ─────────────────────────────────────────────
//
// Reemplaza cada constante MOCK_* con una llamada al API correspondiente.
// Ejemplo con React Query:
//
//   import { useQuery } from '@tanstack/react-query';
//
//   const { data: stats } = useQuery({
//     queryKey: ['dashboard-stats', session?.user?.id],
//     queryFn: () => fetch(`/api/stats?userId=${session?.user?.id}`).then(r => r.json()),
//   });
//
// Endpoints sugeridos:
//   GET /api/stats              → MOCK_STATS
//   GET /api/attendance/weekly  → MOCK_ATTENDANCE_WEEKS
//   GET /api/weight/history     → MOCK_WEIGHT_HISTORY
//   GET /api/goals              → MOCK_GOALS
//   GET /api/classes/upcoming   → MOCK_CLASSES
//   GET /api/achievements       → MOCK_ACHIEVEMENTS
//   GET /api/macros/today       → MOCK_MACROS
//   GET /api/leaderboard        → MOCK_LEADERBOARD
// ─────────────────────────────────────────────