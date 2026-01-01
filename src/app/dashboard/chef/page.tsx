"use client";

import VerticalDashboard from '@/components/VerticalDashboard';
import RoleProtectedLayout from '@/components/RoleProtectedLayout';

export default function ChefPage() {
  return (
    <RoleProtectedLayout allowedRoles={['chef']}>
      <VerticalDashboard>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-amber-500">Tableau de bord Chef</h1>
            <p className="text-gray-300">Bienvenue dans votre espace chef.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2 text-amber-500">Commandes en Cours</h2>
                <p className="text-3xl font-bold text-white">8</p>
                <p className="text-sm text-gray-400">2 urgents</p>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2 text-amber-500">Préparation Moyenne</h2>
                <p className="text-3xl font-bold text-white">12 min</p>
                <p className="text-sm text-gray-400">-1 min vs hier</p>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2 text-amber-500">Ingrédients Faibles</h2>
                <p className="text-3xl font-bold text-white">3</p>
                <p className="text-sm text-gray-400">Reapprovisionner</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-amber-500">Commandes en Attente</h2>
              <div className="bg-gray-700 p-4 rounded-lg">
                <ul className="space-y-2">
                  <li className="flex justify-between border-b border-gray-600 pb-2">
                    <span>Table #5: Menu Découverte</span>
                    <span className="text-amber-500">En préparation</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-600 pb-2">
                    <span>Table #3: Risotto aux fruits de mer</span>
                    <span className="text-amber-500">En préparation</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-600 pb-2">
                    <span>Table #8: Filet de bœuf</span>
                    <span className="text-yellow-500">Urgent</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Table #2: Salade de chèvre</span>
                    <span className="text-amber-500">En préparation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </VerticalDashboard>
    </RoleProtectedLayout>
  );
}