import { Module } from '@nestjs/common'
import { TrophyService } from './trophy.service'
import { TrophyResolver } from './trophy.resolver'

@Module({
  providers: [TrophyResolver, TrophyService],
})
export class TrophyModule {}
