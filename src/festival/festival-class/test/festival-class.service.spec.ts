import { Test, TestingModule } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { FestivalClassService } from '../festival-class.service'
import { PrismaService } from '@/prisma/prisma.service'

describe('festivalClassService', () => {
  let service: FestivalClassService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FestivalClassService, PrismaService],
    }).compile()

    service = module.get<FestivalClassService>(FestivalClassService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
