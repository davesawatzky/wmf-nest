import { AbilityModule } from '@/ability/ability.module'
import { CommunityModule } from '@/submissions/community/community.module'
import { forwardRef, Module } from '@nestjs/common'
import { CommunityGroupResolver } from './community-group.resolver'
import { CommunityGroupService } from './community-group.service'

@Module({
  providers: [CommunityGroupResolver, CommunityGroupService],
  exports: [CommunityGroupService],
  imports: [forwardRef(() => CommunityModule), AbilityModule],
})
export class CommunityGroupModule {}
