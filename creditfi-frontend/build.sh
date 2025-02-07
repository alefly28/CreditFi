#!/usr/bin/env bash

# Exit on error
set -e

echo "Starting build process..."

echo "Installing dependencies..."
npm install --legacy-peer-deps

echo "Building the project..."
CI=false npm run build

echo "Build completed successfully!" 