import { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { PerformerResolver } from '../performer.resolver'
import { PerformerService } from '../performer.service'

// vi.mock('../performer.service.ts')

describe('performerResolver', () => {
  let performerResolver: PerformerResolver
  let performerService: PerformerService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PerformerResolver,
        {
          provide: PerformerService,
          useValue: performerService,
        },
      ],
    }).compile()

    performerResolver = moduleRef.get<PerformerResolver>(PerformerResolver)
  })

  it('should be defined', () => {
    expect(performerResolver).toBeDefined()
  })
})
