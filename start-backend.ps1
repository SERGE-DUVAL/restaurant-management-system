# Script PowerShell pour démarrer le backend Laravel
Write-Host "🚀 Démarrage du backend Laravel..." -ForegroundColor Cyan

# Vérifier si on est dans le bon répertoire
if (-not (Test-Path "backend\composer.json")) {
    Write-Host "❌ Erreur: composer.json non trouvé dans le dossier backend" -ForegroundColor Red
    Write-Host "Assurez-vous d'exécuter ce script depuis la racine du projet" -ForegroundColor Yellow
    exit 1
}

# Aller dans le dossier backend
Set-Location backend

# Vérifier si composer est installé
if (-not (Get-Command composer -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Composer n'est pas installé ou n'est pas dans le PATH" -ForegroundColor Red
    Write-Host "Installez Composer depuis https://getcomposer.org/" -ForegroundColor Yellow
    exit 1
}

# Vérifier si PHP est installé
if (-not (Get-Command php -ErrorAction SilentlyContinue)) {
    Write-Host "❌ PHP n'est pas installé ou n'est pas dans le PATH" -ForegroundColor Red
    Write-Host "Installez PHP 8.1+ depuis https://www.php.net/downloads" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ PHP et Composer détectés" -ForegroundColor Green

# Vérifier si les dépendances sont installées
if (-not (Test-Path "vendor")) {
    Write-Host "📦 Installation des dépendances Composer..." -ForegroundColor Yellow
    composer install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erreur lors de l'installation des dépendances" -ForegroundColor Red
        exit 1
    }
}

# Vérifier si .env existe
if (-not (Test-Path ".env")) {
    Write-Host "📝 Création du fichier .env..." -ForegroundColor Yellow
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "✓ Fichier .env créé depuis .env.example" -ForegroundColor Green
        Write-Host "⚠️  N'oubliez pas de configurer votre base de données dans .env" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Fichier .env.example non trouvé" -ForegroundColor Red
        exit 1
    }
}

# Générer la clé d'application si nécessaire
Write-Host "🔑 Vérification de la clé d'application..." -ForegroundColor Yellow
php artisan key:generate --force

# Démarrer le serveur
Write-Host "🌐 Démarrage du serveur Laravel sur http://localhost:8000..." -ForegroundColor Cyan
Write-Host "Appuyez sur Ctrl+C pour arrêter le serveur" -ForegroundColor Yellow
php artisan serve



