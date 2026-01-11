# Script pour activer l'extension PostgreSQL dans PHP Laragon

Write-Host "=== Activation de l'extension PostgreSQL ===" -ForegroundColor Cyan
Write-Host ""

$phpIniPath = "C:\laragon\bin\php\php-8.1.10-Win32-vs16-x64\php.ini"

if (-not (Test-Path $phpIniPath)) {
    Write-Host "❌ Fichier php.ini non trouvé : $phpIniPath" -ForegroundColor Red
    Write-Host "Vérifiez que Laragon est installé et que PHP 8.1.10 est utilisé." -ForegroundColor Yellow
    exit 1
}

Write-Host "📝 Lecture du fichier php.ini..." -ForegroundColor Yellow
$content = Get-Content $phpIniPath -Raw

# Vérifier si les extensions sont déjà activées
if ($content -match '^extension=pdo_pgsql' -and $content -match '^extension=pgsql') {
    Write-Host "✅ Les extensions PostgreSQL sont déjà activées !" -ForegroundColor Green
    Write-Host ""
    Write-Host "Vérification..." -ForegroundColor Yellow
    php -m | Select-String -Pattern "pgsql"
    exit 0
}

# Décommenter les extensions
Write-Host "🔧 Activation des extensions..." -ForegroundColor Yellow
$content = $content -replace ';extension=pdo_pgsql', 'extension=pdo_pgsql'
$content = $content -replace ';extension=pgsql', 'extension=pgsql'

# Sauvegarder
Set-Content -Path $phpIniPath -Value $content -NoNewline

Write-Host "✅ Extensions activées avec succès !" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  IMPORTANT : Redémarrez le serveur Laravel pour que les changements prennent effet." -ForegroundColor Yellow
Write-Host ""
Write-Host "Vérification..." -ForegroundColor Yellow
php -m | Select-String -Pattern "pgsql"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ PostgreSQL est maintenant disponible !" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "⚠️  Les extensions ne sont pas encore chargées." -ForegroundColor Yellow
    Write-Host "   Redémarrez votre terminal ou le serveur Laravel." -ForegroundColor Yellow
}



