# 🚀 Guide rapide : Mettre à jour PHP dans Laragon

## Problème actuel

Votre version de PHP (8.1.10) n'est pas compatible avec le backend Laravel.  
Le projet nécessite **PHP 8.2 ou supérieur**.

## Solution : Mettre à jour PHP dans Laragon

### Étape 1 : Ouvrir Laragon

1. Lancez **Laragon** depuis le menu Démarrer ou le bureau

### Étape 2 : Changer la version PHP

1. Dans Laragon, cliquez sur **Menu** (en haut à droite)
2. Allez dans **PHP** → **Version**
3. Sélectionnez **PHP 8.2** ou **PHP 8.3** (si disponible)
   - Si ces versions ne sont pas listées, passez à l'étape suivante

### Étape 3 : Installer PHP 8.2+ (si nécessaire)

Si PHP 8.2+ n'est pas disponible dans Laragon :

1. Dans Laragon, cliquez sur **Menu** → **PHP** → **Télécharger**
2. Sélectionnez **PHP 8.2** ou **PHP 8.3**
3. Attendez la fin du téléchargement et de l'installation
4. Redémarrez Laragon

### Étape 4 : Vérifier la version

Ouvrez un nouveau terminal et exécutez :

```bash
php -v
```

Vous devriez voir quelque chose comme :
```
PHP 8.2.x (cli) ...
```

### Étape 5 : Installer les dépendances du backend

```bash
cd backend
composer install
```

### Étape 6 : Démarrer le backend

```bash
php artisan serve
```

Ou utilisez le script :
```bash
.\start-backend.bat
```

## Vérification finale

1. Le backend devrait être accessible sur : **http://localhost:8000**
2. Testez l'API : **http://localhost:8000/api/test**
3. Le message d'erreur sur la page de connexion devrait disparaître

## Alternative : Installation manuelle de PHP

Si vous n'utilisez pas Laragon :

1. Téléchargez PHP 8.2+ depuis : https://windows.php.net/download/
2. Extrayez-le dans un dossier (ex: `C:\php82`)
3. Ajoutez ce dossier au PATH Windows
4. Redémarrez votre terminal
5. Vérifiez avec `php -v`

## Besoin d'aide ?

Consultez aussi :
- `PROBLEME_PHP.md` - Détails techniques sur le problème
- `SOLUTION_ERREUR.md` - Solutions complètes aux erreurs courantes



