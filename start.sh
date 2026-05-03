#!/bin/bash
echo "🚀 Starting Developer Productivity Dashboard..."
echo ""
echo "Clearing cache..."
rm -rf node_modules/.cache 2>/dev/null
echo "✓ Cache cleared"
echo ""
echo "Starting development server..."
echo "📍 Dashboard will open at http://localhost:3000"
echo ""
npm start
