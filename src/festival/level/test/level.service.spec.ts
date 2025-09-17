import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { PrismaService } from '@/prisma/prisma.service'
import { LevelService } from '../level.service'

describe('levelService', () => {
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
