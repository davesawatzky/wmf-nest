import { InputType } from '@nestjs/graphql'
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator'

@InputType()
export class InstrumentInput {
  @IsString()
  name: string

  @IsInt()
  @IsOptional()
  disciplineID?: number

  @IsBoolean()
  @IsOptional()
  mozart?: boolean

}
