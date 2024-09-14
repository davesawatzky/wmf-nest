import { InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class SelectionInput {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  largerWork?: string

  @IsString()
  @IsOptional()
  movement?: string

  @IsString()
  @IsOptional()
  composer?: string

  @IsString()
  @IsOptional()
  duration?: string
}
