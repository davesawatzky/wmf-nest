import { join } from 'node:path'
import process from 'node:process'
import { ConsoleLogger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { AppModule } from './app.module'
import 'reflect-metadata'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    logger: new ConsoleLogger({
      prefix: 'WMF-Server',
      logLevels: process.env.NODE_ENV === 'production' ? ['warn', 'error'] : ['log', 'debug', 'warn', 'error'],
    }),
  })

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            `'self'`,
            'data:',
            'https://*.stripe.com',
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          scriptSrc: [`'self'`, 'https://js.stripe.com', `'unsafe-inline'`, 'https://m.stripe.network', `https:`],
          manifestSrc: [
            `'self'`,
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          frameSrc: [`'self'`, 'https://js.stripe.com', 'https://hooks.stripe.com', 'https://m.stripe.network', 'sandbox.embed.apollographql.com'],
          connectSrc: [`'self'`, 'https://api.stripe.com', 'm.stripe.network', 'https://uploads.stripe.com'],
          styleSrc: [`'self'`, `'unsafe-inline'`, 'https://fonts.googleapis.com'],

        },
      },
    }),
  )

  app.enableCors({
    origin: process.env.ORIGIN_SERVER,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    optionsSuccessStatus: 200,
    credentials: true,
    preflightContinue: false,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  })

  app.use(cookieParser())
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
