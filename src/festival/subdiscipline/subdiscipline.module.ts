import { forwardRef, Module } from '@nestjs/common'

import { AbilityModule } from '@/ability/ability.module.js'
import { CategoryModule } from '@/festival/category/category.module.js'
import { DisciplineModule } from '@/festival/discipline/discipline.module.js'
import { FestivalClassModule } from '@/festival/festival-class/festival-class.module.js'
import { LevelModule } from '@/festival/level/level.module.js'

import { SubdisciplineDataLoader } from './subdiscipline.dataloader.js'
import { SubdisciplineResolver } from './subdiscipline.resolver.js'
import { SubdisciplineService } from './subdiscipline.service.js'

@Module({
  providers: [SubdisciplineResolver, SubdisciplineService, SubdisciplineDataLoader],
  imports: [
    forwardRef(() => DisciplineModule),
    forwardRef(() => FestivalClassModule),
    forwardRef(() => CategoryModule),
    LevelModule,
    AbilityModule,
  ],
  exports: [SubdisciplineService],
})
export class SubdisciplineModule {}
