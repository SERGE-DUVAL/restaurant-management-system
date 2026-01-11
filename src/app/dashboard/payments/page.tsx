'use client';

import React, { useEffect, useState } from 'react';
import VerticalDashboard from '@/components/VerticalDashboard';
import RoleProtectedLayout from '@/components/RoleProtectedLayout';
import ManagementPageLayout from '@/components/ManagementPageLayout';
import { orderService, Order } from '@/services/orderService';
import { useNotification } from '@/contexts/NotificationContext';

const getStatusBadge = (status: string) => {
  const statusColors: { [key: string]: string } = {
    'paye': 'bg-green-500/20 text-green-300 border-green-500/30',
    'en_attente': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'echec': 'bg-red-500/20 text-red-300 border-red-500/30',
  };
  return statusColors[status] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
};

const formatStatus = (status: string) => {
  const statusMap: { [key: string]: string } = {
    'paye': 'Payé',
    'en_attente': 'En attente',
    'echec': 'Échoué',
  };
  return statusMap[status] || status;
};

const formatMethod = (method: string) => {
  const methodMap: { [key: string]: string } = {
    'carte': 'Carte de crédit',
    'especes': 'Espèces',
    'cheque': 'Chèque',
    'virement': 'Virement',
  };
  return methodMap[method] || method;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function PaymentsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAll();
      // Filtrer uniquement les commandes payées ou avec paiement
      setOrders(data.filter(order => order.statut === 'payee'));
    } catch (error: any) {
      console.error('Error loading payments:', error);
      showNotification('error', 'Erreur', 'Impossible de charger les paiements');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

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
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Client</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Statut</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[--color-accent]/10">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-[--color-text-muted]">
                        Chargement des paiements...
                      </td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-[--color-text-muted]">
                        Aucun paiement trouvé
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="hover:bg-[--color-accent]/5 transition-all duration-200 group">
                        <td className="py-4 px-6 text-sm text-[--color-accent] group-hover:text-[--color-accent-hover] transition-colors font-semibold">#{order.id}</td>
                        <td className="py-4 px-6 text-sm text-[--color-text] group-hover:text-[--color-accent] transition-colors font-medium">#{order.id}</td>
                        <td className="py-4 px-6 text-sm text-[--color-text-muted]">{formatDate(order.created_at)}</td>
                        <td className="py-4 px-6 text-sm text-[--color-text] font-semibold">€{order.total.toFixed(2)}</td>
                        <td className="py-4 px-6 text-sm text-[--color-text-muted]">
                          {order.clients ? `${order.clients.prenom} ${order.clients.nom}` : 'Client inconnu'}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(order.statut)}`}>
                            {formatStatus(order.statut)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <button className="text-[--color-accent] hover:text-[--color-accent-hover] transition-colors font-medium text-sm">
                              Détails
                            </button>
                            <span className="text-[--color-text-muted]">|</span>
                            <button className="text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm">
                              Facture
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