# Build the application
ng build --configuration production --base-href /quality2/

# Create necessary files
Copy-Item "src/404.html" -Destination "dist/quality/"
New-Item -Path "dist/quality/.nojekyll" -ItemType File -Force

# Initialize and switch to gh-pages branch
git checkout --orphan gh-pages
git reset --hard

# Copy contents from dist/quality
Copy-Item "dist/quality/*" -Destination "." -Recurse -Force

# Add all files
git add -A
git commit -m "Deploy to GitHub Pages"

# Force push to gh-pages branch
git push origin gh-pages --force

# Switch back to main branch
git checkout main 