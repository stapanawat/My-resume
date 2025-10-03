import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'   // ← เพิ่มบรรทัดนี้

export default defineConfig({
  plugins: [react(), tailwindcss()],          // ← และเพิ่มที่นี่
})
