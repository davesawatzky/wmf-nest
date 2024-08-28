import { Test, TestingModule } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { RegisteredClassService } from './registered-class.service'
import { PrismaService } from '@/prisma/prisma.service'

describe('registeredClassService', () => {
  let service: RegisteredClassService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisteredClassService, PrismaService],
    }).compile()

    service = module.get<RegisteredClassService>(RegisteredClassService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
