import { Module } from '@nestjs/common'

import { AbilityModule } from '@/ability/ability.module.js'
import { SelectionModule } from '@/submissions/selection/selection.module.js'

import { PerformerModule } from '../performer/performer.module.js'
import { RegisteredClassDataLoader } from './registered-class.dataloader.js'
import { RegisteredClassResolver } from './registered-class.resolver.js'
import { RegisteredClassService } from './registered-class.service.js'

@Module({
  providers: [RegisteredClassResolver, RegisteredClassService, RegisteredClassDataLoader],
  imports: [SelectionModule, AbilityModule, PerformerModule],
  exports: [RegisteredClassService],
})
export class RegisteredClassModule {}
