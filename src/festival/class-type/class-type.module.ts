import { Module, forwardRef } from '@nestjs/common'
import { ClassTypeService } from './class-type.service'
import { ClassTypeResolver } from './class-type.resolver'
import { FestivalClassModule } from '@/festival/festival-class/festival-class.module'
import { AbilityModule } from '@/ability/ability.module'

@Module({
  providers: [ClassTypeService, ClassTypeResolver],
  imports: [forwardRef(() => FestivalClassModule), AbilityModule],
  exports: [ClassTypeService],
})
export class ClassTypeModule {}
