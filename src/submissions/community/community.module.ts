import { forwardRef, Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module'
import { CommunityGroupModule } from '@/submissions/community-group/community-group.module'
import { RegistrationModule } from '@/submissions/registration/registration.module'
import { CommunityResolver } from './community.resolver'
import { CommunityService } from './community.service'

@Module({
  providers: [CommunityResolver, CommunityService],
  imports: [
    forwardRef(() => RegistrationModule),
    CommunityGroupModule,
    AbilityModule,
  ],
  exports: [CommunityService],
})
export class CommunityModule {}
