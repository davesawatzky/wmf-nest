import process from 'node:process'
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { AppModule } from '@/app.module'
import { EmailConfirmationService } from '@/email-confirmation/email-confirmation.service'
import { createMockEmailConfirmationService } from '@/email-confirmation/test/mocks'
import { PrismaService } from '@/prisma/prisma.service'
import { getTestUser, TestUserType } from './testUser'

// Extend globalThis to include test context
declare global {
  interface GlobalThis {
    httpServer: any
    prisma: PrismaService
    testContext: {
      app: INestApplication
      admin: {
        token: string
        userId: number
        email: string
      }
      user: {
        token: string
        userId: number
        email: string
      }
      teacher?: {
        token: string
        userId: number
        email: string
      }
    }
    defined: boolean
  }
}

let app: INestApplication

beforeAll (async () => {
  const logger = new Logger('E2E Test Setup')

  try {
    logger.log('🔧 Setting up integration test context...')

    // Mock EmailConfirmationService to prevent actual SMTP emails while preserving business logic
    // Mock implementation is defined in @/email-confirmation/test/mocks/email-confirmation.service.mock.ts
    const mockEmailConfirmationService = createMockEmailConfirmationService()

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(EmailConfirmationService)
      .useValue(mockEmailConfirmationService)
      .compile()

    app = moduleRef.createNestApplication()

    // Configure app with all middleware
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
      credentials: true,
      preflightContinue: false,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    })
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    )

    await app.init()

    // Store global references
    const httpServer: any = await app.getHttpServer()
    const prisma: PrismaService = app.get<PrismaService>(PrismaService)

    if (!globalThis.defined) {
      globalThis.httpServer = httpServer
      globalThis.prisma = prisma
    }

    const jwtService = app.get<JwtService>(JwtService)

    // Create and authenticate test users
    const testContext = {
      app, // Expose app for tests that need to get services
      admin: await generateTokenForUser('admin', jwtService),
      user: await generateTokenForUser('user', jwtService),
    }

    globalThis.testContext = testContext
    globalThis.defined = true

    logger.log('✅ Test context setup completed successfully')
    logger.log(`Admin token: ${testContext.admin.token?.substring(0, 20)}...`)
    logger.log(`User token: ${testContext.user.token?.substring(0, 20)}...`)
  }
  catch (error) {
    logger.error('❌ Integration test context setup failed:', error)
    throw error
  }
})

afterAll(async () => {
  const logger = new Logger('Integration Test Teardown')

  try {
    if (globalThis.prisma) {
      globalThis.prisma.$disconnect() // Close DB connection
    }

    delete globalThis.prisma
    delete globalThis.httpServer
    delete globalThis.testContext
    delete globalThis.defined

    logger.log('✅ Integration test context torn down successfully')
  }
  catch (error) {
    logger.error('❌ Integration test teardown failed:', error)
  }
})

async function generateTokenForUser(
  userType: TestUserType,
  jwtService: JwtService,
) {
  const testUser = getTestUser(userType)

  // Get existing user (created in globalSetup)
  const user = await globalThis.prisma.tbl_user.findUnique({
    where: { email: testUser.email },
  })

  if (!user) {
    throw new Error(
      `Test ${userType} user not found. Ensure globalSetup has run successfully.`,
    )
  }

  // Generate JWT token
  const payload = { email: user.email, sub: user.id }
  const token = jwtService.sign(payload)

  return {
    token,
    userId: user.id,
    email: user.email,
  }
}
