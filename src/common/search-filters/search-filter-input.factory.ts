import { Type } from '@nestjs/common'
import { Field, InputType } from '@nestjs/graphql'
import { FieldFilterInput } from './search-filters.input'

/**
 * Factory for creating entity-specific search filter input types
 * This simplifies the creation of GraphQL input types for search filters
 */
export class SearchFilterInputFactory {
  /**
   * Creates a search filter input type for an entity
   *
   * @param entityName Name of the entity for GraphQL input type naming
   * @param fields Array of field names that can be filtered
   * @returns GraphQL input type for entity search filters
   */
  static create<T>(entityName: string, fields: string[]): Type<any> {
    @InputType(`${entityName}SearchFilters`)
    class DynamicSearchFiltersInput {}

    // Add all fields to the input type
    fields.forEach((fieldName) => {
      Field(() => FieldFilterInput, { nullable: true })(
        DynamicSearchFiltersInput.prototype,
        fieldName,
      )
    })

    return DynamicSearchFiltersInput
  }
}
