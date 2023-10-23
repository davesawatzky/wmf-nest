import { Module, forwardRef } from '@nestjs/common'
import { DisciplineService } from './discipline.service'
import { DisciplineResolver } from './discipline.resolver'
import { SubdisciplineService } from '../subdiscipline/subdiscipline.service'
import { SubdisciplineModule } from '../subdiscipline/subdiscipline.module'
import { InstrumentModule } from '../instrument/instrument.module'

@Module({
  providers: [DisciplineResolver, DisciplineService],
  imports: [
    forwardRef(() => InstrumentModule),
    forwardRef(() => SubdisciplineModule),
  ],
  exports: [DisciplineService],
})
export class DisciplineModule {}
