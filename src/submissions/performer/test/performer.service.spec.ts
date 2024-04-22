import { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { PerformerService } from '../performer.service'
import { PrismaService } from '@/prisma/prisma.service'

vi.mock('@/prisma/prisma.service.ts')

describe('performerService', () => {
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
