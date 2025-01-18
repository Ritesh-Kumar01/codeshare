// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 5173
  },
  optimizeDeps: {
    exclude: ['firebase', 'firebase/app', 'firebase/database', 'firebase/auth']
  }
});