import { AbilityModule } from '@/ability/ability.module'
import { RegistrationModule } from '@/submissions/registration/registration.module'
import { forwardRef, Module } from '@nestjs/common'
import { PerformerResolver } from './performer.resolver'
import { PerformerService } from './performer.service'

@Module({
  providers: [PerformerResolver, PerformerService],
  exports: [PerformerService],
  imports: [forwardRef(() => RegistrationModule), AbilityModule],
})
export class PerformerModule {}
