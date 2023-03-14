import { InputType } from '@nestjs/graphql'
import { IsPostalCode, IsPhoneNumber } from 'class-validator'

@InputType()
export class SchoolInput {
  name?: string
  division?: string
  streetNumber?: string
  streetName?: string
  city?: string
  province?: string

  @IsPostalCode('CA')
  postalCode?: string

  @IsPhoneNumber('CA')
  phone?: string
}
