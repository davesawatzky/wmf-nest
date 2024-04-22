import { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { RegistrationService } from '../registration.service'
import { PrismaService } from '@/prisma/prisma.service'

describe('registrationService', () => {
  let service: RegistrationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrationService, PrismaService],
    }).compile()

    service = module.get<RegistrationService>(RegistrationService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
