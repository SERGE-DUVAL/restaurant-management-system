# Configuration API Backend

## Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec :

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Configuration CORS Backend

Assurez-vous que le backend Laravel autorise les requêtes depuis votre frontend. Dans `backend/config/cors.php`, vérifiez que :

```php
'allowed_origins' => ['*'], // ou spécifiez votre URL frontend
'supports_credentials' => true, // si vous utilisez les cookies
```

## Démarrage

1. **Backend Laravel** :
   ```bash
   cd backend
   composer install
   php artisan key:generate
   php artisan migrate
   php artisan serve
   ```

2. **Frontend Next.js** :
   ```bash
   npm install
   npm run dev
   ```

## Services disponibles

- `authService` - Authentification
- `userService` - Gestion des utilisateurs
- `orderService` - Gestion des commandes
- `dishService` - Gestion des plats
- `categoryService` - Gestion des catégories
- `stockService` - Gestion des stocks
- `paymentService` - Gestion des paiements
- `reservationService` - Gestion des réservations



