import { Module } from '@nestjs/common'
import { SubdisciplineService } from './subdiscipline.service'
import { SubdisciplineResolver } from './subdiscipline.resolver'
import { DisciplineModule } from 'src/discipline/discipline.module'

@Module({
  providers: [SubdisciplineResolver, SubdisciplineService],
  imports: [DisciplineModule],
  exports: [SubdisciplineService],
})
export class SubdisciplineModule {}
