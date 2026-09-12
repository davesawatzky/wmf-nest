import { forwardRef, Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module.js'
import { CommunityModule } from '@/submissions/community/community.module.js'
import { CommunityGroupResolver } from './community-group.resolver.js'
import { CommunityGroupService } from './community-group.service.js'

@Module({
  providers: [CommunityGroupResolver, CommunityGroupService],
  exports: [CommunityGroupService],
  imports: [forwardRef(() => CommunityModule), AbilityModule],
})
export class CommunityGroupModule {}
