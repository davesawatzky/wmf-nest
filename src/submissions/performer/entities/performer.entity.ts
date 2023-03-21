import { Field, ObjectType, Int } from '@nestjs/graphql'
import { UserError } from 'src/common.entity'

@ObjectType()
export class Performer {
  @Field(() => Int)
  id: number
  first_name?: string
  last_name?: string
  apartment?: string
  street_number?: string
  street_name?: string
  city?: string
  province?: string
  postal_code?: string
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
  performer?: Performer
}
