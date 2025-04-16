import { Module } from '@nestjs/common'
import { SearchFilterGuard } from './search-filter.decorator'
import { SearchFilterService } from './search-filter.service'

@Module({
  providers: [SearchFilterService, SearchFilterGuard],
  exports: [SearchFilterService],
})
export class SearchFiltersModule {}
