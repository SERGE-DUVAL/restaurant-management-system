# Script de vérification de la version PHP
Write-Host "🔍 Vérification de la version PHP..." -ForegroundColor Cyan
Write-Host ""

$phpVersion = php -v 2>&1 | Select-Object -First 1

if ($phpVersion -match "PHP (\d+)\.(\d+)") {
    $majorVersion = [int]$matches[1]
    $minorVersion = [int]$matches[2]
    
    Write-Host "Version PHP détectée : $phpVersion" -ForegroundColor Yellow
    Write-Host ""
    
    if ($majorVersion -eq 8 -and $minorVersion -ge 2) {
        Write-Host "✅ Version PHP compatible !" -ForegroundColor Green
        Write-Host ""
        Write-Host "Vous pouvez maintenant installer les dépendances :" -ForegroundColor Cyan
        Write-Host "  cd backend" -ForegroundColor White
        Write-Host "  composer install" -ForegroundColor White
        Write-Host "  php artisan serve" -ForegroundColor White
    } else {
        Write-Host "❌ Version PHP incompatible !" -ForegroundColor Red
        Write-Host ""
        Write-Host "Version actuelle : PHP $majorVersion" -ForegroundColor Yellow
        Write-Host "                 : Version $minorVersion" -ForegroundColor Yellow
        Write-Host "Version requise  : PHP 8.2 ou supérieur" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "📋 Pour mettre à jour PHP dans Laragon :" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "1. Ouvrez Laragon" -ForegroundColor White
        Write-Host "2. Cliquez sur Menu (en haut a droite)" -ForegroundColor White
        Write-Host "3. Allez dans PHP puis Version" -ForegroundColor White
        Write-Host "4. Selectionnez PHP 8.2 ou PHP 8.3" -ForegroundColor White
        Write-Host ""
        Write-Host "   Si ces versions ne sont pas disponibles :" -ForegroundColor Yellow
        Write-Host "   - Menu puis PHP puis Telecharger" -ForegroundColor White
        Write-Host "   - Sélectionnez PHP 8.2 ou 8.3" -ForegroundColor White
        Write-Host "   - Attendez la fin du téléchargement" -ForegroundColor White
        Write-Host ""
        Write-Host "5. Redémarrez Laragon" -ForegroundColor White
        Write-Host "6. Fermez et rouvrez ce terminal" -ForegroundColor White
        Write-Host "7. Relancez ce script pour vérifier" -ForegroundColor White
        Write-Host ""
        Write-Host "📖 Guide détaillé : GUIDE_MISE_A_JOUR_PHP.md" -ForegroundColor Cyan
    }
} else {
    Write-Host "❌ Impossible de détecter la version PHP" -ForegroundColor Red
    Write-Host "Assurez-vous que PHP est installé et dans le PATH" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Appuyez sur Entree pour continuer..."
Read-Host

