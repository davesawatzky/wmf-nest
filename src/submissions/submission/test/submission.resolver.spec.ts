import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { PrismaService } from '@/prisma/prisma.service.js'
import { RegistrationService } from '@/submissions/registration/registration.service.js'
import { SubmissionResolver } from '../submission.resolver.js'
import { SubmissionService } from '../submission.service.js'

describe('submissionResolver', () => {
  let resolver: SubmissionResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubmissionResolver,
        SubmissionService,
        PrismaService,
        RegistrationService,
      ],
    }).compile()

    resolver = module.get<SubmissionResolver>(SubmissionResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
