import { PrismaService } from '@/prisma/prisma.service'
import { Test, TestingModule } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { SubdisciplineService } from '../subdiscipline.service'

describe('subdisciplineService', () => {
  let service: SubdisciplineService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubdisciplineService, PrismaService],
    }).compile()

    service = module.get<SubdisciplineService>(SubdisciplineService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
