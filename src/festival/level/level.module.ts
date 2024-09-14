import { AbilityModule } from '@/ability/ability.module'
import { FestivalClassModule } from '@/festival/festival-class/festival-class.module'
import { forwardRef, Module } from '@nestjs/common'
import { LevelResolver } from './level.resolver'
import { LevelService } from './level.service'

@Module({
  providers: [LevelResolver, LevelService],
  imports: [forwardRef(() => FestivalClassModule), AbilityModule],
  exports: [LevelService],
})
export class LevelModule {}
