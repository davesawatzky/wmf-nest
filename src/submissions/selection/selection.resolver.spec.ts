import { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { SelectionResolver } from './selection.resolver'
import { SelectionService } from './selection.service'
import { PrismaService } from '@/prisma/prisma.service'

describe('selectionResolver', () => {
  let resolver: SelectionResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectionResolver, SelectionService, PrismaService],
    }).compile()

    resolver = module.get<SelectionResolver>(SelectionResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
