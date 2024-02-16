import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import cookieParser from 'cookie-parser'
import { join } from 'path'
import { AppModule } from '../app.module'
import { AuthService } from '../auth/auth.service'
import helmet from 'helmet'
import { PrismaService } from '../prisma/prisma.service'
import { userSignup } from '../auth/stubs/signup'

export class IntegrationTestManager {
  public httpServer: any
  private app: INestApplication
  public prisma: PrismaService

  async beforeAll(): Promise<void> {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    this.app = moduleRef.createNestApplication()
    // this.prisma = moduleRef.get<PrismaService>(PrismaService)

    this.app.use(cookieParser())
    this.app.use(
      helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: {
          directives: {
            imgSrc: [
              `'self'`,
              'data:',
              'apollo-server-landing-page.cdn.apollographql.com',
            ],
            scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
            manifestSrc: [
              `'self'`,
              'apollo-server-landing-page.cdn.apollographql.com',
            ],
            frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
          },
        },
      })
    )
    this.app.enableCors({
      origin: process.env.ORIGIN_SERVER,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      optionsSuccessStatus: 200,
      credentials: true,
      preflightContinue: false,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    })
    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      })
    )
    // this.app.useStaticAssets(join(__dirname, '..', 'public'))
    // this.app.setBaseViewsDir(join(__dirname, '..', 'emails'))
    // this.app.setViewEngine('hbs')

    await this.app.init()

    this.httpServer = this.app.getHttpServer()
    this.prisma = this.app.get<PrismaService>(PrismaService)
  }

  async afterAll() {
    await this.app.close()
  }
}
