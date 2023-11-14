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
import { EmailConfirmationService } from './email-confirmation.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { EmailService } from 'src/email/email.service'
import { UserService } from 'src/user/user.service'
import {
  MAILER_OPTIONS,
  MailerModule,
  MailerService,
} from '@nestjs-modules/mailer'
import { PrismaService } from 'src/prisma/prisma.service'

describe('EmailConfirmationService', () => {
  let service: EmailConfirmationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailConfirmationService,
        JwtService,
        ConfigService,
        EmailService,
        UserService,
        MailerService,
        PrismaService,
      ],
    }).compile()

    service = module.get<EmailConfirmationService>(EmailConfirmationService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
