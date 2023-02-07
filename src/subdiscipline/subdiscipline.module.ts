import { Module } from '@nestjs/common'
import { SubdisciplineService } from './subdiscipline.service'
import { SubdisciplineResolver } from './subdiscipline.resolver'

@Module({
  providers: [SubdisciplineResolver, SubdisciplineService],
})
export class SubdisciplineModule {}
