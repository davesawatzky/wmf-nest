export enum MatchMode {
  CONTAINS = 'contains',
  EQUALS = 'equals',
  NOT_EQUALS = 'notEquals',
  STARTS_WITH = 'startsWith',
  ENDS_WITH = 'endsWith',
  NOT_CONTAINS = 'notContains',
  LT = 'lt',
  GT = 'gt',
  GTE = 'gte',
  LTE = 'lte',
  DATE_IS = 'dateIs',
  DATE_IS_NOT = 'dateIsNot',
  DATE_BEFORE = 'dateBefore',
  DATE_AFTER = 'dateAfter',
}

export enum OperatorType {
  AND = 'and',
  OR = 'or',
}

export interface FilterConstraints {
  value: string | number | boolean | Date
  matchMode: MatchMode
}

export interface FieldFilter {
  operator: OperatorType
  constraints: FilterConstraints[]
}

export type SearchFilters<T> = {
  [K in keyof T]?: FieldFilter;
}

export interface PrismaWhereClause {
  AND?: any[];
  OR?: any[];
  [key: string]: any;
}
