import { InputType } from '@nestjs/graphql'
import { IsBoolean, IsPostalCode, IsPhoneNumber } from 'class-validator'

@InputType()
export class UserInput {
  @IsBoolean()
  staff?: boolean

  @IsBoolean()
  admin?: boolean
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
}
