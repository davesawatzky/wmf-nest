import { forwardRef, Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module'
import { RegistrationModule } from '@/submissions/registration/registration.module'
import { SelectionModule } from '../selection/selection.module'
import { PerformerDataLoader } from './performer.dataloader'
import { PerformerResolver } from './performer.resolver'
import { PerformerService } from './performer.service'

@Module({
  providers: [PerformerResolver, PerformerService, PerformerDataLoader],
  exports: [PerformerService],
  imports: [
    forwardRef(() => RegistrationModule),
    SelectionModule,
    AbilityModule,
  ],
})
export class PerformerModule {}
