"use client";

import VerticalDashboard from '@/components/VerticalDashboard';
import RoleProtectedLayout from '@/components/RoleProtectedLayout';
import ManagementPageLayout from '@/components/ManagementPageLayout';

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
  const menuItems = [
    { plat: 'Salade César', category: 'Entrée', price: '€12.50', available: true, ingredients: 'Laitue, poulet, parmesan, croûtons', calories: '320 kcal' },
    { plat: 'Filet de bœuf grillé', category: 'Plat principal', price: '€24.90', available: true, ingredients: 'Bœuf, pommes de terre, légumes grillés', calories: '580 kcal' },
    { plat: 'Tiramisu maison', category: 'Dessert', price: '€8.50', available: false, ingredients: 'Mascarpone, café, biscuits, cacao', calories: '420 kcal' },
    { plat: 'Bouteille de vin rouge', category: 'Boisson', price: '€28.00', available: true, ingredients: 'Vin de Bordeaux, 75cl', calories: '85 kcal/verre' },
  ];

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
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Calories</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[--color-accent]/10">
                  {menuItems.map((item, index) => (
                    <tr key={index} className="hover:bg-[--color-accent]/5 transition-all duration-200 group">
                      <td className="py-4 px-6 text-sm text-[--color-text] group-hover:text-[--color-accent] transition-colors font-medium">{item.plat}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryBadge(item.category)}`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-[--color-text] font-semibold">{item.price}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getAvailabilityBadge(item.available)}`}>
                          {item.available ? 'Disponible' : 'Indisponible'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-[--color-text-muted]">{item.ingredients}</td>
                      <td className="py-4 px-6 text-sm text-[--color-text-muted]">{item.calories}</td>
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