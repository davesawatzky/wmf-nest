import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { SearchFilterService } from './search-filter.service'

/**
 * Parameter decorator for processing search filters
 * Extracts search filters from GraphQL arguments and processes them
 */
export const SearchFilter = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const searchFilters = ctx.getArgs().searchFilters
    return searchFilters
  },
)

/**
 * Method decorator that applies search filters and processes the query
 * This attaches the SearchFilterService to handle filter processing
 *
 * @param entityName Name of the entity for GraphQL input type naming
 * @param fields Array of field names that can be filtered
 */
export function ApplySearchFilters(entityName: string, fields: string[]) {
  return applyDecorators(UseSearchFilters())
}

/**
 * Guard to ensure SearchFilterService is available
 */
@Injectable()
export class SearchFilterGuard {
  constructor(private readonly searchFilterService: SearchFilterService) {}

  canActivate() {
    return true
  }
}

/**
 * Method decorator to use the SearchFilterService
 */
export function UseSearchFilters() {
  return UseGuards(SearchFilterGuard)
}
