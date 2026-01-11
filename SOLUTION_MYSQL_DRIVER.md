# 🔧 Solution : Erreur "could not find driver" (MySQL PDO)

## Problème

L'erreur `could not find driver (Connection: mysql, SQL: select * from users...)` signifie que PHP ne trouve pas le pilote MySQL PDO. Cela se produit généralement lorsque l'extension `pdo_mysql` n'est pas activée dans PHP.

## Solution rapide

### Étape 1 : Trouver le fichier php.ini

1. Ouvrez un terminal PowerShell
2. Exécutez :
   ```powershell
   php --ini
   ```
3. Notez le chemin du fichier `php.ini` affiché (ex: `C:\php82\php.ini`)

### Étape 2 : Activer l'extension MySQL PDO

1. Ouvrez le fichier `php.ini` avec un éditeur de texte (Notepad++, VS Code, etc.)
2. Cherchez la ligne :
   ```ini
   ;extension=pdo_mysql
   ```
   ou
   ```ini
   ;extension=mysqli
   ```
3. **Supprimez le point-virgule** `;` au début pour activer l'extension :
   ```ini
   extension=pdo_mysql
   extension=mysqli
   ```

### Étape 3 : Vérifier que les fichiers DLL existent

Assurez-vous que les fichiers suivants existent dans le dossier `ext` de PHP :
- `php_pdo_mysql.dll`
- `php_mysqli.dll`

Si ces fichiers n'existent pas, vous devrez :
1. Télécharger PHP 8.2 complet depuis https://windows.php.net/download/
2. Extraire le dossier `ext` complet

### Étape 4 : Redémarrer le serveur PHP

1. **Arrêtez** le serveur Laravel (Ctrl+C dans le terminal)
2. **Redémarrez** le serveur :
   ```bash
   cd backend
   php artisan serve
   ```

## Vérification

Pour vérifier que l'extension est activée, exécutez :

```powershell
php -m | findstr pdo_mysql
```

Vous devriez voir `pdo_mysql` dans la liste.

Ou exécutez :

```powershell
php -r "echo extension_loaded('pdo_mysql') ? 'OK' : 'NON';"
```

Cela devrait afficher `OK`.

## Solution alternative : Utiliser SQLite (pour le développement)

Si vous ne pouvez pas activer MySQL, vous pouvez temporairement utiliser SQLite :

1. Modifiez `backend/.env` :
   ```env
   DB_CONNECTION=sqlite
   DB_DATABASE=C:\Users\marcn\OneDrive\Desktop\the last\restaurant-la-fourchette\backend\database\database.sqlite
   ```

2. Créez le fichier de base de données :
   ```bash
   cd backend
   New-Item -ItemType File -Path database\database.sqlite
   ```

3. Exécutez les migrations :
   ```bash
   php artisan migrate
   ```

## Script de diagnostic

Exécutez le script `check-mysql-driver.ps1` pour diagnostiquer automatiquement le problème :

```powershell
.\check-mysql-driver.ps1
```

## Si vous utilisez Laragon

1. Ouvrez Laragon
2. Allez dans **Menu** → **PHP** → **php.ini**
3. Cherchez et activez :
   ```ini
   extension=pdo_mysql
   extension=mysqli
   ```
4. Redémarrez Laragon

## Si vous utilisez XAMPP

1. Ouvrez `C:\xampp\php\php.ini`
2. Cherchez et activez :
   ```ini
   extension=pdo_mysql
   extension=mysqli
   ```
3. Redémarrez Apache dans XAMPP

## Besoin d'aide supplémentaire ?

Si le problème persiste :

1. Vérifiez que vous utilisez PHP 8.2+ : `php -v`
2. Vérifiez que les extensions sont chargées : `php -m`
3. Vérifiez les logs Laravel : `backend\storage\logs\laravel.log`



