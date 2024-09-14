import { SelectionModule } from '@/submissions/selection/selection.module'
import { Module } from '@nestjs/common'
import { RegisteredClassResolver } from './registered-class.resolver'
import { RegisteredClassService } from './registered-class.service'

@Module({
  providers: [RegisteredClassResolver, RegisteredClassService],
  imports: [SelectionModule],
  exports: [RegisteredClassService],
})
export class RegisteredClassModule {}
