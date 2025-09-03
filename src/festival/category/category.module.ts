import { forwardRef, Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module'
import { FestivalClassModule } from '@/festival/festival-class/festival-class.module'
import { CategoryResolver } from './category.resolver'
import { CategoryService } from './category.service'

@Module({
  providers: [CategoryResolver, CategoryService],
  exports: [CategoryService],
  imports: [forwardRef(() => FestivalClassModule), AbilityModule],
})
export class CategoryModule {}
