'use client';

import React, { useEffect, useState } from 'react';
import VerticalDashboard from '@/components/VerticalDashboard';
import RoleProtectedLayout from '@/components/RoleProtectedLayout';
import ManagementPageLayout from '@/components/ManagementPageLayout';
import { stockService, Stock } from '@/services/stockService';
import { useNotification } from '@/contexts/NotificationContext';

const getCategoryBadge = (category: string) => {
  return category === 'Ingrédient'
    ? 'bg-green-500/20 text-green-300 border-green-500/30'
    : 'bg-blue-500/20 text-blue-300 border-blue-500/30';
};

const getStockStatus = (quantity: number, seuil: number) => {
  if (quantity <= seuil) {
    return 'bg-red-500/20 text-red-300 border-red-500/30';
  } else if (quantity <= seuil * 1.5) {
    return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
  }
  return 'bg-green-500/20 text-green-300 border-green-500/30';
};

export default function StocksPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = async () => {
    try {
      setLoading(true);
      const data = await stockService.getAll();
      setStocks(data);
    } catch (error: any) {
      console.error('Error loading stocks:', error);
      showNotification('error', 'Erreur', 'Impossible de charger les stocks');
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      return;
    }

    try {
      await stockService.delete(id);
      showNotification('success', 'Succès', 'Article supprimé avec succès');
      loadStocks();
    } catch (error: any) {
      console.error('Error deleting stock:', error);
      showNotification('error', 'Erreur', 'Impossible de supprimer l\'article');
    }
  };

  return (
    <RoleProtectedLayout allowedRoles={['admin', 'chef']}>
      <VerticalDashboard>
        <ManagementPageLayout
          title="Gestion des stocks"
          description="Suivi et gestion des ingrédients et fournitures du restaurant"
          actions={
            <button className="px-4 py-2 bg-gradient-to-r from-[--color-accent] to-[--color-accent-hover] text-[--color-bg] rounded-lg font-semibold hover:shadow-lg hover:shadow-[--color-accent]/30 transition-all duration-300 hover:scale-105">
              + Nouvel ingrédient
            </button>
          }
          filters={
            <>
              <select className="px-4 py-2 bg-white/90 border border-[--color-accent]/30 text-gray-900 rounded-lg focus:outline-none focus:border-[--color-accent] transition-all font-medium">
                <option>Tous les articles</option>
                <option>Ingrédients</option>
                <option>Fournitures</option>
                <option>En rupture de stock</option>
                <option>Stock bas</option>
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
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Article</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Catégorie</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Quantité</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Unité</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Seuil d'alerte</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Prix unitaire</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[--color-accent]/10">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-[--color-text-muted]">
                        Chargement des stocks...
                      </td>
                    </tr>
                  ) : stocks.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-[--color-text-muted]">
                        Aucun stock trouvé
                      </td>
                    </tr>
                  ) : (
                    stocks.map((stock) => (
                      <tr key={stock.id} className="hover:bg-[--color-accent]/5 transition-all duration-200 group">
                        <td className="py-4 px-6 text-sm text-[--color-text] group-hover:text-[--color-accent] transition-colors font-medium">{stock.nom}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryBadge('Ingrédient')}`}>
                            Ingrédient
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm text-[--color-text] font-semibold">{stock.quantite} {stock.unite}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStockStatus(stock.quantite, stock.seuil_alerte)}`}>
                            {stock.seuil_alerte} {stock.unite}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm text-[--color-text] font-semibold">
                          {stock.prix_unitaire ? `€${stock.prix_unitaire.toFixed(2)}` : '-'}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <button className="text-[--color-accent] hover:text-[--color-accent-hover] transition-colors font-medium text-sm">
                              Modifier
                            </button>
                            <span className="text-[--color-text-muted]">|</span>
                            <button 
                              onClick={() => handleDelete(stock.id)}
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

