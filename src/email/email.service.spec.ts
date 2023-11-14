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
import { EmailService } from './email.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { MailerService } from '@nestjs-modules/mailer'

describe('EmailService', () => {
  let service: EmailService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService, PrismaService, MailerService],
    }).compile()

    service = module.get<EmailService>(EmailService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
