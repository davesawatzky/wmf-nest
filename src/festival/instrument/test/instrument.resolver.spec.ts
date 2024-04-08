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
import { InstrumentResolver } from '../instrument.resolver'
import { InstrumentService } from '../instrument.service'
import { DisciplineService } from '@/festival/discipline/discipline.service'
import { PrismaService } from '@/prisma/prisma.service'

describe('InstrumentResolver', () => {
  let resolver: InstrumentResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstrumentResolver,
        InstrumentService,
        DisciplineService,
        PrismaService,
      ],
    }).compile()

    resolver = module.get<InstrumentResolver>(InstrumentResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
