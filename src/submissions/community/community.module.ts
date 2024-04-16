import { Module, forwardRef } from '@nestjs/common'
import { CommunityService } from './community.service'
import { CommunityResolver } from './community.resolver'
import {AbilityModule} from '@/ability/ability.module'
import {RegistrationModule} from '../registration/registration.module'

@Module({
  providers: [CommunityResolver, CommunityService],
  exports: [CommunityService],
  imports: [forwardRef(() => RegistrationModule),AbilityModule]
})
export class CommunityModule {}
