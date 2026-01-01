"use client";

import VerticalDashboard from '@/components/VerticalDashboard';
import RoleProtectedLayout from '@/components/RoleProtectedLayout';

export default function CashierPage() {
  return (
    <RoleProtectedLayout allowedRoles={['cashier']}>
      <VerticalDashboard>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-amber-500">Tableau de bord Caissier</h1>
            <p className="text-gray-300">Bienvenue dans votre espace caissier.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2 text-amber-500">Total Ventes Aujourd'hui</h2>
                <p className="text-3xl font-bold text-white">€1,240</p>
                <p className="text-sm text-gray-400">+12% vs hier</p>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2 text-amber-500">Transactions</h2>
                <p className="text-3xl font-bold text-white">32</p>
                <p className="text-sm text-gray-400">+5 vs hier</p>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2 text-amber-500">Moyenne par Client</h2>
                <p className="text-3xl font-bold text-white">€38.75</p>
                <p className="text-sm text-gray-400">+2.50 vs hier</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-amber-500">Dernières Transactions</h2>
              <div className="bg-gray-700 p-4 rounded-lg">
                <ul className="space-y-2">
                  <li className="flex justify-between border-b border-gray-600 pb-2">
                    <span>Ticket #TKT-001</span>
                    <span className="text-amber-500">€85.00</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-600 pb-2">
                    <span>Ticket #TKT-002</span>
                    <span className="text-amber-500">€54.30</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-600 pb-2">
                    <span>Ticket #TKT-003</span>
                    <span className="text-amber-500">€120.50</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Ticket #TKT-004</span>
                    <span className="text-amber-500">€67.80</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </VerticalDashboard>
    </RoleProtectedLayout>
  );
}