"use client";

import VerticalDashboard from '@/components/VerticalDashboard';
import RoleProtectedLayout from '@/components/RoleProtectedLayout';
import ManagementPageLayout from '@/components/ManagementPageLayout';

const getStatusBadge = (status: string) => {
  const statusColors: { [key: string]: string } = {
    'Livrée': 'bg-green-500/20 text-green-300 border-green-500/30',
    'En route': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'En préparation': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'Prêt à livrer': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'En attente': 'bg-red-500/20 text-red-300 border-red-500/30',
    'Annulée': 'bg-red-500/20 text-red-300 border-red-500/30',
  };
  return statusColors[status] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
};

export default function DeliveriesPage() {
  const deliveries = [
    { commande: 'CMD-001', client: 'Jean Dupont', adresse: '123 Rue de la Paix, 75000 Paris', telephone: '06 12 34 56 78', livreur: 'Luc Martin', heure: '2025-01-15 20:15', status: 'Livrée' },
    { commande: 'CMD-003', client: 'Pierre Martin', adresse: '45 Avenue des Champs-Élysées, 75008 Paris', telephone: '06 98 76 54 32', livreur: 'Sophie Laurent', heure: '2025-01-15 13:30', status: 'En route' },
    { commande: 'CMD-005', client: 'Marie Dubois', adresse: '78 Boulevard Saint-Germain, 75006 Paris', telephone: '06 45 12 78 90', livreur: 'Paul Moreau', heure: '2025-01-15 19:45', status: 'Prêt à livrer' },
    { commande: 'CMD-006', client: 'Thomas Bernard', adresse: '34 Rue de Rivoli, 75004 Paris', telephone: '06 23 67 89 01', livreur: '-', heure: '2025-01-14 21:00', status: 'En attente' },
  ];

  return (
      <RoleProtectedLayout allowedRoles={['admin', 'delivery']}>
        <VerticalDashboard>
        <ManagementPageLayout
          title="Gestion des livraisons"
          description="Suivi et gestion des commandes à livrer et leur statut"
          actions={
            <>
              <select className="px-4 py-2 bg-white/90 border border-[--color-accent]/30 text-gray-900 rounded-lg focus:outline-none focus:border-[--color-accent] transition-all font-medium">
                  <option>Toutes les livraisons</option>
                <option>En préparation</option>
                <option>En route</option>
                <option>Livrées</option>
                <option>Annulées</option>
                </select>
              <button className="px-4 py-2 bg-gradient-to-r from-[--color-accent] to-[--color-accent-hover] text-[--color-bg] rounded-lg font-semibold hover:shadow-lg hover:shadow-[--color-accent]/30 transition-all duration-300 hover:scale-105">
                + Nouvelle livraison
              </button>
            </>
          }
          filters={
            <button className="px-4 py-2 bg-green-500/20 text-green-300 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-all duration-300">
                  Exporter
                </button>
          }
        >
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-[--color-accent]/20 bg-gradient-to-r from-[--color-accent]/10 to-transparent">
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Commande</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Client</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Adresse</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Téléphone</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Statut</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Livreur</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[--color-accent]/10">
                  {deliveries.map((delivery, index) => (
                    <tr key={index} className="hover:bg-[--color-accent]/5 transition-all duration-200 group">
                      <td className="py-4 px-6 text-sm text-[--color-accent] group-hover:text-[--color-accent-hover] transition-colors font-semibold">#{delivery.commande}</td>
                      <td className="py-4 px-6 text-sm text-[--color-text] group-hover:text-[--color-accent] transition-colors font-medium">{delivery.client}</td>
                      <td className="py-4 px-6 text-sm text-[--color-text-muted]">{delivery.adresse}</td>
                      <td className="py-4 px-6 text-sm text-[--color-text-muted]">{delivery.telephone}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(delivery.status)}`}>
                          {delivery.status}
                        </span>
                    </td>
                      <td className="py-4 px-6 text-sm text-[--color-text-muted]">{delivery.livreur}</td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button className="text-[--color-accent] hover:text-[--color-accent-hover] transition-colors font-medium text-sm">
                            Détails
                          </button>
                          <span className="text-[--color-text-muted]">|</span>
                          {delivery.status === 'En attente' ? (
                            <button className="text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm">
                              Assigner
                            </button>
                          ) : delivery.status === 'Livrée' ? (
                            <button className="text-gray-400 hover:text-gray-300 transition-colors font-medium text-sm">
                              Archiver
                            </button>
                          ) : (
                            <button className="text-green-400 hover:text-green-300 transition-colors font-medium text-sm">
                              Livré
                            </button>
                          )}
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