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
import { SubdisciplineService } from './subdiscipline.service'
import { PrismaService } from '../../prisma/prisma.service'

describe('SubdisciplineService', () => {
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
