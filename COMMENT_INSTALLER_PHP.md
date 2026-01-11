# 🚀 Comment installer PHP 8.2 (Guide rapide)

## ⚠️ Problème

Vous ne trouvez pas le menu dans Laragon pour changer la version PHP.

## ✅ Solution la plus simple : Installation standalone

### Étape 1 : Télécharger PHP 8.2

1. Allez sur : **https://windows.php.net/downloads/releases/**
2. Téléchargez : **php-8.2.x-Win32-vs16-x64.zip** (la version la plus récente)

### Étape 2 : Extraire

1. Créez le dossier : `C:\php82\`
2. Extrayez **tout le contenu** du ZIP dans `C:\php82\`
3. Vous devriez avoir `C:\php82\php.exe`

### Étape 3 : Ajouter au PATH

1. **Windows + R** → tapez `sysdm.cpl` → Entrée
2. Onglet **"Avancé"** → **"Variables d'environnement"**
3. Dans **"Variables système"**, trouvez **"Path"** → **"Modifier"**
4. **"Nouveau"** → Ajoutez : `C:\php82`
5. **"OK"** partout
6. **Fermez TOUS vos terminaux**
7. **Ouvrez un nouveau terminal**
8. Testez : `php -v`

### Étape 4 : Démarrer le backend

```bash
cd backend
composer install
php artisan serve
```

---

## 📋 Autres méthodes

- **`SOLUTION_SIMPLE_PHP.md`** - Guide détaillé avec 3 méthodes
- **`GUIDE_LARAGON_PHP.md`** - Toutes les méthodes pour Laragon
- **`installer-php82.bat`** - Script d'aide à l'installation

---

## ✅ Vérification

Après installation, `php -v` doit afficher : **PHP 8.2.x**

Ensuite, le backend pourra démarrer et le message d'erreur disparaîtra !



