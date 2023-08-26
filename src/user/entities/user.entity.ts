import { Field, ObjectType, Int } from '@nestjs/graphql'
import { UserError } from '../../common.entity'
import { Registration } from '../../submissions/registration/entities/registration.entity'

@ObjectType()
export class User {
  @Field(() => Int)
  id: number
  email: string
  staff: boolean
  admin: boolean
  firstName?: string
  lastName?: string
  apartment?: string
  streetNumber?: string
  streetName?: string
  city?: string
  province?: string
  postalCode?: string
  phone?: string
  registrations?: Registration[]
}

@ObjectType()
export class UserPayload {
  userErrors: UserError[]
  user: User
}
