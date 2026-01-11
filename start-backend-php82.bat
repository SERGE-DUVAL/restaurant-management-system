@echo off
cd backend

echo ========================================
echo   Demarrage du backend Laravel
echo   Utilisation de PHP 8.2
echo ========================================
echo.

REM Verifier si PHP 8.2 existe
if not exist "C:\php82\php.exe" (
    echo ❌ PHP 8.2 non trouve dans C:\php82\
    echo.
    echo Veuillez installer PHP 8.2 dans C:\php82\
    echo Voir: COMMENT_INSTALLER_PHP.md
    echo.
    pause
    exit /b 1
)

REM Verifier la version PHP
echo Verification de la version PHP...
"C:\php82\php.exe" -r "if (version_compare(PHP_VERSION, '8.2.0', '<')) { echo 'ERREUR: PHP 8.2+ requis. Version actuelle: ' . PHP_VERSION . PHP_EOL; exit(1); } else { echo 'OK: PHP ' . PHP_VERSION . PHP_EOL; }"
if %errorlevel% neq 0 (
    echo.
    echo ❌ Version PHP incompatible
    pause
    exit /b 1
)
echo.

REM Verifier si les dependances sont installees
if not exist vendor (
    echo ⚠ Dependances Composer non installees
    echo.
    echo Installation en cours...
    set PATH=C:\php82;%PATH%
    composer install --no-interaction --ignore-platform-req=php
    if %errorlevel% neq 0 (
        echo.
        echo ✗ Erreur lors de l'installation des dependances
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
        echo.
    ) else (
        echo   ✗ Fichier .env.example non trouve
        pause
        exit /b 1
    )
)

REM Verifier si APP_KEY est configure
findstr /C:"APP_KEY=" .env | findstr /V "APP_KEY=$" >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠ APP_KEY non configure
    echo   Generation de la cle...
    set PATH=C:\php82;%PATH%
    "C:\php82\php.exe" artisan key:generate --force
    echo.
)

echo ========================================
echo   Serveur Laravel
echo ========================================
echo.
echo Le serveur sera accessible sur:
echo   http://localhost:8000
echo.
echo Appuyez sur Ctrl+C pour arreter
echo.
echo ========================================
echo.

set PATH=C:\php82;%PATH%
"C:\php82\php.exe" artisan serve

pause



