import { Field, ObjectType, Int } from '@nestjs/graphql'
import { UserError } from 'src/common.entity'
import { Registration } from '../../submissions/registration/entities/registration.entity'

@ObjectType()
export class User {
  @Field(() => Int)
  id: number
  email: string
  staff: boolean
  admin: boolean
  first_name?: string
  last_name?: string
  apartment?: string
  street_number?: string
  street_name?: string
  city?: string
  province?: string
  postal_code?: string
  phone?: string
  registrations?: Registration[]
}

@ObjectType()
export class UserPayload {
  userErrors: UserError[]
  user?: User
}
