# Guide de configuration et démarrage

## 📋 Prérequis

- PHP 8.1 ou supérieur
- Composer
- Node.js 18+ et npm
- MySQL/PostgreSQL (ou SQLite pour le développement)

## 🚀 Configuration

### 1. Frontend (Next.js)

1. Créez un fichier `.env.local` à la racine du projet :
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

2. Installez les dépendances :
```bash
npm install
```

3. Démarrez le serveur de développement :
```bash
npm run dev
```

Le frontend sera accessible sur `http://localhost:3000`

### 2. Backend (Laravel)

1. Allez dans le dossier backend :
```bash
cd backend
```

2. Installez les dépendances PHP :
```bash
composer install
```

3. Créez le fichier `.env` :
```bash
cp .env.example .env
```

4. Générez la clé d'application :
```bash
php artisan key:generate
```

5. Configurez votre base de données dans `.env` :
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=restaurant_db
DB_USERNAME=root
DB_PASSWORD=
```

6. Exécutez les migrations :
```bash
php artisan migrate
```

7. (Optionnel) Créez des données de test :
```bash
php artisan db:seed
```

8. Démarrez le serveur :
```bash
php artisan serve
```

Le backend sera accessible sur `http://localhost:8000`

## 🔐 Comptes de test

Après avoir créé les utilisateurs via les seeders ou manuellement, vous pouvez vous connecter avec :

- **Admin** : `admin@lafourchette.com`
- **Réception** : `reception@lafourchette.com`
- **Caissier** : `cashier@lafourchette.com`
- **Chef** : `chef@lafourchette.com`
- **Livreur** : `delivery@lafourchette.com`
- **Client** : `customer@lafourchette.com`

## 🧪 Test de l'intégration

1. Démarrez le backend Laravel sur le port 8000
2. Démarrez le frontend Next.js sur le port 3000
3. Allez sur `http://localhost:3000/login`
4. Connectez-vous avec un des comptes ci-dessus
5. Vous devriez être redirigé vers votre dashboard selon votre rôle

## 🔧 Dépannage

### Erreur CORS
Si vous rencontrez des erreurs CORS, vérifiez que `backend/config/cors.php` autorise `http://localhost:3000`

### Erreur de connexion API
- Vérifiez que le backend est bien démarré sur le port 8000
- Vérifiez que l'URL dans `.env.local` est correcte
- Vérifiez les logs du backend : `backend/storage/logs/laravel.log`

### Erreur de base de données
- Vérifiez que votre base de données est créée
- Vérifiez les credentials dans `.env`
- Exécutez `php artisan migrate:fresh` pour réinitialiser la base

## 📚 Documentation

Pour plus de détails sur l'utilisation de l'API, consultez `INTEGRATION_BACKEND.md`



