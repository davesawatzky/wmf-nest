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
import { SubmissionService } from './submission.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { RegistrationService } from '../registration/registration.service'

describe('SubmissionService', () => {
  let service: SubmissionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmissionService, PrismaService, RegistrationService],
    }).compile()

    service = module.get<SubmissionService>(SubmissionService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
