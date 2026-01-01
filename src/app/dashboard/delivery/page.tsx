"use client";

import VerticalDashboard from '@/components/VerticalDashboard';
import RoleProtectedLayout from '@/components/RoleProtectedLayout';

export default function DeliveryPage() {
  return (
    <RoleProtectedLayout allowedRoles={['delivery']}>
      <VerticalDashboard>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-amber-500">Tableau de bord Livreur</h1>
            <p className="text-gray-300">Bienvenue dans votre espace livreur.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2 text-amber-500">Livraisons Aujourd'hui</h2>
                <p className="text-3xl font-bold text-white">12</p>
                <p className="text-sm text-gray-400">+3 vs hier</p>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2 text-amber-500">Temps Moyen</h2>
                <p className="text-3xl font-bold text-white">22 min</p>
                <p className="text-sm text-gray-400">-2 min vs hier</p>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2 text-amber-500">Satisfaction</h2>
                <p className="text-3xl font-bold text-white">4.8/5</p>
                <p className="text-sm text-gray-400">+0.2 vs hier</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-amber-500">Livraisons en Cours</h2>
              <div className="bg-gray-700 p-4 rounded-lg">
                <ul className="space-y-2">
                  <li className="flex justify-between border-b border-gray-600 pb-2">
                    <span>Livraison #LVR-001</span>
                    <span className="text-amber-500">En route</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-600 pb-2">
                    <span>Livraison #LVR-002</span>
                    <span className="text-amber-500">En préparation</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-600 pb-2">
                    <span>Livraison #LVR-003</span>
                    <span className="text-yellow-500">À récupérer</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Livraison #LVR-004</span>
                    <span className="text-amber-500">Planifiée</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </VerticalDashboard>
    </RoleProtectedLayout>
  );
}