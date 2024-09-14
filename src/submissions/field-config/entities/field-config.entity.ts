import { UserError } from '@/common.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class FieldConfig {
  @Field(() => Int)
  id: number

  tableName: string
  fieldName: string
  submissionRequired: boolean
  communityRequired: boolean
  groupRequired: boolean
  schoolRequired: boolean
  soloRequired: boolean
  customField: boolean
  customFieldType?: string
}

@ObjectType()
export class FieldConfigPayload {
  userErrors: UserError[]
  fieldConfig: FieldConfig
}
