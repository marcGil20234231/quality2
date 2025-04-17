# Create .nojekyll file to prevent GitHub Pages from using Jekyll
New-Item -Path ".nojekyll" -ItemType "file" -Force

# Copy all files from dist/quality/browser to the root directory
Copy-Item -Path "dist/quality/browser/*" -Destination "." -Recurse -Force

# Copy the 404.html file
Copy-Item -Path "src/404.html" -Destination "." -Force

Write-Host "Files copied successfully. Please commit and push to GitHub." 