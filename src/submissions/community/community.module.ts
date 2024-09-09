import { Module, forwardRef } from '@nestjs/common'
import { CommunityService } from './community.service'
import { CommunityResolver } from './community.resolver'
import { CommunityGroupModule } from '@/submissions/community-group/community-group.module'
import { RegistrationModule } from '@/submissions/registration/registration.module'
import { AbilityModule } from '@/ability/ability.module'

@Module({
  providers: [CommunityResolver, CommunityService],
  imports: [forwardRef(() => RegistrationModule), CommunityGroupModule, AbilityModule],
  exports: [CommunityService],
})
export class CommunityModule {}
