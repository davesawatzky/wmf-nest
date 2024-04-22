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
import { MailerService } from '@nestjs-modules/mailer'
import { EmailConfirmationService } from './email-confirmation.service'
import { EmailConfirmationController } from './email-confirmation.controller'
import { EmailService } from '@/email/email.service'
import { UserService } from '@/user/user.service'
import { PrismaService } from '@/prisma/prisma.service'

describe('emailConfirmationController', () => {
  let controller: EmailConfirmationController
  let jwtService: JwtService
  let configService: ConfigService
  let emailService: EmailService
  let userService: UserService
  let mailerService: MailerService
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailConfirmationController],
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

    controller = module.get<EmailConfirmationController>(
      EmailConfirmationController,
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
