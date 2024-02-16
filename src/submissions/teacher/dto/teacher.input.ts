import { InputType, ObjectType } from '@nestjs/graphql'
import { UserError } from '../../../common.entity'
import { User } from '../../../user/entities/user.entity'
import {
  IsPostalCode,
  IsEmail,
  IsPhoneNumber,
  IsBoolean,
  IsString,
  IsOptional,
} from 'class-validator'

@InputType()
export class TeacherInput {
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

  @IsBoolean()
  @IsOptional()
  privateTeacher?: boolean

  @IsBoolean()
  @IsOptional()
  schoolTeacher?: boolean

  @IsPostalCode('CA')
  @IsOptional()
  postalCode?: string

  @IsPhoneNumber('CA')
  @IsOptional()
  phone?: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  instrument?: string
}
