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
import { EmailConfirmationController } from './email-confirmation.controller'
import { EmailConfirmationService } from './email-confirmation.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { EmailService } from 'src/email/email.service'
import { UserService } from 'src/user/user.service'
import { MailerService } from '@nestjs-modules/mailer'
import { PrismaService } from 'src/prisma/prisma.service'

describe('EmailConfirmationController', () => {
  let controller: EmailConfirmationController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailConfirmationController],
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

    controller = module.get<EmailConfirmationController>(
      EmailConfirmationController
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
