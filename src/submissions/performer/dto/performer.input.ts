import { InputType, Field, Int } from '@nestjs/graphql'
import { IsPostalCode, IsPhoneNumber, IsEmail } from 'class-validator'

@InputType()
export class PerformerInput {
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

  @Field(() => Int)
  age?: number
  otherClasses?: string
  instrument?: string
  level?: string
}
