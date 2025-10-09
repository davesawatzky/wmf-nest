import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import swc from 'unplugin-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.?(c|m)[jt]s?(x)'],
    root: './',
    isolate: false,
    globals: true,
    globalSetup: './src/test/globalSetup_e2e.ts',
    setupFiles: [
      './src/test/integrationTestSetup.ts',
    ],
    // Use threads pool for UI compatibility (forks don't work well with UI)
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    server: {
      deps: {
        fallbackCJS: true,
      },
    },
    ui: true,
    open: true, // Set to false to prevent auto-opening, manually navigate to URL
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@src': resolve(__dirname, 'src'),
      '@test': resolve(__dirname, 'test'),
    },
  },
  plugins: [
    tsconfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
