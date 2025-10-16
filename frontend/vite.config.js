import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Plugin cho Tailwind CSS

// https://vitejs.dev/config/
export default defineConfig({
  // PHẦN PLUGINS: Chứa cả react và tailwindcss
  plugins: [react(), tailwindcss()],

  // PHẦN SERVER: Giữ nguyên cấu hình proxy
  server: {
    proxy: {
      // Cấu hình proxy cho tất cả các request bắt đầu bằng /api
      '/api': {
        // Chuyển tiếp những request này đến server backend của bạn
        target: 'http://localhost:5174', 
        
        // Thay đổi origin của header thành origin của target URL
        changeOrigin: true, 
      },
    },
  },
});