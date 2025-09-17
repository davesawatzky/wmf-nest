import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { FestivalClassService } from '@/festival/festival-class/festival-class.service'
import { PrismaService } from '@/prisma/prisma.service'
import { LevelResolver } from '../level.resolver'
import { LevelService } from '../level.service'

describe('levelResolver', () => {
  let resolver: LevelResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LevelResolver,
        LevelService,
        PrismaService,
        FestivalClassService,
      ],
    }).compile()

    resolver = module.get<LevelResolver>(LevelResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
