import { forwardRef, Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module'
import { FestivalClassModule } from '@/festival/festival-class/festival-class.module'
import { ClassTypeResolver } from './class-type.resolver'
import { ClassTypeService } from './class-type.service'

@Module({
  providers: [ClassTypeService, ClassTypeResolver],
  imports: [forwardRef(() => FestivalClassModule), AbilityModule],
  exports: [ClassTypeService],
})
export class ClassTypeModule {}
