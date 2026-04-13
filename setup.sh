#!/bin/bash

# Design System Tokens - Setup Checklist & Installation Script

set -e

echo "🎨 Design System Tokens - Setup"
echo "================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed"
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js $(node --version) found"

# Install dependencies
if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 Installing dependencies..."
    npm install
    echo "✓ Dependencies installed"
fi

# Build tokens
echo ""
echo "🔨 Building tokens..."
npm run build
echo "✓ Tokens built successfully"

# Validate
echo ""
echo "✓ Validating tokens..."
npm run validate

echo ""
echo "================================"
echo "✨ Setup Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Review generated files:"
echo "   - dist/tokens.css (CSS custom properties)"
echo "   - dist/tokens.json (JSON format)"
echo "   - dist/tokens.js (JavaScript module)"
echo ""
echo "2. Use in your projects:"
echo "   CSS:  @import './dist/tokens.css';"
echo "   JS:   import tokens from './dist/tokens.js';"
echo ""
echo "3. Watch for changes:"
echo "   npm run dev"
echo ""
echo "4. Add new tokens:"
echo "   Edit tokens/ files and run: npm run build"
echo ""
echo "5. Extract from Figma:"
echo "   npm run extract-figma"
echo ""
echo "Documentation:"
echo "  - Quick Start: QUICKSTART.md"
echo "  - Full Guide: README.md"
echo "  - Contributing: CONTRIBUTING.md"
echo "  - Setup Details: SETUP.md"
echo ""
