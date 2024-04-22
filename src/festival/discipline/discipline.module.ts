import { Module, forwardRef } from '@nestjs/common'
import { DisciplineService } from './discipline.service'
import { DisciplineResolver } from './discipline.resolver'
import { SubdisciplineModule } from '@/festival/subdiscipline/subdiscipline.module'
import { InstrumentModule } from '@/festival/instrument/instrument.module'
import { AbilityModule } from '@/ability/ability.module'

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
