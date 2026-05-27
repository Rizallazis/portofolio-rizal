import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Menggunakan '/' karena Anda menggunakan custom domain utama (https://rizalazis.xyz/)
})
