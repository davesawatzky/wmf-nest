import { Module, forwardRef } from '@nestjs/common'
import { ClassTypeService } from './class-type.service'
import {ClassTypeResolver} from './class-type.resolver'
import { FestivalClassModule } from '../festival-class/festival-class.module'

@Module({
  providers: [ClassTypeService, ClassTypeResolver],
  imports: [forwardRef(() => FestivalClassModule)],
  exports: [ClassTypeService],
})
export class ClassTypeModule {}
