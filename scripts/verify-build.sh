#!/bin/bash
if [ ! -f "dist/index.html" ]; then
  echo "❌ Error: Missing index.html"
  exit 1
fi
if [ ! -d "dist/assets" ]; then
  echo "❌ Error: Missing assets folder"
  exit 1
fi
echo "✅ Build verified"
