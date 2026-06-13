import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'src/main.jsx',
        kds: 'kds.html',
        booking: 'booking.html',
        menu: 'menu.html',
        'customer-login': 'customer-login.html',
      },
    },
  },
})
