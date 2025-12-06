import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Importante para el build en Vercel
  build: {
    outDir: "dist",
    sourcemap: false, // Desactiva en producción para mejor performance
    rollupOptions: {
      output: {
        manualChunks: undefined, // Para un solo bundle
      },
    },
  },

  // Esto ayuda en desarrollo pero también es buena práctica
  server: {
    historyApiFallback: true,
  },
});
