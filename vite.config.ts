import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/grx-gregs-ratings/',
  plugins: [react()],
});
