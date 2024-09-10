import { PrismaService } from '@/prisma/prisma.service'
import { Test, TestingModule } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { SelectionService } from './selection.service'

describe('selectionService', () => {
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
