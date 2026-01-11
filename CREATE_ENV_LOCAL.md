# 📝 Création du fichier .env.local

## Instructions

1. Créez un fichier nommé `.env.local` à la racine du projet (même niveau que `package.json`)

2. Ajoutez le contenu suivant :

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Méthodes

### Méthode 1 : PowerShell
```powershell
@"
NEXT_PUBLIC_API_URL=http://localhost:8000/api
"@ | Out-File -FilePath ".env.local" -Encoding utf8
```

### Méthode 2 : Copier depuis env.example.txt
```powershell
Copy-Item env.example.txt .env.local
```

### Méthode 3 : Éditeur de texte
1. Ouvrez votre éditeur de texte
2. Créez un nouveau fichier
3. Nommez-le `.env.local`
4. Collez le contenu ci-dessus
5. Enregistrez dans le dossier racine du projet

## Vérification

Après avoir créé le fichier, vérifiez qu'il existe :
```powershell
Test-Path .env.local
```

Si cela retourne `True`, le fichier est créé correctement.



