import { Logger } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AuthService } from 'src/auth/auth.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { AppModule } from '../app.module'
import { TestAdmin, TestUser } from './testUser'

export async function setup(): Promise<void> {
  const logger = new Logger('Global E2E Setup')

  try {
    logger.log('🚀 Starting global E2E setup...')
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    const app = moduleRef.createNestApplication()
    await app.init()

    const authService = moduleRef.get<AuthService>(AuthService)
    const prismaService = moduleRef.get<PrismaService>(PrismaService)

    // Check if users already exist (for test reruns)
    const existingAdmin = await prismaService.tbl_user.findUnique({
      where: { email: TestAdmin().email },
    })
    const existingUser = await prismaService.tbl_user.findUnique({
      where: { email: TestUser().email },
    })

    // Create admin if doesn't exist
    if (!existingAdmin) {
      logger.log('Creating test admin user...')
      await authService.signup(TestAdmin())
      await prismaService.tbl_user.update({
        where: { email: TestAdmin().email },
        data: { emailConfirmed: true, roles: ['admin'] },
      })
      logger.log('✅ Test admin created')
    }
    else {
      logger.log('✅ Test admin already exists')
    }

    // Create regular user if doesn't exist
    if (!existingUser) {
      logger.log('Creating test user...')
      await authService.signup(TestUser())
      await prismaService.tbl_user.update({
        where: { email: TestUser().email },
        data: { emailConfirmed: true, roles: ['user'] },
      })
      logger.log('✅ Test user created')
    }
    else {
      logger.log('✅ Test user already exists')
    }

    // await prismaService.tbl_user.update({
    //   where: { email: TestAdmin().email },
    //   data: { emailConfirmed: true, roles: ['admin'] },
    // })
    // await prismaService.tbl_user.update({
    //   where: { email: TestUser().email },
    //   data: { emailConfirmed: true, roles: ['user'] },
    // })
    await app.close()
    logger.log('✅ Global E2E setup completed successfully')
  }
  catch (error) {
    logger.error('❌ Global E2E setup failed:', error)
    throw error
  }
}

export async function teardown(): Promise<void> {
  const logger = new Logger('Global E2E Teardown')

  try {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    const app = moduleRef.createNestApplication()
    await app.init()

    const prismaService = moduleRef.get<PrismaService>(PrismaService)
    await prismaService.tbl_user.deleteMany({
      where: {
        email: {
          in: [TestAdmin().email, TestUser().email],
        },
      },
    })

    await app.close()
    logger.log('✅ Global E2E teardown completed successfully')
  }
  catch (error) {
    logger.error('❌ Global E2E teardown failed:', error)
    // Don't throw - allow tests to complete even if cleanup fails
  }
}
