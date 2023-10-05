import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { join } from 'path'
// import helmet from 'helmet'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  )
  // app.use(helmet({
  //   crossOriginEmbedderPolicy: false,
  //   contentSecurityPolicy: {
  //     directives: {
  //       imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
  //       scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
  //       manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
  //       frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
  //     },
  //   },
  // }))

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'emails'))
  app.setViewEngine('hbs')

  app.use(cookieParser())

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    optionsSuccessStatus: 200,
    credentials: true,
    preflightContinue: false,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  })

  const PORT = process.env.PORT || 3000
  await app.listen(PORT)
  console.log(`Server listening on PORT: ${PORT}`)
}
bootstrap()
