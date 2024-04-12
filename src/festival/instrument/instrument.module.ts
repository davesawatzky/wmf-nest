import { Module, forwardRef } from '@nestjs/common'
import { InstrumentService } from './instrument.service'
import { InstrumentResolver } from './instrument.resolver'
import { DisciplineModule } from '@/festival/discipline/discipline.module'
import {AbilityModule} from '@/ability/ability.module'

@Module({
  providers: [InstrumentResolver, InstrumentService],
  imports: [forwardRef(() => DisciplineModule), AbilityModule],
  exports: [InstrumentService],
})
export class InstrumentModule {}
