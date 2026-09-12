import { forwardRef, Module } from '@nestjs/common'

import { AbilityModule } from '@/ability/ability.module.js'
import { CommunityGroupModule } from '@/submissions/community-group/community-group.module.js'
import { RegistrationModule } from '@/submissions/registration/registration.module.js'

import { CommunityDataLoader } from './community.dataloader.js'
import { CommunityResolver } from './community.resolver.js'
import { CommunityService } from './community.service.js'

@Module({
  providers: [CommunityResolver, CommunityService, CommunityDataLoader],
  imports: [forwardRef(() => RegistrationModule), CommunityGroupModule, AbilityModule],
  exports: [CommunityService],
})
export class CommunityModule {}
