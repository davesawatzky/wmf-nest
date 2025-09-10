import { InputType } from '@nestjs/graphql'
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
} from 'class-validator'

@InputType()
export class UserInput {
  @IsBoolean()
  @IsOptional()
  privateTeacher?: boolean

  @IsBoolean()
  @IsOptional()
  schoolTeacher?: boolean

  @IsBoolean()
  @IsOptional()
  isActive?: boolean

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
  address?: string

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

  @IsArray()
  @IsString({ each: true })
  roles?: string[]

  @IsArray()
  @IsString({ each: true })
  permissions?: string[]
}
