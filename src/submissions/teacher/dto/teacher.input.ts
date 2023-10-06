import { InputType } from '@nestjs/graphql'
import {
  IsPostalCode,
  IsEmail,
  IsPhoneNumber,
  IsBoolean,
} from 'class-validator'

@InputType()
export class TeacherInput {
  firstName?: string
  lastName?: string
  apartment?: string
  streetNumber?: string
  streetName?: string
  city?: string
  province?: string

  @IsBoolean()
  privateTeacher?: boolean

  @IsBoolean()
  schoolTeacher?: boolean

  @IsPostalCode('CA')
  postalCode?: string

  @IsPhoneNumber('CA')
  phone?: string

  @IsEmail()
  email?: string

  instrument?: string
}
