"use client";

import VerticalDashboard from "@/components/VerticalDashboard";
import RoleProtectedLayout from "@/components/RoleProtectedLayout";
import AdminPage from "@/components/AdminPage"; // Importer le composant

export default function AdminDashboardPage() {
  // Renommé pour plus de clarté
  return (
    <RoleProtectedLayout allowedRoles={["admin"]}>
      <VerticalDashboard>
        <AdminPage />
      </VerticalDashboard>
    </RoleProtectedLayout>
  );
}
