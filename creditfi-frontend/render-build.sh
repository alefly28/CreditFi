#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

# Copy the build directory to the Render static site directory
cp -a build/. /opt/render/project/src/public/ 