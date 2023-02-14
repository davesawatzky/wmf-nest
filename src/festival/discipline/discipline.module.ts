import { Module } from '@nestjs/common'
import { DisciplineService } from './discipline.service'
import { DisciplineResolver } from './discipline.resolver'

@Module({
  providers: [DisciplineResolver, DisciplineService],
  exports: [DisciplineService],
})
export class DisciplineModule {}
