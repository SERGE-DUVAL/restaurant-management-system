@echo off
echo ========================================
echo   Verification de l'installation
echo ========================================
echo.

echo [1/6] Verification de Node.js...
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ Node.js installe
    node --version
) else (
    echo ✗ Node.js non installe
)
echo.

echo [2/6] Verification de npm...
npm --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ npm installe
    npm --version
) else (
    echo ✗ npm non installe
)
echo.

echo [3/6] Verification de PHP...
php --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ PHP installe
    php --version | findstr /C:"PHP"
) else (
    echo ✗ PHP non installe
)
echo.

echo [4/6] Verification de Composer...
cd backend
composer --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ Composer installe
    composer --version
) else (
    echo ✗ Composer non installe
)
cd ..
echo.

echo [5/6] Verification des dependances...
if exist node_modules (
    echo ✓ Dependances npm installees
) else (
    echo ⚠ Dependances npm non installees
    echo   Executez: npm install
)
if exist backend\vendor (
    echo ✓ Dependances Composer installees
) else (
    echo ⚠ Dependances Composer non installees
    echo   Executez: cd backend ^&^& composer install
)
echo.

echo [6/6] Verification des fichiers de configuration...
if exist .env.local (
    echo ✓ Fichier .env.local existe
    type .env.local
) else (
    echo ⚠ Fichier .env.local non trouve
    echo   Executez: create-env-local.bat
)
if exist backend\.env (
    echo ✓ Fichier backend/.env existe
) else (
    echo ⚠ Fichier backend/.env non trouve
    echo   Creez-le depuis backend/.env.example
)
echo.

echo ========================================
echo   Verification terminee
echo ========================================
pause



