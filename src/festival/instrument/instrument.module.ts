import { Module, forwardRef } from '@nestjs/common'
import { InstrumentService } from './instrument.service'
import { InstrumentResolver } from './instrument.resolver'
import { DisciplineModule } from '@/festival/discipline/discipline.module'

@Module({
  providers: [InstrumentResolver, InstrumentService],
  imports: [forwardRef(() => DisciplineModule)],
  exports: [InstrumentService],
})
export class InstrumentModule {}
