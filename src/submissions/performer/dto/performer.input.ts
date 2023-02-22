import { InputType, Field, Int } from '@nestjs/graphql'

@InputType()
export class PerformerInput {
  firstName?: string
  lastName?: string
  apartment?: string
  streetNumber?: string
  streetName?: string
  city: string
  province: string
  postalCode?: string
  phone?: string
  email?: string

  @Field(() => Int)
  age?: number
  otherClasses?: string
  instrument?: string
  level?: string
}
