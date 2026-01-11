# Script de vérification de l'installation
Write-Host "🔍 Vérification de l'installation..." -ForegroundColor Cyan
Write-Host ""

$errors = @()
$warnings = @()

# Vérifier Node.js
Write-Host "📦 Vérification de Node.js..." -NoNewline
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node -v
    Write-Host " ✓ ($nodeVersion)" -ForegroundColor Green
} else {
    Write-Host " ✗ Non installé" -ForegroundColor Red
    $errors += "Node.js n'est pas installé"
}

# Vérifier npm
Write-Host "📦 Vérification de npm..." -NoNewline
if (Get-Command npm -ErrorAction SilentlyContinue) {
    $npmVersion = npm -v
    Write-Host " ✓ ($npmVersion)" -ForegroundColor Green
} else {
    Write-Host " ✗ Non installé" -ForegroundColor Red
    $errors += "npm n'est pas installé"
}

# Vérifier PHP
Write-Host "🐘 Vérification de PHP..." -NoNewline
if (Get-Command php -ErrorAction SilentlyContinue) {
    $phpVersion = php -v | Select-Object -First 1
    Write-Host " ✓ ($phpVersion)" -ForegroundColor Green
} else {
    Write-Host " ✗ Non installé" -ForegroundColor Red
    $errors += "PHP n'est pas installé"
}

# Vérifier Composer
Write-Host "📦 Vérification de Composer..." -NoNewline
if (Get-Command composer -ErrorAction SilentlyContinue) {
    $composerVersion = composer -V | Select-Object -First 1
    Write-Host " ✓ ($composerVersion)" -ForegroundColor Green
} else {
    Write-Host " ✗ Non installé" -ForegroundColor Red
    $errors += "Composer n'est pas installé"
}

Write-Host ""

# Vérifier les fichiers du projet
Write-Host "📁 Vérification des fichiers du projet..." -ForegroundColor Cyan

# Frontend
Write-Host "  Frontend..." -NoNewline
if (Test-Path "package.json") {
    Write-Host " ✓" -ForegroundColor Green
} else {
    Write-Host " ✗ package.json non trouvé" -ForegroundColor Red
    $errors += "package.json non trouvé"
}

# Backend
Write-Host "  Backend..." -NoNewline
if (Test-Path "backend\composer.json") {
    Write-Host " ✓" -ForegroundColor Green
} else {
    Write-Host " ✗ composer.json non trouvé" -ForegroundColor Red
    $errors += "backend/composer.json non trouvé"
}

Write-Host ""

# Vérifier les dépendances
Write-Host "📦 Vérification des dépendances..." -ForegroundColor Cyan

# Node modules
Write-Host "  node_modules..." -NoNewline
if (Test-Path "node_modules") {
    Write-Host " ✓ Installé" -ForegroundColor Green
} else {
    Write-Host " ⚠ Non installé" -ForegroundColor Yellow
    $warnings += "Les dépendances npm ne sont pas installées. Exécutez: npm install"
}

# Vendor (Composer)
Write-Host "  vendor (Composer)..." -NoNewline
if (Test-Path "backend\vendor") {
    Write-Host " ✓ Installé" -ForegroundColor Green
} else {
    Write-Host " ⚠ Non installé" -ForegroundColor Yellow
    $warnings += "Les dépendances Composer ne sont pas installées. Exécutez: cd backend && composer install"
}

Write-Host ""

# Vérifier les fichiers de configuration
Write-Host "⚙️  Vérification de la configuration..." -ForegroundColor Cyan

# .env.local (Frontend)
Write-Host "  .env.local (Frontend)..." -NoNewline
if (Test-Path ".env.local") {
    Write-Host " ✓" -ForegroundColor Green
    $envContent = Get-Content ".env.local" -Raw
    if ($envContent -match "NEXT_PUBLIC_API_URL") {
        Write-Host "    ✓ NEXT_PUBLIC_API_URL configuré" -ForegroundColor Green
    } else {
        Write-Host "    ⚠ NEXT_PUBLIC_API_URL manquant" -ForegroundColor Yellow
        $warnings += ".env.local existe mais NEXT_PUBLIC_API_URL n'est pas configuré"
    }
} else {
    Write-Host " ⚠ Non créé" -ForegroundColor Yellow
    $warnings += ".env.local n'existe pas. Créez-le depuis .env.example"
}

# .env (Backend)
Write-Host "  .env (Backend)..." -NoNewline
if (Test-Path "backend\.env") {
    Write-Host " ✓" -ForegroundColor Green
    $backendEnv = Get-Content "backend\.env" -Raw
    if ($backendEnv -match "APP_KEY=" -and $backendEnv -notmatch "APP_KEY=$") {
        Write-Host "    ✓ APP_KEY configuré" -ForegroundColor Green
    } else {
        Write-Host "    ⚠ APP_KEY non configuré" -ForegroundColor Yellow
        $warnings += "APP_KEY non configuré dans backend/.env. Exécutez: php artisan key:generate"
    }
} else {
    Write-Host " ⚠ Non créé" -ForegroundColor Yellow
    $warnings += "backend/.env n'existe pas. Créez-le depuis backend/.env.example"
}

Write-Host ""

# Résumé
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
if ($errors.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host "✅ Tout est prêt ! Vous pouvez démarrer les serveurs." -ForegroundColor Green
    Write-Host ""
    Write-Host "Pour démarrer:" -ForegroundColor Yellow
    Write-Host "  1. Backend:  .\start-backend.ps1" -ForegroundColor White
    Write-Host "  2. Frontend: .\start-frontend.ps1" -ForegroundColor White
} else {
    if ($errors.Count -gt 0) {
        Write-Host "❌ Erreurs critiques:" -ForegroundColor Red
        foreach ($errMsg in $errors) {
            Write-Host "  • $errMsg" -ForegroundColor Red
        }
        Write-Host ""
    }
    
    if ($warnings.Count -gt 0) {
        Write-Host "⚠️  Avertissements:" -ForegroundColor Yellow
        foreach ($warning in $warnings) {
            Write-Host "  • $warning" -ForegroundColor Yellow
        }
        Write-Host ""
    }
    
    Write-Host "Consultez SETUP.md pour plus d'informations." -ForegroundColor Cyan
}
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan



