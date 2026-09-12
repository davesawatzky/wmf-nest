import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  test: {
    environment: 'node',
    globals: false,
    include: ['./src/**/*.spec.?(c|m)[jt]s?(x)'],
    exclude: ['./src/**/*.e2e-spec.?(c|m)[jt]s?(x)'],
    root: './',
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
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
