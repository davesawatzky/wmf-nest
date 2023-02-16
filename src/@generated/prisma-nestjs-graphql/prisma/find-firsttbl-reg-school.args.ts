import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_schoolWhereInput } from '../tbl-reg-school/tbl-reg-school-where.input'
import { Type } from 'class-transformer'
import { tbl_reg_schoolOrderByWithRelationInput } from '../tbl-reg-school/tbl-reg-school-order-by-with-relation.input'
import { tbl_reg_schoolWhereUniqueInput } from '../tbl-reg-school/tbl-reg-school-where-unique.input'
import { Int } from '@nestjs/graphql'
import { Tbl_reg_schoolScalarFieldEnum } from './tbl-reg-school-scalar-field.enum'

@ArgsType()
export class FindFirsttblRegSchoolArgs {
  @Field(() => tbl_reg_schoolWhereInput, { nullable: true })
  @Type(() => tbl_reg_schoolWhereInput)
  where?: tbl_reg_schoolWhereInput

  @Field(() => [tbl_reg_schoolOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<tbl_reg_schoolOrderByWithRelationInput>

  @Field(() => tbl_reg_schoolWhereUniqueInput, { nullable: true })
  cursor?: tbl_reg_schoolWhereUniqueInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number

  @Field(() => [Tbl_reg_schoolScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof Tbl_reg_schoolScalarFieldEnum>
}
