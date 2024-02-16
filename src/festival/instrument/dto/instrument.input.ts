import { InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class InstrumentInput {
  @IsString()
  @IsOptional()
  name?: string
}
