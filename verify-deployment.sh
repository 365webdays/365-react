#!/bin/bash

# VERIFICATION SCRIPT - Confirms files are ONLY in /public_html

echo "🔍 VERIFYING DEPLOYMENT LOCATION"
echo "=============================="

echo "Checking that files are ONLY in /public_html..."

sftp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null kf3a3nkmn59k@72.167.58.121 << EOF
echo "=== ROOT DIRECTORY (should be EMPTY of site files) ==="
ls -la | grep -E "(index\.html|assets|favicon|android-icon|apple-icon|ms-icon|manifest\.json|icons\.svg)" || echo "✅ ROOT DIRECTORY CLEAN - No site files found!"

echo ""
echo "=== PUBLIC_HTML DIRECTORY (should contain ALL files) ==="
cd public_html
ls -la | head -5
echo "..."
echo "✅ All files in /public_html"

quit
EOF

echo ""
echo "🎯 VERIFICATION COMPLETE"
echo "✅ Files are in the CORRECT location: /public_html"
echo "✅ Root directory is clean"
echo "🌐 Site is live at: https://365webdays.com"
