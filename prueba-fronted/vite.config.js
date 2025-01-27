import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.test.interactiva.net.co', // URL de tu API
        changeOrigin: true,
        secure: false, // Usa `false` si la API usa HTTPS con un certificado autofirmado
      },
    },
  },
})
