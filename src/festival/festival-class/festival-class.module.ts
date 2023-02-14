import { Module } from '@nestjs/common'
import { FestivalClassService } from './festival-class.service'
import { FestivalClassResolver } from './festival-class.resolver'
import { SubdisciplineModule } from '../subdiscipline/subdiscipline.module'
import { LevelModule } from '../level/level.module'
import { CategoryModule } from '../category/category.module'

@Module({
  providers: [FestivalClassResolver, FestivalClassService],
  imports: [SubdisciplineModule, LevelModule, CategoryModule],
  exports: [FestivalClassService],
})
export class FestivalClassModule {}
