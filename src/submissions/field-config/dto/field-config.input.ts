import { InputType } from '@nestjs/graphql'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

@InputType()
export class FieldConfigInput {
  @IsString()
  tableName?: string

  @IsString()
  fieldName?: string

  @IsBoolean()
  submissionRequired?: boolean

  @IsBoolean()
  communityRequired?: boolean

  @IsBoolean()
  groupRequired?: boolean

  @IsBoolean()
  schoolRequired?: boolean

  @IsBoolean()
  soloRequired?: boolean

  @IsBoolean()
  customField?: boolean

  @IsString()
  @IsOptional()
  customFieldType?: string
}
