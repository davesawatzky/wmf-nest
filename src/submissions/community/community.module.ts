import { Module } from '@nestjs/common'
import { CommunityService } from './community.service'
import { CommunityResolver } from './community.resolver'

@Module({
  providers: [CommunityResolver, CommunityService],
  exports: [CommunityService],
})
export class CommunityModule {}
