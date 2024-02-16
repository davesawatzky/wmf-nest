import { InputType } from '@nestjs/graphql'
import {
  IsBoolean,
  IsPostalCode,
  IsPhoneNumber,
  IsOptional,
  IsString,
} from 'class-validator'

@InputType()
export class UserInput {
  @IsBoolean()
  @IsOptional()
  admin?: boolean

  @IsBoolean()
  @IsOptional()
  staff?: boolean

  @IsBoolean()
  @IsOptional()
  privateTeacher?: boolean

  @IsBoolean()
  @IsOptional()
  schoolTeacher?: boolean

  @IsBoolean()
  @IsOptional()
  hasSignedIn?: boolean

  @IsBoolean()
  @IsOptional()
  emailConfirmed?: boolean

  @IsString()
  @IsOptional()
  firstName?: string

  @IsString()
  @IsOptional()
  lastName?: string

  @IsString()
  @IsOptional()
  apartment?: string

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

  @IsString()
  @IsOptional()
  instrument?: string

  @IsPostalCode('CA')
  @IsOptional()
  postalCode?: string

  @IsPhoneNumber('CA')
  @IsOptional()
  phone?: string
}
