#!/bin/bash

echo "🔍 Testing SFTP upload path configuration..."
echo ""

# First, build the app
echo "📦 Building React app..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📋 Testing upload path:"
    echo "Source: ./dist/*"
    echo "Target: /public_html/"
    echo ""
    echo "🔍 This will upload CONTENTS of dist folder directly to public_html root"
    echo ""
    echo "Expected structure on server:"
    echo "/public_html/"
    echo "├── index.html"
    echo "├── assets/"
    echo "│   ├── index-abc123.js"
    echo "│   └── index-def456.css"
    echo "└── ... other build files"
    echo ""
    echo "❌ NOT this structure:"
    echo "/public_html/"
    echo "└── dist/"
    echo "    ├── index.html"
    echo "    └── assets/"
    echo ""
    echo "🚀 Ready for deployment! Use VS Code SFTP extension to upload."
else
    echo "❌ Build failed!"
fi
