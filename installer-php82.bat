@echo off
echo ========================================
echo   Installation de PHP 8.2 pour Laragon
echo ========================================
echo.

REM Verifier si Laragon existe
if not exist "C:\laragon\bin\php" (
    echo ⚠ Dossier Laragon non trouve dans C:\laragon\bin\php
    echo.
    echo Veuillez installer Laragon d'abord, ou modifiez ce script
    echo pour pointer vers votre installation Laragon.
    pause
    exit /b 1
)

echo Emplacement Laragon detecte: C:\laragon
echo.

REM Verifier si PHP 8.2 existe deja
if exist "C:\laragon\bin\php\php-8.2*" (
    echo ✓ PHP 8.2 semble deja installe dans Laragon
    echo   Chemin: 
    dir /b /ad "C:\laragon\bin\php\php-8.2*" 2>nul
    echo.
    echo Vous pouvez maintenant:
    echo   1. Ouvrir Laragon
    echo   2. Chercher les parametres PHP
    echo   3. Selectionner PHP 8.2
    echo.
    pause
    exit /b 0
)

echo ⚠ PHP 8.2 n'est pas installe dans Laragon
echo.
echo Instructions pour installer PHP 8.2 manuellement:
echo.
echo 1. Telechargez PHP 8.2 depuis:
echo    https://windows.php.net/downloads/releases/php-8.2.x-Win32-vs16-x64.zip
echo.
echo 2. Extrayez l'archive ZIP dans:
echo    C:\laragon\bin\php\php-8.2.x-Win32-vs16-x64\
echo.
echo 3. Dans Laragon, cherchez les parametres PHP et selectionnez cette version
echo.
echo 4. Redemarrez Laragon
echo.
echo ========================================
echo   Alternative: Installation standalone
echo ========================================
echo.
echo Si vous preferez installer PHP 8.2 independamment de Laragon:
echo.
echo 1. Telechargez PHP 8.2 depuis:
echo    https://windows.php.net/downloads/releases/php-8.2.x-Win32-vs16-x64.zip
echo.
echo 2. Extrayez dans: C:\php82\
echo.
echo 3. Ajoutez C:\php82\ au PATH Windows
echo    - Panneau de configuration ^> Systeme ^> Variables d'environnement
echo    - Modifiez la variable "Path"
echo    - Ajoutez: C:\php82\
echo.
echo 4. Fermez et rouvrez votre terminal
echo.
echo 5. Verifiez: php -v
echo.
pause



