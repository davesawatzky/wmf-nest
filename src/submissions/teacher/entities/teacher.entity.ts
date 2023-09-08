import { Field, ObjectType, Int } from '@nestjs/graphql'
import { UserError } from '../../../common.entity'
import { Registration } from 'src/submissions/registration/entities/registration.entity'

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
  instrument?: string
  registrations?: Registration[]
}

@ObjectType()
export class TeacherPayload {
  userErrors: UserError[]
  teacher: Teacher
}
