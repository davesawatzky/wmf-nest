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
import { TrophyService } from '../trophy.service'
import { PrismaService } from '../../../prisma/prisma.service'

describe('TrophyService', () => {
  let service: TrophyService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrophyService, PrismaService],
    }).compile()

    service = module.get<TrophyService>(TrophyService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
