import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { PrismaService } from '@/prisma/prisma.service'
import { RegistrationService } from '@/submissions/registration/registration.service'
import { SubmissionService } from './submission.service'

describe('submissionService', () => {
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
