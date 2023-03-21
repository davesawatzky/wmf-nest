import { Field, ObjectType, Int } from '@nestjs/graphql'
import { UserError } from 'src/common.entity'

@ObjectType()
export class Teacher {
  @Field(() => Int)
  id: number
  prefix?: string
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
}

@ObjectType()
export class TeacherPayload {
  userErrors: UserError[]
  teacher?: Teacher
}
