import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'

import { InstrumentService } from '@/festival/instrument/instrument.service.js'
import { SubdisciplineService } from '@/festival/subdiscipline/subdiscipline.service.js'
import { PrismaService } from '@/prisma/prisma.service.js'

import { DisciplineResolver } from '../discipline.resolver.js'
import { DisciplineService } from '../discipline.service.js'

describe('disciplineResolver', () => {
  let resolver: DisciplineResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisciplineResolver, DisciplineService, InstrumentService, SubdisciplineService, PrismaService],
    }).compile()

    resolver = module.get<DisciplineResolver>(DisciplineResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
