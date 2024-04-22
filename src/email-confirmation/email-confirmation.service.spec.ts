import { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import {
  MailerService,
} from '@nestjs-modules/mailer'
import { EmailConfirmationService } from './email-confirmation.service'
import { EmailService } from '@/email/email.service'
import { UserService } from '@/user/user.service'
import { PrismaService } from '@/prisma/prisma.service'

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
