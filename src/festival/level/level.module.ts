import { forwardRef, Module } from '@nestjs/common'
import { LevelService } from './level.service'
import { LevelResolver } from './level.resolver'
import { FestivalClassModule } from '@/festival/festival-class/festival-class.module'

@Module({
  providers: [LevelResolver, LevelService],
  imports: [forwardRef(() => FestivalClassModule)],
  exports: [LevelService],
})
export class LevelModule {}
