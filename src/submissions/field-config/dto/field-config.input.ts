import { InputType } from '@nestjs/graphql'

@InputType()
export class FieldConfigInput {
  tableName?: string
  fieldName?: string
  submissionRequired?: boolean
  communityRequired?: boolean
  groupRequired?: boolean
  schoolRequired?: boolean
  soloRequired?: boolean
  customField?: boolean
  customFieldType?: string
}
