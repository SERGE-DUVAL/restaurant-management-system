# Script pour résoudre le problème DNS Supabase

Write-Host "=== Solution DNS Supabase ===" -ForegroundColor Cyan
Write-Host ""

# Option 1: Ajouter au fichier hosts (si on a une IP)
Write-Host "Option 1: Ajouter au fichier hosts Windows" -ForegroundColor Yellow
Write-Host "Si vous avez une adresse IPv4 de Supabase, ajoutez-la dans:" -ForegroundColor White
Write-Host "  C:\Windows\System32\drivers\etc\hosts" -ForegroundColor Cyan
Write-Host ""
Write-Host "Format:" -ForegroundColor White
Write-Host "  [IP_ADDRESS] db.tcdpedmzmnjncefruvuo.supabase.co" -ForegroundColor Cyan
Write-Host ""

# Option 2: Changer le DNS
Write-Host "Option 2: Changer le serveur DNS" -ForegroundColor Yellow
Write-Host "1. Ouvrez Paramètres réseau Windows" -ForegroundColor White
Write-Host "2. Modifiez votre connexion réseau" -ForegroundColor White
Write-Host "3. Changez le DNS pour:" -ForegroundColor White
Write-Host "   - Google DNS: 8.8.8.8 et 8.8.4.4" -ForegroundColor Cyan
Write-Host "   - Cloudflare DNS: 1.1.1.1 et 1.0.0.1" -ForegroundColor Cyan
Write-Host ""

# Option 3: Utiliser le pooler Supabase
Write-Host "Option 3: Utiliser le pooler de connexion Supabase" -ForegroundColor Yellow
Write-Host "Dans votre dashboard Supabase:" -ForegroundColor White
Write-Host "1. Allez dans Settings > Database" -ForegroundColor White
Write-Host "2. Cherchez 'Connection Pooling'" -ForegroundColor White
Write-Host "3. Utilisez l'URL du pooler (généralement port 6543)" -ForegroundColor White
Write-Host ""
Write-Host "Puis modifiez votre .env:" -ForegroundColor White
Write-Host "  DB_PORT=6543" -ForegroundColor Cyan
Write-Host ""

# Option 4: Vérifier le projet Supabase
Write-Host "Option 4: Vérifier avec votre collègue" -ForegroundColor Yellow
Write-Host "- Le projet Supabase est-il actif (pas en pause)?" -ForegroundColor White
Write-Host "- Les informations de connexion sont-elles correctes?" -ForegroundColor White
Write-Host "- Y a-t-il des restrictions IP?" -ForegroundColor White
Write-Host ""

Write-Host "=== Test de connexion actuel ===" -ForegroundColor Cyan
try {
    $test = Test-NetConnection -ComputerName db.tcdpedmzmnjncefruvuo.supabase.co -Port 5432 -InformationLevel Quiet -WarningAction SilentlyContinue
    if ($test) {
        Write-Host "✅ Connexion réussie!" -ForegroundColor Green
    } else {
        Write-Host "❌ Connexion échouée" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Erreur: $_" -ForegroundColor Red
}



