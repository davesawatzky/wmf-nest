import { Test, TestingModule } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { PrismaService } from '@/prisma/prisma.service'
import { SchoolService } from '../school.service'

describe('schoolService', () => {
  let service: SchoolService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolService, PrismaService],
    }).compile()

    service = module.get<SchoolService>(SchoolService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
