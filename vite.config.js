import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  // Define a base URL para o aplicativo quando ele for implantado em um subdiretório.
  // O process.env.NODE_ENV === 'production' garante que 'base' seja usado apenas
  // na build de produção (para o GitHub Pages).
  base: process.env.NODE_ENV === 'production' ? '/tasknexus-frontend/' : '/',
  plugins: [react()],
  build: {
    outDir: 'dist', // Diretório de saída para os arquivos de build
    assetsDir: 'assets', // Subdiretório para ativos como imagens, CSS, JS
    rollupOptions: {
      output: {
        // Garante que os nomes dos arquivos de saída sejam consistentes.
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
});
