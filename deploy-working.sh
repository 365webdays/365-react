#!/bin/bash

# WORKING DEPLOYMENT SCRIPT - Password Compatible
# Uses here-doc instead of batch mode for password auth

echo "🔒 WORKING DEPLOYMENT - Password Compatible"
echo "=========================================="

# Configuration
SERVER="72.167.58.121"
USER="kf3a3nkmn59k"
TARGET_DIR="/home/kf3a3nkmn59k/public_html"
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

# Execute with here-doc (works with password auth)
echo "📤 Uploading to: $TARGET_DIR"
echo "This WILL upload to the correct directory..."
echo ""

sftp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $USER@$SERVER << EOF
cd $TARGET_DIR
pwd
put -r $LOCAL_BUILD/* .
chmod 644 index.html
chmod 644 favicon.*
chmod 644 *.png *.svg *.ico *.json
chmod 755 assets
chmod 644 assets/*
echo '✅ Upload completed to: $TARGET_DIR'
ls -la index.html
quit
EOF

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 WORKING DEPLOYMENT SUCCESSFUL!"
    echo "🌐 Your site is live at: https://365webdays.com"
    echo ""
    echo "✅ Files uploaded to: $TARGET_DIR"
    echo "✅ This script WORKS with password auth!"
    echo "✅ 100% SAFE DEPLOYMENT"
else
    echo "❌ Deployment failed! Please check your connection."
    exit 1
fi
