import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// El index.html de la raíz es el que se publica (el hosting apunta a la raíz
// del proyecto), así que sus tags apuntan al compilado con nombre fijo:
const PROD_SCRIPT_TAG =
  /[ \t]*<script[^>]*src="\.?\/?dist\/assets\/index\.js"[^>]*>\s*<\/script>[ \t]*\r?\n?/g;
const PROD_CSS_TAG =
  /[ \t]*<link[^>]*href="\.?\/?dist\/assets\/index\.css"[^>]*>[ \t]*\r?\n?/g;
const DEV_SCRIPT_TAG = '<script type="module" src="/src/index.js"></script>';

// Mientras Vite procesa el HTML (dev y build) esos tags no se pueden resolver:
//  - dev  -> se carga /src/index.js y el CSS entra por el import de JS.
//  - build-> /src/index.js es el entry real que Vite empaqueta en
//             assets/index.js, y Vite inyecta solo el <link> del CSS en
//             dist/index.html. El index.html de la raíz no se modifica.
function publishedRootIndex() {
  return {
    name: 'published-root-index',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(PROD_SCRIPT_TAG, DEV_SCRIPT_TAG).replace(PROD_CSS_TAG, '');
      },
    },
  };
}

export default defineConfig({
  // Rutas relativas: el compilado funciona en la raíz del dominio,
  // en un subdirectorio (https://user.github.io/repo/) o en un /subcarpeta/.
  base: './',
  plugins: [vue(), publishedRootIndex()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // 'cjs' en vez de 'es': un <script> clásico no está sujeto a CORS, así que
        // el index.html también funciona abriendo el archivo con file:// (doble clic).
        // No usar 'iife': Vite solo emite el .css aparte con formatos 'es'/'cjs'
        // (con iife inyecta el CSS por JS y no genera assets/index.css).
        format: 'cjs',
        // Un solo archivo: el index.html publicado no tiene que adivinar chunks.
        inlineDynamicImports: true,
        // Nombres fijos, sin hash, para que el HTML publicado siempre los encuentre.
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (asset) => {
          const name = asset.names?.[0] ?? 'asset';
          if (name.endsWith('.css')) return 'assets/[name][extname]';
          if (/\.(png|jpe?g|gif|svg|webp|avif|ico)$/.test(name)) return 'assets/img/[name][extname]';
          if (/\.(woff2?|ttf|otf|eot)$/.test(name)) return 'assets/fonts/[name][extname]';
          return 'assets/[name][extname]';
        },
      },
    },
  },
});
