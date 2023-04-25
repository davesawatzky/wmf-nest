import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // await app.use(helmet())
  app.enableCors()

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  )
  await app.listen(3000)
}
bootstrap()
