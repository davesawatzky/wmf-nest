import { Module } from '@nestjs/common'
import { LevelService } from './level.service'
import { LevelResolver } from './level.resolver'

@Module({
  providers: [LevelResolver, LevelService],
})
export class LevelModule {}
