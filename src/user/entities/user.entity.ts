import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserError } from '@/common.entity.js'
import { Order } from '@/submissions/order/entities/order.entity.js'
import { Registration } from '@/submissions/registration/entities/registration.entity.js'

@ObjectType()
export class User {
  @Field(() => Int)
  id: number

  email?: string
  emailConfirmed?: boolean
  instrument?: string
  privateTeacher?: boolean
  schoolTeacher?: boolean
  isActive?: boolean
  roles?: string[]
  permissions?: string[]
  firstName?: string
  lastName?: string
  address?: string
  city?: string
  province?: string
  postalCode?: string
  phone?: string
  registrations?: Registration[]
  orders?: Order[]
}

@ObjectType()
export class UserPayload {
  userErrors: UserError[]
  user?: User
}
