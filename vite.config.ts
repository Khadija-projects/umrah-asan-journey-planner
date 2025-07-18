import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  // Critical GitHub Pages configuration
  base: '/umrah-asan-journey-planner/',
  
  server: {
    host: true,
    port: 8080,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    
    // Absolute path handling for GitHub Pages
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
      },
    },
    
    // Cache busting
    manifest: true,
  },

  // Force absolute paths in HTML
  experimental: {
    renderBuiltUrl(filename) {
      return '/umrah-asan-journey-planner/' + filename;
    },
  },
});
