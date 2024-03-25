import { INestApplication, ValidationPipe } from '@nestjs/common'
import {Test} from '@nestjs/testing'
import gql from 'graphql-tag'
import cookieParser from 'cookie-parser'
import { join } from 'path'
import { AppModule } from '../app.module'
import {AuthService} from '../auth/auth.service'
import { AuthPayload } from 'src/auth/entities/auth.entity'
import helmet from 'helmet'
import { PrismaService } from '../prisma/prisma.service'
import {userSignup} from '../auth/stubs/signup'
import { TestUser } from './testUser'
import {EmailConfirmationService} from 'src/email-confirmation/email-confirmation.service'
import request from 'supertest-graphql'

export class IntegrationTestManager {
  public httpServer: any
  private app: INestApplication
  private diatonicToken: string
  public prisma: PrismaService
  
  async beforeAll(): Promise<void> {

    let emailConfirmationService: Partial<EmailConfirmationService> = {
      sendVerificationLink: vi.fn().mockReturnValue(true),
    }

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideProvider(EmailConfirmationService)
      .useValue(emailConfirmationService)
      .compile()

    this.app = moduleRef.createNestApplication()
 
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

    const response = await request<{signin: AuthPayload}>(
      this.httpServer
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
          password: TestUser().password
        }
      })
    this.diatonicToken = response.data.signin.diatonicToken
  }

  async afterAll():Promise <void> {
    await this.app.close()
  }

  getDiatonicToken() {
    return this.diatonicToken
  }
}
