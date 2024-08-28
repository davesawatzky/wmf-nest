import { Test, TestingModule } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { TrophyResolver } from '../trophy.resolver'
import { TrophyService } from '../trophy.service'
import { PrismaService } from '@/prisma/prisma.service'

describe('trophyResolver', () => {
  let resolver: TrophyResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrophyResolver, TrophyService, PrismaService],
    }).compile()

    resolver = module.get<TrophyResolver>(TrophyResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
