import { forwardRef, Module } from '@nestjs/common'

import { AbilityModule } from '@/ability/ability.module.js'
import { RegistrationModule } from '@/submissions/registration/registration.module.js'

import { SelectionModule } from '../selection/selection.module.js'
import { PerformerDataLoader } from './performer.dataloader.js'
import { PerformerResolver } from './performer.resolver.js'
import { PerformerService } from './performer.service.js'

@Module({
  providers: [PerformerResolver, PerformerService, PerformerDataLoader],
  exports: [PerformerService],
  imports: [forwardRef(() => RegistrationModule), SelectionModule, AbilityModule],
})
export class PerformerModule {}
