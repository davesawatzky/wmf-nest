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
import { InstrumentService } from './instrument.service'
import { PrismaService } from '../../prisma/prisma.service'

describe('InstrumentService', () => {
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
