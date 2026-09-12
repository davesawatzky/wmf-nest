import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { CommunityGroupResolver } from '../community-group.resolver.js'
import { CommunityGroupService } from '../community-group.service.js'

describe('communityGroupResolver', () => {
  let resolver: CommunityGroupResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityGroupResolver, CommunityGroupService],
    }).compile()

    resolver = module.get<CommunityGroupResolver>(CommunityGroupResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
