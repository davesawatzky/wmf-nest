import { Module, forwardRef } from '@nestjs/common'
import { SubdisciplineService } from './subdiscipline.service'
import { SubdisciplineResolver } from './subdiscipline.resolver'
import { DisciplineModule } from '@/festival/discipline/discipline.module'
import { FestivalClassModule } from '@/festival/festival-class/festival-class.module'
import {CategoryModule} from '@/festival/category/category.module'
import {LevelModule} from '@/festival/level/level.module'

@Module({
  providers: [SubdisciplineResolver, SubdisciplineService],
  imports: [
    forwardRef(() => DisciplineModule),
    forwardRef(() => FestivalClassModule),
    CategoryModule,
    LevelModule
  ],
  exports: [SubdisciplineService],
})
export class SubdisciplineModule {}
