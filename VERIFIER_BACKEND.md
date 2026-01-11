# 🔍 Vérification du Backend Laravel

## Test rapide

Ouvrez votre navigateur et allez sur :
**http://localhost:8000/api/test**

### Résultats possibles :

✅ **Si vous voyez** : `{"message":"API fonctionne !"}`
- Le backend fonctionne correctement !
- Le problème vient peut-être du frontend ou de la configuration CORS

❌ **Si vous voyez** : "This site can't be reached" ou "ERR_CONNECTION_REFUSED"
- Le backend n'est **pas démarré**
- Suivez les étapes ci-dessous

## Étapes pour démarrer le backend

### 1. Vérifier PHP
```bash
php -v
```
Doit afficher PHP 8.2 ou supérieur

### 2. Aller dans le dossier backend
```bash
cd backend
```

### 3. Installer les dépendances
```bash
composer install
```

⚠️ Si cela échoue avec des erreurs de version PHP :
- Mettez à jour PHP vers 8.2+ (voir `PROBLEME_PHP.md`)

### 4. Créer le fichier .env
```bash
copy .env.example .env
```

### 5. Configurer la base de données dans .env
Ouvrez `.env` et configurez :
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=restaurant_db
DB_USERNAME=root
DB_PASSWORD=
```

### 6. Générer la clé d'application
```bash
php artisan key:generate
```

### 7. Créer la base de données (si nécessaire)
Créez la base de données `restaurant_db` dans votre gestionnaire de base de données

### 8. Exécuter les migrations
```bash
php artisan migrate
```

### 9. Démarrer le serveur
```bash
php artisan serve
```

Vous devriez voir :
```
INFO  Server running on [http://127.0.0.1:8000]
```

### 10. Tester à nouveau
Allez sur **http://localhost:8000/api/test**

## Script automatique

Vous pouvez aussi utiliser le script :
```bash
.\start-backend.bat
```

Ce script vérifie et installe automatiquement les dépendances.

## Dépannage

### Erreur : "vendor/autoload.php not found"
→ Les dépendances ne sont pas installées
→ Exécutez : `composer install`

### Erreur : "PHP version not compatible"
→ PHP 8.1 installé mais besoin de PHP 8.2+
→ Mettez à jour PHP (voir `PROBLEME_PHP.md`)

### Erreur : "Class 'PDO' not found"
→ Extension PDO PHP non activée
→ Activez l'extension dans php.ini

### Erreur : "Access denied for user"
→ Problème de configuration de la base de données
→ Vérifiez les credentials dans `.env`

## Vérification finale

Une fois le backend démarré, testez ces URLs :

1. **http://localhost:8000/api/test** → Doit retourner `{"message":"API fonctionne !"}`
2. **http://localhost:8000** → Doit afficher la page d'accueil Laravel

Si ces deux URLs fonctionnent, le backend est prêt ! 🎉



