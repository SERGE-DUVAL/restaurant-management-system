# 🎯 Solution simple : Installer PHP 8.2

Puisque vous ne trouvez pas le menu dans Laragon, voici **3 méthodes simples** :

## Méthode 1 : Installation standalone (RECOMMANDÉE - Plus simple)

Cette méthode installe PHP 8.2 indépendamment de Laragon.

### Étape 1 : Télécharger PHP 8.2

1. Allez sur : https://windows.php.net/downloads/releases/
2. Cherchez **php-8.2.x-Win32-vs16-x64.zip** (la version la plus récente)
3. Téléchargez le fichier ZIP

### Étape 2 : Extraire PHP

1. Créez un dossier : `C:\php82\`
2. Extrayez **tout le contenu** du ZIP dans `C:\php82\`
   - Vous devriez avoir `C:\php82\php.exe` après extraction

### Étape 3 : Ajouter au PATH Windows

1. Appuyez sur **Windows + R**
2. Tapez : `sysdm.cpl` et appuyez sur Entrée
3. Allez dans l'onglet **"Avancé"**
4. Cliquez sur **"Variables d'environnement"**
5. Dans **"Variables système"**, trouvez **"Path"** et cliquez sur **"Modifier"**
6. Cliquez sur **"Nouveau"**
7. Ajoutez : `C:\php82`
8. Cliquez sur **"OK"** partout
9. **Fermez complètement votre terminal** (fermez toutes les fenêtres)
10. **Ouvrez un nouveau terminal**
11. Testez : `php -v`

Vous devriez voir : `PHP 8.2.x`

### Étape 4 : Démarrer le backend

```bash
cd backend
composer install
php artisan serve
```

---

## Méthode 2 : Via le clic droit sur Laragon (systray)

1. **Ouvrez Laragon**
2. **Cherchez l'icône Laragon** dans la barre des tâches (en bas à droite, près de l'horloge)
3. **Clic droit** sur l'icône Laragon
4. Cherchez **"PHP"** dans le menu
5. Sélectionnez une version PHP 8.2 ou 8.3 si disponible

---

## Méthode 3 : Chercher dans les paramètres Laragon

1. **Ouvrez Laragon**
2. **Cherchez un bouton avec une icône d'engrenage ⚙️** ou **"Settings"** ou **"Options"**
3. Allez dans la section **"PHP"** ou **"Versions"**
4. Changez la version vers PHP 8.2 ou 8.3

---

## Vérification

Après avoir installé PHP 8.2, **fermez et rouvrez votre terminal**, puis :

```bash
php -v
```

Vous devriez voir : `PHP 8.2.x` ou `PHP 8.3.x`

---

## Si rien ne fonctionne

Exécutez le script :
```bash
.\installer-php82.bat
```

Il vous donnera des instructions détaillées.

---

## Après l'installation

Une fois PHP 8.2 installé et vérifié :

1. **Installez les dépendances** :
   ```bash
   cd backend
   composer install
   ```

2. **Démarrez le backend** :
   ```bash
   php artisan serve
   ```

3. Le message d'erreur sur la page de connexion disparaîtra automatiquement !



