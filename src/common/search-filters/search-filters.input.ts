import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { GraphQLScalarType, Kind } from 'graphql'
import { MatchMode, OperatorType } from './types'

// Custom scalar for handling MatchMode values
export const MatchModeScalar = new GraphQLScalarType({
  name: 'MatchModeScalar',
  description: 'Custom scalar for MatchMode that handles lowercase values',

  // Convert outgoing values
  serialize(value: any) {
    return value
  },

  // Convert incoming values from variables
  parseValue(value: any) {
    if (typeof value !== 'string')
      return value

    // Find the matching enum key by value
    const matchedKey = Object.keys(MatchMode).find(
      key => MatchMode[key as keyof typeof MatchMode].toLowerCase() === value.toLowerCase(),
    )

    if (matchedKey) {
      return MatchMode[matchedKey as keyof typeof MatchMode]
    }

    // If no match found, return the default
    return MatchMode.CONTAINS
  },

  // Convert from literal in the query document
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING || ast.kind === Kind.ENUM) {
      const value = ast.value as string

      // Find the matching enum key by value
      const matchedKey = Object.keys(MatchMode).find(
        key => MatchMode[key as keyof typeof MatchMode].toLowerCase() === value.toLowerCase(),
      )

      if (matchedKey) {
        return MatchMode[matchedKey as keyof typeof MatchMode]
      }
    }

    // Default
    return MatchMode.CONTAINS
  },
})

// Custom scalar for handling OperatorType values
export const OperatorTypeScalar = new GraphQLScalarType({
  name: 'OperatorTypeScalar',
  description: 'Custom scalar for OperatorType that handles lowercase values',

  // Convert outgoing values
  serialize(value: any) {
    return value
  },

  // Convert incoming values from variables
  parseValue(value: any) {
    if (typeof value !== 'string')
      return value

    // Find the matching enum key by value
    const matchedKey = Object.keys(OperatorType).find(
      key => OperatorType[key as keyof typeof OperatorType].toLowerCase() === value.toLowerCase(),
    )

    if (matchedKey) {
      return OperatorType[matchedKey as keyof typeof OperatorType]
    }

    // If no match found, return the default
    return OperatorType.AND
  },

  // Convert from literal in the query document
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING || ast.kind === Kind.ENUM) {
      const value = ast.value as string

      // Find the matching enum key by value
      const matchedKey = Object.keys(OperatorType).find(
        key => OperatorType[key as keyof typeof OperatorType].toLowerCase() === value.toLowerCase(),
      )

      if (matchedKey) {
        return OperatorType[matchedKey as keyof typeof OperatorType]
      }
    }

    // Default
    return OperatorType.AND
  },
})

// Custom scalar for mixed value types (string, number, boolean)
export const GenericScalar = new GraphQLScalarType({
  name: 'GenericScalar',
  description: 'The GenericScalar type handles multiple data types: string, number, boolean',

  // Convert outgoing values
  serialize(value: any) {
    return value
  },

  // Convert incoming values from variables
  parseValue(value: any) {
    return value
  },

  // Convert from literal in the query document
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.STRING:
        return ast.value
      case Kind.INT:
        return Number.parseInt(ast.value, 10)
      case Kind.FLOAT:
        return Number.parseFloat(ast.value)
      case Kind.BOOLEAN:
        return ast.value
      case Kind.NULL:
        return null
      default:
        return null
    }
  },
})

registerEnumType(MatchMode, {
  name: 'MatchMode',
  description: 'Available match modes for filtering',
})

registerEnumType(OperatorType, {
  name: 'OperatorType',
  description: 'Logical operators for combining filters',
})

@InputType()
export class FilterConstraintsInput {
  @Field(() => GenericScalar, { nullable: true })
  value?: any

  @Field(() => MatchModeScalar, { defaultValue: MatchMode.CONTAINS })
  matchMode: MatchMode
}

@InputType()
export class FieldFilterInput {
  @Field(() => OperatorTypeScalar, { defaultValue: OperatorType.AND })
  operator: OperatorType

  @Field(() => [FilterConstraintsInput])
  constraints: FilterConstraintsInput[]
}

/**
 * Factory function to create search filter input types for any entity
 *
 * @param entityName The name of the entity to create search filters for
 * @param fields Array of field names to include in the search filter
 * @returns A GraphQL input type for search filters
 */
export function createSearchFilterInput(entityName: string, fields: string[]) {
  @InputType(`${entityName}SearchFilters`)
  class SearchFiltersInput {
    constructor() {
      // Initialize all fields as undefined
      for (const field of fields) {
        this[field] = undefined
      }
    }
  }

  // Dynamically add fields to the input type
  for (const field of fields) {
    Field(() => FieldFilterInput, { nullable: true })(
      SearchFiltersInput.prototype,
      field,
    )
  }

  return SearchFiltersInput
}
