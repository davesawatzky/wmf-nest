import { Module, forwardRef } from '@nestjs/common'
import { PerformerService } from './performer.service'
import { PerformerResolver } from './performer.resolver'
import {RegistrationModule} from '../registration/registration.module'
import {AbilityModule} from '@/ability/ability.module'

@Module({
  providers: [PerformerResolver, PerformerService],
  exports: [PerformerService],
  imports: [forwardRef(() => RegistrationModule), AbilityModule]
})
export class PerformerModule {}
