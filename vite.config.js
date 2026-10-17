import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === '365webdays_web_design_development.png') {
            return '365webdays_web_design_development.png';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
})
