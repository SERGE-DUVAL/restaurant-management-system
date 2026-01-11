# 🔧 Solution : Erreur DNS Supabase

## Problème

L'erreur `could not translate host name "db.tcdpedmzmnjncefruvuo.supabase.co" to address: Unknown host` indique que PHP ne peut pas résoudre le nom d'hôte Supabase.

## Causes possibles

1. **IPv6 uniquement** : Supabase résout uniquement en IPv6, mais votre système Windows ou votre connexion Internet ne supporte pas IPv6
2. **Problème de DNS** : Votre serveur DNS ne peut pas résoudre le nom d'hôte
3. **Firewall/Proxy** : Un firewall ou proxy bloque la résolution DNS

## Solutions

### Solution 1 : Utiliser le pooler de connexion Supabase (Recommandé)

Supabase fournit un pooler de connexion qui utilise généralement IPv4. Modifiez votre `.env` :

```env
DB_HOST=db.tcdpedmzmnjncefruvuo.supabase.co
DB_PORT=6543  # Port du pooler (au lieu de 5432)
```

Ou utilisez le pooler de transaction :
```env
DB_HOST=db.tcdpedmzmnjncefruvuo.supabase.co
DB_PORT=5432
# Ajoutez dans votre configuration Supabase le pooler
```

### Solution 2 : Utiliser DATABASE_URL

Dans votre `.env`, utilisez la chaîne de connexion complète :

```env
DATABASE_URL=pgsql://postgres:bonjour22janvie@db.tcdpedmzmnjncefruvuo.supabase.co:5432/postgres
```

### Solution 3 : Vérifier votre connexion Internet

1. Vérifiez que vous êtes connecté à Internet
2. Testez la résolution DNS :
   ```powershell
   nslookup db.tcdpedmzmnjncefruvuo.supabase.co
   ```
3. Vérifiez votre configuration DNS dans Windows

### Solution 4 : Activer IPv6 sur Windows

Si Supabase ne fonctionne qu'en IPv6 :

1. Ouvrez **Paramètres réseau** dans Windows
2. Vérifiez que IPv6 est activé
3. Redémarrez votre ordinateur si nécessaire

### Solution 5 : Utiliser un VPN ou changer de DNS

Si votre FAI bloque IPv6 ou a des problèmes DNS :

1. Changez votre serveur DNS (utilisez Google DNS : 8.8.8.8, 8.8.4.4)
2. Ou utilisez un VPN

## Vérification

Après avoir appliqué une solution, testez :

```powershell
cd backend
php artisan tinker
```

Puis dans tinker :
```php
DB::connection()->getPdo();
```

Si cela fonctionne, vous verrez : `PDO Object`

## Contact Supabase

Si aucune solution ne fonctionne, vérifiez dans votre dashboard Supabase :
1. Que le projet est actif
2. Que les informations de connexion sont correctes
3. Qu'il n'y a pas de restrictions IP



