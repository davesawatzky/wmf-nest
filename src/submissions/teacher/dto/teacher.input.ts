import { InputType } from '@nestjs/graphql'
import { IsPostalCode, IsEmail, IsPhoneNumber } from 'class-validator'

@InputType()
export class TeacherInput {
  prefix?: string
  first_name?: string
  last_name?: string
  apartment?: string
  street_number?: string
  street_name?: string
  city: string
  province: string

  @IsPostalCode('CA')
  postal_code?: string

  @IsPhoneNumber('CA')
  phone?: string

  @IsEmail()
  email?: string
}
