import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'HoneyPot',
        short_name: 'HoneyPot',
        description: 'HoneyPot Savings Tracker App',
        theme_color: '#FFFCF7',
        background_color: '#FFFCF7',
        display: 'standalone',
        icons: [
          {
            src: '/honeypot/logo2.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    hmr: {
      clientPort: 5173,
    },
  },
})
