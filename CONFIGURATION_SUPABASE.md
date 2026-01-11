# 🔧 Configuration pour Supabase (PostgreSQL)

## Problème actuel

Votre backend est configuré pour MySQL, mais votre base de données est sur **Supabase** qui utilise **PostgreSQL**. C'est pourquoi vous avez l'erreur "could not find driver".

## Solution : Activer l'extension PostgreSQL dans PHP

### Étape 1 : Activer l'extension PostgreSQL dans Laragon

1. **Ouvrez le fichier php.ini de Laragon :**
   - Chemin : `C:\laragon\bin\php\php-8.1.10-Win32-vs16-x64\php.ini`
   - Ou utilisez le menu Laragon : **Menu → PHP → php.ini**

2. **Recherchez ces lignes (vers la ligne 940) :**
   ```ini
   ;extension=pdo_pgsql
   ;extension=pgsql
   ```

3. **Décommentez-les (enlevez le point-virgule) :**
   ```ini
   extension=pdo_pgsql
   extension=pgsql
   ```

4. **Sauvegardez le fichier**

5. **Redémarrez le serveur Laravel** (arrêtez avec Ctrl+C et relancez `php artisan serve`)

### Étape 2 : Vérifier que l'extension est chargée

Dans un terminal, exécutez :
```powershell
php -m | findstr pgsql
```

Vous devriez voir :
```
pdo_pgsql
pgsql
```

### Étape 3 : Configurer le fichier .env

Une fois que votre collègue vous envoie le fichier `.env`, remplacez le fichier `backend/.env` actuel.

Le fichier `.env` pour Supabase devrait ressembler à ceci :
```env
DB_CONNECTION=pgsql
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=votre_mot_de_passe
```

**Important :** 
- `DB_CONNECTION` doit être `pgsql` (pas `mysql`)
- Le `DB_HOST` sera fourni par Supabase
- Le `DB_PORT` est généralement `5432` pour PostgreSQL

### Étape 4 : Vider le cache Laravel

Après avoir modifié le `.env`, exécutez :
```powershell
cd backend
php artisan config:clear
php artisan cache:clear
```

### Étape 5 : Tester la connexion

Une fois le `.env` configuré, testez la connexion :
```powershell
php artisan migrate:status
```

Si tout fonctionne, vous devriez voir la liste des migrations.

## Alternative : Utiliser MySQL localement (si vous préférez)

Si vous préférez utiliser MySQL localement avec Laragon au lieu de Supabase :

1. **Démarrez MySQL dans Laragon** (icône verte)
2. **Créez la base de données :**
   ```sql
   CREATE DATABASE laravel;
   ```
3. **Configurez le `.env` :**
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=laravel
   DB_USERNAME=root
   DB_PASSWORD=
   ```
4. **Exécutez les migrations :**
   ```powershell
   php artisan migrate
   ```

## Vérification finale

Une fois configuré, testez l'inscription dans votre application. L'erreur "could not find driver" devrait disparaître.



