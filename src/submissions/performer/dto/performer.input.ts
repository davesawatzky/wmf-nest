import { InputType, Field, Int } from '@nestjs/graphql'
import { IsPostalCode, IsPhoneNumber, IsEmail } from 'class-validator'

@InputType()
export class PerformerInput {
  firstName?: string
  lastName?: string
  apartment?: string
  streetNumber?: string
  streetName?: string
  city: string
  province: string

  @IsPostalCode('CA')
  postalCode?: string

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
