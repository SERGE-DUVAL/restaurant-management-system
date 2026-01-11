# 🔧 Solution à l'erreur "Failed to fetch"

## Problèmes identifiés

1. **Backend non démarré** : Les dépendances Composer ne sont pas installées
2. **Version PHP incompatible** : PHP 8.1.10 alors que le projet nécessite PHP 8.2+
3. **Frontend sur port 3001** : Le port 3000 est occupé

## Solutions étape par étape

### Étape 1 : Mettre à jour PHP

Votre version actuelle : **PHP 8.1.10**  
Version requise : **PHP 8.2 ou supérieur**

**Avec Laragon** :
1. Ouvrez Laragon
2. Menu → PHP → Version → Sélectionnez PHP 8.2 ou 8.3
3. Redémarrez Laragon

**Vérification** :
```bash
php -v
```

### Étape 2 : Installer les dépendances Backend

```bash
cd backend
composer install
```

### Étape 3 : Configurer le backend

1. Créez le fichier `.env` :
```bash
cd backend
copy .env.example .env
```

2. Configurez votre base de données dans `.env`

3. Générez la clé d'application :
```bash
php artisan key:generate
```

4. Exécutez les migrations :
```bash
php artisan migrate
```

### Étape 4 : Démarrer les serveurs

**Terminal 1 - Backend** :
```bash
cd backend
php artisan serve
```

**Terminal 2 - Frontend** :
```bash
npm run dev
```

Le frontend sera sur http://localhost:3001 (ou 3000 si disponible)

### Étape 5 : Mettre à jour .env.local (si nécessaire)

Si le frontend est sur le port 3001, vous pouvez garder l'URL par défaut car le backend reste sur le port 8000.

Le fichier `.env.local` doit contenir :
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Scripts automatiques

J'ai créé des scripts pour vous faciliter la tâche :

1. **`install-backend-dependencies.bat`** - Installe les dépendances
2. **`start-backend.bat`** - Démarre le backend (vérifie et installe automatiquement)
3. **`start-frontend.bat`** - Démarre le frontend

## Vérification

Une fois tout configuré :

1. Backend accessible : http://localhost:8000/api/test
2. Frontend accessible : http://localhost:3001 (ou 3000)
3. Test de connexion : Allez sur http://localhost:3001/login

## Messages d'erreur améliorés

J'ai amélioré les messages d'erreur dans le code pour vous indiquer clairement si le backend n'est pas démarré.



