#!/bin/sh

# Build the project
ng build --configuration production

# Deploy to GitHub Pages
npx angular-cli-ghpages --dir=dist/quality

echo "Deployment completed! Your site should be available at https://[your-github-username].github.io/quality/" 