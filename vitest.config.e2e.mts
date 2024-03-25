import swc from 'unplugin-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.?(c|m)[jt]s?(x)'],
    globals: true,
    alias: {
      '@src': './src',
      '@test': './test',
    },
    root: './',
    globalSetup: ['./src/test/setup.ts'],
    fileParallelism: false,
    poolOptions: {
      threads: {
        singleThread: true
      }
    }
  },
  resolve: {
    alias: {
      '@src': './src',
      '@test': './test',
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
