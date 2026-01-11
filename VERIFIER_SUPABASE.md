# 🔍 Vérification de la connexion Supabase

## Problème actuel

PHP ne peut pas résoudre le nom d'hôte Supabase : `db.tcdpedmzmnjncefruvuo.supabase.co`

## Actions à vérifier

### 1. Vérifier avec votre collègue

Demandez à votre collègue de vérifier dans le dashboard Supabase :
- ✅ Le nom d'hôte est correct : `db.tcdpedmzmnjncefruvuo.supabase.co`
- ✅ Le projet Supabase est **actif** (pas en pause)
- ✅ Les informations de connexion sont correctes
- ✅ Il n'y a pas de restrictions IP qui bloquent votre connexion

### 2. Vérifier votre connexion Internet

```powershell
# Testez la connexion Internet
ping google.com

# Testez la résolution DNS
nslookup google.com
```

### 3. Utiliser le pooler de connexion Supabase

Supabase fournit un **pooler de connexion** qui utilise généralement IPv4. Dans votre dashboard Supabase :

1. Allez dans **Settings → Database**
2. Cherchez **Connection Pooling**
3. Utilisez l'URL du pooler (généralement avec le port **6543** ou **5432**)

Modifiez votre `.env` :
```env
DB_HOST=db.tcdpedmzmnjncefruvuo.supabase.co
DB_PORT=6543  # Port du pooler (au lieu de 5432)
```

### 4. Changer le serveur DNS

Si votre DNS actuel ne fonctionne pas :

1. Ouvrez **Paramètres réseau** dans Windows
2. Modifiez les paramètres de votre connexion
3. Changez le serveur DNS pour :
   - **Google DNS** : `8.8.8.8` et `8.8.4.4`
   - **Cloudflare DNS** : `1.1.1.1` et `1.0.0.1`

### 5. Vérifier IPv6

Si Supabase ne fonctionne qu'en IPv6 :

1. Vérifiez que IPv6 est activé sur Windows
2. Testez : `ping -6 db.tcdpedmzmnjncefruvuo.supabase.co`

### 6. Solution temporaire : Utiliser un autre réseau

Si vous êtes sur un réseau d'entreprise ou avec restrictions :
- Essayez avec un autre réseau (hotspot mobile, etc.)
- Ou utilisez un VPN

## Test de connexion

Une fois une solution appliquée, testez :

```powershell
cd backend
php artisan tinker
```

Puis :
```php
DB::connection()->getPdo();
```

Si cela fonctionne, vous verrez : `PDO Object`

## Contact

Si rien ne fonctionne, contactez votre collègue pour :
1. Vérifier que le projet Supabase est actif
2. Obtenir les informations de connexion du pooler
3. Vérifier s'il y a des restrictions réseau



