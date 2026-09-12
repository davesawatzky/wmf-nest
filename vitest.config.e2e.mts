import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  test: {
    include: ['./src/**/*.e2e-spec.?(c|m)[jt]s?(x)'],
    environment: 'node',
    root: './',
    isolate: false,
    globals: false,
    globalSetup: './src/test/globalSetup_e2e.ts',
    setupFiles: ['./src/test/integrationTestSetup.ts'],
    pool: 'threads',
    fileParallelism: false,
    server: {
      deps: {
        fallbackCJS: true,
      },
    },
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      '@': resolve(__dirname, 'src'),
      '@src': resolve(__dirname, 'src'),
      '@test': resolve(__dirname, 'test'),
    },
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
