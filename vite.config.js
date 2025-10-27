import process from 'node:process'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: true, // Source map generation must be turned on
  },
  plugins: [
    // Put the Sentry vite plugin after all other plugins
    sentryVitePlugin({
      authToken: process.env.NODE_ENV === 'production' ? process.env.SENTRY_AUTH_TOKEN : undefined,
      org: 'diatonic-web-design-and-develo',
      project: 'wmf-nest',
    }),
  ],
})
