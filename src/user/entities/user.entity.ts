import { UserError } from '@/common.entity'
import { Order } from '@/submissions/orders/entities/order.entity'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => Int)
  id: number

  email?: string
  emailConfirmed?: boolean
  staff?: boolean
  admin?: boolean
  instrument?: string
  privateTeacher?: boolean
  schoolTeacher?: boolean
  hasSignedIn?: boolean
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
  orders?: Order[]
}

@ObjectType()
export class UserPayload {
  userErrors: UserError[]
  user?: User
}
