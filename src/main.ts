import { join } from 'node:path'
import process from 'node:process'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import Sentry from '@sentry/node'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import Transport from 'winston-transport'
import { AppModule } from './app.module'
import 'reflect-metadata'
import './sentry'

const SentryWinstonTransport = Sentry.createSentryWinstonTransport(Transport, {
  levels: process.env.NODE_ENV === 'production' ? ['error', 'warn'] : ['error', 'warn', 'info', 'debug'],
})

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    logger: WinstonModule.createLogger({
      transports: [
        new SentryWinstonTransport(),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('WMF-Nest'),
          ),
        }),
      ],
      level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
    }),
  })

  app.use(cookieParser())

  app.enableCors({
    origin: process.env.ORIGIN_SERVER,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200,
    credentials: true,
    preflightContinue: false,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  })

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: {
        policy: 'cross-origin',
      },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          imgSrc: [
            `'self'`,
            'data:',
            'https:',
          ],
          scriptSrc: [
            `'self'`,
            `'unsafe-inline'`,
            'https://js.stripe.com',
            'https://m.stripe.network',
            'https://*.apollographql.com',
          ],
          manifestSrc: [
            `'self'`,
            'https://*.apollographql.com',
          ],
          frameSrc: [
            `'self'`,
            'https://js.stripe.com',
            'https://hooks.stripe.com',
            'https://m.stripe.network',
            'https://*.apollographql.com',
          ],
          connectSrc: [
            `'self'`,
            'https://api.stripe.com',
            'https://m.stripe.network',
            'https://uploads.stripe.com',
            'https://*.sentry.io',
            'wss://*.apollographql.com',
            'https://*.apollographql.com',
          ],
          styleSrc: [
            `'self'`,
            `'unsafe-inline'`,
            'https://fonts.googleapis.com',
          ],
          fontSrc: [
            `'self'`,
            'https://fonts.gstatic.com',
          ],
          objectSrc: [`'none'`],
          frameAncestors: [`'none'`],
          workerSrc: [`'self'`, 'blob:'],
          baseUri: [`'self'`],
          formAction: [`'self'`],
          ...(process.env.NODE_ENV === 'production' && {
            upgradeInsecureRequests: [],
          }),
        },
      },
      hsts: process.env.NODE_ENV === 'production'
        ? {
            maxAge: 31536000, // 1 year
            includeSubDomains: true,
            preload: true,
          }
        : false,
      xssFilter: true,
      noSniff: true,
      hidePoweredBy: true,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    }),
  )

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'emails'))
  app.setViewEngine('hbs')

  const PORT = process.env.PORT || 3000
  await app.listen(PORT)
}
bootstrap()
