"use client";

import VerticalDashboard from '@/components/VerticalDashboard';
import RoleProtectedLayout from '@/components/RoleProtectedLayout';
import ManagementPageLayout from '@/components/ManagementPageLayout';

const getStatusBadge = (status: string) => {
  const statusColors: { [key: string]: string } = {
    'Livrée': 'bg-green-500/20 text-green-300 border-green-500/30',
    'En préparation': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'En livraison': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Prêt': 'bg-green-500/20 text-green-300 border-green-500/30',
    'Annulée': 'bg-red-500/20 text-red-300 border-red-500/30',
  };
  return statusColors[status] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
};

export default function OrdersPage() {
  const orders = [
    { id: 'CMD-001', client: 'Jean Dupont', date: '2025-01-15 19:30', status: 'En préparation', amount: '€45.50', type: 'À emporter' },
    { id: 'CMD-002', client: 'Marie Curie', date: '2025-01-15 20:15', status: 'Prêt', amount: '€32.00', type: 'Sur place' },
    { id: 'CMD-003', client: 'Pierre Martin', date: '2025-01-15 12:45', status: 'En livraison', amount: '€56.80', type: 'Livraison' },
    { id: 'CMD-004', client: 'Sophie Laurent', date: '2025-01-14 18:20', status: 'Livrée', amount: '€28.50', type: 'Sur place' },
  ];

  return (
    <RoleProtectedLayout allowedRoles={['admin', 'reception', 'cashier', 'chef', 'delivery']}>
      <VerticalDashboard>
        <ManagementPageLayout
          title="Gestion des commandes"
          description="Suivi et gestion des commandes du restaurant"
          actions={
            <>
              <select className="px-4 py-2 bg-white/90 border border-[--color-accent]/30 text-gray-900 rounded-lg focus:outline-none focus:border-[--color-accent] transition-all font-medium">
                <option>Toutes les commandes</option>
                <option>En préparation</option>
                <option>En cours de livraison</option>
                <option>Livrées</option>
                <option>Annulées</option>
              </select>
              <button className="px-4 py-2 bg-gradient-to-r from-[--color-accent] to-[--color-accent-hover] text-[--color-bg] rounded-lg font-semibold hover:shadow-lg hover:shadow-[--color-accent]/30 transition-all duration-300 hover:scale-105">
                + Nouvelle commande
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
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">ID Commande</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Client</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Date</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Statut</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Montant</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Type</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[--color-accent]/10">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-[--color-accent]/5 transition-all duration-200 group">
                      <td className="py-4 px-6 text-sm text-[--color-accent] group-hover:text-[--color-accent-hover] transition-colors font-semibold">#{order.id}</td>
                      <td className="py-4 px-6 text-sm text-[--color-text] group-hover:text-[--color-accent] transition-colors font-medium">{order.client}</td>
                      <td className="py-4 px-6 text-sm text-[--color-text-muted]">{order.date}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-[--color-text] font-semibold">{order.amount}</td>
                      <td className="py-4 px-6 text-sm text-[--color-text-muted]">{order.type}</td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button className="text-[--color-accent] hover:text-[--color-accent-hover] transition-colors font-medium text-sm">
                            Détails
                          </button>
                          <span className="text-[--color-text-muted]">|</span>
                          <button className="text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm">
                            Modifier
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