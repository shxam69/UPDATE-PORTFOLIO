import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // ─────────────────────────────────────────────────────────────────
  // Build optimization for production
  // ─────────────────────────────────────────────────────────────────
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    // Target modern browsers for better performance
    target: 'esnext',
    
    // Optimize chunks
    rollupOptions: {
      output: {
        // Manual chunking strategy for better caching
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor';
            }
            if (id.includes('gsap')) {
              return 'animation';
            }
            if (id.includes('lenis') || id.includes('zustand')) {
              return 'utils';
            }
            return 'vendor';
          }
        },
      },
    },
    
    // Report file size
    reportCompressedSize: false,
    
    // Chunk size warnings
    chunkSizeWarningLimit: 800,
  },
  
  // ─────────────────────────────────────────────────────────────────
  // Dev server optimization
  // ─────────────────────────────────────────────────────────────────
  server: {
    // Enable HMR for fast refresh
    hmr: true,
  },
  
  // ─────────────────────────────────────────────────────────────────
  // Preview server (serves production build locally)
  // ─────────────────────────────────────────────────────────────────
  preview: {
    port: 4173,
  },
})
