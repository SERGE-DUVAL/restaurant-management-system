# 🚀 Guide de démarrage rapide

## Option 1 : Scripts PowerShell (Recommandé pour Windows)

### Démarrer le backend
```powershell
.\start-backend.ps1
```

### Démarrer le frontend (dans un autre terminal)
```powershell
.\start-frontend.ps1
```

## Option 2 : Commandes manuelles

### 1. Backend Laravel

```bash
cd backend
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

### 2. Frontend Next.js

Dans un nouveau terminal :
```bash
# Créer .env.local si nécessaire
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local

npm install
npm run dev
```

## 📝 Configuration requise

### Backend (.env)
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=restaurant_db
DB_USERNAME=root
DB_PASSWORD=
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## ✅ Vérification

1. Backend accessible sur : http://localhost:8000
2. Frontend accessible sur : http://localhost:3000
3. Test API : http://localhost:8000/api/test

## 🔐 Connexion

Allez sur http://localhost:3000/login et connectez-vous avec :
- `admin@lafourchette.com`
- `reception@lafourchette.com`
- `cashier@lafourchette.com`
- etc.

## 📚 Documentation complète

Voir `SETUP.md` pour plus de détails.



