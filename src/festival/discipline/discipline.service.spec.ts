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
import { DisciplineService } from './discipline.service'
import { PrismaService } from 'src/prisma/prisma.service'

describe('DisciplineService', () => {
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
