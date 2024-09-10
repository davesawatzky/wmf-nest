import { PrismaService } from '@/prisma/prisma.service'
import { Test, TestingModule } from '@nestjs/testing'
import { MailerService } from '@nestjs-modules/mailer'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { EmailService } from './email.service'

describe('emailService', () => {
  let emailService: EmailService
  let prisma: PrismaService
  let mailer: MailerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
        {
          provide: MailerService,
          useValue: mailer,
        },
      ],
    }).compile()

    emailService = module.get<EmailService>(EmailService)
    // prisma: module.get<PrismaService>(PrismaService)
    // mailer: module.get<MailerService>(MailerService)
  })

  it('should be defined', () => {
    expect(emailService).toBeDefined()
  })
})
