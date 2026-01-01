'use client';

import VerticalDashboard from '@/components/VerticalDashboard';
import RoleProtectedLayout from '@/components/RoleProtectedLayout';
import ManagementPageLayout from '@/components/ManagementPageLayout';

const getRoleBadge = (role: string) => {
  const roleColors: { [key: string]: string } = {
    Admin: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    Réception: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    Chef: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    Caissier: 'bg-green-500/20 text-green-300 border-green-500/30',
    Livreur: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  };
  return roleColors[role] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
};

const getStatusBadge = (status: string) => {
  return status === 'Actif'
    ? 'bg-green-500/20 text-green-300 border-green-500/30'
    : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
};

export default function UsersManagementPage() {
  const users = [
    { id: 1, name: 'Jean Dupont', email: 'jean.dupont@email.com', role: 'Admin', status: 'Actif', date: '2025-01-15' },
    { id: 2, name: 'Marie Curie', email: 'marie.curie@email.com', role: 'Réception', status: 'Actif', date: '2025-02-20' },
    { id: 3, name: 'Pierre Martin', email: 'pierre.martin@email.com', role: 'Chef', status: 'Actif', date: '2025-03-10' },
    { id: 4, name: 'Sophie Laurent', email: 'sophie.laurent@email.com', role: 'Caissier', status: 'Inactif', date: '2025-04-05' },
  ];

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
                      <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Statut</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Date d'inscription</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[--color-accent]/10">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-[--color-accent]/5 transition-all duration-200 group">
                        <td className="py-4 px-6 text-sm text-[--color-text] group-hover:text-[--color-accent] transition-colors font-medium">{user.name}</td>
                        <td className="py-4 px-6 text-sm text-[--color-text-muted] group-hover:text-[--color-text] transition-colors">{user.email}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getRoleBadge(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm text-[--color-text-muted]">{user.date}</td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <button className="text-[--color-accent] hover:text-[--color-accent-hover] transition-colors font-medium text-sm">
                              Modifier
                            </button>
                            <span className="text-[--color-text-muted]">|</span>
                            <button className="text-red-400 hover:text-red-300 transition-colors font-medium text-sm">
                              Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ManagementPageLayout>
      </VerticalDashboard>
    </RoleProtectedLayout>
  );
}