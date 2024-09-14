import { PrismaService } from '@/prisma/prisma.service'
import { Test, TestingModule } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { InstrumentService } from '../instrument.service'

describe('instrumentService', () => {
  let service: InstrumentService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstrumentService, PrismaService],
    }).compile()

    service = module.get<InstrumentService>(InstrumentService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
