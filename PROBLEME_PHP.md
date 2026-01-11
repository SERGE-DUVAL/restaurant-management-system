# ⚠️ Problème de version PHP

## Erreur détectée

Votre version de PHP (8.1.10) n'est pas compatible avec les dépendances du projet Laravel.

Le projet nécessite **PHP 8.2 ou supérieur**.

## Solutions

### Option 1 : Mettre à jour PHP (Recommandé)

1. **Avec Laragon** (si vous utilisez Laragon) :
   - Ouvrez Laragon
   - Allez dans Menu → PHP → Version
   - Sélectionnez PHP 8.2 ou 8.3
   - Redémarrez Laragon

2. **Installation manuelle** :
   - Téléchargez PHP 8.2+ depuis https://windows.php.net/download/
   - Installez-le et ajoutez-le au PATH
   - Redémarrez votre terminal

### Option 2 : Mettre à jour composer.lock

Si vous ne pouvez pas mettre à jour PHP, vous pouvez essayer de mettre à jour le fichier `composer.lock` :

```bash
cd backend
composer update --with-all-dependencies
```

⚠️ **Attention** : Cela peut causer des problèmes de compatibilité.

### Option 3 : Utiliser une version antérieure de Laravel

Modifiez `backend/composer.json` pour utiliser Laravel 10 avec des dépendances compatibles PHP 8.1.

## Vérification

Après avoir mis à jour PHP, vérifiez la version :

```bash
php -v
```

Vous devriez voir PHP 8.2.x ou supérieur.

Ensuite, réessayez :

```bash
cd backend
composer install
php artisan serve
```



