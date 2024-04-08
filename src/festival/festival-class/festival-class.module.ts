import { Module } from '@nestjs/common'
import { FestivalClassService } from './festival-class.service'
import { FestivalClassResolver } from './festival-class.resolver'
import { SubdisciplineModule } from '@/festival/subdiscipline/subdiscipline.module'
import { LevelModule } from '@/festival/level/level.module'
import { CategoryModule } from '@/festival/category/category.module'
import { ClassTypeModule } from '@/festival/class-type/class-type.module'

@Module({
  providers: [FestivalClassResolver, FestivalClassService],
  imports: [SubdisciplineModule, LevelModule, CategoryModule, ClassTypeModule],
  exports: [FestivalClassService],
})
export class FestivalClassModule {}
