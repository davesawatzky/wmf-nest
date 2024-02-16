import { InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class LevelInput {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  description?: string
}
