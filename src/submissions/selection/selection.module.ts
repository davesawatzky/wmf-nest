import { Module } from '@nestjs/common'
import { RegisteredClass } from '../registered-class/entities/registered-class.entity.js'
import { SelectionResolver } from './selection.resolver.js'
import { SelectionService } from './selection.service.js'

@Module({
  providers: [SelectionResolver, SelectionService],
  imports: [RegisteredClass],
  exports: [SelectionService],
})
export class SelectionModule {}
