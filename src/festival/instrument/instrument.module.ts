import { forwardRef, Module } from '@nestjs/common'

import { AbilityModule } from '@/ability/ability.module.js'
import { DisciplineModule } from '@/festival/discipline/discipline.module.js'

import { InstrumentDataLoader } from './instrument.dataloader.js'
import { InstrumentResolver } from './instrument.resolver.js'
import { InstrumentService } from './instrument.service.js'

@Module({
  providers: [InstrumentResolver, InstrumentService, InstrumentDataLoader],
  imports: [forwardRef(() => DisciplineModule), AbilityModule],
  exports: [InstrumentService],
})
export class InstrumentModule {}
