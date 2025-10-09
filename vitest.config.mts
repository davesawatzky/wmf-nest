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
    environment: 'node',
    globals: true,
    alias: {
      '@src': resolve(__dirname, 'src'),
      '@test': resolve(__dirname, 'test'),
    },
    root: './',
    // fileParallelism: false,
    // maxConcurrency: 1,
    ui: true,
    open: true,
  },
  resolve: {
    alias: {
      '@src': resolve(__dirname, 'src'),
      '@test': resolve(__dirname, 'test'),
    },
  },
  plugins: [
    tsconfigPaths(),
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'es6' },
    }),
  ],
})
