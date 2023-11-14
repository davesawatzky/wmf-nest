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
import { PerformerService } from './performer.service'
import { PrismaService } from 'src/prisma/prisma.service'

describe('PerformerService', () => {
  let service: PerformerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerformerService, PrismaService],
    }).compile()

    service = await module.get<PerformerService>(PerformerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
