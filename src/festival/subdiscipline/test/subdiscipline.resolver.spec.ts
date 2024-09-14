import { FestivalClassService } from '@/festival/festival-class/festival-class.service'
import { PrismaService } from '@/prisma/prisma.service'
import { Test, TestingModule } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { SubdisciplineResolver } from '../subdiscipline.resolver'
import { SubdisciplineService } from '../subdiscipline.service'

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
