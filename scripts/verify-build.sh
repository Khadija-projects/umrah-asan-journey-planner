#!/bin/bash
echo "=== Verifying Build ==="
[ -d "dist/assets" ] || {
  echo "❌ Error: Missing assets folder!"
  echo "Current files:"
  ls -R dist
  exit 1
}
echo "✅ Assets found in dist/"
