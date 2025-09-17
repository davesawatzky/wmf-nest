import { Args } from '@nestjs/graphql'
import { SearchFilterInputFactory } from './search-filter-input.factory'

/**
 * Parameter decorator that automatically creates and applies a search filter input
 * for an entity. This is a higher-level utility that can be used directly in a resolver.
 *
 * @param entityName The name of the entity for GraphQL input type naming
 * @param fields Array of field names that can be filtered
 * @returns Parameter decorator for GraphQL Args
 */
export function SearchFilterArgs<T>(
  entityName: string,
  fields: string[],
): ParameterDecorator {
  // Create the search filter input type
  const SearchFiltersType = SearchFilterInputFactory.create<T>(
    entityName,
    fields,
  )

  // Return a parameter decorator that sets up the GraphQL Args
  return Args('searchFilters', {
    type: () => SearchFiltersType,
    nullable: true,
  })
}
