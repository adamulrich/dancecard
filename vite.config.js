// vite.config.js
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

import { defineConfig } from 'vite';


export default defineConfig({
  exclude: [ resolve(__dirname, 'node_modules') ],
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, './src/partials'),
    }),
  ],

  root: './src',

  build: {
      minify: false,
      outDir: '../dist',
      rollupOptions: {
          input: {
          account: resolve(__dirname, './src/account.html'),
          home: resolve(__dirname, './src/index.html'),
          schedule: resolve(__dirname, './src/schedule.html'),
          sign_in: resolve(__dirname, './src/sign_in.html'),
          stake_lookup: resolve(__dirname, './src/stake_lookup.html'),
          
          account_js: resolve(__dirname, './src/scripts/account.js'),
          constants_js: resolve(__dirname, './src/scripts/constants.js'),
          external_service_mjs: resolve(__dirname, './src/scripts/external_services.mjs'),
          home_js: resolve(__dirname, './src/scripts/index.js'),
          schedule_js: resolve(__dirname, './src/scripts/schedule.js'),
          stake_lookup_js: resolve(__dirname, './src/scripts/stake_lookup.js'),
          utils_mjs: resolve(__dirname, './src/scripts/utils.mjs'),

          // partial_aside: resolve(__dirname, '/partials/aside.html'),
          // partial_footer: resolve(__dirname, '/partials/footer.html'),
          // partial_head: resolve(__dirname, '/partials/head.html'),
          // partial_header: resolve(__dirname, '/partials/header.html'),

          },
      },
  },

});
