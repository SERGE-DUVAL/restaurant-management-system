"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";

const AdminPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="fade-in space-y-10">
      {/* Header Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-16 bg-gradient-to-b from-[--color-accent] to-[--color-accent-hover] rounded-full" />
          <div>
            <h1 className="font-display text-6xl text-[--color-accent] font-semibold">
              Tableau de bord
            </h1>
            <p className="text-[--color-text-muted] font-light text-xl mt-2">
              Aperçu général de l'activité du restaurant
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card Utilisateurs */}
        <div className="group bg-gradient-to-br from-[--color-bg-card] to-[--color-bg-card]/90 backdrop-blur-sm border-2 border-[--color-accent]/30 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-[--color-accent]/20 transition-all duration-300 hover:scale-105 hover:border-[--color-accent]/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[--color-accent]/8 rounded-full -mr-20 -mt-20" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading text-[--color-text] uppercase tracking-wider font-semibold">
                Utilisateurs
              </h2>
              <div className="w-16 h-16 bg-[--color-accent]/25 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-[--color-accent]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <p className="text-6xl font-display font-bold text-[--color-text] mb-3">
              42
            </p>
            <div className="flex items-center gap-3">
              <span className="text-base text-green-400 font-semibold flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                +5
              </span>
              <span className="text-sm text-[--color-text-muted] font-medium">cette semaine</span>
            </div>
          </div>
        </div>

        {/* Card Commandes */}
        <div className="group bg-gradient-to-br from-[--color-bg-card] to-[--color-bg-card]/90 backdrop-blur-sm border-2 border-[--color-accent]/30 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-[--color-accent]/20 transition-all duration-300 hover:scale-105 hover:border-[--color-accent]/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[--color-accent]/8 rounded-full -mr-20 -mt-20" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading text-[--color-text] uppercase tracking-wider font-semibold">
                Commandes
              </h2>
              <div className="w-16 h-16 bg-[--color-accent]/25 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-[--color-accent]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className="text-6xl font-display font-bold text-[--color-text] mb-3">
              128
            </p>
            <div className="flex items-center gap-3">
              <span className="text-base text-green-400 font-semibold flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                +12
              </span>
              <span className="text-sm text-[--color-text-muted] font-medium">aujourd'hui</span>
            </div>
          </div>
        </div>

        {/* Card Revenus */}
        <div className="group bg-gradient-to-br from-[--color-bg-card] to-[--color-bg-card]/90 backdrop-blur-sm border-2 border-[--color-accent]/30 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-[--color-accent]/20 transition-all duration-300 hover:scale-105 hover:border-[--color-accent]/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[--color-accent]/8 rounded-full -mr-20 -mt-20" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading text-[--color-text] uppercase tracking-wider font-semibold">
                Revenus
              </h2>
              <div className="w-16 h-16 bg-[--color-accent]/25 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-[--color-accent]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-6xl font-display font-bold text-[--color-text] mb-3">
              €3,420
            </p>
            <div className="flex items-center gap-3">
              <span className="text-base text-green-400 font-semibold flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                +12%
              </span>
              <span className="text-sm text-[--color-text-muted] font-medium">vs mois dernier</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dernières activités */}
      <div className="mt-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1.5 h-12 bg-gradient-to-b from-[--color-accent] to-[--color-accent-hover] rounded-full" />
          <h2 className="text-3xl font-display text-[--color-accent] font-semibold">
            Dernières activités
          </h2>
        </div>
        <div className="bg-gradient-to-br from-[--color-bg-card] to-[--color-bg-card]/90 backdrop-blur-sm border-2 border-[--color-accent]/30 p-8 rounded-2xl shadow-xl">
          <ul className="space-y-5">
            <li className="flex justify-between items-center border-b-2 border-[--color-accent]/20 pb-5 group hover:bg-[--color-accent]/10 p-4 rounded-xl transition-all duration-300 -mx-2">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                <span className="text-[--color-text] font-semibold text-lg">
                  Nouvelle commande #CMD-001
                </span>
              </div>
              <span className="text-base text-[--color-text-muted] font-medium">
                Il y a 10 min
              </span>
            </li>
            <li className="flex justify-between items-center border-b-2 border-[--color-accent]/20 pb-5 group hover:bg-[--color-accent]/10 p-4 rounded-xl transition-all duration-300 -mx-2">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50" />
                <span className="text-[--color-text] font-semibold text-lg">
                  Utilisateur ajouté: Marie Dupont
                </span>
              </div>
              <span className="text-base text-[--color-text-muted] font-medium">
                Il y a 25 min
              </span>
            </li>
            <li className="flex justify-between items-center border-b-2 border-[--color-accent]/20 pb-5 group hover:bg-[--color-accent]/10 p-4 rounded-xl transition-all duration-300 -mx-2">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse shadow-lg shadow-red-400/50" />
                <span className="text-[--color-text] font-semibold text-lg text-red-300">
                  Rupture de stock: Safran
                </span>
              </div>
              <span className="text-base text-red-300 font-medium">Il y a 1h</span>
            </li>
            <li className="flex justify-between items-center group hover:bg-[--color-accent]/10 p-4 rounded-xl transition-all duration-300 -mx-2">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50" />
                <span className="text-[--color-text] font-semibold text-lg">
                  Paiement validé #PMT-005
                </span>
              </div>
              <span className="text-base text-[--color-text-muted] font-medium">
                Il y a 2h
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
