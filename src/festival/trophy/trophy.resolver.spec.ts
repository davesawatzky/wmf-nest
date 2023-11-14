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
import { TrophyResolver } from './trophy.resolver'
import { TrophyService } from './trophy.service'
import { PrismaService } from 'src/prisma/prisma.service'

describe('TrophyResolver', () => {
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
