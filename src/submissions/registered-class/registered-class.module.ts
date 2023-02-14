import { Module } from '@nestjs/common'
import { RegisteredClassService } from './registered-class.service'
import { RegisteredClassResolver } from './registered-class.resolver'

@Module({
  providers: [RegisteredClassResolver, RegisteredClassService],
})
export class RegisteredClassModule {}
