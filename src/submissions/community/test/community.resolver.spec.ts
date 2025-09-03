import { Test, TestingModule } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { PrismaService } from '@/prisma/prisma.service'
import { CommunityResolver } from '../community.resolver'
import { CommunityService } from '../community.service'

describe('communityResolver', () => {
  let resolver: CommunityResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityResolver, CommunityService, PrismaService],
    }).compile()

    resolver = module.get<CommunityResolver>(CommunityResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
