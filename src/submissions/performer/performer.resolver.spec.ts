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
import { PerformerResolver } from './performer.resolver'
import { PerformerService } from './performer.service'

describe('PerformerResolver', () => {
  let resolver: PerformerResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerformerResolver, PerformerService],
    }).compile()

    resolver = module.get<PerformerResolver>(PerformerResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
