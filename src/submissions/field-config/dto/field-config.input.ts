import { InputType, Int, Field } from '@nestjs/graphql'
import { IsInt } from 'class-validator'

@InputType()
export class FieldConfigInput {
  tableName?: string
  fieldName?: string
  submissionRequired?: boolean
  customField?: boolean
  customFieldType?: string
}
