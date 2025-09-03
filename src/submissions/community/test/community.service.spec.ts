import { Test, TestingModule } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { PrismaService } from '@/prisma/prisma.service'
import { CommunityService } from '../community.service'

describe('communityService', () => {
  let service: CommunityService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityService, PrismaService],
    }).compile()

    service = module.get<CommunityService>(CommunityService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
