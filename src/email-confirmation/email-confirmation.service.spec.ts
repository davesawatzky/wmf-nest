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
import { EmailService } from '../email/email.service'
import { UserService } from '../user/user.service'
import {
  MAILER_OPTIONS,
  MailerModule,
  MailerService,
} from '@nestjs-modules/mailer'
import { PrismaService } from '../prisma/prisma.service'
import ConfirmationEmailDto from './dto/confirm-email.dto'

describe('EmailConfirmationService', () => {
  let emailConfirmationService: EmailConfirmationService
  let jwtService: JwtService
  let configService: ConfigService
  let emailService: EmailService
  let userService: UserService
  let mailerService: MailerService
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailConfirmationService,
        {
          provide: JwtService,
          useValue: jwtService,
        },
        {
          provide: ConfigService,
          useValue: configService,
        },
        {
          provide: EmailService,
          useValue: emailService,
        },
        {
          provide: UserService,
          useValue: userService,
        },
        {
          provide: MailerService,
          useValue: mailerService,
        },
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile()

    emailConfirmationService = module.get<EmailConfirmationService>(
      EmailConfirmationService
    )
  })

  it('should be defined', () => {
    expect(emailConfirmationService).toBeDefined()
  })
})
