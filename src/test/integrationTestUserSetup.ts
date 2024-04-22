import { INestApplication } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import gql from 'graphql-tag'
import cookieParser from 'cookie-parser'
import { AuthPayload } from 'src/auth/entities/auth.entity'
import helmet from 'helmet'
import { EmailConfirmationService } from 'src/email-confirmation/email-confirmation.service'
import request from 'supertest-graphql'
import { PrismaService } from '../prisma/prisma.service'
import { AppModule } from '../app.module'
import { TestUser } from './testUser'

let app: INestApplication

beforeAll(async () => {
  let httpServer: any
  let diatonicToken: string
  let prisma: PrismaService

  const emailConfirmationService: Partial<EmailConfirmationService> = {
    sendVerificationLink: vi.fn().mockReturnValue(true),
  }

  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(EmailConfirmationService)
    .useValue(emailConfirmationService)
    .compile()

  app = moduleRef.createNestApplication()

  app.use(cookieParser())
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
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
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

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  // this.app.useStaticAssets(join(__dirname, '..', 'public'))
  // this.app.setBaseViewsDir(join(__dirname, '..', 'emails'))
  // this.app.setViewEngine('hbs')

  await app.init()

  httpServer = await app.getHttpServer()
  prisma = app.get<PrismaService>(PrismaService)

  const response = await request<{ signin: AuthPayload }>(
    httpServer,
  ).mutate(gql`
    mutation SignIn($credentials: CredentialsSignin!) {
      signin(credentials: $credentials) {
        userErrors {
          message
        }
        diatonicToken
        user {
          id
          email
          firstName
          lastName
          privateTeacher
          schoolTeacher
          hasSignedIn
        }
      }
    }
  `)
    .variables({
      credentials: {
        email: TestUser().email,
        password: TestUser().password,
      },
    })
  diatonicToken = response.data.signin.diatonicToken
  globalThis.diatonicToken = diatonicToken

  if (!globalThis.defined) {
    globalThis.httpServer = httpServer
    globalThis.prisma = prisma
    globalThis.userId = response.data.signin.user.id
    globalThis.defined = true
  }
})

afterAll(async () => {
  global.prisma = null

  delete globalThis.prisma
  delete globalThis.diatonicToken
  delete globalThis.httpServer
  delete globalThis.userId
  delete globalThis.defined

  vi.resetAllMocks()

  await app.close()
})
