import { Field, ObjectType, Int } from '@nestjs/graphql'
import { UserError } from '../../../common.entity'

@ObjectType()
export class Performer {
  @Field(() => Int)
  id: number
  firstName?: string
  lastName?: string
  apartment?: string
  streetNumber?: string
  streetName?: string
  city?: string
  province?: string
  postalCode?: string
  phone?: string
  email?: string

  @Field(() => Int)
  age?: number
  otherClasses?: string
  instrument?: string
  level?: string
}

@ObjectType()
export class PerformerPayload {
  userErrors: UserError[]
  performer: Performer
}
