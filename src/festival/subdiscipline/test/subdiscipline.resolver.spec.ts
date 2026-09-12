import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { FestivalClassService } from '@/festival/festival-class/festival-class.service.js'
import { PrismaService } from '@/prisma/prisma.service.js'
import { SubdisciplineResolver } from '../subdiscipline.resolver.js'
import { SubdisciplineService } from '../subdiscipline.service.js'

describe('subdisciplineResolver', () => {
  let resolver: SubdisciplineResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubdisciplineResolver,
        SubdisciplineService,
        PrismaService,
        FestivalClassService,
      ],
    }).compile()

    resolver = module.get<SubdisciplineResolver>(SubdisciplineResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
