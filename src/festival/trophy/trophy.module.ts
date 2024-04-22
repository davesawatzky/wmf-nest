import { Module, forwardRef } from '@nestjs/common'
import { FestivalClassModule } from '../festival-class/festival-class.module'
import { TrophyService } from './trophy.service'
import { TrophyResolver } from './trophy.resolver'
import { AbilityModule } from '@/ability/ability.module'

@Module({
  providers: [TrophyResolver, TrophyService],
  imports: [forwardRef(() => FestivalClassModule), AbilityModule],
  exports: [TrophyService],
})
export class TrophyModule {}
