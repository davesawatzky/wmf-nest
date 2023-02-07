import { Module } from '@nestjs/common'
import { FestivalClassService } from './festival-class.service'
import { FestivalClassResolver } from './festival-class.resolver'

@Module({
  providers: [FestivalClassResolver, FestivalClassService],
})
export class FestivalClassModule {}
