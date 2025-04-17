#!/bin/sh

echo "Starting deployment process..."

# Clean previous build
echo "Cleaning previous build..."
rm -rf dist

# Install dependencies if needed
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
ng build --configuration production

# Ensure correct base href in all HTML files
echo "Updating base href in HTML files..."
find dist/quality -name "*.html" -exec sed -i 's|<base href="[^"]*">|<base href="/quality2/">|g' {} +

# Create .nojekyll file
echo "Creating .nojekyll file..."
touch dist/quality/.nojekyll

# Create CNAME file if needed
echo "Creating CNAME file..."
echo "marcgil2023423.github.io" > dist/quality/CNAME

# Deploy to GitHub Pages
echo "Deploying to GitHub Pages..."
npx angular-cli-ghpages --dir=dist/quality \
  --branch=gh-pages \
  --repo=https://github.com/marcgil2023423/quality2.git \
  --name="GitHub Pages Deploy" \
  --email="" \
  --no-silent

echo "Deployment completed!"
echo "Please wait a few minutes, then visit: https://marcgil2023423.github.io/quality2/" 