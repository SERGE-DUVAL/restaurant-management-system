"use client";

import VerticalDashboard from '@/components/VerticalDashboard';
import RoleProtectedLayout from '@/components/RoleProtectedLayout';

export default function ReceptionPage() {
  return (
    <RoleProtectedLayout allowedRoles={['reception']}>
      <VerticalDashboard>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-amber-500">Tableau de bord Réceptionniste</h1>
            <p className="text-gray-300">Bienvenue dans votre espace réceptionniste.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2 text-amber-500">Réservations Aujourd'hui</h2>
                <p className="text-3xl font-bold text-white">18</p>
                <p className="text-sm text-gray-400">+3 depuis hier</p>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2 text-amber-500">Clients Présents</h2>
                <p className="text-3xl font-bold text-white">12</p>
                <p className="text-sm text-gray-400">8 tables occupées</p>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2 text-amber-500">Attente Moyenne</h2>
                <p className="text-3xl font-bold text-white">15 min</p>
                <p className="text-sm text-gray-400">-2 min vs hier</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-amber-500">Prochaines Réservations</h2>
              <div className="bg-gray-700 p-4 rounded-lg">
                <ul className="space-y-2">
                  <li className="flex justify-between border-b border-gray-600 pb-2">
                    <span>19:30 - Dupont (4 pers.)</span>
                    <span className="text-amber-500">Confirmé</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-600 pb-2">
                    <span>20:00 - Martin (2 pers.)</span>
                    <span className="text-amber-500">Confirmé</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-600 pb-2">
                    <span>20:15 - Leroy (6 pers.)</span>
                    <span className="text-yellow-500">En attente</span>
                  </li>
                  <li className="flex justify-between">
                    <span>21:00 - Bernard (3 pers.)</span>
                    <span className="text-amber-500">Confirmé</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </VerticalDashboard>
    </RoleProtectedLayout>
  );
}