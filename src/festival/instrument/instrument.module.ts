import { forwardRef, Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module'
import { DisciplineModule } from '@/festival/discipline/discipline.module'
import { InstrumentResolver } from './instrument.resolver'
import { InstrumentService } from './instrument.service'

@Module({
  providers: [InstrumentResolver, InstrumentService],
  imports: [forwardRef(() => DisciplineModule), AbilityModule],
  exports: [InstrumentService],
})
export class InstrumentModule {}
