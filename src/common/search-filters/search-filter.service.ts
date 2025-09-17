import { Injectable } from '@nestjs/common'
import {
  MatchMode,
  OperatorType,
  PrismaWhereClause,
  SearchFilters,
} from './types'

@Injectable()
export class SearchFilterService {
  /**
   * Builds a Prisma where clause from search filters
   *
   * @param searchFilters The search filters to apply
   * @returns A Prisma-compatible where clause
   */
  buildWhereClause<T>(
    searchFilters: SearchFilters<T> | undefined,
  ): PrismaWhereClause {
    if (!searchFilters) {
      return {}
    }

    const where: PrismaWhereClause = {}
    const andConditions: Record<string, any>[] = []
    const orConditions: Record<string, any>[] = []

    for (const [field, filterOptions] of Object.entries(searchFilters)) {
      // Skip if filterOptions is null or undefined
      if (!filterOptions)
        continue

      const { operator, constraints } = filterOptions

      // Skip if constraints is null, undefined, or empty array
      if (
        !constraints
        || !Array.isArray(constraints)
        || constraints.length === 0
      ) {
        continue
      }

      // Process each constraint for this field
      const fieldConditions: Record<string, any>[] = []

      for (const constraint of constraints) {
        const { value, matchMode } = constraint

        // Skip if value is null, undefined, or empty string
        if (
          value === undefined
          || value === null
          || (typeof value === 'string' && value.trim() === '')
        ) {
          continue
        }

        // Build condition for this specific constraint
        const condition = this.buildConditionForField(field, value, matchMode)
        fieldConditions.push(condition)
      }

      // Skip if no valid conditions were created
      if (fieldConditions.length === 0)
        continue

      // If we have multiple conditions for the same field, combine them based on the operator
      let combinedFieldCondition: Record<string, any>

      if (fieldConditions.length === 1) {
        // Just one condition, use it directly
        combinedFieldCondition = fieldConditions[0]
      }
      else {
        // Multiple conditions for the same field
        if (operator === OperatorType.AND) {
          // All conditions must be true
          combinedFieldCondition = { AND: fieldConditions }
        }
        else {
          // Any condition can be true
          combinedFieldCondition = { OR: fieldConditions }
        }
      }

      // Add the combined field condition to the main conditions
      if (operator === OperatorType.AND) {
        andConditions.push(combinedFieldCondition)
      }
      else {
        orConditions.push(combinedFieldCondition)
      }
    }

    // Add conditions to where clause
    if (andConditions.length > 0) {
      where.AND = andConditions
    }
    if (orConditions.length > 0) {
      where.OR = orConditions
    }

    return where
  }

  /**
   * Builds a condition for a specific field based on match mode
   *
   * @param field The field name
   * @param value The field value
   * @param matchMode The match mode to apply
   * @returns A Prisma-compatible condition
   */
  private buildConditionForField(
    field: string,
    value: any,
    matchMode: MatchMode,
  ): Record<string, any> {
    const condition: Record<string, any> = {}

    switch (matchMode) {
      case MatchMode.CONTAINS:
        condition[field] = { contains: value, mode: 'insensitive' }
        break
      case MatchMode.EQUALS:
        condition[field] = value
        break
      case MatchMode.NOT_EQUALS:
        condition[field] = { not: value }
        break
      case MatchMode.STARTS_WITH:
        condition[field] = { startsWith: value, mode: 'insensitive' }
        break
      case MatchMode.ENDS_WITH:
        condition[field] = { endsWith: value, mode: 'insensitive' }
        break
      case MatchMode.NOT_CONTAINS:
        condition[field] = { not: { contains: value, mode: 'insensitive' } }
        break
      case MatchMode.LT:
        condition[field] = { lt: value }
        break
      case MatchMode.GT:
        condition[field] = { gt: value }
        break
      case MatchMode.GTE:
        condition[field] = { gte: value }
        break
      case MatchMode.LTE:
        condition[field] = { lte: value }
        break
      case MatchMode.DATE_IS:
        condition[field] = value instanceof Date ? value : new Date(value)
        break
      case MatchMode.DATE_IS_NOT:
        condition[field] = {
          not: value instanceof Date ? value : new Date(value),
        }
        break
      case MatchMode.DATE_BEFORE:
        condition[field] = {
          lt: value instanceof Date ? value : new Date(value),
        }
        break
      case MatchMode.DATE_AFTER:
        condition[field] = {
          gt: value instanceof Date ? value : new Date(value),
        }
        break
      default:
        condition[field] = value
    }

    return condition
  }
}
