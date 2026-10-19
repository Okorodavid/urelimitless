import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // React is aliased to Preact's compat layer: same API, about a fifth of the download.
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react-dom/client': 'preact/compat/client',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
  server: { port: 5173, strictPort: true },
  build: {
    rollupOptions: {
      output: {
        advancedChunks: {
          groups: [
            { name: 'react', test: /node_modules[\/](preact|react|react-dom|scheduler)[\/]/ },
            { name: 'motion', test: /node_modules[\/](motion|framer-motion|motion-dom|motion-utils)[\/]/ },
          ],
        },
      },
    },
  },
})
