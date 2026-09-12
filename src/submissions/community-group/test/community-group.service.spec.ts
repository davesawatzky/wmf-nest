import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'

import { CommunityGroupService } from '../community-group.service.js'

describe('communityGroupService', () => {
  let service: CommunityGroupService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityGroupService],
    }).compile()

    service = module.get<CommunityGroupService>(CommunityGroupService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
