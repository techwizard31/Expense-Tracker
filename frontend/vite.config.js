import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all interfaces
    port: 5173,      // Default port for Vite
    strictPort: true, // Fail if port 5173 is not available
    historyApiFallback: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      // customize Rollup options
    }
  }
})
