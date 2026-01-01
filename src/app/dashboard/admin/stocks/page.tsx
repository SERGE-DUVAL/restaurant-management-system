'use client';

import VerticalDashboard from '@/components/VerticalDashboard';
import RoleProtectedLayout from '@/components/RoleProtectedLayout';
import ManagementPageLayout from '@/components/ManagementPageLayout';

const getCategoryBadge = (category: string) => {
  return category === 'Ingrédient'
    ? 'bg-green-500/20 text-green-300 border-green-500/30'
    : 'bg-blue-500/20 text-blue-300 border-blue-500/30';
};

export default function StocksManagementPage() {
  const stocks = [
    { article: 'Tomates cerises', category: 'Ingrédient', quantity: '15 kg', unit: 'kg', seuil: '5 kg', price: '€8.50' },
    { article: 'Pâtes linguine', category: 'Ingrédient', quantity: '8 kg', unit: 'kg', seuil: '3 kg', price: '€4.20' },
    { article: 'Huile d\'olive', category: 'Ingrédient', quantity: '2 L', unit: 'L', seuil: '1 L', price: '€12.00' },
    { article: 'Serviettes en papier', category: 'Fourniture', quantity: '45 paquets', unit: 'paquet', seuil: '20 paquets', price: '€3.50' },
  ];

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
                    {stocks.map((stock, index) => (
                      <tr key={index} className="hover:bg-[--color-accent]/5 transition-all duration-200 group">
                        <td className="py-4 px-6 text-sm text-[--color-text] group-hover:text-[--color-accent] transition-colors font-medium">{stock.article}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryBadge(stock.category)}`}>
                            {stock.category}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm text-[--color-text] font-semibold">{stock.quantity}</td>
                        <td className="py-4 px-6 text-sm text-[--color-text-muted]">{stock.unit}</td>
                        <td className="py-4 px-6 text-sm text-[--color-text-muted]">{stock.seuil}</td>
                        <td className="py-4 px-6 text-sm text-[--color-text] font-semibold">{stock.price}</td>
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
