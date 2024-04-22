import { Module } from '@nestjs/common'
import { RegisteredClass } from '../registered-class/entities/registered-class.entity'
import { SelectionService } from './selection.service'
import { SelectionResolver } from './selection.resolver'

@Module({
  providers: [SelectionResolver, SelectionService],
  imports: [RegisteredClass],
  exports: [SelectionService],
})
export class SelectionModule {}
