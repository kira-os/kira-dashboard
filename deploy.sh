#!/bin/bash

# Deployment script for Kira Dashboard
# This script builds and prepares the dashboard for deployment

echo "🚀 Starting Kira Dashboard deployment..."

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"
echo ""
echo "📁 Build output available in: dist/"
echo ""
echo "📋 Deployment options:"
echo "   1. GitHub Pages (via workflow)"
echo "   2. Vercel (requires vercel CLI)"
echo "   3. Netlify (requires netlify CLI)"
echo ""
echo "📝 To deploy manually:"
echo "   - Copy contents of dist/ to your hosting provider"
echo "   - Or push to main branch to trigger GitHub Pages workflow"
echo ""
echo "🔗 GitHub Repository: https://github.com/kira-os/kira-dashboard"
echo "📊 Live dashboard will be available at: https://kira-os.github.io/kira-dashboard/"