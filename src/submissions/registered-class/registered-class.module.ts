import { AbilityModule } from '@/ability/ability.module'
import { SelectionModule } from '@/submissions/selection/selection.module'
import { Module } from '@nestjs/common'
import {PerformerModule} from '../performer/performer.module'
import { RegisteredClassResolver } from './registered-class.resolver'
import { RegisteredClassService } from './registered-class.service'

@Module({
  providers: [RegisteredClassResolver, RegisteredClassService],
  imports: [SelectionModule, AbilityModule, PerformerModule],
  exports: [RegisteredClassService],
})
export class RegisteredClassModule {}
