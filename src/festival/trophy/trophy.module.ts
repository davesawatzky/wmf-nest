import { Module, forwardRef } from '@nestjs/common'
import { TrophyService } from './trophy.service'
import { TrophyResolver } from './trophy.resolver'
import { FestivalClassModule } from '../festival-class/festival-class.module'
import {AbilityModule} from '@/ability/ability.module'

@Module({
  providers: [TrophyResolver, TrophyService],
  imports: [forwardRef(() => FestivalClassModule), AbilityModule],
  exports: [TrophyService],
})
export class TrophyModule {}
