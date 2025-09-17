import { resolve } from 'node:path'
import process from 'node:process'
import swc from 'unplugin-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.?(c|m)[jt]s?(x)'],
    root: './',
    isolate: false,
    globals: true,
    globalSetup: './src/test/globalSetup_e2e.ts',
    setupFiles: [
      './src/test/integrationTestAdminSetup.ts',
      // './src/test/integrationTestUserSetup.ts',
    ],
    // fileParallelism: false,
    // maxConcurrency: 1,
    pool: 'forks',
    poolOptions: {
      threads: {
        singleThread: true,
      },
      forks: {
        singleFork: true,
      },
    },
    server: {
      deps: {
        fallbackCJS: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': './src',
      '@src': './src',
      '@test': './test',
    },
  },
  plugins: [
    tsconfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
