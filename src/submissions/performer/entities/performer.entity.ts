import { Field, ObjectType, Int } from '@nestjs/graphql'
import { UserError } from '../../../common.entity'
import {Registration} from '@/submissions/registration/entities/registration.entity'

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
  registration?: Registration
}

@ObjectType()
export class PerformerPayload {
  userErrors: UserError[]
  performer?: Performer
}
