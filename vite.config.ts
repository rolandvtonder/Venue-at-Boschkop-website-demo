import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';

// One HTML file per page, so every section has its own real URL
// (/venue/, /events/ …) and works on any static host without rewrites.
const page = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  // GitHub Pages serves the site from /<repo-name>/; the deploy workflow sets
  // BASE_PATH. Locally and on a root domain it stays '/'.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        home: page('index.html'),
        venue: page('venue/index.html'),
        events: page('events/index.html'),
        gallery: page('gallery/index.html'),
        packages: page('packages/index.html'),
        contact: page('contact/index.html'),
      },
    },
  },
});
