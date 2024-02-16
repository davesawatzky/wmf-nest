import { InputType } from '@nestjs/graphql'
import {
  IsPostalCode,
  IsPhoneNumber,
  IsOptional,
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
  streetNumber?: string

  @IsString()
  @IsOptional()
  streetName?: string

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
