import { forwardRef, Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module.js'
import { FestivalClassModule } from '@/festival/festival-class/festival-class.module.js'
import { CategoryResolver } from './category.resolver.js'
import { CategoryService } from './category.service.js'

@Module({
  providers: [CategoryResolver, CategoryService],
  exports: [CategoryService],
  imports: [forwardRef(() => FestivalClassModule), AbilityModule],
})
export class CategoryModule {}
