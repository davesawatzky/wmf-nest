import { Module, forwardRef } from '@nestjs/common'
import { TrophyService } from './trophy.service'
import { TrophyResolver } from './trophy.resolver'
import { FestivalClassModule } from 'src/festival-class/festival-class.module'

@Module({
  providers: [TrophyResolver, TrophyService],
  imports: [forwardRef(() => FestivalClassModule)],
  exports: [TrophyService],
})
export class TrophyModule {}
