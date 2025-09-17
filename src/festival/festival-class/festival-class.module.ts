import { Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module'
import { CategoryModule } from '@/festival/category/category.module'
import { ClassTypeModule } from '@/festival/class-type/class-type.module'
import { LevelModule } from '@/festival/level/level.module'
import { SubdisciplineModule } from '@/festival/subdiscipline/subdiscipline.module'
import { FestivalClassResolver } from './festival-class.resolver'
import { FestivalClassService } from './festival-class.service'

@Module({
  providers: [FestivalClassResolver, FestivalClassService],
  imports: [
    SubdisciplineModule,
    LevelModule,
    CategoryModule,
    ClassTypeModule,
    AbilityModule,
  ],
  exports: [FestivalClassService],
})
export class FestivalClassModule {}
