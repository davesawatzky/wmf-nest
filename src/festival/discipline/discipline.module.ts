import { forwardRef, Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module'
import { InstrumentModule } from '@/festival/instrument/instrument.module'
import { SubdisciplineModule } from '@/festival/subdiscipline/subdiscipline.module'
import { DisciplineResolver } from './discipline.resolver'
import { DisciplineService } from './discipline.service'

@Module({
  providers: [DisciplineResolver, DisciplineService],
  imports: [
    forwardRef(() => InstrumentModule),
    forwardRef(() => SubdisciplineModule),
    AbilityModule,
  ],
  exports: [DisciplineService],
})
export class DisciplineModule {}
