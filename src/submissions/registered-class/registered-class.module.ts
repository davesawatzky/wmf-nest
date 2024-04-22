import { Module } from '@nestjs/common'
import { RegisteredClassService } from './registered-class.service'
import { RegisteredClassResolver } from './registered-class.resolver'
import { SelectionModule } from '@/submissions/selection/selection.module'

@Module({
  providers: [RegisteredClassResolver, RegisteredClassService],
  imports: [SelectionModule],
  exports: [RegisteredClassService],
})
export class RegisteredClassModule {}
