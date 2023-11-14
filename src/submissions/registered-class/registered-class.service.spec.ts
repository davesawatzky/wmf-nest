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
import { RegisteredClassService } from './registered-class.service'
import { PrismaService } from 'src/prisma/prisma.service'

describe('RegisteredClassService', () => {
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
