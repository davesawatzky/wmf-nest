import { Module } from '@nestjs/common'
import { RegisteredClass } from '../registered-class/entities/registered-class.entity'
import { SelectionResolver } from './selection.resolver'
import { SelectionService } from './selection.service'

@Module({
  providers: [SelectionResolver, SelectionService],
  imports: [RegisteredClass],
  exports: [SelectionService],
})
export class SelectionModule {}
