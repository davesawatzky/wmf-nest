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
import { SubmissionResolver } from './submission.resolver'
import { SubmissionService } from './submission.service'
import { PrismaService } from '../../prisma/prisma.service'
import { RegistrationService } from '../registration/registration.service'

describe('SubmissionResolver', () => {
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
