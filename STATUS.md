# ✅ Statut de l'installation

## Fichiers créés

✅ **.env.local** - Fichier de configuration frontend créé avec succès
   - Contenu: `NEXT_PUBLIC_API_URL=http://localhost:8000/api`

## Prochaines étapes manuelles

### 1. Vérifier les prérequis

Exécutez ces commandes pour vérifier que tout est installé :

```powershell
# Vérifier Node.js
node --version

# Vérifier npm
npm --version

# Vérifier PHP
php --version

# Vérifier Composer
composer --version
```

### 2. Installer les dépendances (si nécessaire)

**Frontend :**
```powershell
cd "C:\Users\marcn\OneDrive\Desktop\the last\restaurant-la-fourchette"
npm install
```

**Backend :**
```powershell
cd "C:\Users\marcn\OneDrive\Desktop\the last\restaurant-la-fourchette\backend"
composer install
```

### 3. Configurer le backend

1. Créez le fichier `.env` dans le dossier `backend` :
```powershell
cd backend
copy .env.example .env
```

2. Configurez votre base de données dans `backend/.env`

3. Générez la clé d'application :
```powershell
php artisan key:generate
```

4. Exécutez les migrations :
```powershell
php artisan migrate
```

### 4. Démarrer les serveurs

**Terminal 1 - Backend :**
```powershell
cd "C:\Users\marcn\OneDrive\Desktop\the last\restaurant-la-fourchette\backend"
php artisan serve
```

**Terminal 2 - Frontend :**
```powershell
cd "C:\Users\marcn\OneDrive\Desktop\the last\restaurant-la-fourchette"
npm run dev
```

## URLs

- Frontend : http://localhost:3000
- Backend API : http://localhost:8000/api
- Test API : http://localhost:8000/api/test

## Notes

Les serveurs ont été démarrés en arrière-plan. Si vous devez les redémarrer, utilisez les commandes ci-dessus dans des terminaux séparés.



