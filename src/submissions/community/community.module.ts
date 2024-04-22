import { Module, forwardRef } from '@nestjs/common'
import { CommunityService } from './community.service'
import { CommunityResolver } from './community.resolver'
import { RegistrationModule } from '@/submissions/registration/registration.module'
import { AbilityModule } from '@/ability/ability.module'

@Module({
  providers: [CommunityResolver, CommunityService],
  exports: [CommunityService],
  imports: [forwardRef(() => RegistrationModule), AbilityModule],
})
export class CommunityModule {}
