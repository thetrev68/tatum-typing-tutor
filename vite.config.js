import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const pwaManifest = {
  name: "Tatum's Typing Adventure",
  short_name: 'Tatum Typing',
  description: 'A cozy typing and sight-reading adventure for kids that runs great on Chromebooks and offline.',
  id: '/tatum-typing-tutor/',
  start_url: '/tatum-typing-tutor/',
  scope: '/tatum-typing-tutor/',
  display: 'standalone',
  display_override: ['standalone', 'browser'],
  background_color: '#fff7ed',
  theme_color: '#f97316',
  orientation: 'portrait',
  categories: ['education', 'games', 'kids'],
  icons: [
    {
      src: 'icons/icon-192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: 'icons/icon-512.png',
      sizes: '512x512',
      type: 'image/png',
    },
    {
      src: 'icons/icon-512-maskable.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
  ],
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: pwaManifest,
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  base: '/tatum-typing-tutor/',
})
