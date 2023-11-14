import { Test, TestingModule } from '@nestjs/testing'
import {
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  test,
  it,
  expect,
} from 'vitest'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { EmailConfirmationService } from '../email-confirmation/email-confirmation.service'
import { ConfigService } from '@nestjs/config'
import { EmailService } from 'src/email/email.service'
import { UserService } from 'src/user/user.service'
import { MailerService } from '@nestjs-modules/mailer'

describe('AuthResolver', () => {
  let resolver: AuthResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        AuthService,
        JwtService,
        PrismaService,
        EmailConfirmationService,
        ConfigService,
        EmailService,
        UserService,
        MailerService,
      ],
    }).compile()

    resolver = module.get<AuthResolver>(AuthResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
