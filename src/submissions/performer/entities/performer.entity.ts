import { UserError } from '@/common.entity'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Performer {
  @Field(() => Int)
  id: number

  pronouns?: string
  firstName?: string
  lastName?: string
  address?: string
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
  unavailable?: string
  photoPermission?: boolean
  registration?: Registration
}

@ObjectType()
export class PerformerPayload {
  userErrors: UserError[]
  performer?: Performer
}
