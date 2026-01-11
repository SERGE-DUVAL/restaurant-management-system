"use client";

import React, { useEffect, useState } from 'react';
import VerticalDashboard from '@/components/VerticalDashboard';
import RoleProtectedLayout from '@/components/RoleProtectedLayout';
import ManagementPageLayout from '@/components/ManagementPageLayout';
import { dishService, Dish } from '@/services/dishService';
import { useNotification } from '@/contexts/NotificationContext';

const getCategoryBadge = (category: string) => {
  const categoryColors: { [key: string]: string } = {
    'Entrée': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Plat principal': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'Dessert': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Boisson': 'bg-green-500/20 text-green-300 border-green-500/30',
  };
  return categoryColors[category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
};

const getAvailabilityBadge = (available: boolean) => {
  return available
    ? 'bg-green-500/20 text-green-300 border-green-500/30'
    : 'bg-red-500/20 text-red-300 border-red-500/30';
};

export default function MenuPage() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    loadDishes();
  }, []);

  const loadDishes = async () => {
    try {
      setLoading(true);
      const data = await dishService.getAll();
      setDishes(data);
    } catch (error: any) {
      console.error('Error loading dishes:', error);
      showNotification('error', 'Erreur', 'Impossible de charger le menu');
      setDishes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce plat ?')) {
      return;
    }

    try {
      await dishService.delete(id);
      showNotification('success', 'Succès', 'Plat supprimé avec succès');
      loadDishes();
    } catch (error: any) {
      console.error('Error deleting dish:', error);
      showNotification('error', 'Erreur', 'Impossible de supprimer le plat');
    }
  };

  return (
      <RoleProtectedLayout allowedRoles={['admin', 'chef']}>
        <VerticalDashboard>
        <ManagementPageLayout
          title="Gestion des menus"
          description="Suivi et gestion des plats, prix et disponibilité du menu"
          actions={
            <button className="px-4 py-2 bg-gradient-to-r from-[--color-accent] to-[--color-accent-hover] text-[--color-bg] rounded-lg font-semibold hover:shadow-lg hover:shadow-[--color-accent]/30 transition-all duration-300 hover:scale-105">
              + Nouveau plat
              </button>
          }
          filters={
            <>
              <select className="px-4 py-2 bg-white/90 border border-[--color-accent]/30 text-gray-900 rounded-lg focus:outline-none focus:border-[--color-accent] transition-all font-medium">
                <option>Tous les plats</option>
                  <option>Entrées</option>
                <option>Plats principaux</option>
                  <option>Desserts</option>
                  <option>Boissons</option>
                <option>Disponibles</option>
                <option>Indisponibles</option>
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
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Plat</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Catégorie</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Prix</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Disponibilité</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Ingrédients</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Info</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[--color-accent]/10">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-[--color-text-muted]">
                        Chargement du menu...
                      </td>
                    </tr>
                  ) : dishes.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-[--color-text-muted]">
                        Aucun plat trouvé
                      </td>
                    </tr>
                  ) : (
                    dishes.map((dish) => (
                      <tr key={dish.id} className="hover:bg-[--color-accent]/5 transition-all duration-200 group">
                        <td className="py-4 px-6 text-sm text-[--color-text] group-hover:text-[--color-accent] transition-colors font-medium">{dish.nom}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryBadge(dish.category?.nom || 'Autre')}`}>
                            {dish.category?.nom || 'Sans catégorie'}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm text-[--color-text] font-semibold">€{dish.prix.toFixed(2)}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getAvailabilityBadge(dish.disponible)}`}>
                            {dish.disponible ? 'Disponible' : 'Indisponible'}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm text-[--color-text-muted]">{dish.description || '-'}</td>
                        <td className="py-4 px-6 text-sm text-[--color-text-muted]">-</td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <button className="text-[--color-accent] hover:text-[--color-accent-hover] transition-colors font-medium text-sm">
                              Modifier
                            </button>
                            <span className="text-[--color-text-muted]">|</span>
                            <button 
                              onClick={() => handleDelete(dish.id)}
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