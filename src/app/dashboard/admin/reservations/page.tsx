'use client';

import VerticalDashboard from '@/components/VerticalDashboard';
import RoleProtectedLayout from '@/components/RoleProtectedLayout';
import ManagementPageLayout from '@/components/ManagementPageLayout';

const getStatusBadge = (status: string) => {
  const statusColors: { [key: string]: string } = {
    'Confirmée': 'bg-green-500/20 text-green-300 border-green-500/30',
    'En attente': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'Spéciale': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  };
  return statusColors[status] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
};

export default function ReservationsManagementPage() {
  const reservations = [
    { client: 'Jean Dupont', date: '2025-01-15', heure: '19:30', couverts: '4 personnes', status: 'Confirmée', contact: 'jean.dupont@email.com' },
    { client: 'Marie Curie', date: '2025-01-15', heure: '20:00', couverts: '2 personnes', status: 'En attente', contact: 'marie.curie@email.com' },
    { client: 'Pierre Martin', date: '2025-01-16', heure: '12:30', couverts: '6 personnes', status: 'Spéciale', contact: 'pierre.martin@email.com' },
    { client: 'Sophie Laurent', date: '2025-01-17', heure: '19:00', couverts: '3 personnes', status: 'Confirmée', contact: 'sophie.laurent@email.com' },
  ];

  return (
    <RoleProtectedLayout allowedRoles={['admin', 'reception']}>
      <VerticalDashboard>
          <ManagementPageLayout
            title="Gestion des réservations"
            description="Suivi et gestion des réservations de tables du restaurant"
            actions={
              <button className="px-4 py-2 bg-gradient-to-r from-[--color-accent] to-[--color-accent-hover] text-[--color-bg] rounded-lg font-semibold hover:shadow-lg hover:shadow-[--color-accent]/30 transition-all duration-300 hover:scale-105">
                + Nouvelle réservation
              </button>
            }
            filters={
              <>
                <select className="px-4 py-2 bg-white/90 border border-[--color-accent]/30 text-gray-900 rounded-lg focus:outline-none focus:border-[--color-accent] transition-all font-medium">
                  <option>Toutes les réservations</option>
                  <option>Réservations aujourd'hui</option>
                  <option>Réservations à venir</option>
                  <option>Réservations passées</option>
                  <option>Réservations confirmées</option>
                  <option>Réservations annulées</option>
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
                      <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Client</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Date</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Heure</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Couverts</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Statut</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Contact</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[--color-accent]/10">
                    {reservations.map((reservation, index) => (
                      <tr key={index} className="hover:bg-[--color-accent]/5 transition-all duration-200 group">
                        <td className="py-4 px-6 text-sm text-[--color-text] group-hover:text-[--color-accent] transition-colors font-medium">{reservation.client}</td>
                        <td className="py-4 px-6 text-sm text-[--color-text-muted]">{reservation.date}</td>
                        <td className="py-4 px-6 text-sm text-[--color-text-muted]">{reservation.heure}</td>
                        <td className="py-4 px-6 text-sm text-[--color-text-muted]">{reservation.couverts}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(reservation.status)}`}>
                            {reservation.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm text-[--color-text-muted]">{reservation.contact}</td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <button className="text-[--color-accent] hover:text-[--color-accent-hover] transition-colors font-medium text-sm">
                              Modifier
                            </button>
                            <span className="text-[--color-text-muted]">|</span>
                            <button className="text-red-400 hover:text-red-300 transition-colors font-medium text-sm">
                              Annuler
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
