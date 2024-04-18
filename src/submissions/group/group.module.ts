import { Module, forwardRef } from '@nestjs/common'
import { GroupService } from './group.service'
import { GroupResolver } from './group.resolver'
import {RegistrationModule} from '@/submissions/registration/registration.module'
import {AbilityModule} from '@/ability/ability.module'

@Module({
  providers: [GroupResolver, GroupService],
  exports: [GroupService],
  imports: [forwardRef(() => RegistrationModule), AbilityModule]
})
export class GroupModule {}
