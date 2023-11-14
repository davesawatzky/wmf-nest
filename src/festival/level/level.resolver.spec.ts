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
import { LevelResolver } from './level.resolver'
import { LevelService } from './level.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { FestivalClassService } from '../festival-class/festival-class.service'

describe('LevelResolver', () => {
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
