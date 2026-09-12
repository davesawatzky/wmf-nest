import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { DisciplineService } from '@/festival/discipline/discipline.service.js'
import { PrismaService } from '@/prisma/prisma.service.js'
import { InstrumentResolver } from '../instrument.resolver.js'
import { InstrumentService } from '../instrument.service.js'

describe('instrumentResolver', () => {
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
