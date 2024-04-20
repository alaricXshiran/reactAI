import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Import react as default
import path from 'path'; // Import the path module

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // Adjust the path as necessary
      '@/pages': path.resolve(__dirname, 'src/pages/')
    }
  }
});