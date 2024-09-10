import { AbilityModule } from '@/ability/ability.module'
import { CategoryModule } from '@/festival/category/category.module'
import { DisciplineModule } from '@/festival/discipline/discipline.module'
import { FestivalClassModule } from '@/festival/festival-class/festival-class.module'
import { LevelModule } from '@/festival/level/level.module'
import { forwardRef, Module } from '@nestjs/common'
import { SubdisciplineResolver } from './subdiscipline.resolver'
import { SubdisciplineService } from './subdiscipline.service'

@Module({
  providers: [SubdisciplineResolver, SubdisciplineService],
  imports: [
    forwardRef(() => DisciplineModule),
    forwardRef(() => FestivalClassModule),
    CategoryModule,
    LevelModule,
    AbilityModule,
  ],
  exports: [SubdisciplineService],
})
export class SubdisciplineModule {}
