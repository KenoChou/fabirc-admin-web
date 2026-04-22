import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/__proxy_auth_token': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/__proxy_auth_token/, ''),
        router: (req) => {
          const target = req.headers['x-proxy-target'];
          if (typeof target === 'string' && /^https?:\/\//.test(target)) {
            return target;
          }
          return 'http://localhost:8080';
        },
      },
    },
  },
});
