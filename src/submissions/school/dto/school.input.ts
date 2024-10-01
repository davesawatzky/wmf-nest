import { InputType } from '@nestjs/graphql'
import {
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
} from 'class-validator'

@InputType()
export class SchoolInput {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  division?: string

  @IsString()
  @IsOptional()
  address?: string

  @IsString()
  @IsOptional()
  city?: string

  @IsString()
  @IsOptional()
  province?: string

  @IsPostalCode('CA')
  @IsOptional()
  postalCode?: string

  @IsPhoneNumber('CA')
  @IsOptional()
  phone?: string
}
