#!/bin/bash

# 365Webdays Secure Deployment Script
# Always uploads to the correct /public_html directory

echo "🚀 365Webdays Deployment Script"
echo "================================"

# Configuration
SERVER="72.167.58.121"
USER="kf3a3nkmn59k"
REMOTE_PATH="/public_html"
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

# Upload to correct location
echo "📤 Uploading to $REMOTE_PATH..."
echo "Server: $SERVER"
echo "User: $USER"
echo "Remote Path: $REMOTE_PATH"
echo ""

# Create SFTP commands
SFTP_COMMANDS="
cd $REMOTE_PATH
put -r $LOCAL_BUILD/* .
chmod 644 index.html
chmod 644 favicon.*
chmod 644 *.png *.svg *.ico *.json
chmod 755 assets
chmod 644 assets/*
ls -la index.html
quit
"

# Execute SFTP
echo "$SFTP_COMMANDS" | sftp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $USER@$SERVER

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo "🌐 Your site is live at: https://365webdays.com"
    echo ""
    echo "✅ Files uploaded to: $REMOTE_PATH"
    echo "✅ Permissions set correctly"
    echo "✅ All systems ready"
else
    echo "❌ Deployment failed! Please check your connection."
    exit 1
fi
