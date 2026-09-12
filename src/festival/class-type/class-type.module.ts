import { forwardRef, Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module.js'
import { FestivalClassModule } from '@/festival/festival-class/festival-class.module.js'
import { ClassTypeDataLoader } from './class-type.dataloader.js'
import { ClassTypeResolver } from './class-type.resolver.js'
import { ClassTypeService } from './class-type.service.js'

@Module({
  providers: [ClassTypeService, ClassTypeResolver, ClassTypeDataLoader],
  imports: [forwardRef(() => FestivalClassModule), AbilityModule],
  exports: [ClassTypeService],
})
export class ClassTypeModule {}
