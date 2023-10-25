import { InputType } from '@nestjs/graphql'
import {
  IsBoolean,
  IsPostalCode,
  IsPhoneNumber,
  IsEmail,
} from 'class-validator'

@InputType()
export class UserInput {
  @IsBoolean()
  admin?: boolean
  @IsBoolean()
  staff?: boolean
  @IsBoolean()
  privateTeacher?: boolean
  @IsBoolean()
  schoolTeacher?: boolean
  @IsBoolean()
  hasSignedIn?: boolean

  @IsBoolean()
  emailConfirmed?: boolean

  firstName?: string
  lastName?: string
  apartment?: string
  streetNumber?: string
  streetName?: string
  city?: string
  province?: string
  instrument?: string

  @IsPostalCode('CA')
  postalCode?: string

  @IsPhoneNumber('CA')
  phone?: string
}
