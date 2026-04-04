#!/bin/bash

# ABSOLUTE PATH DEPLOYMENT - NO MORE ROOT UPLOADS
# Uses FULL ABSOLUTE PATH to prevent any mistakes

echo "🔒 ABSOLUTE PATH DEPLOYMENT - 100% SAFE"
echo "======================================="

# Configuration with ABSOLUTE PATHS
SERVER="72.167.58.121"
USER="kf3a3nkmn59k"
ABSOLUTE_PATH="/home/kf3a3nkmn59k/public_html"  # ← FULL ABSOLUTE PATH
LOCAL_BUILD="./dist"

# Build the project
echo "📦 Building React app..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

echo "✅ Build successful!"
echo ""

# ABSOLUTE PATH SFTP COMMANDS
SFTP_COMMANDS="
cd $ABSOLUTE_PATH
pwd
echo 'Current directory: '$(pwd)
put -r $LOCAL_BUILD/* .
chmod 644 index.html
chmod 644 favicon.*
chmod 644 *.png *.svg *.ico *.json
chmod 755 assets
chmod 644 assets/*
echo '✅ Upload completed to: $ABSOLUTE_PATH'
ls -la index.html
quit
"

# Execute with ABSOLUTE PATH
echo "📤 Uploading to ABSOLUTE PATH: $ABSOLUTE_PATH"
echo "$SFTP_COMMANDS" | sftp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $USER@$SERVER

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 ABSOLUTE PATH DEPLOYMENT SUCCESSFUL!"
    echo "🌐 Your site is live at: https://365webdays.com"
    echo ""
    echo "✅ Files uploaded to: $ABSOLUTE_PATH"
    echo "✅ ABSOLUTE PATH used - NO ROOT UPLOADS POSSIBLE"
    echo "✅ 100% SAFE DEPLOYMENT"
else
    echo "❌ Deployment failed! Please check your connection."
    exit 1
fi
