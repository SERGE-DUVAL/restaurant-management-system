# Guide d'intégration Backend-Frontend

## Configuration

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet Next.js :

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 2. Configuration CORS Backend

Dans `backend/config/cors.php`, la configuration a été mise à jour pour autoriser `http://localhost:3000` :

```php
'allowed_origins' => ['*', 'http://localhost:3000'],
'supports_credentials' => false,
```

### 3. Démarrage

#### Backend Laravel
```bash
cd backend
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

Le backend sera accessible sur `http://localhost:8000`

#### Frontend Next.js
```bash
npm install
npm run dev
```

Le frontend sera accessible sur `http://localhost:3000`

## Services disponibles

### Authentification
- `authService.login(credentials)` - Connexion
- `authService.logout()` - Déconnexion
- `authService.getCurrentUser()` - Récupérer l'utilisateur actuel

### Utilisateurs
- `userService.getAll()` - Liste des utilisateurs
- `userService.create(data)` - Créer un utilisateur
- `userService.update(id, data)` - Modifier un utilisateur
- `userService.delete(id)` - Supprimer un utilisateur
- `userService.search(query)` - Rechercher des utilisateurs

### Commandes
- `orderService.getAll()` - Liste des commandes
- `orderService.create(data)` - Créer une commande
- `orderService.update(id, data)` - Modifier une commande
- `orderService.delete(id)` - Supprimer une commande

### Plats
- `dishService.getAll()` - Liste des plats
- `dishService.create(data)` - Créer un plat (avec upload d'image)
- `dishService.update(id, data)` - Modifier un plat
- `dishService.delete(id)` - Supprimer un plat

### Stocks
- `stockService.getAll()` - Liste des stocks
- `stockService.create(data)` - Créer un stock
- `stockService.update(id, data)` - Modifier un stock
- `stockService.getMovements()` - Historique des mouvements

### Paiements
- `paymentService.create(data)` - Créer un paiement
- `paymentService.getByOrderId(orderId)` - Récupérer un paiement
- `paymentService.generateInvoice(orderId)` - Générer une facture PDF

### Réservations
- `reservationService.getAll()` - Liste des réservations
- `reservationService.create(data)` - Créer une réservation
- `reservationService.update(id, data)` - Modifier une réservation

## Utilisation

### Exemple : Charger des données

```typescript
import { userService } from '@/services/userService';
import { useEffect, useState } from 'react';

function MyComponent() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await userService.getAll();
        setUsers(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // ...
}
```

### Exemple : Authentification

```typescript
import { useAuth } from '@/contexts/AuthContext';

function LoginComponent() {
  const { login, loading } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    const success = await login(email, password);
    if (success) {
      // Redirection automatique selon le rôle
    }
  };
}
```

## Notes importantes

1. **Tokens d'authentification** : Les tokens Sanctum sont automatiquement gérés par `apiClient` et stockés dans `localStorage`.

2. **Gestion des erreurs** : Tous les services lancent des erreurs en cas d'échec. Utilisez `try/catch` pour les gérer.

3. **Notifications** : Utilisez `useNotification()` pour afficher des notifications à l'utilisateur.

4. **Loading states** : Toujours gérer les états de chargement pour une meilleure UX.

