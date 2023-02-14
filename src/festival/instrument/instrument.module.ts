import { Module } from '@nestjs/common'
import { InstrumentService } from './instrument.service'
import { InstrumentResolver } from './instrument.resolver'

@Module({
  providers: [InstrumentResolver, InstrumentService],
})
export class InstrumentModule {}
