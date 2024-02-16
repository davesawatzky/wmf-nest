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
import { PerformerResolver } from '../performer.resolver'
import { PerformerService } from '../performer.service'
import { performerStub } from '../stubs/performer.stub'

// vi.mock('../performer.service.ts')

describe('PerformerResolver', () => {
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
