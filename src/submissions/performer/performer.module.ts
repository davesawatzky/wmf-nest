import { Module } from '@nestjs/common'
import { PerformerService } from './performer.service'
import { PerformerResolver } from './performer.resolver'

@Module({
  providers: [PerformerResolver, PerformerService],
  exports: [PerformerService],
})
export class PerformerModule {}
