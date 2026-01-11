# 🚀 Démarrage rapide du projet

## ⚠️ Problème actuel : Version PHP incompatible

Votre version PHP (8.1.10) n'est **pas compatible** avec le backend Laravel.

## ✅ Solution en 3 étapes

### Étape 1 : Mettre à jour PHP dans Laragon

1. **Ouvrez Laragon**
2. **Cliquez sur "Menu"** (en haut à droite de la fenêtre Laragon)
3. **Allez dans "PHP" → "Version"**
4. **Sélectionnez "PHP 8.2" ou "PHP 8.3"**
   - Si ces versions ne sont pas listées :
     - Menu → PHP → **Télécharger**
     - Sélectionnez PHP 8.2 ou 8.3
     - Attendez la fin du téléchargement
5. **Redémarrez Laragon**
6. **Fermez et rouvrez votre terminal**

### Étape 2 : Vérifier la version PHP

```bash
php -v
```

Vous devriez voir : `PHP 8.2.x` ou `PHP 8.3.x`

### Étape 3 : Démarrer le backend

**Option A - Script automatique :**
```bash
.\start-backend.bat
```

**Option B - Manuel :**
```bash
cd backend
composer install
php artisan serve
```

## 🎯 Vérification

Une fois le backend démarré, vous devriez voir :
```
INFO  Server running on [http://127.0.0.1:8000]
```

Le message d'erreur sur la page de connexion disparaîtra automatiquement.

## 📋 Scripts disponibles

- `verifier-php.ps1` - Vérifie votre version PHP et donne des instructions
- `start-backend.bat` - Démarre le backend (vérifie PHP automatiquement)
- `start-frontend.bat` - Démarre le frontend

## ❓ Besoin d'aide ?

- `GUIDE_MISE_A_JOUR_PHP.md` - Guide détaillé pour mettre à jour PHP
- `PROBLEME_PHP.md` - Détails techniques sur le problème
- `SOLUTION_ERREUR.md` - Solutions aux erreurs courantes



