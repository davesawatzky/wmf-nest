import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_teacherWhereInput } from '../tbl-reg-teacher/tbl-reg-teacher-where.input'
import { Type } from 'class-transformer'
import { tbl_reg_teacherOrderByWithRelationInput } from '../tbl-reg-teacher/tbl-reg-teacher-order-by-with-relation.input'
import { tbl_reg_teacherWhereUniqueInput } from '../tbl-reg-teacher/tbl-reg-teacher-where-unique.input'
import { Int } from '@nestjs/graphql'

@ArgsType()
export class AggregatetblRegTeacherArgs {
  @Field(() => tbl_reg_teacherWhereInput, { nullable: true })
  @Type(() => tbl_reg_teacherWhereInput)
  where?: tbl_reg_teacherWhereInput

  @Field(() => [tbl_reg_teacherOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<tbl_reg_teacherOrderByWithRelationInput>

  @Field(() => tbl_reg_teacherWhereUniqueInput, { nullable: true })
  cursor?: tbl_reg_teacherWhereUniqueInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number
}
