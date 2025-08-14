'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/Table';
import { Modal } from '@/components/ui/Modal';

interface User {
  id: string;
  name: string;
  email: string;
  plan: { name: string } | null;
  active: boolean;
  membershipEndDate: string | null;
  createdAt: string;
}

/**
 * Users management page with CRUD operations
 * Displays users in a table with search and pagination
 */
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockUsers: User[] = [
        {
          id: '1',
          name: 'Juan Pérez',
          email: 'juan@gmail.com',
          plan: { name: 'Plan Premium' },
          active: true,
          membershipEndDate: '2024-02-15',
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          name: 'María García',
          email: 'maria@gmail.com',
          plan: { name: 'Plan Básico' },
          active: true,
          membershipEndDate: '2024-02-20',
          createdAt: '2024-01-10'
        },
        {
          id: '3',
          name: 'Carlos López',
          email: 'carlos@gmail.com',
          plan: { name: 'Plan VIP' },
          active: false,
          membershipEndDate: null,
          createdAt: '2024-01-05'
        },
      ];
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const getMembershipStatus = (user: User) => {
    if (!user.active) return { label: 'Inactivo', color: 'text-error' };
    if (!user.membershipEndDate) return { label: 'Sin plan', color: 'text-text-muted' };
    
    const endDate = new Date(user.membershipEndDate);
    const now = new Date();
    const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft <= 0) return { label: 'Vencida', color: 'text-error' };
    if (daysLeft <= 7) return { label: `${daysLeft} días`, color: 'text-warning' };
    return { label: 'Activa', color: 'text-success' };
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto h-screen mt-10">
        <div className="card animate-pulse">
          <div className="h-40 bg-surface-hover rounded"></div>
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
        <h1 className="text-3xl font-bold text-text-primary">Usuarios</h1>
        <Button size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Usuario
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
              <Input
                placeholder="Buscar por nombre o email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="ghost">Filtros</Button>
          </div>
        </Card>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Registro</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user, index) => {
                const status = getMembershipStatus(user);
                
                return (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="table-row"
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-text-primary">{user.name}</p>
                        <p className="text-sm text-text-muted">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-block px-2 py-1 bg-surface-hover rounded text-sm">
                        {user.plan?.name || 'Sin plan'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(user.membershipEndDate)}</TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewUser(user)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-error" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </motion.div>

      {/* User Details Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Detalles del Usuario"
        size="lg"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-secondary">Nombre</label>
                <p className="text-text-primary">{selectedUser.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary">Email</label>
                <p className="text-text-primary">{selectedUser.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary">Plan</label>
                <p className="text-text-primary">{selectedUser.plan?.name || 'Sin plan'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary">Estado</label>
                <p className={getMembershipStatus(selectedUser).color}>
                  {getMembershipStatus(selectedUser).label}
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-border">
              <Button variant="ghost" onClick={() => setShowModal(false)}>
                Cerrar
              </Button>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}