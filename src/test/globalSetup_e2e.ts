import { Test } from '@nestjs/testing'
import { AppModule } from '../app.module'
import {AuthService} from 'src/auth/auth.service'
import {TestUser, TestAdmin} from './testUser'
import {PrismaService} from 'src/prisma/prisma.service'

export async function setup(): Promise<void> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  const app = moduleRef.createNestApplication()
  await app.init()

  const authService = moduleRef.get<AuthService>(AuthService)
  await authService.signup(TestAdmin())
  await authService.signup(TestUser())
  
  const prismaService = moduleRef.get<PrismaService>(PrismaService)
  await prismaService.tbl_user.update({
    where: {email: TestAdmin().email},
    data: {emailConfirmed: true, admin: true}
  })
  await prismaService.tbl_user.update({
    where: {email: TestUser().email},
    data: {emailConfirmed: true, admin: false}
  })
  await app.close()
}

export async function teardown(): Promise<void> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  const app = moduleRef.createNestApplication()
  await app.init()

  const prismaService = moduleRef.get<PrismaService>(PrismaService)
  await prismaService.tbl_user.delete({
    where: {
      email: TestAdmin().email
    }
  })
  await prismaService.tbl_user.delete({
    where: {
      email: TestUser().email
    }
  })
  await app.close()
}
