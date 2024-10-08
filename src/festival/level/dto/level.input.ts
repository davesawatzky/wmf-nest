import { InputType } from '@nestjs/graphql'
import { IsInt, IsOptional, IsString } from 'class-validator'

@InputType()
export class LevelInput {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsInt()
  @IsOptional()
  sortOrder?: number
}
