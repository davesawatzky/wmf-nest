import { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { DisciplineResolver } from '../discipline.resolver'
import { DisciplineService } from '../discipline.service'
import { InstrumentService } from '@/festival/instrument/instrument.service'
import { SubdisciplineService } from '@/festival/subdiscipline/subdiscipline.service'
import { PrismaService } from '@/prisma/prisma.service'

describe('disciplineResolver', () => {
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
