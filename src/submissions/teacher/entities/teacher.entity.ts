import { UserError } from '@/common.entity'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import { User } from '@/user/entities/user.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Teacher {
  @Field(() => Int)
  id: User['id']

  email?: User['email']
  privateTeacher?: User['privateTeacher']
  schoolTeacher?: User['schoolTeacher']
  instrument?: User['instrument']
  firstName?: User['firstName']
  lastName?: User['lastName']
  address?: User['address']
  city?: User['city']
  province?: User['province']
  postalCode?: User['postalCode']
  phone?: User['phone']
  registrations?: Registration[]
}

@ObjectType()
export class TeacherPayload {
  userErrors: UserError[]
  teacher?: Teacher
}
