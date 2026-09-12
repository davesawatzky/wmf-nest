import { forwardRef, Module } from '@nestjs/common'

import { AbilityModule } from '@/ability/ability.module.js'

import { FestivalClassModule } from '../festival-class/festival-class.module.js'
import { TrophyDataLoader } from './trophy.dataloader.js'
import { TrophyResolver } from './trophy.resolver.js'
import { TrophyService } from './trophy.service.js'

@Module({
  providers: [TrophyResolver, TrophyService, TrophyDataLoader],
  imports: [forwardRef(() => FestivalClassModule), AbilityModule],
  exports: [TrophyService],
})
export class TrophyModule {}
