import { EmailService } from '@/email/email.service'
import { PrismaService } from '@/prisma/prisma.service'
import { UserService } from '@/user/user.service'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import {
  MailerService,
} from '@nestjs-modules/mailer'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { EmailConfirmationService } from './email-confirmation.service'

describe('emailConfirmationService', () => {
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
      EmailConfirmationService,
    )
  })

  it('should be defined', () => {
    expect(emailConfirmationService).toBeDefined()
  })
})
