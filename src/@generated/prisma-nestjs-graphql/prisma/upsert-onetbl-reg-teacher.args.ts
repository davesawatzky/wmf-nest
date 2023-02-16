import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_teacherWhereUniqueInput } from '../tbl-reg-teacher/tbl-reg-teacher-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_reg_teacherCreateInput } from '../tbl-reg-teacher/tbl-reg-teacher-create.input'
import { tbl_reg_teacherUpdateInput } from '../tbl-reg-teacher/tbl-reg-teacher-update.input'

@ArgsType()
export class UpsertOnetblRegTeacherArgs {
  @Field(() => tbl_reg_teacherWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_teacherWhereUniqueInput)
  where!: tbl_reg_teacherWhereUniqueInput

  @Field(() => tbl_reg_teacherCreateInput, { nullable: false })
  @Type(() => tbl_reg_teacherCreateInput)
  create!: tbl_reg_teacherCreateInput

  @Field(() => tbl_reg_teacherUpdateInput, { nullable: false })
  @Type(() => tbl_reg_teacherUpdateInput)
  update!: tbl_reg_teacherUpdateInput
}
