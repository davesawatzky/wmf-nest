import { Module } from '@nestjs/common'
import { DisciplineService } from './discipline.service'
import { DisciplineResolver } from './discipline.resolver'

@Module({
  providers: [DisciplineResolver, DisciplineService],
})
export class DisciplineModule {}
