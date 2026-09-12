import { Module } from '@nestjs/common'
import { SearchFilterGuard } from './search-filter.decorator.js'
import { SearchFilterService } from './search-filter.service.js'

@Module({
  providers: [SearchFilterService, SearchFilterGuard],
  exports: [SearchFilterService],
})
export class SearchFiltersModule {}
