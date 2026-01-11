# 🚀 Guide de démarrage avec Supabase

## ⚠️ Problème actuel

Votre serveur Laravel est bloqué car :
1. Le fichier `.env` est configuré pour **MySQL** (`DB_CONNECTION=mysql`)
2. Mais votre base de données est sur **Supabase** qui utilise **PostgreSQL**
3. Le serveur essaie de se connecter à MySQL et échoue avec "could not find driver"

## ✅ Solution : Attendre le fichier .env de votre collègue

### Étape 1 : Activer l'extension PostgreSQL (si pas déjà fait)

Exécutez le script :
```powershell
.\activer-postgresql.bat
```

Ou manuellement :
1. Ouvrez `C:\laragon\bin\php\php-8.1.10-Win32-vs16-x64\php.ini`
2. Décommentez (enlevez le `;`) :
   ```ini
   extension=pdo_pgsql
   extension=pgsql
   ```
3. Sauvegardez

### Étape 2 : Remplacer le fichier .env

Une fois que votre collègue vous envoie le fichier `.env` :

1. **Remplacez** `backend/.env` par le fichier reçu
2. **Vérifiez** que le fichier contient :
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=db.xxxxx.supabase.co
   DB_PORT=5432
   DB_DATABASE=postgres
   DB_USERNAME=postgres
   DB_PASSWORD=votre_mot_de_passe
   ```

### Étape 3 : Vider le cache Laravel

```powershell
cd backend
php artisan config:clear
php artisan cache:clear
php artisan optimize:clear
```

### Étape 4 : Redémarrer le serveur

```powershell
php artisan serve
```

Le serveur devrait maintenant répondre sur `http://localhost:8000`

### Étape 5 : Vérifier que tout fonctionne

1. Testez l'API : `http://localhost:8000/api/test`
   - Devrait retourner : `{"message":"API fonctionne !"}`

2. Testez l'inscription dans votre application frontend

## 🔍 Vérification de l'extension PostgreSQL

Pour vérifier que PostgreSQL est activé :
```powershell
php -m | findstr pgsql
```

Vous devriez voir :
```
pdo_pgsql
pgsql
```

## ⚡ Démarrage rapide (une fois le .env reçu)

```powershell
# 1. Activer PostgreSQL (une seule fois)
.\activer-postgresql.bat

# 2. Aller dans le dossier backend
cd backend

# 3. Vider le cache
php artisan config:clear
php artisan cache:clear

# 4. Démarrer le serveur
php artisan serve
```

## 🆘 Si le problème persiste

1. **Vérifiez que PostgreSQL est activé :**
   ```powershell
   php -m | findstr pgsql
   ```

2. **Vérifiez la configuration dans .env :**
   - `DB_CONNECTION` doit être `pgsql` (pas `mysql`)
   - Les informations de connexion Supabase doivent être correctes

3. **Vérifiez les logs Laravel :**
   ```powershell
   Get-Content backend\storage\logs\laravel.log -Tail 50
   ```

4. **Redémarrez complètement :**
   - Arrêtez tous les processus PHP
   - Videz le cache
   - Redémarrez le serveur



