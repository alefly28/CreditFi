#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
npm install

# Build the project
npm run build

# Move build files to the right location
mv build/* . 