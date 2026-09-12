import { Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module.js'
import { CategoryModule } from '@/festival/category/category.module.js'
import { ClassTypeModule } from '@/festival/class-type/class-type.module.js'
import { LevelModule } from '@/festival/level/level.module.js'
import { SubdisciplineModule } from '@/festival/subdiscipline/subdiscipline.module.js'
import { FestivalClassDataLoader } from './festival-class.dataloader.js'
import { FestivalClassResolver } from './festival-class.resolver.js'
import { FestivalClassService } from './festival-class.service.js'

@Module({
  providers: [FestivalClassResolver, FestivalClassService, FestivalClassDataLoader],
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
