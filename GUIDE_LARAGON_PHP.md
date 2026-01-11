# 🔧 Guide : Changer la version PHP dans Laragon

## Méthode 1 : Via le bouton "Menu" (si disponible)

1. **Ouvrez Laragon**
2. **Cherchez le bouton "Menu"** en haut à droite de la fenêtre Laragon
3. Cliquez dessus
4. Allez dans **"PHP"** → **"Version"**
5. Sélectionnez **PHP 8.2** ou **PHP 8.3**

## Méthode 2 : Via le clic droit sur l'icône Laragon

1. **Ouvrez Laragon**
2. **Cliquez avec le bouton droit** sur l'icône Laragon dans la barre des tâches (systray)
3. Cherchez **"PHP"** dans le menu contextuel
4. Sélectionnez **"Version"** ou directement **"PHP 8.2"** / **"PHP 8.3"**

## Méthode 3 : Via les paramètres de Laragon

1. **Ouvrez Laragon**
2. **Cherchez un bouton "Settings"**, "Paramètres", "⚙️" ou "Options" dans l'interface
3. Allez dans la section **"PHP"**
4. Changez la version vers **PHP 8.2** ou **PHP 8.3**

## Méthode 4 : Via le fichier de configuration

1. **Fermez Laragon**
2. Ouvrez le fichier de configuration Laragon (généralement dans `C:\laragon\laragon.ini` ou similaire)
3. Cherchez la ligne avec `php_version` ou `php=`
4. Changez-la pour pointer vers PHP 8.2 ou 8.3
5. **Rouvrez Laragon**

## Méthode 5 : Télécharger et installer PHP 8.2 manuellement

Si vous ne trouvez pas PHP 8.2 dans Laragon :

### Étape 1 : Télécharger PHP 8.2

1. Allez sur : https://windows.php.net/download/
2. Téléchargez **PHP 8.2** (Thread Safe, x64)
3. Extrayez l'archive dans : `C:\laragon\bin\php\php-8.2.x-Win32-vs16-x64\`

### Étape 2 : Configurer Laragon pour utiliser cette version

1. Dans Laragon, cherchez les paramètres PHP
2. Ajoutez ou sélectionnez le chemin : `C:\laragon\bin\php\php-8.2.x-Win32-vs16-x64\`
3. Redémarrez Laragon

## Méthode 6 : Vérifier où se trouve PHP actuellement

1. Ouvrez un terminal PowerShell
2. Exécutez : `where.exe php`
3. Cela vous montrera le chemin actuel de PHP
4. Vous pouvez modifier le PATH Windows pour pointer vers une autre version

## Vérification après changement

Après avoir changé la version PHP :

1. **Fermez complètement votre terminal** (fermez toutes les fenêtres)
2. **Ouvrez un nouveau terminal**
3. Exécutez : `php -v`
4. Vous devriez voir : `PHP 8.2.x` ou `PHP 8.3.x`

## Si rien ne fonctionne

### Option A : Utiliser XAMPP ou WAMP

Si Laragon pose problème, vous pouvez utiliser :
- **XAMPP** : https://www.apachefriends.org/
- **WAMP** : https://www.wampserver.com/

Installez PHP 8.2+ avec l'un de ces outils.

### Option B : Installation standalone de PHP

1. Téléchargez PHP 8.2 depuis : https://windows.php.net/download/
2. Extrayez-le dans `C:\php82\`
3. Ajoutez `C:\php82\` au PATH Windows :
   - Panneau de configuration → Système → Variables d'environnement
   - Modifiez la variable "Path"
   - Ajoutez `C:\php82\`
4. Redémarrez votre terminal

## Besoin d'aide supplémentaire ?

Si vous ne trouvez toujours pas comment changer la version PHP dans Laragon, vous pouvez :

1. **Prendre une capture d'écran** de votre interface Laragon
2. **Vérifier la version de Laragon** que vous utilisez
3. Consulter la documentation officielle de Laragon

## Script de vérification

Après avoir changé PHP, exécutez :

```powershell
.\verifier-php.ps1
```

Ce script vous dira si votre version PHP est compatible.



