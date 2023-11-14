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
import { DisciplineResolver } from './discipline.resolver'
import { DisciplineService } from './discipline.service'
import { InstrumentService } from '../instrument/instrument.service'
import { SubdisciplineService } from '../subdiscipline/subdiscipline.service'
import { PrismaService } from 'src/prisma/prisma.service'

describe('DisciplineResolver', () => {
  let resolver: DisciplineResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DisciplineResolver,
        DisciplineService,
        InstrumentService,
        SubdisciplineService,
        PrismaService,
      ],
    }).compile()

    resolver = module.get<DisciplineResolver>(DisciplineResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
