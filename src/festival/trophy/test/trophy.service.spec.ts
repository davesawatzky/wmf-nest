import { Test, TestingModule } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { PrismaService } from '@/prisma/prisma.service'
import { TrophyService } from '../trophy.service'

describe('trophyService', () => {
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
