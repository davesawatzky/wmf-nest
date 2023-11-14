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
import { LevelService } from './level.service'
import { PrismaService } from 'src/prisma/prisma.service'

describe('LevelService', () => {
  let service: LevelService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LevelService, PrismaService],
    }).compile()

    service = module.get<LevelService>(LevelService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
