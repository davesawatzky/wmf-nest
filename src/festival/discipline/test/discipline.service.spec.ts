import { PrismaService } from '@/prisma/prisma.service'
import { Test, TestingModule } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { DisciplineService } from '../discipline.service'

describe('disciplineService', () => {
  let service: DisciplineService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisciplineService, PrismaService],
    }).compile()

    service = module.get<DisciplineService>(DisciplineService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
