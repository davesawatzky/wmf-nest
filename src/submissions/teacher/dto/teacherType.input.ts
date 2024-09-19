import { InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class TeacherTypeInput {
  @IsString()
  teacherType: 'privateTeacher' | 'schoolTeacher'
}
