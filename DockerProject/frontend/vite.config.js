import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // allow access from container
    port: 5173,
    proxy: {
      // Browser calls /api/... on the same origin (localhost:5173)
      // Vite forwards to FastAPI service on the Docker network
      '/api': {
        target: 'http://backend:8000', // <-- service name from docker-compose
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})