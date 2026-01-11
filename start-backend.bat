@echo off
cd backend

echo ========================================
echo   Demarrage du backend Laravel
echo ========================================
echo.

REM Verifier la version PHP
echo Verification de la version PHP...
php -r "if (version_compare(PHP_VERSION, '8.2.0', '<')) { echo 'ERREUR: PHP 8.2+ requis. Version actuelle: ' . PHP_VERSION . PHP_EOL; exit(1); }" 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERREUR: Version PHP incompatible
    echo.
    echo Version PHP actuelle: 
    php -v | findstr /C:"PHP"
    echo.
    echo Version requise: PHP 8.2 ou superieur
    echo.
    echo Pour mettre a jour PHP dans Laragon:
    echo   1. Ouvrez Laragon
    echo   2. Menu ^> PHP ^> Version ^> Selectionnez PHP 8.2 ou 8.3
    echo   3. Redemarrez Laragon
    echo   4. Relancez ce script
    echo.
    echo Guide detaille: GUIDE_MISE_A_JOUR_PHP.md
    echo.
    pause
    exit /b 1
)
echo ✓ Version PHP compatible
echo.

REM Verifier si les dependances sont installees
if not exist vendor (
    echo ⚠ Dependances Composer non installees
    echo.
    echo Installation en cours...
    composer install
    if %errorlevel% neq 0 (
        echo.
        echo ✗ Erreur lors de l'installation des dependances
        echo   Executez: install-backend-dependencies.bat
        pause
        exit /b 1
    )
    echo.
)

REM Verifier si .env existe
if not exist .env (
    echo ⚠ Fichier .env non trouve
    if exist .env.example (
        echo   Creation depuis .env.example...
        copy .env.example .env
        echo   ✓ Fichier .env cree
        echo   ⚠ Configurez votre base de donnees dans .env
        echo.
    ) else (
        echo   ✗ Fichier .env.example non trouve
        echo   Creez le fichier .env manuellement
        pause
        exit /b 1
    )
)

REM Verifier si APP_KEY est configure
findstr /C:"APP_KEY=" .env | findstr /V "APP_KEY=$" >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠ APP_KEY non configure
    echo   Generation de la cle...
    php artisan key:generate
    echo.
)

echo Le serveur sera accessible sur:
echo   http://localhost:8000
echo.
echo Appuyez sur Ctrl+C pour arreter
echo.
php artisan serve
pause

