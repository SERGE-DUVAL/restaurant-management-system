@echo off
echo Ajout des fichiers modifies...
cd /d "%~dp0\.."
git add -A
echo Commit des changements...
git commit -m "Update: Retrait image non alimentaire et ajout de nouveaux plats dans la carte"
echo Push vers le depot distant...
git push
echo.
echo Termine!
pause
