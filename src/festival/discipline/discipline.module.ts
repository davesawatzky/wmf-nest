import { forwardRef, Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module.js'
import { InstrumentModule } from '@/festival/instrument/instrument.module.js'
import { SubdisciplineModule } from '@/festival/subdiscipline/subdiscipline.module.js'
import { DisciplineDataLoader } from './discipline.dataloader.js'
import { DisciplineResolver } from './discipline.resolver.js'
import { DisciplineService } from './discipline.service.js'

@Module({
  providers: [DisciplineResolver, DisciplineService, DisciplineDataLoader],
  imports: [
    forwardRef(() => InstrumentModule),
    forwardRef(() => SubdisciplineModule),
    AbilityModule,
  ],
  exports: [DisciplineService],
})
export class DisciplineModule {}
