import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { PrismaService } from '@/prisma/prisma.service.js'
import { TrophyResolver } from '../trophy.resolver.js'
import { TrophyService } from '../trophy.service.js'

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
