import { forwardRef, Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module'
import { RegistrationModule } from '@/submissions/registration/registration.module'
import { GroupResolver } from './group.resolver'
import { GroupService } from './group.service'

@Module({
  providers: [GroupResolver, GroupService],
  exports: [GroupService],
  imports: [forwardRef(() => RegistrationModule), AbilityModule],
})
export class GroupModule {}
