import { forwardRef, Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module.js'
import { RegistrationModule } from '@/submissions/registration/registration.module.js'
import { GroupResolver } from './group.resolver.js'
import { GroupService } from './group.service.js'

@Module({
  providers: [GroupResolver, GroupService],
  exports: [GroupService],
  imports: [forwardRef(() => RegistrationModule), AbilityModule],
})
export class GroupModule {}
