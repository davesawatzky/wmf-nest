import { InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class TrophyInput {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  description?: string
}
