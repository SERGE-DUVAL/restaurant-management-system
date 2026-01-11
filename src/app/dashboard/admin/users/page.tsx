'use client';

import React, { useEffect, useState } from 'react';
import VerticalDashboard from '@/components/VerticalDashboard';
import RoleProtectedLayout from '@/components/RoleProtectedLayout';
import ManagementPageLayout from '@/components/ManagementPageLayout';
import { userService, User } from '@/services/userService';
import { useNotification } from '@/contexts/NotificationContext';

const getRoleBadge = (role: string) => {
  const roleColors: { [key: string]: string } = {
    admin: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    reception: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    chef: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    caissier: 'bg-green-500/20 text-green-300 border-green-500/30',
    livreur: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    client: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  };
  return roleColors[role.toLowerCase()] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
};

const formatRole = (role: string) => {
  const roleMap: { [key: string]: string } = {
    'admin': 'Admin',
    'reception': 'Réception',
    'chef': 'Chef',
    'caissier': 'Caissier',
    'livreur': 'Livreur',
    'client': 'Client',
  };
  return roleMap[role.toLowerCase()] || role;
};

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAll();
      setUsers(data);
    } catch (error: any) {
      console.error('Error loading users:', error);
      showNotification('error', 'Erreur', 'Impossible de charger les utilisateurs');
      // Utiliser des données mock en cas d'erreur
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }

    try {
      await userService.delete(id);
      showNotification('success', 'Succès', 'Utilisateur supprimé avec succès');
      loadUsers();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      showNotification('error', 'Erreur', 'Impossible de supprimer l\'utilisateur');
    }
  };

  return (
    <RoleProtectedLayout allowedRoles={['admin']}>
      <VerticalDashboard>
          <ManagementPageLayout
            title="Gestion des utilisateurs"
            description="Suivi et gestion des utilisateurs du système"
            actions={
              <>
                <button className="px-4 py-2 bg-gradient-to-r from-[--color-accent] to-[--color-accent-hover] text-[--color-bg] rounded-lg font-semibold hover:shadow-lg hover:shadow-[--color-accent]/30 transition-all duration-300 hover:scale-105">
                  + Nouvel utilisateur
                </button>
              </>
            }
            filters={
              <>
                <select className="px-4 py-2 bg-white/90 border border-[--color-accent]/30 text-gray-900 rounded-lg focus:outline-none focus:border-[--color-accent] transition-all font-medium">
                  <option>Tous les utilisateurs</option>
                  <option>Administrateurs</option>
                  <option>Réceptionnistes</option>
                  <option>Caissiers</option>
                  <option>Chefs</option>
                  <option>Livreurs</option>
                </select>
                <button className="px-4 py-2 bg-green-500/20 text-green-300 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-all duration-300">
                  Exporter
                </button>
              </>
            }
          >
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-[--color-accent]/20 bg-gradient-to-r from-[--color-accent]/10 to-transparent">
                      <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Nom</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Email</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Rôle</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Téléphone</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Date</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[--color-accent]/10">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-[--color-text-muted]">
                          Chargement des utilisateurs...
                        </td>
                      </tr>
                    ) : users.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-[--color-text-muted]">
                          Aucun utilisateur trouvé
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id} className="hover:bg-[--color-accent]/5 transition-all duration-200 group">
                          <td className="py-4 px-6 text-sm text-[--color-text] group-hover:text-[--color-accent] transition-colors font-medium">
                            {user.prenom} {user.nom}
                          </td>
                          <td className="py-4 px-6 text-sm text-[--color-text-muted] group-hover:text-[--color-text] transition-colors">{user.email}</td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getRoleBadge(user.role)}`}>
                              {formatRole(user.role)}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-[--color-text-muted]">{user.telephone || '-'}</td>
                          <td className="py-4 px-6 text-sm text-[--color-text-muted]">-</td>
                          <td className="py-4 px-6">
                            <div className="flex gap-2">
                              <button className="text-[--color-accent] hover:text-[--color-accent-hover] transition-colors font-medium text-sm">
                                Modifier
                              </button>
                              <span className="text-[--color-text-muted]">|</span>
                              <button 
                                onClick={() => handleDelete(user.id)}
                                className="text-red-400 hover:text-red-300 transition-colors font-medium text-sm"
                              >
                                Supprimer
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </ManagementPageLayout>
      </VerticalDashboard>
    </RoleProtectedLayout>
  );
}