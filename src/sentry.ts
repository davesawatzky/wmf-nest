import process from 'node:process'
import * as Sentry from '@sentry/nestjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
  integrations: [
    // send console.log, console.warn, and console.error calls as logs to Sentry
    Sentry.consoleLoggingIntegration({ levels: ['log', 'warn', 'error'] }),
  ],
  // Enable logs to be sent to Sentry
  enableLogs: true,
})
