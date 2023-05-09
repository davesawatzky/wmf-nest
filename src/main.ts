import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
// import helmet from 'helmet'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
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
 
  app.use(cookieParser())

  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    preflightContinue: false,
    maxAge: 36000
  })

  await app.listen(3000)
}
bootstrap()
