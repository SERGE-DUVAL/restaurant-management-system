@echo off
echo ========================================
echo   Installation des dependances Backend
echo ========================================
echo.
cd backend
echo Verification de Composer...
composer --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ✗ Composer non trouve
    echo   Installez Composer depuis https://getcomposer.org/
    pause
    exit /b 1
)
echo ✓ Composer trouve
echo.
echo Installation des dependances...
composer install
if %errorlevel% == 0 (
    echo.
    echo ✓ Dependances installees avec succes
) else (
    echo.
    echo ✗ Erreur lors de l'installation
    pause
    exit /b 1
)
echo.
echo ========================================
echo   Prochaines etapes:
echo ========================================
echo 1. Creez le fichier .env dans le dossier backend
echo 2. Configurez votre base de donnees dans .env
echo 3. Executez: php artisan key:generate
echo 4. Executez: php artisan migrate
echo 5. Demarrez le serveur: php artisan serve
echo.
pause



