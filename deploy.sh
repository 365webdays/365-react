#!/bin/bash

echo "🚀 Starting deployment process..."

# Build React app
echo "📦 Building React app..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build files are in ./dist/"
    echo ""
    echo "🚀 Uploading to server..."
    
    # Upload files using SFTP
    sftp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null kf3a3nkmn59k@72.167.58.121 << EOF
        cd /home/kf3a3nkmn59k/public_html
        put -r dist/* ./
        ls -la | head -5
        echo "✅ Upload completed!"
        quit
EOF
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 DEPLOYMENT SUCCESSFUL!"
        echo "🌐 Site is live at: https://365webdays.com"
        echo "📂 Files uploaded to: /public_html/"
    else
        echo "❌ Upload failed! Please check SFTP connection."
    fi
else
    echo "❌ Build failed! Please check for errors."
fi
