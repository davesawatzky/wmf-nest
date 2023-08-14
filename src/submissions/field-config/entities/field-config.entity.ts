import { ObjectType, Field, Int } from '@nestjs/graphql'
import { UserError } from '../../../common.entity'

@ObjectType()
export class FieldConfig {
  @Field(() => Int)
  id: number
  tableName?: string
  fieldName?: string
  submissionRequired?: boolean
  customField?: boolean
  customFieldType?: string
}

@ObjectType()
export class FieldConfigPayload {
  userErrors?: UserError[]
  fieldConfig?: FieldConfig
}
