import { Field, ObjectType, Int } from '@nestjs/graphql'
import { UserError } from '../../../common.entity'

@ObjectType()
export class Teacher {
  @Field(() => Int)
  id: number
  prefix?: string
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
}

@ObjectType()
export class TeacherPayload {
  userErrors: UserError[]
  teacher?: Teacher
}
