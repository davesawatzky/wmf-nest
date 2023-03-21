import { InputType } from '@nestjs/graphql'
import { IsPostalCode, IsPhoneNumber } from 'class-validator'

@InputType()
export class SchoolInput {
  name?: string
  division?: string
  street_number?: string
  street_name?: string
  city?: string
  province?: string

  @IsPostalCode('CA')
  postal_code?: string

  @IsPhoneNumber('CA')
  phone?: string
}
