import { forwardRef, Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module.js'
import { FestivalClassModule } from '@/festival/festival-class/festival-class.module.js'
import { LevelResolver } from './level.resolver.js'
import { LevelService } from './level.service.js'

@Module({
  providers: [LevelResolver, LevelService],
  imports: [forwardRef(() => FestivalClassModule), AbilityModule],
  exports: [LevelService],
})
export class LevelModule {}
