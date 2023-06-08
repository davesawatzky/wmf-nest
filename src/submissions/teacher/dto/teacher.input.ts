import { InputType } from '@nestjs/graphql'
import { IsPostalCode, IsEmail, IsPhoneNumber } from 'class-validator'

@InputType()
export class TeacherInput {
  prefix?: string
  firstName?: string
  lastName?: string
  apartment?: string
  streetNumber?: string
  streetName?: string
  city?: string
  province?: string

  @IsPostalCode('CA')
  postalCode?: string

  @IsPhoneNumber('CA')
  phone?: string

  @IsEmail()
  email?: string
}
