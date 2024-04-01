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
import { FestivalClassService } from '../festival-class.service'
import { PrismaService } from '../../../prisma/prisma.service'

describe('FestivalClassService', () => {
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
