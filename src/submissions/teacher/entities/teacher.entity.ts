import { Field, ObjectType, Int } from '@nestjs/graphql'
import { UserError } from '../../../common.entity'
import { User } from 'src/user/entities/user.entity'
import { Registration } from '../../../submissions/registration/entities/registration.entity'

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
  apartment?: User['apartment']
  streetNumber?: User['streetNumber']
  streetName?: User['streetName']
  city?: User['city']
  province?: User['province']
  postalCode?: User['postalCode']
  phone?: User['phone']
  registrations?: Registration[]
}

@ObjectType()
export class TeacherPayload {
  userErrors: UserError[]
  teacher: Teacher
}
