import { Test, TestingModule } from '@nestjs/testing'
import { CommunityGroupResolver } from '../community-group.resolver'
import { CommunityGroupService } from '../community-group.service'

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
