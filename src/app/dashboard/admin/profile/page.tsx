'use client';

import VerticalDashboard from '@/components/VerticalDashboard';
import RoleProtectedLayout from '@/components/RoleProtectedLayout';
import ManagementPageLayout from '@/components/ManagementPageLayout';

export default function ProfileManagementPage() {
  return (
    <RoleProtectedLayout allowedRoles={['admin', 'reception', 'cashier', 'chef', 'delivery']}>
      <VerticalDashboard>
          <ManagementPageLayout
            title="Mon profil"
            description="Gestion de vos informations personnelles et de votre compte"
          >
            <div className="p-8">
              <form className="space-y-8 max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Nom</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-white/90 border border-[--color-accent]/30 text-gray-900 rounded-lg focus:outline-none focus:border-[--color-accent] transition-all font-medium"
                      placeholder="Votre nom complet"
                      defaultValue="Jean Dupont"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 bg-white/90 border border-[--color-accent]/30 text-gray-900 rounded-lg focus:outline-none focus:border-[--color-accent] transition-all font-medium"
                      placeholder="votre@email.com"
                      defaultValue="jean.dupont@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Téléphone</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-3 bg-white/90 border border-[--color-accent]/30 text-gray-900 rounded-lg focus:outline-none focus:border-[--color-accent] transition-all font-medium"
                      placeholder="+33 1 23 45 67 89"
                      defaultValue="+33 6 12 34 56 78"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Rôle</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-[--color-bg-card]/30 border border-[--color-accent]/10 text-[--color-text-muted] rounded-lg cursor-not-allowed"
                      value="Administrateur"
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Mot de passe actuel</label>
                    <input 
                      type="password" 
                      className="w-full px-4 py-3 bg-white/90 border border-[--color-accent]/30 text-gray-900 rounded-lg focus:outline-none focus:border-[--color-accent] transition-all font-medium"
                      placeholder="Entrez votre mot de passe actuel"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[--color-accent] uppercase tracking-wider">Nouveau mot de passe</label>
                    <input 
                      type="password" 
                      className="w-full px-4 py-3 bg-white/90 border border-[--color-accent]/30 text-gray-900 rounded-lg focus:outline-none focus:border-[--color-accent] transition-all font-medium"
                      placeholder="Entrez un nouveau mot de passe"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-6 border-t border-[--color-accent]/10">
                  <button 
                    type="button"
                    className="px-6 py-3 bg-[--color-bg-card]/50 border border-[--color-accent]/20 text-[--color-text] rounded-lg hover:bg-[--color-bg-card] transition-all duration-300"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-[--color-accent] to-[--color-accent-hover] text-[--color-bg] rounded-lg font-semibold hover:shadow-lg hover:shadow-[--color-accent]/30 transition-all duration-300 hover:scale-105"
                  >
                    Enregistrer les modifications
                  </button>
                </div>
              </form>
              
              <div className="mt-12 pt-8 border-t border-[--color-accent]/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-[--color-accent] to-[--color-accent-hover] rounded-full" />
                  <h2 className="text-2xl font-display text-[--color-accent] font-semibold">Sécurité du compte</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-gradient-to-r from-[--color-bg-card]/50 to-[--color-bg-card]/30 p-6 rounded-xl border border-[--color-accent]/10 hover:border-[--color-accent]/20 transition-all">
                    <div>
                      <h3 className="font-semibold text-[--color-text] mb-1">Authentification à deux facteurs</h3>
                      <p className="text-sm text-[--color-text-muted]">Ajoutez une couche de sécurité supplémentaire à votre compte</p>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-[--color-accent] to-[--color-accent-hover] text-[--color-bg] rounded-lg font-semibold hover:shadow-lg hover:shadow-[--color-accent]/30 transition-all duration-300 hover:scale-105 text-sm">
                      Activer
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center bg-gradient-to-r from-[--color-bg-card]/50 to-[--color-bg-card]/30 p-6 rounded-xl border border-[--color-accent]/10 hover:border-[--color-accent]/20 transition-all">
                    <div>
                      <h3 className="font-semibold text-[--color-text] mb-1">Sessions actives</h3>
                      <p className="text-sm text-[--color-text-muted]">Gérez les appareils connectés à votre compte</p>
                    </div>
                    <button className="px-4 py-2 bg-[--color-bg-card]/50 border border-[--color-accent]/20 text-[--color-text] rounded-lg hover:bg-[--color-bg-card] transition-all duration-300 text-sm">
                      Voir les sessions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ManagementPageLayout>
      </VerticalDashboard>
    </RoleProtectedLayout>
  );
}
