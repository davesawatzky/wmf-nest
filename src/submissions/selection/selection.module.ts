import { Module } from '@nestjs/common'
import { SelectionService } from './selection.service'
import { SelectionResolver } from './selection.resolver'

@Module({
  providers: [SelectionResolver, SelectionService],
  exports: [SelectionService],
})
export class SelectionModule {}
