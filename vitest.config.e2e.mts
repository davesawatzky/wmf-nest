import swc from 'unplugin-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.?(c|m)[jt]s?(x)'],
    alias: {
      '@src': './src',
      '@test': './test',
    },
    root: './',
    isolate: false,
    globals: true,
    globalSetup: ['./src/test/globalSetup_e2e.ts'],
    setupFiles: [
      './src/test/integrationTestAdminSetup.ts',
      // './src/test/integrationTestUserSetup.ts'
    ],
    fileParallelism: false,
    pool: 'forks',
    poolOptions: {
      threads: {
        singleThread: true
      },
      forks: {
        singleFork: true
      }
    },
    server: {
      deps: {
        fallbackCJS: true
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
