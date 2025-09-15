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
    logger: process.env.NODE_ENV === 'test'
      ? false
      : new ConsoleLogger({
        prefix: 'WMF-Server',
        logLevels: ['log', 'error', 'warn', 'debug'],

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
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          scriptSrc: [`'self'`, `'unsafe-inline'`, `https:`],
          manifestSrc: [
            `'self'`,
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
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
