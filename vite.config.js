// vite.config.js
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

import {
  defineConfig
} from 'vite';

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, './partials'),
    }),
  ],

  build: {
      minify: false,
      outDir: '../dist',
      rollupOptions: {
          input: {
          account: resolve(__dirname, 'account.html'),
          home: resolve(__dirname, 'index.html'),
          schedule: resolve(__dirname, 'schedule.html'),
          sign_in: resolve(__dirname, 'sign_in.html'),
          stake_lookup: resolve(__dirname, 'stake_lookup.html'),
          
          constants_js: resolve(__dirname, 'scripts/constants.js'),
          external_service_mjs: resolve(__dirname, 'scripts/external_services.mjs'),
          home_js: resolve(__dirname, 'scripts/index.js'),
          schedule_js: resolve(__dirname, 'scripts/schedule.js'),
          stake_lookup_js: resolve(__dirname, 'scripts/stake_lookup.js'),
          utils_mjs: resolve(__dirname, 'scripts/utils.mjs'),

          // partial_aside: resolve(__dirname, '/partials/aside.html'),
          // partial_footer: resolve(__dirname, '/partials/footer.html'),
          // partial_head: resolve(__dirname, '/partials/head.html'),
          // partial_header: resolve(__dirname, '/partials/header.html'),

          },
      },
  },

});
