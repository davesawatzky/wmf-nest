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
import { PerformerService } from '../performer.service'
import { PrismaService } from 'src/prisma/prisma.service'

vi.mock('../../../prisma/prisma.service.ts')

describe('PerformerService', () => {
  let performerService: PerformerService
  let prismaService: PrismaService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PerformerService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile()

    performerService = moduleRef.get<PerformerService>(PerformerService)
  })

  it('should be defined', () => {
    expect(performerService).toBeDefined()
  })
})
