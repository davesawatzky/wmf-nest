import { Module, forwardRef } from '@nestjs/common'
import { DisciplineService } from './discipline.service'
import { DisciplineResolver } from './discipline.resolver'
import { SubdisciplineService } from '../subdiscipline/subdiscipline.service'
import { SubdisciplineModule } from '../subdiscipline/subdiscipline.module'

@Module({
  providers: [DisciplineResolver, DisciplineService],
  exports: [DisciplineService],
  imports: [forwardRef(() => SubdisciplineModule)],
})
export class DisciplineModule {}
