import { InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class CategoryInput {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  requiredComposer?: string
}
