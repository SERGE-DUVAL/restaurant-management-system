# Script PowerShell pour démarrer le frontend Next.js
Write-Host "🚀 Démarrage du frontend Next.js..." -ForegroundColor Cyan

# Vérifier si on est dans le bon répertoire
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erreur: package.json non trouvé" -ForegroundColor Red
    Write-Host "Assurez-vous d'exécuter ce script depuis la racine du projet" -ForegroundColor Yellow
    exit 1
}

# Vérifier si Node.js est installé
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js n'est pas installé ou n'est pas dans le PATH" -ForegroundColor Red
    Write-Host "Installez Node.js depuis https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Vérifier si npm est installé
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm n'est pas installé ou n'est pas dans le PATH" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Node.js et npm détectés" -ForegroundColor Green

# Vérifier si les dépendances sont installées
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installation des dépendances npm..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erreur lors de l'installation des dépendances" -ForegroundColor Red
        exit 1
    }
}

# Vérifier si .env.local existe
if (-not (Test-Path ".env.local")) {
    Write-Host "📝 Création du fichier .env.local..." -ForegroundColor Yellow
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env.local"
        Write-Host "✓ Fichier .env.local créé depuis .env.example" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Fichier .env.example non trouvé, création d'un .env.local par défaut..." -ForegroundColor Yellow
        @"
# API Backend URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api
"@ | Out-File -FilePath ".env.local" -Encoding utf8
        Write-Host "✓ Fichier .env.local créé avec la configuration par défaut" -ForegroundColor Green
    }
}

# Démarrer le serveur de développement
Write-Host "🌐 Démarrage du serveur Next.js sur http://localhost:3000..." -ForegroundColor Cyan
Write-Host "⚠️  Assurez-vous que le backend Laravel est démarré sur http://localhost:8000" -ForegroundColor Yellow
Write-Host "Appuyez sur Ctrl+C pour arrêter le serveur" -ForegroundColor Yellow
npm run dev



