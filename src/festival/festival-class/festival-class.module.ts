import { Module } from '@nestjs/common'
import { FestivalClassService } from './festival-class.service'
import { FestivalClassResolver } from './festival-class.resolver'
import { SubdisciplineModule } from 'src/subdiscipline/subdiscipline.module'
import { LevelModule } from 'src/level/level.module'
import { CategoryModule } from 'src/category/category.module'

@Module({
  providers: [FestivalClassResolver, FestivalClassService],
  imports: [SubdisciplineModule, LevelModule, CategoryModule],
  exports: [FestivalClassService],
})
export class FestivalClassModule {}
