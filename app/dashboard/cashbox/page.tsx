'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Users, 
  UserPlus, 
  TrendingUp, 
  Download,
  Calendar
} from 'lucide-react';
import { KPI } from '@/components/ui/KPI';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/Table';

interface CashboxData {
  todaysRevenue: number;
  todaysCheckIns: number;
  newSubscriptions: number;
  totalAccumulated: number;
  transactions: Array<{
    id: string;
    amount: number;
    type: string;
    description: string;
    user: { name: string } | null;
    createdAt: string;
  }>;
  trends: {
    revenue: { change: number; isPositive: boolean };
    checkIns: { change: number; isPositive: boolean };
    subscriptions: { change: number; isPositive: boolean };
  };
}

/**
 * Cashbox page for financial management
 * Shows daily KPIs, transactions, and financial reports
 */
export default function CashboxPage() {
  const [data, setData] = useState<CashboxData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock data for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        todaysRevenue: 1850,
        todaysCheckIns: 62,
        newSubscriptions: 12,
        totalAccumulated: 145230,
        transactions: [
          {
            id: '1',
            amount: 49.99,
            type: 'PAYMENT',
            description: 'Pago de Plan Premium',
            user: { name: 'Juan Pérez' },
            createdAt: '2024-01-15T10:30:00Z'
          },
          {
            id: '2',
            amount: 29.99,
            type: 'PAYMENT',
            description: 'Pago de Plan Básico',
            user: { name: 'María García' },
            createdAt: '2024-01-15T09:15:00Z'
          },
          {
            id: '3',
            amount: -29.99,
            type: 'REFUND',
            description: 'Reembolso por cancelación',
            user: { name: 'Carlos López' },
            createdAt: '2024-01-15T08:45:00Z'
          },
          {
            id: '4',
            amount: 79.99,
            type: 'PAYMENT',
            description: 'Pago de Plan VIP',
            user: { name: 'Ana Rodríguez' },
            createdAt: '2024-01-15T07:20:00Z'
          },
        ],
        trends: {
          revenue: { change: 15.3, isPositive: true },
          checkIns: { change: 8.7, isPositive: true },
          subscriptions: { change: 22.1, isPositive: true },
        }
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedDate]);

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'PAYMENT': return 'text-success';
      case 'REFUND': return 'text-error';
      case 'MANUAL': return 'text-warning';
      default: return 'text-text-primary';
    }
  };

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case 'PAYMENT': return 'Pago';
      case 'REFUND': return 'Reembolso';
      case 'MANUAL': return 'Manual';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto h-screen mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-20 bg-surface-hover rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-screen mt-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Caja Administrativa</h1>
          <p className="text-text-secondary mt-2">
            Control financiero y reportes diarios
          </p>
        </div>
        <div className="flex space-x-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input"
          />
          <Button variant="secondary">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Generar Cierre
          </Button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <KPI
            title="Ingresos Hoy"
            value={data?.todaysRevenue || 0}
            icon={DollarSign}
            prefix="$"
            trend={data?.trends.revenue}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <KPI
            title="Check-ins Hoy"
            value={data?.todaysCheckIns || 0}
            icon={Users}
            trend={data?.trends.checkIns}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <KPI
            title="Nuevas Suscripciones"
            value={data?.newSubscriptions || 0}
            icon={UserPlus}
            trend={data?.trends.subscriptions}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <KPI
            title="Total Acumulado"
            value={data?.totalAccumulated || 0}
            icon={TrendingUp}
            prefix="$"
            animate={false}
          />
        </motion.div>
      </div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Transacciones del Día</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hora</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.transactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="table-row"
                  >
                    <TableCell className="font-mono text-sm">
                      {formatTime(transaction.createdAt)}
                    </TableCell>
                    <TableCell>
                      {transaction.user?.name || 'N/A'}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${getTransactionTypeColor(transaction.type)}`}>
                        {getTransactionTypeLabel(transaction.type)}
                      </span>
                    </TableCell>
                    <TableCell className={`text-right font-mono ${
                      transaction.amount >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      {transaction.amount >= 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-success">Ingresos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                +${data?.transactions
                  .filter(t => t.amount > 0)
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toFixed(2)}
              </div>
              <p className="text-text-muted text-sm">
                {data?.transactions.filter(t => t.amount > 0).length} transacciones
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-error">Reembolsos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-error">
                ${Math.abs(data?.transactions
                  .filter(t => t.amount < 0)
                  .reduce((sum, t) => sum + t.amount, 0) || 0)
                  .toFixed(2)}
              </div>
              <p className="text-text-muted text-sm">
                {data?.transactions.filter(t => t.amount < 0).length} reembolsos
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Neto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                ${data?.transactions
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toFixed(2)}
              </div>
              <p className="text-text-muted text-sm">
                Balance del día
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}