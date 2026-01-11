# 🚀 Guide de démarrage complet

## ✅ Ce qui a été fait

1. ✅ Intégration complète du backend Laravel avec le frontend Next.js
2. ✅ Création de tous les services API (auth, users, orders, dishes, stocks, payments, reservations)
3. ✅ Configuration CORS mise à jour
4. ✅ Scripts PowerShell créés pour faciliter le démarrage
5. ✅ Documentation complète

## 📋 Prochaines étapes

### Étape 1 : Créer le fichier .env.local

**Option A : PowerShell (depuis la racine du projet)**
```powershell
"NEXT_PUBLIC_API_URL=http://localhost:8000/api" | Out-File -FilePath ".env.local" -Encoding utf8
```

**Option B : Manuellement**
1. Créez un fichier nommé `.env.local` à la racine du projet
2. Ajoutez cette ligne :
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Étape 2 : Configurer le backend Laravel

1. Allez dans le dossier backend :
```powershell
cd backend
```

2. Créez le fichier `.env` :
```powershell
# Si .env.example existe
Copy-Item .env.example .env

# Sinon, créez-le manuellement avec :
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=restaurant_db
# DB_USERNAME=root
# DB_PASSWORD=
```

3. Installez les dépendances :
```powershell
composer install
```

4. Générez la clé d'application :
```powershell
php artisan key:generate
```

5. Configurez votre base de données dans `.env`

6. Exécutez les migrations :
```powershell
php artisan migrate
```

### Étape 3 : Démarrer les serveurs

**Terminal 1 - Backend :**
```powershell
cd backend
php artisan serve
```

**Terminal 2 - Frontend :**
```powershell
# Depuis la racine du projet
npm install  # Si pas encore fait
npm run dev
```

### Étape 4 : Vérifier l'installation

Exécutez le script de vérification :
```powershell
.\check-setup.ps1
```

## 🎯 URLs

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:8000/api
- **Test API** : http://localhost:8000/api/test

## 🔐 Connexion

Allez sur http://localhost:3000/login et connectez-vous avec :
- `admin@lafourchette.com` (après création dans la base de données)
- `reception@lafourchette.com`
- `cashier@lafourchette.com`
- etc.

## 📚 Documentation

- `SETUP.md` - Guide de configuration détaillé
- `QUICK_START.md` - Démarrage rapide
- `INTEGRATION_BACKEND.md` - Documentation de l'API
- `CREATE_ENV_LOCAL.md` - Instructions pour créer .env.local

## 🛠️ Scripts disponibles

- `start-backend.ps1` - Démarre le backend Laravel
- `start-frontend.ps1` - Démarre le frontend Next.js
- `check-setup.ps1` - Vérifie l'installation

## ⚠️ Notes importantes

1. Assurez-vous que PHP 8.1+, Composer, Node.js 18+ et npm sont installés
2. Configurez votre base de données avant de lancer les migrations
3. Le backend doit être démarré avant le frontend
4. Les deux serveurs doivent tourner simultanément

## 🐛 Dépannage

### Erreur CORS
- Vérifiez que `backend/config/cors.php` autorise `http://localhost:3000`

### Erreur de connexion API
- Vérifiez que le backend est démarré sur le port 8000
- Vérifiez que `.env.local` contient la bonne URL

### Erreur de base de données
- Vérifiez les credentials dans `backend/.env`
- Assurez-vous que la base de données existe



