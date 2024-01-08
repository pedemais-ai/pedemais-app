#!/bin/bash

set -e # Exit immediately if any command exits with a non-zero status

DEPLOY_LOG="deploy.log"

# Redirect all output to the log file with date and time
exec > >(while read -r line; do echo "$(date +'%Y-%m-%d %H:%M:%S') $line"; done | tee -a "$DEPLOY_LOG") 2>&1

echo "Deploying at $(date)..."

# Display current Git branch
echo "Deploying from branch: $(git branch --show-current)"

# Pull the latest changes from Git
echo "Pulling the latest changes from Git..."
git pull

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install

# Cleanup previous builds
echo "Cleaning up previous builds..."
rm -rf .next

# Generate prisma client
echo "Generating prisma client..."
prisma migrate deploy

# Run database migrations
echo "Running database migrations..."
prisma migrate deploy

# Load environment variables
echo "Loading environment variables..."
npm run build

# Restart the PM2 process
echo "Restarting the PM2 process..."
pm2 restart next-js

echo "Deployment completed successfully."
