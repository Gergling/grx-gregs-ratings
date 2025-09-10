import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  // base: '/gregs-ratings/'
  resolve: {
    alias: {
      '@gergling/ui-components': resolve(__dirname, '../gds-gergling-design-system/ui-components/src'),
    },
  },
});
