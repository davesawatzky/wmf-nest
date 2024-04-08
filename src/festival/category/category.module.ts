import { Module, forwardRef } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryResolver } from './category.resolver'
import { FestivalClassModule } from '@/festival/festival-class/festival-class.module'

@Module({
  providers: [CategoryResolver, CategoryService],
  imports: [forwardRef(() => FestivalClassModule)],
  exports: [CategoryService],
})
export class CategoryModule {}
