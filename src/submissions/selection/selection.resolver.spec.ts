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
import { SelectionResolver } from './selection.resolver'
import { SelectionService } from './selection.service'

describe('SelectionResolver', () => {
  let resolver: SelectionResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectionResolver, SelectionService],
    }).compile()

    resolver = module.get<SelectionResolver>(SelectionResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
