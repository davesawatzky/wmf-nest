import process from 'node:process'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import cookieParser from 'cookie-parser'
import gql from 'graphql-tag'
import helmet from 'helmet'
import { AuthPayload } from 'src/auth/entities/auth.entity'
import { EmailConfirmationService } from 'src/email-confirmation/email-confirmation.service'
import request from 'supertest-graphql'
import { TestUser } from '@/test/testUser'
import { AppModule } from '../app.module'
import { PrismaService } from '../prisma/prisma.service'

let app: INestApplication

beforeAll(async () => {
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

  const httpServer: any = await app.getHttpServer()
  const prisma: PrismaService = app.get<PrismaService>(PrismaService)

  const response = await request<{ signin: AuthPayload }>(httpServer)
    .mutate(gql`
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
            isActive
            roles
            permissions
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
  const diatonicToken: string = response.data.signin.diatonicToken
  globalThis.diatonicToken = diatonicToken

  if (!globalThis.defined) {
    globalThis.httpServer = httpServer
    globalThis.prisma = prisma
    globalThis.userId = response.data.signin.user.id
    globalThis.admin = response.data.signin.user.roles.includes('admin')
    globalThis.defined = true
  }
})

afterAll(async () => {
  globalThis.prisma.$disconnect()
  globalThis.prisma = null

  delete globalThis.prisma
  delete globalThis.diatonicToken
  delete globalThis.httpServer
  delete globalThis.userId
  delete globalThis.admin
  delete globalThis.defined

  vi.resetAllMocks()

  await app.close()
})
