import { Module } from '@nestjs/common'
import { ClassTypeService } from './class-type.service'
import { ClassTypeResolver } from './class-type.resolver'

@Module({
  providers: [ClassTypeService, ClassTypeResolver],
  exports: [ClassTypeService],
})
export class ClassTypeModule {}
