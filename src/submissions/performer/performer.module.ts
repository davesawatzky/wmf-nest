import { AbilityModule } from '@/ability/ability.module'
import { RegistrationModule } from '@/submissions/registration/registration.module'
import { forwardRef, Module } from '@nestjs/common'
import { PerformerResolver } from './performer.resolver'
import { PerformerService } from './performer.service'
import {SelectionModule} from '../selection/selection.module'

@Module({
  providers: [PerformerResolver, PerformerService],
  exports: [PerformerService],
  imports: [forwardRef(() => RegistrationModule), SelectionModule, AbilityModule],
})
export class PerformerModule {}
