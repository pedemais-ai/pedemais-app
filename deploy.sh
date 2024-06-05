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

# Re-build and start containers
echo "Building containers"
docker-compose -f docker-compose.prod.yml up -d --build

echo "Deployment completed successfully."
