"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardMenuItem {
  label: string;
  href: string;
  icon?: string;
  roles: string[];
  // Route spécifique pour l'admin si différente (ex: /dashboard/admin/users)
  adminHref?: string;
}

const VerticalDashboard = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const menuItems: DashboardMenuItem[] = [
    {
      label: "Accueil",
      href: "/",
      roles: ["admin", "reception", "cashier", "chef", "delivery", "customer"],
    },
    { label: "Tableau de bord", href: "/dashboard/admin", roles: ["admin"] },
    {
      label: "Gestion des utilisateurs",
      href: "/dashboard/users",
      adminHref: "/dashboard/admin/users",
      roles: ["admin"],
    },
    {
      label: "Gestion des commandes",
      href: "/dashboard/orders",
      adminHref: "/dashboard/admin/orders",
      roles: ["admin", "reception", "cashier", "chef", "delivery"],
    },
    {
      label: "Gestion des paiements",
      href: "/dashboard/payments",
      adminHref: "/dashboard/admin/payments",
      roles: ["admin", "cashier"],
    },
    {
      label: "Gestion des stocks",
      href: "/dashboard/stocks",
      adminHref: "/dashboard/admin/stocks",
      roles: ["admin", "chef"],
    },
    {
      label: "Gestion des menus",
      href: "/dashboard/menu",
      adminHref: "/dashboard/admin/menu",
      roles: ["admin", "chef"],
    },
    {
      label: "Réservations",
      href: "/dashboard/reservations",
      adminHref: "/dashboard/admin/reservations",
      roles: ["admin", "reception"],
    },
    {
      label: "Livraisons",
      href: "/dashboard/deliveries",
      adminHref: "/dashboard/admin/deliveries",
      roles: ["admin", "delivery"],
    },
    {
      label: "Mon profil",
      href: "/dashboard/profile",
      adminHref: "/dashboard/admin/profile",
      roles: ["admin", "reception", "cashier", "chef", "delivery", "customer"],
    },
  ];

  const filteredMenuItems = user
    ? menuItems.filter((item) => item.roles.includes(user.role))
    : menuItems.filter((item) => item.roles.includes("customer"));

  const getItemHref = (item: DashboardMenuItem) => {
    // Pour les admins, utiliser adminHref si disponible
    if (user?.role === "admin" && item.adminHref) {
      return item.adminHref;
    }
    return item.href;
  };

  return (
    <div className="flex h-screen bg-[--color-bg] text-[--color-text] font-body relative overflow-hidden">
      {/* Background avec overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "url('/bg1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      />
      
      {/* Sidebar */}
      <div className="w-80 bg-[--color-bg-card] backdrop-blur-md border-r border-[--color-accent]/30 flex flex-col relative z-10 shadow-2xl">
        <div className="p-8 border-b border-[--color-accent]/20">
          <h1 className="text-4xl font-display text-[--color-accent] italic tracking-wider">
            LA FOURCHETTE
          </h1>
          {user && (
            <div className="mt-5 p-4 bg-gradient-to-r from-[--color-accent]/15 to-[--color-accent]/8 rounded-xl border border-[--color-accent]/30 backdrop-blur-sm">
              <p className="text-[--color-text] font-medium text-base">Bonjour,</p>
              <p className="text-[--color-text] font-semibold text-lg">{user.name}</p>
              <p className="text-[--color-accent] text-sm capitalize font-semibold tracking-wider mt-1">
                {user.role}
              </p>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-5 scrollbar-thin scrollbar-thumb-[--color-accent]/20 scrollbar-track-transparent">
          <div className="space-y-0">
            {filteredMenuItems.map((item, index) => {
              const itemHref = getItemHref(item);
              // Correction de la logique de détection de la page active
              let isActive = false;
              if (itemHref === "/dashboard/admin") {
                // Pour le tableau de bord, on vérifie si on est exactement sur /dashboard/admin
                isActive = pathname === "/dashboard/admin";
              } else {
                // Pour les autres pages, on vérifie si le pathname correspond exactement ou commence par l'href
                isActive = pathname === itemHref || pathname.startsWith(itemHref + "/");
              }
              return (
                <React.Fragment key={index}>
                  {/* Ligne séparatrice AVANT chaque élément (sauf le premier) */}
                  {index > 0 && (
                    <div className="w-full my-12">
                      <div 
                        className="h-[2px] mx-6 rounded-full"
                        style={{
                          background: `linear-gradient(to right, transparent, var(--color-accent), transparent)`,
                          opacity: 0.6
                        }}
                      ></div>
                    </div>
                  )}
                  {/* Élément du menu */}
                  <div className="w-full my-10">
                    <Link
                      href={itemHref}
                      className={`flex items-center px-6 py-8 text-base tracking-wider uppercase rounded-xl transition-all duration-300 relative group w-full ${
                        isActive
                          ? "bg-gradient-to-r from-[--color-accent] to-[--color-accent-hover] text-[--color-bg] font-semibold shadow-lg shadow-[--color-accent]/40 transform scale-[1.02]"
                          : "text-[--color-text] hover:bg-[--color-accent]/15 hover:text-[--color-accent] hover:translate-x-1 font-medium"
                      }`}
                    >
                      {!isActive && (
                        <span className="absolute left-0 w-1 h-0 bg-[--color-accent] rounded-r-full transition-all duration-300 group-hover:h-full" />
                      )}
                      <span className="relative z-10 flex items-center gap-3">
                        {isActive && (
                          <span className="w-2 h-2 bg-[--color-bg] rounded-full" />
                        )}
                        {item.label}
                      </span>
                    </Link>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-[--color-accent]/10">
          <button 
            onClick={logout} 
            className="btn btn-primary w-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-[--color-accent]/20"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <header className="bg-[--color-bg-card] backdrop-blur-lg border-b border-[--color-accent]/20 p-8 shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-heading text-[--color-accent] capitalize font-semibold">
                {pathname.split("/").pop()?.replace("-", " ") || "dashboard"}
              </h2>
              <p className="text-[--color-text-muted] text-base mt-2 flex items-center gap-2 font-medium">
                <span className="w-2 h-2 bg-[--color-accent] rounded-full" />
                {pathname.includes("admin") ? "Administration" : "Tableau de bord"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-3 bg-gradient-to-r from-[--color-accent]/15 to-[--color-accent]/8 px-5 py-3 rounded-xl border border-[--color-accent]/30 backdrop-blur-sm">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                  <span className="text-[--color-text] text-base font-medium">
                    Bienvenue,{" "}
                    <span className="text-[--color-accent] font-semibold">
                      {user.name}
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 bg-gradient-to-br from-[--color-bg] via-[--color-bg-card]/30 to-[--color-bg]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default VerticalDashboard;
