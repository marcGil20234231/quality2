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
ng build --configuration production --base-href=/quality2/

# Copy 404.html
echo "Copying 404.html..."
cp dist/quality/index.html dist/quality/404.html

# Deploy to GitHub Pages
echo "Deploying to GitHub Pages..."
npx angular-cli-ghpages --dir=dist/quality --branch gh-pages --message "Deploy: $(date)" --no-silent

echo "Deployment completed!"
echo "Please wait a few minutes, then visit: https://marcgil2023423.github.io/quality2/" 