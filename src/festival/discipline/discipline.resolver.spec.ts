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
import { DisciplineResolver } from './discipline.resolver'
import { DisciplineService } from './discipline.service'

describe('DisciplineResolver', () => {
  let resolver: DisciplineResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisciplineResolver, DisciplineService],
    }).compile()

    resolver = module.get<DisciplineResolver>(DisciplineResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
