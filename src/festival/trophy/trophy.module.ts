import { AbilityModule } from '@/ability/ability.module'
import { forwardRef, Module } from '@nestjs/common'
import { FestivalClassModule } from '../festival-class/festival-class.module'
import { TrophyResolver } from './trophy.resolver'
import { TrophyService } from './trophy.service'

@Module({
  providers: [TrophyResolver, TrophyService],
  imports: [forwardRef(() => FestivalClassModule), AbilityModule],
  exports: [TrophyService],
})
export class TrophyModule {}
