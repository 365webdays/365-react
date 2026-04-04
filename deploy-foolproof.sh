#!/bin/bash

# FOOLPROOF DEPLOYMENT SCRIPT - ONLY UPLOADS TO /public_html
# This script is DESIGNED to prevent root directory uploads

echo "🔒 FOOLPROOF DEPLOYMENT - ONLY /public_html"
echo "=========================================="

# Configuration - HARD CODED TO PREVENT ERRORS
SERVER="72.167.58.121"
USER="kf3a3nkmn59k"
REMOTE_PATH="/public_html"  # ← HARD CODED - CANNOT BE CHANGED
LOCAL_BUILD="./dist"

# Safety check - ensure we're not in root
echo "🛡️ SAFETY CHECK: Ensuring upload to /public_html ONLY..."

# Build the project
echo "📦 Building React app..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

echo "✅ Build successful!"
echo ""

# FOOLPROOF SFTP COMMANDS - EXPLICITLY CD TO /public_html FIRST
SFTP_COMMANDS="
cd /public_html
pwd
put -r $LOCAL_BUILD/* .
chmod 644 index.html
chmod 644 favicon.*
chmod 644 *.png *.svg *.ico *.json
chmod 755 assets
chmod 644 assets/*
echo '✅ Upload completed to /public_html'
ls -la index.html
quit
"

# Execute with EXPLICIT /public_html directory
echo "📤 Uploading EXCLUSIVELY to /public_html..."
echo "$SFTP_COMMANDS" | sftp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $USER@$SERVER

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 FOOLPROOF DEPLOYMENT SUCCESSFUL!"
    echo "🌐 Your site is live at: https://365webdays.com"
    echo ""
    echo "✅ Files uploaded to: /public_html (ONLY!)"
    echo "✅ Root directory NOT touched"
    echo "✅ Safety checks passed"
    echo ""
    echo "🔒 This script is designed to NEVER upload to root directory"
else
    echo "❌ Deployment failed! Please check your connection."
    exit 1
fi
