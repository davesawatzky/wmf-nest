import { Module, forwardRef } from '@nestjs/common'
import { CommunityGroupService } from './community-group.service'
import { CommunityGroupResolver } from './community-group.resolver'
import { CommunityModule } from '@/submissions/community/community.module'
import { AbilityModule } from '@/ability/ability.module'

@Module({
  providers: [CommunityGroupResolver, CommunityGroupService],
  exports: [CommunityGroupService],
  imports: [forwardRef(() => CommunityModule), AbilityModule],
})
export class CommunityGroupModule {}
