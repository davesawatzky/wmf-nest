import { Module, forwardRef } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryResolver } from './category.resolver'
import { FestivalClassModule } from '@/festival/festival-class/festival-class.module'
import {AbilityModule} from '@/ability/ability.module'

@Module({
  providers: [CategoryResolver, CategoryService],
  imports: [forwardRef(() => FestivalClassModule), AbilityModule],
  exports: [CategoryService],
})
export class CategoryModule {}
