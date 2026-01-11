# 🔧 Solution rapide : Erreur "could not find driver"

## Diagnostic

L'erreur `could not find driver (Connection: mysql, ...)` peut avoir plusieurs causes :

1. ✅ **Extension PDO MySQL chargée** - Vérifié : `pdo_mysql` est bien chargé
2. ❓ **MySQL n'est pas démarré** - Le serveur MySQL doit être en cours d'exécution
3. ❓ **Base de données n'existe pas** - La base `laravel` doit être créée
4. ❓ **Cache de configuration Laravel** - Le cache peut être obsolète

## Solution étape par étape

### Étape 1 : Vérifier que MySQL est démarré

**Avec Laragon :**
- Ouvrez Laragon
- Cliquez sur "Start All" ou vérifiez que MySQL est démarré (icône verte)

**Avec XAMPP :**
- Ouvrez le panneau de contrôle XAMPP
- Démarrez MySQL

**Vérification :**
```powershell
# Testez la connexion MySQL
mysql -u root -e "SELECT 1"
```

### Étape 2 : Créer la base de données

Si la base de données `laravel` n'existe pas :

```powershell
cd backend
mysql -u root -e "CREATE DATABASE IF NOT EXISTS laravel;"
```

### Étape 3 : Vider le cache Laravel

```powershell
cd backend
php artisan config:clear
php artisan cache:clear
```

### Étape 4 : Vérifier la configuration

Vérifiez que le fichier `backend/.env` contient :

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

### Étape 5 : Exécuter les migrations

```powershell
cd backend
php artisan migrate
```

### Étape 6 : Redémarrer le serveur Laravel

```powershell
cd backend
php artisan serve
```

## Solution alternative : Utiliser SQLite (plus simple pour le développement)

Si vous ne voulez pas configurer MySQL, vous pouvez utiliser SQLite :

1. **Modifiez `backend/.env` :**
   ```env
   DB_CONNECTION=sqlite
   # Commentez ou supprimez les autres lignes DB_*
   # DB_HOST=127.0.0.1
   # DB_PORT=3306
   # DB_DATABASE=laravel
   # DB_USERNAME=root
   # DB_PASSWORD=
   ```

2. **Créez le fichier de base de données :**
   ```powershell
   cd backend
   New-Item -ItemType File -Path database\database.sqlite -Force
   ```

3. **Exécutez les migrations :**
   ```powershell
   php artisan migrate
   ```

4. **Redémarrez le serveur :**
   ```powershell
   php artisan serve
   ```

## Vérification finale

Testez la connexion en visitant : http://localhost:8000/api/test

Vous devriez voir : `{"message":"API fonctionne !"}`

## Si le problème persiste

1. Vérifiez les logs Laravel : `backend\storage\logs\laravel.log`
2. Vérifiez que PHP utilise bien le bon `php.ini` : `php --ini`
3. Vérifiez que l'extension est bien chargée : `php -m | findstr pdo_mysql`



