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
import { SelectionService } from './selection.service'
import { PrismaService } from '../../prisma/prisma.service'

describe('SelectionService', () => {
  let service: SelectionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectionService, PrismaService],
    }).compile()

    service = module.get<SelectionService>(SelectionService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
