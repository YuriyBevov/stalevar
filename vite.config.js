import Inspect from 'vite-plugin-inspect';
import vituum from 'vituum';
import pug from '@vituum/vite-plugin-pug';
import pages from 'vituum/plugins/pages.js';
import imports from 'vituum/plugins/imports.js';
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { resolve } from 'path';
import { defineConfig } from 'vite';

import { getFileName } from './app.config';

const MODE = process.env.NODE_ENV || 'development';

export default defineConfig({
  plugins: [
    Inspect(),
    vituum(),
    pug({
      options: {
        pretty: true
      }
    }),
    imports({
      paths: [
        '/src/assets/*/**'
      ]
    }),
    pages({
      dir: './',
      root: './',
      normalizeBasePath: true
    }),
    VitePluginSvgSpritemap('./src/assets/sprite/*.svg', {
      styles: false,
      injectSVGOnDev: true,
      svgo: {
        plugins: [
          {
            name: 'removeStyleElement',
          },
          {
            name: 'removeAttrs',
            params: {
              attrs: '(fill|height|width)',
            },
          }
        ],
      },
    }),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|svg)$/i,
      includePublic: true,
      logStats: true,
      ansiColors: true,
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupNumericValues: false,
                convertPathData: {
                  floatPrecision: 2,
                  forceAbsolutePath: false,
                  utilizeAbsolute: false,
                },
                removeViewBox: false, // https://github.com/svg/svgo/issues/1128
                cleanupIds: false,
              },
            },
          },
          'removeDimensions',
        ],
      },
      png: {
        // https://sharp.pixelplumbing.com/api-output#png
        quality: 80,
        palette: true
      },
      jpeg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 80,
        progressive: true
      },
      jpg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 80,
        progressive: true
      },
      // Cache assets in cacheLocation. When enabled, reads and writes asset files with their hash suffix from the specified path.
      cache: true,
      cacheLocation: './.cache',
    })
  ],

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern'
      }
    },
  },

  publicDir: 'public',
  root: './src',
  build: {
    minify: false, // not for PUG
    outDir: '../dist',
    emptyOutDir: true,
    // cssCodeSplit: true,
    rollupOptions: {
      input: [
        '_bx-templates/**/*.{pug,html}',
        '*.{pug,html,js}',
			],
			output: {
				assetFileNames: getFileName,
			},
    }
  },

  base: './',
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@assets': resolve(__dirname, './src/assets'),
      '@styles': resolve(__dirname, './src/styles'),
      '@pug': resolve(__dirname, './src/pug'),
      '@img': resolve(__dirname, './src/assets/img')
    }
  }
});

