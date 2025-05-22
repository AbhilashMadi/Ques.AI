import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsConfigPathsPlugin from 'vite-tsconfig-paths'
import tailwindVitePlugin from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsConfigPathsPlugin(),
    tailwindVitePlugin()
  ],
  server: {
    open: true,
    port: 3000,
  },
})
