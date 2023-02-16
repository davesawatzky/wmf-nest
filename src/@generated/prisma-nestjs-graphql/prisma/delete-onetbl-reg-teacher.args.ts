import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_teacherWhereUniqueInput } from '../tbl-reg-teacher/tbl-reg-teacher-where-unique.input'
import { Type } from 'class-transformer'

@ArgsType()
export class DeleteOnetblRegTeacherArgs {
  @Field(() => tbl_reg_teacherWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_teacherWhereUniqueInput)
  where!: tbl_reg_teacherWhereUniqueInput
}
