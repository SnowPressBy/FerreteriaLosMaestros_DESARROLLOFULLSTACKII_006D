// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite que se pueda ver desde tu navegador fuera de AWS
    port: 5175       // O el puerto que estés usando (por defecto 5173 o 5175)
  }
})