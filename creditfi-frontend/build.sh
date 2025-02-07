#!/usr/bin/env bash

# Exit on error
set -e

echo "Starting build process..."

# Navigate to frontend directory if not already there
if [[ ! -f "package.json" ]]; then
  cd creditfi-frontend
fi

echo "Installing dependencies..."
npm install --legacy-peer-deps

echo "Building the project..."
CI=false npm run build

echo "Moving build files..."
if [[ -d "build" ]]; then
  cp -r build/* .
else
  echo "Build directory not found!"
  exit 1
fi

echo "Build completed successfully!" 