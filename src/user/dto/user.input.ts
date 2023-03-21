import { InputType } from '@nestjs/graphql'
import { IsBoolean, IsPostalCode, IsPhoneNumber } from 'class-validator'

@InputType()
export class UserInput {
  @IsBoolean()
  staff?: boolean

  @IsBoolean()
  admin?: boolean
  first_name?: string
  last_name?: string
  apartment?: string
  street_number?: string
  street_name?: string
  city?: string
  province?: string

  @IsPostalCode('CA')
  postal_code?: string

  @IsPhoneNumber('CA')
  phone?: string
}
