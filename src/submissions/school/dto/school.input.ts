import { InputType } from '@nestjs/graphql'
import { IsPostalCode, IsPhoneNumber, IsOptional } from 'class-validator'

@InputType()
export class SchoolInput {
  name?: string
  division?: string
  streetNumber?: string
  streetName?: string
  city?: string
  province?: string

  @IsPostalCode('CA')
  @IsOptional()
  postalCode?: string

  @IsPhoneNumber('CA')
  @IsOptional()
  phone?: string
}
