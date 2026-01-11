@echo off
echo Creation du fichier .env.local...
echo NEXT_PUBLIC_API_URL=http://localhost:8000/api > .env.local
if exist .env.local (
    echo ✓ Fichier .env.local cree avec succes
    type .env.local
) else (
    echo ✗ Erreur lors de la creation
)
pause



