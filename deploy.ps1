# Build the application
ng build --configuration production --base-href /quality2/ --output-path docs

# Create necessary files
Copy-Item "src/404.html" -Destination "docs/"
New-Item -Path "docs/.nojekyll" -ItemType File -Force

# Add all files
git add -A
git commit -m "Deploy to GitHub Pages"

# Push to main branch
git push origin main 