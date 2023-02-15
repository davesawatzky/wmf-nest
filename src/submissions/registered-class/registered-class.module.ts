import { Module } from '@nestjs/common'
import { RegisteredClassService } from './registered-class.service'
import { RegisteredClassResolver } from './registered-class.resolver'
import { SelectionModule } from '../selection/selection.module'

@Module({
  providers: [RegisteredClassResolver, RegisteredClassService],
  imports: [SelectionModule],
  exports: [RegisteredClassService],
})
export class RegisteredClassModule {}
