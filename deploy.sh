#!/bin/bash

echo "🚀 Starting deployment process..."

# Build the React app
echo "📦 Building React app..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build files are in ./dist/"
    echo "🔗 Ready to deploy to SFTP server"
    echo ""
    echo "📋 Next steps:"
    echo "1. Open VS Code"
    echo "2. Install 'SFTP' extension by liximomo"
    echo "3. Right-click on 'dist' folder"
    echo "4. Select 'Upload Project'"
    echo "5. Choose the '365' SFTP configuration"
    echo ""
    echo "🌐 Your site will be live at: http://72.167.58.121"
else
    echo "❌ Build failed! Please check for errors."
fi
