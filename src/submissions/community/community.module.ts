import { forwardRef, Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module'
import { CommunityGroupModule } from '@/submissions/community-group/community-group.module'
import { RegistrationModule } from '@/submissions/registration/registration.module'
import { CommunityDataLoader } from './community.dataloader'
import { CommunityResolver } from './community.resolver'
import { CommunityService } from './community.service'

@Module({
  providers: [CommunityResolver, CommunityService, CommunityDataLoader],
  imports: [
    forwardRef(() => RegistrationModule),
    CommunityGroupModule,
    AbilityModule,
  ],
  exports: [CommunityService],
})
export class CommunityModule {}
