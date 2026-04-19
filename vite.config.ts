import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {}
    },
    plugins: [react()],
    define: {
      'process.env.VITE_FB_PAGE_ID': JSON.stringify(env.VITE_FB_PAGE_ID),
      'process.env.VITE_FB_ACCESS_TOKEN': JSON.stringify(env.VITE_FB_ACCESS_TOKEN)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
