"use client";

import VerticalDashboard from '@/components/VerticalDashboard';
import RoleProtectedLayout from '@/components/RoleProtectedLayout';
import ManagementPageLayout from '@/components/ManagementPageLayout';
import { useAuth } from '@/contexts/AuthContext';

// Fonction pour obtenir les initiales du nom
const getInitials = (name: string) => {
  if (!name) return "U";
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

// Fonction pour obtenir le nom d'affichage basé sur l'email
const getDisplayName = (email: string, role: string) => {
  if (email === "admin@gmail.com") return "Administrateur";
  if (email === "reception@lafourchette.com") return "Réceptionniste";
  if (email === "cashier@lafourchette.com") return "Caissier";
  if (email === "chef@lafourchette.com") return "Chef";
  if (email === "delivery@lafourchette.com") return "Livreur";
  return "Utilisateur";
};

// Fonction pour obtenir le nom complet basé sur l'email
const getFullName = (email: string) => {
  if (email === "admin@gmail.com") return "Admin Principal";
  if (email === "reception@lafourchette.com") return "Jean Dupont";
  if (email === "cashier@lafourchette.com") return "Marie Martin";
  if (email === "chef@lafourchette.com") return "Pierre Dubois";
  if (email === "delivery@lafourchette.com") return "Luc Bernard";
  return "Invité Prestigieux";
};

export default function ProfilePage() {
  const { user } = useAuth();
  
  if (!user) {
    return null;
  }

  const displayName = getFullName(user.email);
  const initials = getInitials(displayName);
  const roleDisplayName = getDisplayName(user.email, user.role);
  
  // Extraire prénom et nom
  const nameParts = displayName.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <RoleProtectedLayout allowedRoles={['admin', 'reception', 'cashier', 'chef', 'delivery', 'customer']}>
      <VerticalDashboard>
        <ManagementPageLayout
          title="Mon profil"
          description="Gestion de vos informations personnelles et de votre compte"
        >
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 bg-gradient-to-br from-[--color-bg-card] to-[--color-bg-card]/90 backdrop-blur-sm border-2 border-[--color-accent]/30 p-6 rounded-2xl shadow-xl">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[--color-accent] to-[--color-accent-hover] rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <span className="text-3xl text-[--color-bg] font-bold">{initials}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-[--color-text]">{displayName}</h2>
                  <p className="text-[--color-accent] capitalize font-medium mt-1">{roleDisplayName}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-[--color-text-muted] mb-1 uppercase tracking-wider">Rôle</h3>
                    <p className="text-[--color-text] font-medium capitalize">{user.role}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[--color-text-muted] mb-1 uppercase tracking-wider">Email</h3>
                    <p className="text-[--color-text] font-medium">{user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[--color-text-muted] mb-1 uppercase tracking-wider">Téléphone</h3>
                    <p className="text-[--color-text] font-medium">+33 6 12 34 56 78</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[--color-text-muted] mb-1 uppercase tracking-wider">Date d'inscription</h3>
                    <p className="text-[--color-text] font-medium">15 Janvier 2024</p>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2 bg-gradient-to-br from-[--color-bg-card] to-[--color-bg-card]/90 backdrop-blur-sm border-2 border-[--color-accent]/30 p-8 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-display text-[--color-accent] font-semibold mb-6">Informations personnelles</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[--color-accent] uppercase tracking-wider mb-2">Prénom</label>
                      <input 
                        type="text" 
                        defaultValue={firstName}
                        className="w-full px-4 py-3 bg-white/90 border border-[--color-accent]/30 text-gray-900 rounded-lg focus:outline-none focus:border-[--color-accent] transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[--color-accent] uppercase tracking-wider mb-2">Nom</label>
                      <input 
                        type="text" 
                        defaultValue={lastName}
                        className="w-full px-4 py-3 bg-white/90 border border-[--color-accent]/30 text-gray-900 rounded-lg focus:outline-none focus:border-[--color-accent] transition-all font-medium"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-[--color-accent] uppercase tracking-wider mb-2">Email</label>
                    <input 
                      type="email" 
                      defaultValue={user.email}
                      className="w-full px-4 py-3 bg-white/90 border border-[--color-accent]/30 text-gray-900 rounded-lg focus:outline-none focus:border-[--color-accent] transition-all font-medium"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-[--color-accent] uppercase tracking-wider mb-2">Téléphone</label>
                    <input 
                      type="tel" 
                      defaultValue="+33 6 12 34 56 78" 
                      className="w-full px-4 py-3 bg-white/90 border border-[--color-accent]/30 text-gray-900 rounded-lg focus:outline-none focus:border-[--color-accent] transition-all font-medium"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-[--color-accent] uppercase tracking-wider mb-2">Mot de passe actuel</label>
                    <input 
                      type="password" 
                      placeholder="Entrez votre mot de passe actuel" 
                      className="w-full px-4 py-3 bg-white/90 border border-[--color-accent]/30 text-gray-900 rounded-lg focus:outline-none focus:border-[--color-accent] transition-all font-medium"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[--color-accent] uppercase tracking-wider mb-2">Nouveau mot de passe</label>
                      <input 
                        type="password" 
                        placeholder="Entrez un nouveau mot de passe" 
                        className="w-full px-4 py-3 bg-white/90 border border-[--color-accent]/30 text-gray-900 rounded-lg focus:outline-none focus:border-[--color-accent] transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[--color-accent] uppercase tracking-wider mb-2">Confirmer le mot de passe</label>
                      <input 
                        type="password" 
                        placeholder="Confirmez le nouveau mot de passe" 
                        className="w-full px-4 py-3 bg-white/90 border border-[--color-accent]/30 text-gray-900 rounded-lg focus:outline-none focus:border-[--color-accent] transition-all font-medium"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-6 border-t border-[--color-accent]/10">
                    <button className="px-6 py-3 bg-[--color-bg-card]/50 border border-[--color-accent]/20 text-[--color-text] rounded-lg hover:bg-[--color-bg-card] transition-all duration-300">
                      Annuler
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-[--color-accent] to-[--color-accent-hover] text-[--color-bg] rounded-lg font-semibold hover:shadow-lg hover:shadow-[--color-accent]/30 transition-all duration-300 hover:scale-105">
                      Enregistrer les modifications
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ManagementPageLayout>
      </VerticalDashboard>
    </RoleProtectedLayout>
  );
}