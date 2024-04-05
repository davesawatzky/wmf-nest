import { Module, forwardRef } from '@nestjs/common'
import { SubdisciplineService } from './subdiscipline.service'
import { SubdisciplineResolver } from './subdiscipline.resolver'
import { DisciplineModule } from '../discipline/discipline.module'
import { FestivalClassModule } from '../festival-class/festival-class.module'
import {CategoryModule} from '../category/category.module'
import {LevelModule} from '../level/level.module'

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
