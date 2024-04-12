import { forwardRef, Module } from '@nestjs/common'
import { LevelService } from './level.service'
import { LevelResolver } from './level.resolver'
import { FestivalClassModule } from '@/festival/festival-class/festival-class.module'
import {AbilityModule} from '@/ability/ability.module'

@Module({
  providers: [LevelResolver, LevelService],
  imports: [forwardRef(() => FestivalClassModule), AbilityModule],
  exports: [LevelService],
})
export class LevelModule {}
