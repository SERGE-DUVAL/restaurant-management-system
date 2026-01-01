'use client';

import VerticalDashboard from '@/components/VerticalDashboard';
import RoleProtectedLayout from '@/components/RoleProtectedLayout';
import ManagementPageLayout from '@/components/ManagementPageLayout';

const getStatusBadge = (status: string) => {
  const statusColors: { [key: string]: string } = {
    'Payé': 'bg-green-500/20 text-green-300 border-green-500/30',
    'En attente': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'Échoué': 'bg-red-500/20 text-red-300 border-red-500/30',
  };
  return statusColors[status] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
};

export default function PaymentsPage() {
  const payments = [
    { id: 'PMT-001', commande: 'CMD-001', date: '2025-01-15 19:35', amount: '€45.50', method: 'Carte de crédit', status: 'Payé' },
    { id: 'PMT-002', commande: 'CMD-002', date: '2025-01-15 20:20', amount: '€32.00', method: 'Espèces', status: 'Payé' },
    { id: 'PMT-003', commande: 'CMD-003', date: '2025-01-15 12:50', amount: '€56.80', method: 'Carte de crédit', status: 'En attente' },
    { id: 'PMT-004', commande: 'CMD-004', date: '2025-01-14 18:25', amount: '€28.50', method: 'PayPal', status: 'Échoué' },
  ];

  return (
      <RoleProtectedLayout allowedRoles={['admin', 'cashier']}>
        <VerticalDashboard>
        <ManagementPageLayout
          title="Gestion des paiements"
          description="Suivi et gestion des transactions et paiements du restaurant"
          actions={
            <>
              <select className="px-4 py-2 bg-white/90 border border-[--color-accent]/30 text-gray-900 rounded-lg focus:outline-none focus:border-[--color-accent] transition-all font-medium">
                <option>Tous les paiements</option>
                <option>Payés</option>
                <option>Échoués</option>
                <option>Remboursés</option>
                <option>En attente</option>
              </select>
              <button className="px-4 py-2 bg-gradient-to-r from-[--color-accent] to-[--color-accent-hover] text-[--color-bg] rounded-lg font-semibold hover:shadow-lg hover:shadow-[--color-accent]/30 transition-all duration-300 hover:scale-105">
                + Nouveau paiement
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
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">ID Paiement</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Commande</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Date</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Montant</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Méthode</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Statut</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[--color-accent]/10">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-[--color-accent]/5 transition-all duration-200 group">
                      <td className="py-4 px-6 text-sm text-[--color-accent] group-hover:text-[--color-accent-hover] transition-colors font-semibold">#{payment.id}</td>
                      <td className="py-4 px-6 text-sm text-[--color-text] group-hover:text-[--color-accent] transition-colors font-medium">#{payment.commande}</td>
                      <td className="py-4 px-6 text-sm text-[--color-text-muted]">{payment.date}</td>
                      <td className="py-4 px-6 text-sm text-[--color-text] font-semibold">{payment.amount}</td>
                      <td className="py-4 px-6 text-sm text-[--color-text-muted]">{payment.method}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button className="text-[--color-accent] hover:text-[--color-accent-hover] transition-colors font-medium text-sm">
                            Détails
                          </button>
                          <span className="text-[--color-text-muted]">|</span>
                          <button className="text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm">
                            {payment.status === 'Payé' ? 'Remboursement' : payment.status === 'En attente' ? 'Valider' : 'Recommencer'}
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