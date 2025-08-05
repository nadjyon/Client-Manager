import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Config sem usar "path" nem "__dirname"
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Isso funciona direto com Vite
    },
  },
});

