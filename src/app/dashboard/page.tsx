"use client";

import VerticalDashboard from "@/components/VerticalDashboard";
import RoleProtectedLayout from "@/components/RoleProtectedLayout";
import Providers from "@/components/Providers";

export default function DashboardPage() {
  return (
    <Providers>
      <RoleProtectedLayout
        allowedRoles={["admin", "reception", "cashier", "chef", "delivery"]}
      >
        <VerticalDashboard>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-amber-500">
              Tableau de bord
            </h1>
            <p className="text-gray-300">
              Bienvenue dans votre espace personnel de gestion.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2 text-amber-500">
                  Commandes
                </h2>
                <p className="text-3xl font-bold text-white">24</p>
                <p className="text-sm text-gray-400">en attente</p>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2 text-amber-500">
                  Revenus
                </h2>
                <p className="text-3xl font-bold text-white">€1,240</p>
                <p className="text-sm text-gray-400">aujourd hui</p>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2 text-amber-500">
                  Clients
                </h2>
                <p className="text-3xl font-bold text-white">18</p>
                <p className="text-sm text-gray-400">en attente</p>
              </div>
            </div>
          </div>
        </VerticalDashboard>
      </RoleProtectedLayout>
    </Providers>
  );
}
