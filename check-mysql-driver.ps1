# Script de diagnostic pour le pilote MySQL PDO

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Diagnostic MySQL PDO Driver" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier la version PHP
Write-Host "1. Vérification de la version PHP..." -ForegroundColor Yellow
$phpVersion = php -v 2>&1 | Select-Object -First 1
Write-Host "   Version: $phpVersion" -ForegroundColor Green
Write-Host ""

# Vérifier le fichier php.ini
Write-Host "2. Localisation du fichier php.ini..." -ForegroundColor Yellow
$iniPath = php --ini 2>&1 | Select-String "Loaded Configuration File" | ForEach-Object { ($_ -split ":")[1].Trim() }
if ($iniPath) {
    Write-Host "   Fichier: $iniPath" -ForegroundColor Green
    
    if (Test-Path $iniPath) {
        Write-Host "   ✓ Fichier trouvé" -ForegroundColor Green
    } else {
        Write-Host "   ✗ Fichier introuvable" -ForegroundColor Red
    }
} else {
    Write-Host "   ✗ Impossible de trouver php.ini" -ForegroundColor Red
}
Write-Host ""

# Vérifier l'extension pdo_mysql
Write-Host "3. Vérification de l'extension pdo_mysql..." -ForegroundColor Yellow
$pdoMysql = php -m 2>&1 | Select-String "pdo_mysql"
if ($pdoMysql) {
    Write-Host "   ✓ Extension pdo_mysql chargée" -ForegroundColor Green
} else {
    Write-Host "   ✗ Extension pdo_mysql NON chargée" -ForegroundColor Red
    Write-Host ""
    Write-Host "   SOLUTION:" -ForegroundColor Yellow
    Write-Host "   1. Ouvrez le fichier php.ini: $iniPath" -ForegroundColor White
    Write-Host "   2. Cherchez la ligne: ;extension=pdo_mysql" -ForegroundColor White
    Write-Host "   3. Supprimez le point-virgule: extension=pdo_mysql" -ForegroundColor White
    Write-Host "   4. Sauvegardez et redémarrez le serveur PHP" -ForegroundColor White
}
Write-Host ""

# Vérifier l'extension mysqli
Write-Host "4. Vérification de l'extension mysqli..." -ForegroundColor Yellow
$mysqli = php -m 2>&1 | Select-String "mysqli"
if ($mysqli) {
    Write-Host "   ✓ Extension mysqli chargée" -ForegroundColor Green
} else {
    Write-Host "   ✗ Extension mysqli NON chargée" -ForegroundColor Red
}
Write-Host ""

# Vérifier les extensions PDO disponibles
Write-Host "5. Extensions PDO disponibles..." -ForegroundColor Yellow
$pdoExtensions = php -m 2>&1 | Select-String "pdo"
if ($pdoExtensions) {
    Write-Host "   Extensions trouvées:" -ForegroundColor Green
    $pdoExtensions | ForEach-Object { Write-Host "   - $_" -ForegroundColor White }
} else {
    Write-Host "   ✗ Aucune extension PDO trouvée" -ForegroundColor Red
}
Write-Host ""

# Vérifier le dossier ext
Write-Host "6. Vérification du dossier des extensions..." -ForegroundColor Yellow
$phpDir = Split-Path (Get-Command php).Source -Parent
$extDir = Join-Path $phpDir "ext"
if (Test-Path $extDir) {
    Write-Host "   Dossier: $extDir" -ForegroundColor Green
    
    $pdoMysqlDll = Join-Path $extDir "php_pdo_mysql.dll"
    $mysqliDll = Join-Path $extDir "php_mysqli.dll"
    
    if (Test-Path $pdoMysqlDll) {
        Write-Host "   ✓ php_pdo_mysql.dll trouvé" -ForegroundColor Green
    } else {
        Write-Host "   ✗ php_pdo_mysql.dll introuvable" -ForegroundColor Red
    }
    
    if (Test-Path $mysqliDll) {
        Write-Host "   ✓ php_mysqli.dll trouvé" -ForegroundColor Green
    } else {
        Write-Host "   ✗ php_mysqli.dll introuvable" -ForegroundColor Red
    }
} else {
    Write-Host "   ✗ Dossier ext introuvable: $extDir" -ForegroundColor Red
}
Write-Host ""

# Test de chargement de l'extension (déjà vérifié plus haut)
Write-Host "7. Résumé du test..." -ForegroundColor Yellow
if ($pdoMysql) {
    Write-Host "   ✓ Extension pdo_mysql fonctionnelle" -ForegroundColor Green
    $testResult = "OK"
} else {
    Write-Host "   ✗ Extension pdo_mysql non fonctionnelle" -ForegroundColor Red
    $testResult = "NON"
}
Write-Host ""

# Résumé
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Résumé" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$allOk = $true
if (-not $pdoMysql) { $allOk = $false }
if (-not $mysqli) { $allOk = $false }
if ($testResult -ne "OK") { $allOk = $false }

if ($allOk) {
    Write-Host "✓ Tout est configuré correctement!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Vous pouvez maintenant démarrer le backend:" -ForegroundColor White
    Write-Host "  cd backend" -ForegroundColor Cyan
    Write-Host "  php artisan serve" -ForegroundColor Cyan
} else {
    Write-Host "✗ Des problèmes ont été détectés" -ForegroundColor Red
    Write-Host ""
    Write-Host "Consultez le fichier SOLUTION_MYSQL_DRIVER.md pour les solutions." -ForegroundColor Yellow
}
Write-Host ""

