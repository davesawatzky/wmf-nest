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
import { CommunityResolver } from '../community.resolver'
import { CommunityService } from '../community.service'
import { PrismaService } from '@/prisma/prisma.service'

describe('CommunityResolver', () => {
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
